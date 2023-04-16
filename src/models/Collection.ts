import { Event } from './Event'
import axios, { type AxiosResponse } from 'axios'

export class Collection<T, K> {
  models: T[] = []
  events: Event = new Event()
  constructor (
    private readonly rootUrl: string,
    private readonly deserialize: (json: K) => T
  ) {}

  get on () {
    return this.events.on
  }

  get trigger () {
    return this.events.trigger
  }

  fetch = (): void => {
    void axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((data: K) => {
        this.models.push(this.deserialize(data))
      })
      this.trigger('onChange')
    })
  }
}
