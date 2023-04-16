import { View } from './View'
import { type User, type UserProp } from '../models/User'

export class UserShow extends View<User, UserProp> {
  template (): string {
    const userData = this.model.getData()
    return `
        <div>
            <h1>User Detail</h1>
            <div>User Name: ${userData.name}</div>
            <div>User Age: ${userData.age}</div>
        </div>
    `
  }
}
