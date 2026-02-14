import * as ecs from '@8thwall/ecs'
import {PUZZLE_START} from './events'

ecs.registerComponent({
  name: 'PuzzleStartButton',
  stateMachine: ({world, eid, schemaAttribute, dataAttribute}) => {
    ecs
      .defineState('default')
      .initial()
      .listen(eid, 'click', (e) => {
        world.events.dispatch(world.events.globalId, PUZZLE_START)
        ecs.Hidden.set(world, eid)
      })
  },
})
