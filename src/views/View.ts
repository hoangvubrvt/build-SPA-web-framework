import { type Model } from '../models/Model'

export abstract class View<T extends Model<K>, K> {
  regions: Record<string, Element> = {}
  protected constructor (public parent: Element, public model: T) {
    this.bindModelEvent()
  }

  abstract template (): string

  eventsMap (): Record<string, () => void> {
    return {}
  }

  regionsMap = (): Record<string, string> => {
    return {}
  }

  onRender = (): void => {}

  bindModelEvent = (): void => {
    this.model.on('change', () => {
      this.render()
    })
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

  mapRegions = (fragment: DocumentFragment): void => {
    const regionsMap = this.regionsMap()
    Object.keys(regionsMap).forEach((key: string) => {
      const selector = regionsMap[key]
      const element = fragment.querySelector(selector)
      if (element != null) {
        this.regions[key] = element
      }
    })
  }

  render = (): void => {
    this.parent.innerHTML = ''
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()
    this.bindEvents(templateElement.content)
    this.mapRegions(templateElement.content)
    this.onRender()
    this.parent.append(templateElement.content)
  }
}
