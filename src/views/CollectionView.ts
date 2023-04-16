import { type Collection } from '../models/Collection'

export abstract class CollectionView<T, K> {
  protected constructor (public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem (model: T, itemParent: Element): void

  render = (): void => {
    this.parent.innerHTML = ''
    const templateHtml = document.createElement('template')

    this.collection.models.forEach(item => {
      const itemParent = document.createElement('div')
      this.renderItem(item, itemParent)
      templateHtml.content.append(itemParent)
    })

    this.parent.append(templateHtml.content)
  }
}
