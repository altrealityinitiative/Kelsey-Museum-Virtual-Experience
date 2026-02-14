import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'h',

  stateMachine: ({world, eid, schemaAttribute, dataAttribute}) => {
    ecs.defineState('default').initial()
      .onEvent(ecs.input.SCREEN_TOUCH_START, 'touched', {
        target: eid,
      })

    ecs.defineState('touched')
      .onEnter(() => {
        console.log('touched')
      })
  },
})
