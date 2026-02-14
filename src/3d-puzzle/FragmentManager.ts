import * as ecs from '@8thwall/ecs'
import {FRAGMENTS, FRAGMENT_DIRECTORY} from './fragment-data'
import Fragment from './Fragment'

ecs.registerComponent({
  name: 'FragmentManager',
  schema: {
    fragmentPrefab: ecs.eid,
    camera: ecs.eid,
    // @group start offset:vector3
    // @label X
    offsetX: ecs.f32,
    // @label Y
    offsetY: ecs.f32,
    // @label Z
    offsetZ: ecs.f32,
    // @group end
  },
  schemaDefaults: {
    offsetX: 0,
    offsetY: 0,
    offsetZ: 0,
  },
  stateMachine: ({world, eid, schemaAttribute, dataAttribute}) => {
    ecs.defineState('start').initial().wait(0, 'spawn')

    ecs.defineState('spawn').onEnter(() => {
      const {fragmentPrefab, camera, offsetX, offsetY, offsetZ} = schemaAttribute.get(eid)

      for (const fragmentData of FRAGMENTS) {
        const fragmentEntity = world.createEntity(fragmentPrefab)

        ecs.GltfModel.set(world, fragmentEntity, {
          url: `${FRAGMENT_DIRECTORY}/${fragmentData.asset}`,
        })

        ecs.Collider.set(world, fragmentEntity, {
          type: ecs.ColliderType.Dynamic,
          shape: ecs.ColliderShape.Box,
          width: fragmentData.collider.width,
          height: fragmentData.collider.height,
          depth: fragmentData.collider.depth,
          mass: 2,
        })

        Fragment.set(world, fragmentEntity, {
          camera,
          offsetX: offsetX + fragmentData.offset.x,
          offsetY: offsetY + fragmentData.offset.y,
          offsetZ: offsetZ + fragmentData.offset.z,
        })
      }
    })
  },
})
