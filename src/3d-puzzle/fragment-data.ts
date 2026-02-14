export interface FragmentData {
  asset: string,
  offset: {x: number, y: number, z:number},
  collider: {width: number, height: number, depth: number}
}

export const FRAGMENT_DIRECTORY = 'assets/Fragments'
export const FRAGMENTS: FragmentData[] = [
  {
    asset: 'frac0.glb',
    offset: {x: -0.227, y: 0.47, z: 0.249},
    collider: {width: 0.7, height: 0.8, depth: 0.8},
  },
  {
    asset: 'frac1.glb',
    offset: {x: -0.15, y: -0.701, z: -0.654},
    collider: {width: 0.5, height: 1, depth: 0.9},
  },
  {
    asset: 'frac2.glb',
    offset: {x: 0.251, y: -1.111, z: -0.568},
    collider: {width: 0.6, height: 0.4, depth: 1.1},
  },
  {
    asset: 'frac3.glb',
    offset: {x: 0.119, y: -0.869, z: 0.359},
    collider: {width: 0.8, height: 1, depth: 0.5},
  },
  {
    asset: 'frac4.glb',
    offset: {x: 0.267, y: 0.994, z: 0.063},
    collider: {width: 0.7, height: 1, depth: 1},
  },
  {
    asset: 'frac5.glb',
    offset: {x: -0.136, y: 0.143, z: 0.068},
    collider: {width: 0.7, height: 0.9, depth: 1},
  },
  {
    asset: 'frac6.glb',
    offset: {x: 0.027, y: -0.14, z: -0.055},
    collider: {width: 0.7, height: 0.9, depth: 1},
  },
  {
    asset: 'frac7.glb',
    offset: {x: 0.018, y: -0.935, z: 0.647},
    collider: {width: 0.9, height: 0.8, depth: 0.3},
  },
  {
    asset: 'frac8.glb',
    offset: {x: -0.082, y: 1.785, z: 0.118},
    collider: {width: 0.9, height: 1.6, depth: 1},
  },
  {
    asset: 'frac9.glb',
    offset: {x: -0.082, y: -0.898, z: -0.244},
    collider: {width: 0.7, height: 0.9, depth: 1},
  },
]
