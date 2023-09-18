export default interface Location {
  id: string,
  userId: string,
  title: string,
  subtitle: string,
  description: string,
  images: string[],
  price: number,
  priceFormat: string,
  coords: {
    lat: number,
    lng: number,
  },
  icon: string,
  createdAt: Date,
}
