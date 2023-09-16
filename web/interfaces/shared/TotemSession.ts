export default interface TotemSession {
  id: string,
  type: 'totem',
  key: string,
  description: string,
  coords: {
    lat: number,
    long: number,
  },
  lastActive: Date,
  createdAt: Date,
}
