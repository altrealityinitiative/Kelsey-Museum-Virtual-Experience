// Rotate the current entity (eid) live based on drag deltaX/deltaY.
import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'tap-rotate',
  schema: {
    sensitivityX: ecs.f32,
    sensitivityY: ecs.f32,
    objectEid: ecs.eid,
  },
  schemaDefaults: {
    sensitivityX: 1000,
    sensitivityY: 2500,
  },
  data: {
    currentPitch: ecs.f32,
    dragging: ecs.boolean,
    lastX: ecs.f32,
    lastY: ecs.f32,
  },

  add: (world, component) => {
    const {eid, data, schema} = component
    const {objectEid} = schema

    data.dragging = false
    data.lastX = 0
    data.lastY = 0
    data.currentPitch = 0

    const vw = () => Math.max(globalThis.innerWidth || 0, 1)
    const vh = () => Math.max(globalThis.innerHeight || 0, 1)

    const getPos = (ev: any) => ev?.data?.position ?? ev?.data

    const startDrag = (ev: any) => {
      const p = getPos(ev)
      if (!p) return
      data.dragging = true
      data.lastX = p.x
      data.lastY = p.y
    }

    const endDrag = () => {
      data.dragging = false
    }

    const RAD = (deg: number) => (deg * Math.PI) / 180
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

    const rotateFromDelta = (localObjectEid: ecs.Eid, dxNorm: number, dyNorm: number) => {
      const qCurRec = ecs.Quaternion.cursor(world, localObjectEid)
      // const qCurRec = ecs.Quaternion.cursor(world, eid) this seems to rotate the
      //     camera, when we change spaces??
      // setQuaternion at the bottom also needs to be changed
      // let transform:ecs.math.mat4
      // const qCurRec = world.getEntity(eid).getWorldQuaternion()
      // const qCurRec = ecs.math.quat.zero()
      if (!qCurRec) return
      const quatCur = ecs.math.quat.from(qCurRec)
      // console.log(world)

      // --- YAW (world up). axisAngle expects a vec3 (axis * angle)
      const yaw = dxNorm * schema.sensitivityX
      const worldUp = ecs.math.vec3.up().normalize()
      const yawVec = worldUp.scale(yaw)
      const qYaw = ecs.math.quat.axisAngle(yawVec)

      // Apply yaw first (left-multiply)
      const qAfterYaw = ecs.math.quat.from(qYaw).setTimes(quatCur)

      // --- PITCH about world +X (right). axisAngle expects vec3
      const pitchDeltaRaw = -dyNorm * schema.sensitivityY  // dragging down => rotate down
      const pitchAxisWorld = ecs.math.vec3.xyz(1, 0, 0).normalize()

      // Compute forward after yaw to derive current pitch
      const localForward = ecs.math.vec3.xyz(0, 0, 1)
      const forwardAfterYaw = qAfterYaw.timesVec(localForward)
      const fY = clamp(forwardAfterYaw.y, -1, 1)
      const currentPitch = Math.asin(fY)

      // Clamp desired pitch to avoid flipping
      const maxPitch = RAD(89.0)
      const minPitch = RAD(-89.0)
      const desiredPitch = clamp(currentPitch + pitchDeltaRaw, minPitch, maxPitch)
      const pitchDeltaToApply = desiredPitch - currentPitch

      // If nothing to apply, early out
      if (Math.abs(yaw) < 1e-9 && Math.abs(pitchDeltaToApply) < 1e-9) return

      // Build pitch quaternion using vec where length = angle
      const pitchVecToApply = pitchAxisWorld.scale(pitchDeltaToApply)
      const qPitchDelta = ecs.math.quat.axisAngle(pitchVecToApply)

      // Compose final quaternion: qNew = qPitchDelta * qYaw * qCur
      const qNew = ecs.math.quat.from(qPitchDelta).setTimes(qYaw).setTimes(quatCur)

      world.setQuaternion(localObjectEid, qNew.x, qNew.y, qNew.z, qNew.w)
    }

    const onMove = (ev: any) => {
      if (!data.dragging) return

      const p = getPos(ev)
      if (!p) return

      const dxNorm = (p.x - data.lastX) / vw()
      const dyNorm = (p.y - data.lastY) / vh()
      data.lastX = p.x
      data.lastY = p.y

      // Small deadzone
      // if (Math.abs(dxNorm) < 1e-4 && Math.abs(dyNorm) < 1e-4) return

      rotateFromDelta(objectEid, dxNorm, dyNorm)
    }

    // Touch
    world.events.addListener(world.events.globalId, ecs.input.SCREEN_TOUCH_START, startDrag)
    world.events.addListener(world.events.globalId, ecs.input.SCREEN_TOUCH_MOVE, onMove)
    world.events.addListener(world.events.globalId, ecs.input.SCREEN_TOUCH_END, endDrag)
  },
})
