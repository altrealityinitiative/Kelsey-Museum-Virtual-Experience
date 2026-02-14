import * as ecs from '@8thwall/ecs'  // This is how you access the ecs library.
import {getLength} from './utils'
import {PIECE_COMPLETE} from './events'

const Draggable = ecs.registerComponent({
  name: 'Draggable',
  schema: {
    camera: ecs.eid,
    startX: ecs.f32,
    startY: ecs.f32,
    startZ: ecs.f32,
    rotX: ecs.f32,
    rotY: ecs.f32,
    rotZ: ecs.f32,
    rotW: ecs.f32,
    distanceToCamera: ecs.f32,
    followSpeed: ecs.f32,
  },
  schemaDefaults: {
    distanceToCamera: 3,
    followSpeed: 50,
  },
  data: {
    originalMass: ecs.f32,
    touchPositionX: ecs.f32,
    touchPositionY: ecs.f32,
    firstRun: ecs.boolean,
  },
  add: (world, component) => {
    // Init data
    const {eid, dataAttribute} = component
    const data = dataAttribute.cursor(eid)

    // Set to middle screen
    data.touchPositionX = 0.5
    data.touchPositionY = 0.5
    data.firstRun = true

    // Get mass data for later caching
    const collider = ecs.Collider.get(world, eid)
    if (collider) {
      data.originalMass = collider.mass
    }
  },
  remove: (world, component) => {
    const {eid} = component

    const collider = ecs.Collider.get(world, eid)
    if (collider) {
      ecs.Collider.set(world, eid, {type: ecs.ColliderType.Static})
    }
  },
  stateMachine: ({world, eid, schemaAttribute, dataAttribute}) => {
    // ecs.defineState('wake')
    //   .initial()
    //   .onEnter(() => {
    //     const collider = ecs.Collider.get(world, eid)
    //     if (collider) {
    //       ecs.Collider.set(world, eid, {
    //         type: ecs.ColliderType.Kinematic,
    //         mass: 0,
    //       })
    //     }

    //     const position = ecs.Position.get(world, eid)

    //     world.setPosition(
    //       eid,
    //       position.x,
    //       position.y + 2,
    //       position.z
    //     )
    //   })
    //   .wait(200, 'idle')

    ecs.defineState('idle')
      .initial()
      .onEnter(() => {
        const {startX, startY, startZ} = schemaAttribute.get(eid)
        const position = ecs.Position.get(world, eid)
        const offsetFromStart = {
          x: startX - position.x,
          y: startY - position.y,
          z: startZ - position.z,
        }

        const {firstRun} = dataAttribute.get(eid)

        // In correct location, emit end signal
        if (!firstRun && getLength(offsetFromStart.x, offsetFromStart.y, offsetFromStart.z) < 0.1) {
          world.events.dispatch(eid, PIECE_COMPLETE)
          return
        }

        const collider = ecs.Collider.get(world, eid)
        if (collider) {
          const data = dataAttribute.cursor(eid)
          ecs.Collider.set(world, eid, {
            type: ecs.ColliderType.Dynamic,
            mass: data.originalMass,
          })
        }

        dataAttribute.set(eid, {firstRun: false})
      })
      .onEvent(ecs.input.SCREEN_TOUCH_START, 'following', {
        target: eid,
      })

    ecs.defineState('following')
      .onEnter(() => {
        const collider = ecs.Collider.get(world, eid)
        if (collider) {
          ecs.Collider.set(world, eid, {
            type: ecs.ColliderType.Kinematic,
            mass: 0,
          })
        }
      })
      .onTick(() => {
        const schema = schemaAttribute.get(eid)
        const {
          camera,
          distanceToCamera,
          followSpeed,
          startX,
          startY,
          startZ,
          rotX,
          rotY,
          rotZ,
          rotW,
        } = schema

        // Get the camera's position and rotation
        const cameraPosition = ecs.Position.get(world, camera)
        const cameraRotation = ecs.Quaternion.get(world, camera)

        // Get screen size
        // Calculate relative position of object

        // Calculate the forward vector from the camera's rotation
        const forward = {
          x:
            2 *
            (cameraRotation.x * cameraRotation.z +
              cameraRotation.w * cameraRotation.y),
          y:
            2 *
            (cameraRotation.y * cameraRotation.z -
              cameraRotation.w * cameraRotation.x),
          z:
            1 -
            2 *
              (cameraRotation.x * cameraRotation.x +
                cameraRotation.y * cameraRotation.y),
        }

        // Scale the forward vector by the desired distance
        const forwardOffset = {
          x: forward.x * distanceToCamera,
          y: forward.y * distanceToCamera,
          z: forward.z * distanceToCamera,
        }

        // Calculate the new position in front of the camera
        let newPosition = {
          x: cameraPosition.x + forwardOffset.x,
          y: cameraPosition.y + forwardOffset.y,
          z: cameraPosition.z + forwardOffset.z,
        }

        const offsetFromStart = {
          x: startX - newPosition.x,
          y: startY - newPosition.y,
          z: startZ - newPosition.z,
        }

        let rotation = ecs.Quaternion.get(world, eid)

        if (getLength(offsetFromStart.x, offsetFromStart.y, offsetFromStart.z) < 0.5) {
          newPosition = {
            x: startX,
            y: startY,
            z: startZ,
          }

          rotation = {
            x: rotX,
            y: rotY,
            z: rotZ,
            w: rotW,
          }
        }

        // Smoothly interpolate towards the target position (if followSpeed is used)
        const currentPosition = ecs.Position.get(world, eid)
        const smoothedPosition = {
          x:
            currentPosition.x +
            (newPosition.x - currentPosition.x) * (followSpeed / 100),
          y:
            currentPosition.y +
            (newPosition.y - currentPosition.y) * (followSpeed / 100),
          z:
            currentPosition.z +
            (newPosition.z - currentPosition.z) * (followSpeed / 100),
        }

        // Set the new position for the object
        world.setPosition(
          eid,
          smoothedPosition.x,
          smoothedPosition.y,
          smoothedPosition.z
        )

        world.setQuaternion(eid, rotation.x, rotation.y, rotation.z, rotation.w)
      })
      .onExit(() => {
        ecs.physics.setLinearVelocity(world, eid, 0, 0, 0)
      })
      // .listen(eid, ecs.input.SCREEN_TOUCH_MOVE, handleFollow)
      .onEvent(ecs.input.SCREEN_TOUCH_END, 'idle', {
        target: eid,
      })
  },
})

export default Draggable
