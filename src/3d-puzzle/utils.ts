export function getRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function getLength(x: number, y: number, z: number): number {
  return Math.sqrt(x * x + y * y + z * z)
}
