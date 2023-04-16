import { CollectionView } from './CollectionView'
import { type User, type UserProp } from '../models/User'
import { UserShow } from './UserShow'

export class UserList extends CollectionView<User, UserProp> {
  renderItem (model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render()
  }
}
