// This is a component file. You can use this file to define a custom component for your project.
// This component will appear as a custom component in the editor.

import * as ecs from "@8thwall/ecs"; // This is how you access the ecs library.
import { maxHeaderSize } from "node:http";

ecs.registerComponent({
  name: "Scrollable",
  schema: {
    maxScroll: ecs.f32,
  },
  schemaDefaults: {
    maxScroll: 0.0,
  },
  data: {
    dragging: ecs.boolean,
    prevY: ecs.f32,
  },
  add: (world, component) => {
    const { schema, data } = component;
    const windowHeight = window.innerHeight;

    ecs.Ui.set(world, component.eid, { position: "absolute", top: "0" });

    const startDrag = (e) => {
      const { position } = e.data;

      data.dragging = true;
      data.prevY = position.y;
    };

    const endDrag = () => {
      data.dragging = false;
    };

    const onMove = (e) => {
      if (!data.dragging) return;

      const { position: eventPosition } = e.data;

      const deltaY = eventPosition.y - data.prevY;
      data.prevY = eventPosition.y;

      const containerUi = ecs.Ui.get(world, component.eid);

      let newTop = Number(containerUi.top) + deltaY * windowHeight;
      newTop = Math.min(newTop, 0);
      if (schema.maxScroll !== 0) {
        newTop = Math.max(newTop, -schema.maxScroll);
      }

      ecs.Ui.set(world, component.eid, {
        top: String(newTop),
      });
    };

    world.events.addListener(
      world.events.globalId,
      ecs.input.SCREEN_TOUCH_START,
      startDrag,
    );
    world.events.addListener(
      world.events.globalId,
      ecs.input.SCREEN_TOUCH_MOVE,
      onMove,
    );
    world.events.addListener(
      world.events.globalId,
      ecs.input.SCREEN_TOUCH_END,
      endDrag,
    );
  },
  tick: (world, component) => {},
  remove: (world, component) => {},
  stateMachine: ({ world, eid, schemaAttribute, dataAttribute }) => {
    ecs.defineState("default").initial();
  },
});
