import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'listen-image-target',

  schema: {
    hideOnDetect: ecs.eid,
    showOnDetect: ecs.eid,
  },

  add: (world, component) => {
    const {schema} = component
    const hideElm = world.getEntity(schema.hideOnDetect)
    const showElm = world.getEntity(schema.showOnDetect)

    const onFound = () => {
      console.log('found')
      hideElm.disable()
      showElm.enable()
    }

    const onLost = () => {
      console.log('lost')
      hideElm.enable()
      showElm.disable()
    }

    world.events.addListener(world.events.globalId, ecs.events.REALITY_IMAGE_FOUND, onFound)
    world.events.addListener(world.events.globalId, ecs.events.REALITY_IMAGE_LOST, onLost)
  },
})
