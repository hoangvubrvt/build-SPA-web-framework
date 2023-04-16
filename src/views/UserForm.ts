import { type User } from '../models/User'

export class UserForm {
  constructor (public parent: Element, public user: User) {
  }

  eventsMap = (): Record<string, () => void> => {
    return {
      'click:button': this.onButtonClick,
      'mouseenter:h1': this.onHoverTitle
    }
  }

  onButtonClick = (): void => {
    console.log('Hello there!')
  }

  onHoverTitle = (): void => {
    console.log('on Hover Title')
  }

  bindEvents = (elementFragment: DocumentFragment): void => {
    const eventsMap = this.eventsMap()
    Object.keys(eventsMap).forEach((eventKey: string) => {
      const [eventName, selection] = eventKey.split(':')

      elementFragment.querySelectorAll(selection).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey])
      })
    })
  }

  template = (): string => {
    console.log(this.user.get('name'))
    const userData = this.user.getData()
    return `
        <div>
            <h1>User Form</h1>
            <div>
                <div>User Name: ${userData.name}</div>
                <div>User Age: ${userData.age}</div>
            </div>
            <input/>
            <button>Say Hi!</button>
        </div>
    `
  }

  render = (): void => {
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()
    this.bindEvents(templateElement.content)
    this.parent.replaceWith(templateElement.content)
  }
}
