import * as ecs from '@8thwall/ecs'

const setScene = (world, component) => (e) => {
  world.spaces.loadSpace(component.schema.targetScene)
}

ecs.registerComponent({
  name: 'tap-3D-scene-change',
  schema: {
    targetScene: ecs.string,
  },
  schemaDefaults: {
  },
  data: {
  },

  add: (world, component) => {
    const changeScene = setScene(world, component)
    world.events.addListener(component.eid, ecs.input.SCREEN_TOUCH_START, changeScene)
  },

})
