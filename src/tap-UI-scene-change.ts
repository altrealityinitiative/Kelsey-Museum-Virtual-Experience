import * as ecs from '@8thwall/ecs'

ecs.registerComponent({

  name: 'tap-UI-scene-change',
  schema: {
    targetScene: ecs.string,
  },
  schemaDefaults: {
  },
  data: {
  },

  add: (world, component) => {
    const {targetScene} = component.schema
    world.events.addListener(component.eid, ecs.input.UI_CLICK, () => {
      world.spaces.loadSpace(targetScene)
    })
  },

})
