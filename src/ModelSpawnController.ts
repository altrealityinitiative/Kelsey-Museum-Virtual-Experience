import * as ecs from "@8thwall/ecs";
import { ExhibitState } from "./exhibit-state";
import ModelRotateControls from "./ModelRotateControls";

ecs.registerComponent({
  name: "ModelSpawnController",
  // schema: {
  // },
  // schemaDefaults: {
  // },
  // data: {
  // },
  add: (world, component) => {
    const modelEntity = world.createEntity();

    ecs.GltfModel.set(world, modelEntity, {
      url: `assets/${ExhibitState.modelToLoad}`,
    });
    ModelRotateControls.set(world, modelEntity);

    world.setScale(
      modelEntity,
      ExhibitState.modelScale,
      ExhibitState.modelScale,
      ExhibitState.modelScale,
    );

    ecs.RotateAnimation.set(world, modelEntity, {
      toX: ExhibitState.modelRotationX,
      toY: ExhibitState.modelRotationY,
      toZ: ExhibitState.modelRotationZ,
      duration: 0,
    });
  },
  // tick: (world, component) => {
  // },
  // remove: (world, component) => {
  // },
  // stateMachine: ({world, eid, schemaAttribute, dataAttribute}) => {
  //   ecs.defineState('default').initial()
  // },
});
