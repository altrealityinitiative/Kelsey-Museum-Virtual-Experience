import * as ecs from '@8thwall/ecs'

const setRotation = (world, modeleid, rotationX, rotationY, rotationZ) => (e) => {
  const qNew = ecs.math.quat.pitchYawRollDegrees(ecs.math.vec3.xyz(rotationX, rotationY, rotationZ))
  // console.log(qNew.x)
  // console.log(qNew.y)
  // console.log(qNew.z)
  // console.log(qNew.w)
  world.setQuaternion(modeleid, qNew.x, qNew.y, qNew.z, qNew.w)
}

ecs.registerComponent({
  name: 'button-listen',
  schema: {
    model: ecs.eid,
    rotationX: ecs.ui32,
    rotationY: ecs.ui32,
    rotationZ: ecs.ui32,
  },
  schemaDefaults: {
  },
  data: {
  },

  add: (world, component) => {
    const rotationHandler = setRotation(world, component.schema.model, component.schema.rotationX, component.schema.rotationY, component.schema.rotationZ)
    world.events.addListener(component.eid, ecs.input.UI_CLICK, rotationHandler)
  },

})
