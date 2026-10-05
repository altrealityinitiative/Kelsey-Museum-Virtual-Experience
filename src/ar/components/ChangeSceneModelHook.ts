import * as ecs from "@8thwall/ecs";

const setScene = (targetScene: string) => () => {
  // Instead of loading the old 8th Wall Studio UI spaces, dispatch an event for React to intercept
  window.dispatchEvent(
    new CustomEvent("AR_MODEL_CLICKED", {
      detail: { targetScene },
    }),
  );
};

ecs.registerComponent({
  name: "ChangeSceneModelHook",
  schema: {
    targetScene: ecs.string,
  },
  schemaDefaults: {},
  data: {},

  add: (world, component) => {
    // ECS reuses this cursor for other entities; retain the string, not the cursor.
    const changeScene = setScene(component.schema.targetScene);
    world.events.addListener(
      component.eid,
      ecs.input.SCREEN_TOUCH_START,
      changeScene,
    );

    // Expose space loading to global window so React can trigger it
    window.load8thWallSpace = (spaceName: string) => {
      world.spaces.loadSpace(spaceName);
    };
  },
});
