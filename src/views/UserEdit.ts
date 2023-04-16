import { View } from './View'
import { type User, type UserProp } from '../models/User'
import { UserShow } from './UserShow'
import { UserForm } from './UserForm'

export class UserEdit extends View<User, UserProp> {
  regionsMap = (): Record<string, string> => {
    return {
      userForm: '.user-form',
      userShow: '.user-show'
    }
  }

  onRender = (): void => {
    new UserShow(this.regions.userForm, this.model).render()
    new UserForm(this.regions.userShow, this.model).render()
  }

  template (): string {
    return `
            <div class="user-form"></div>
            <div class="user-show"></div>
        `
  }
}
