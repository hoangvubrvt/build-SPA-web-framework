
import { Event } from './Event'
import { Attribute } from './Attribute'
import { ApiSync } from './ApiSync'
import { Model } from './Model'
import { Collection } from './Collection'

export interface UserProp {
  id?: number
  name?: string
  age?: number
}

const ROOT_URL = 'http://localhost:3000/users'

export class User extends Model<UserProp> {
  static buildUser (userData: UserProp): User {
    return new User(
      new Attribute<UserProp>(userData),
      new ApiSync<UserProp>(ROOT_URL),
      new Event()
    )
  }

  static buildUserCollection (): Collection<User, UserProp> {
    return new Collection<User, UserProp>(
      ROOT_URL,
      (jsonData: UserProp) => User.buildUser(jsonData)
    )
  }
}
