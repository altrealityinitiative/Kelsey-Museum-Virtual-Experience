import * as ecs from '@8thwall/ecs'
import {PUZZLE_START, PIECE_COMPLETE} from './events'
import Draggable from './Draggable'
import {getRandom, getLength} from './utils'

const Fragment = ecs.registerComponent({
  name: 'Fragment',
  schema: {
    camera: ecs.eid,
    offsetX: ecs.f32,
    offsetY: ecs.f32,
    offsetZ: ecs.f32,
  },
  schemaDefaults: {offsetX: 0, offsetY: 0, offsetZ: 0},
  data: {
    scatteredX: ecs.f32,
    scatteredY: ecs.f32,
    scatteredZ: ecs.f32,
    dislodgeTick: ecs.i32,
    // rotationX: ecs.f32
  },
  add: (world, component) => {
    const collider = ecs.Collider.get(world, component.eid)
    if (collider) {
      ecs.Collider.set(world, component.eid, {
        type: ecs.ColliderType.Kinematic,
      })
    }

    const {schema} = component
    world.setPosition(
      component.eid,
      schema.offsetX,
      schema.offsetY,
      schema.offsetZ
    )

    // Spawn a little point to indicate it's position
    const markerEntity = world.createEntity()
    world.setPosition(
      markerEntity,
      schema.offsetX,
      schema.offsetY,
      schema.offsetZ
    )
    ecs.SphereGeometry.set(world, markerEntity, {radius: 0.02})
    ecs.UnlitMaterial.set(world, markerEntity, {
      r: 255,
      g: 255,
      b: 255,
    })
  },
  // tick: (world, component) => {},
  // remove: (world, component) => {},
  stateMachine: ({world, eid, schemaAttribute, dataAttribute}) => {
    ecs
      .defineState('hidden')
      .initial()
      .onEnter(() => {
        ecs.Hidden.set(world, eid, {})
      })
      .wait(0, 'show')

    ecs
      .defineState('show')
      .onEnter(() => {
        ecs.Hidden.remove(world, eid)
      })
      .onEvent(PUZZLE_START, 'scatter', {target: world.events.globalId})

    ecs
      .defineState('scatter')
      .onEnter(() => {
        const data = dataAttribute.cursor(eid)

        data.scatteredX = getRandom(-2, 2)
        data.scatteredY = getRandom(4, 8)
        data.scatteredZ = getRandom(-2, 2)
      })
      .onTick(() => {
        const data = dataAttribute.cursor(eid)
        const {scatteredX, scatteredY, scatteredZ} = data

        const rotation = ecs.Quaternion.get(world, eid)
        const position = ecs.Position.get(world, eid)

        const smoothedPosition = {
          x: position.x + (scatteredX - position.x) * 0.1,
          y: position.y + (scatteredY - position.y) * 0.1,
          z: position.z + (scatteredZ - position.z) * 0.1,
        }

        if (
          getLength(
            position.x - scatteredX,
            position.y - scatteredY,
            position.z - scatteredZ
          ) < 0.01
        ) {
          world.setPosition(eid, scatteredX, scatteredY, scatteredZ)
          world.events.dispatch(eid, 'scatter_complete')
        } else {
          world.setPosition(
            eid,
            smoothedPosition.x,
            smoothedPosition.y,
            smoothedPosition.z
          )
        }
      })
      .onEvent('scatter_complete', 'dislodge1')

    ecs.defineState('dislodge1')
      .onEnter(() => {
        ecs.Collider.set(world, eid, {
          type: ecs.ColliderType.Dynamic,
        })
      })
      .wait(20, 'dislodge2')

    ecs.defineState('dislodge2')
      .onEnter(() => {
        dataAttribute.set(eid, {dislodgeTick: 40})

        ecs.Collider.set(world, eid, {
          type: ecs.ColliderType.Kinematic,
        })
      })
      .onTick(() => {
        let {dislodgeTick} = dataAttribute.get(eid)

        const position = ecs.Position.get(world, eid)

        world.setPosition(
          eid,
          position.x,
          position.y - 0.05,
          position.z
        )

        dislodgeTick -= 1
        dataAttribute.set(eid, {dislodgeTick})
        if (dislodgeTick <= 0) {
          world.events.dispatch(eid, 'done_dislodge')
        }
      })
      .onEvent('done_dislodge', 'physics')

    ecs
      .defineState('physics')
      .onEnter(() => {
        const schema = schemaAttribute.get(eid)
        const rotation = ecs.Quaternion.get(world, eid)
        Draggable.set(world, eid, {
          camera: schema.camera,
          startX: schema.offsetX,
          startY: schema.offsetY,
          startZ: schema.offsetZ,
          rotX: rotation.x,
          rotY: rotation.y,
          rotZ: rotation.z,
          rotW: rotation.w,
        })
      })
      .onExit(() => {
        Draggable.remove(world, eid)
      })
      .onEvent(PIECE_COMPLETE, 'solved')

    ecs.defineState('solved')
      .onEnter(() => {
        Draggable.remove(world, eid)

        const {offsetX, offsetY, offsetZ} = schemaAttribute.get(eid)

        world.setPosition(
          eid,
          offsetX,
          offsetY,
          offsetZ
        )
      })
  },
})

export default Fragment
