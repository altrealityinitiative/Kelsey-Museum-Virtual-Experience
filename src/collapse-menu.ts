import * as ecs from '@8thwall/ecs'  // This is how you access the ecs library.

ecs.registerComponent({
  name: 'collapse-menu',
  schema: {
      menu: ecs.eid,
    },

    add: (world, component) => {
      const setEnable = (eid: ecs.Eid) => (e) => {
          world.getEntity(component.schema.menu).disable()
      }
      world.events.addListener(component.eid, ecs.input.UI_CLICK, setEnable(component.schema.menu))
    },
})
