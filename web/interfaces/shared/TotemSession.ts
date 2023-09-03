export default interface TotemSession {
  id: string,
  coords: {
    lat: number,
    long: number,
  },
  createdAt: Date,
}
