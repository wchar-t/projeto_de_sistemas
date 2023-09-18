export default interface Session {
  id: string,
  type: 'user',
  name: string,
  email: string,
  username: string,
  createdAt: Date,
}
