import Session from './Session';

export default interface TotemSession extends Session {
  coords: {
    lat: number,
    long: number,
  },
}
