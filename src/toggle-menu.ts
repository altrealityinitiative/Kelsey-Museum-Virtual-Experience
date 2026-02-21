import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'toggle-menu',

  schema: {
    menu: ecs.eid,
    isVisible: ecs.boolean,     //if the components are visible at startup by default
  },

  schemaDefaults: {
    isVisible: false,
  },

  add: (world, component) => {
    const setEnable = (eid: ecs.Eid) => (e) => {
      if (component.schema.isVisible) {
        console.log('disabled')
        world.getEntity(component.schema.menu).disable()
      } else {
        console.log('enabled')
        world.getEntity(component.schema.menu).enable()
      }
      component.schema.isVisible = !component.schema.isVisible
    }
    world.events.addListener(component.eid, ecs.input.UI_CLICK, setEnable(component.schema.menu))
  },
})
