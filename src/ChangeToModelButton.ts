import * as ecs from "@8thwall/ecs";
import { EXHIBIT_MODEL_SPACE, ExhibitState } from "./exhibit-state";

ecs.registerComponent({
  name: "ChangeToModelButton",
  schema: {
    model: ecs.string,
    modelScale: ecs.f32,
    modelRotationX: ecs.f32,
    modelRotationY: ecs.f32,
    modelRotationZ: ecs.f32,
  },
  schemaDefaults: {
    modelScale: 1,
  },
  data: {},
  add: (world, component) => {
    const {
      model,
      modelScale,
      modelRotationX,
      modelRotationY,
      modelRotationZ,
    } = component.schema;

    world.events.addListener(component.eid, ecs.input.UI_CLICK, () => {
      world.spaces.loadSpace(EXHIBIT_MODEL_SPACE);
      ExhibitState.modelToLoad = model;
      ExhibitState.modelScale = modelScale;
      ExhibitState.modelRotationX = modelRotationX;
      ExhibitState.modelRotationY = modelRotationY;
      ExhibitState.modelRotationZ = modelRotationZ;
    });
  },
});
