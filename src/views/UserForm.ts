import { type User, type UserProp } from '../models/User'
import { View } from './View'

export class UserForm extends View<User, UserProp> {
  eventsMap = (): Record<string, () => void> => {
    return {
      'click:.set-name': this.onChangeNameButtonClick,
      'click:.set-random': this.onSetRandomAgeClick,
      'click:.save-user': this.onSaveUserClick

    }
  }

  onSaveUserClick = (): void => {
    this.model.save()
  }

  onChangeNameButtonClick = (): void => {
    const input = this.parent.querySelector('input')
    this.model.set({ name: input.value })
    input.value = ''
  }

  onHoverTitle = (): void => {
    console.log('on Hover Title')
  }

  onSetRandomAgeClick = (): void => {
    const randomAge = Math.round(Math.random() * 100)
    this.model.set({ age: randomAge })
  }

  template = (): string => {
    const userData = this.model.getData()
    return `
        <div>
            <input placeholder="${userData.name}"/>
            <button class="set-name">Change Name</button>
            <button class="set-random">Set Random Age</button>
            <button class="save-user">Save User</button>
        </div>
    `
  }
}
