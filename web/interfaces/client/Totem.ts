export default interface Totem {
  id: string,
  userId: string,
  key: string,
  description: string,
  coords: {
    lat: number,
    lng: number,
  },
  lastActive: Date,
  createdAt: Date,
}
