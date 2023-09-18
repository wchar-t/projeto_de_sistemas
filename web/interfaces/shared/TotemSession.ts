export default interface TotemSession {
  id: string,
  userId: string,
  type: 'totem',
  key: string,
  description: string,
  coords: {
    lat: number,
    lng: number,
  },
  lastActive: Date | null,
  createdAt: Date,
}
