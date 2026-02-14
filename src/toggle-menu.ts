import * as ecs from '@8thwall/ecs'

ecs.registerComponent({

  name: 'toggle-menu',

  schema: {
    menu: ecs.eid,
    isVisible: ecs.boolean,

  },

  schemaDefaults: {
    isVisible: true,
  },

  add: (world, component) => {
    // const {menu} = component.schema

    // if (!menu) {
    //   return
    // }

    // // Listen for UI click events on THIS entity
    // world.events.addListener(component.eid, ecs.input.UI_CLICK, () => {
    //   ecs.Ui.set()

    //   if (!menuUI) {
    //     return
    //   }

    //   // Toggle
    //   component.data.isVisible = !component.data.isVisible

    //   // Apply opacity
    //   menuUI.opacity = component.data.isVisible ? 1 : 0

    //   // Disable raycast when invisible
    //   menuUI.ignoreRaycast = !component.data.isVisible

    const setEnable = (eid: ecs.Eid) => (e) => {
      component.schema.isVisible = !component.schema.isVisible
      if (component.schema.isVisible) {
        console.log('enabled')
        world.getEntity(component.schema.menu).enable()
      } else {
        console.log('disabled')
        world.getEntity(component.schema.menu).disable()
      }
    }
    world.events.addListener(component.eid, ecs.input.UI_CLICK, setEnable(component.schema.menu))
  },

})
