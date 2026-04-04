import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'SideMenuButton',
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
