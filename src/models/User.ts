
import { Event } from './Event'
import { Attribute } from './Attribute'
import { ApiSync } from './ApiSync'
import { Model } from './Model'
import { Collection } from './Collection'

interface UserProp {
  id?: number
  name?: string
  age?: number
}

const ROOT_URL = 'http://localhost:3000/users'

export class User extends Model<UserProp> {
  static buildUser (userData: UserProp): User {
    const attribute = new Attribute<UserProp>(userData)
    console.log('user attribute ', attribute.getData())
    return new User(
      attribute,
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
