import { type AxiosPromise, type AxiosResponse } from 'axios'

interface ModelAttribute<T> {
  set: (value: T) => void
  getData: () => T
  get: <K extends keyof T>(key: K) => T[K]
}

interface Sync<T> {
  fetch: (id: number) => AxiosPromise
  save: (data: T) => AxiosPromise
}
interface Events {
  on: (eventName: string, callback: () => void) => void
  trigger: (eventNam: string) => void
}

interface HasId {
  id?: number
}

enum MODEL_EVENT_NAME {
  CHANGE = 'change',
  SAVE = 'save',
  ERROR = 'error'
}

export class Model<T extends HasId> {
  constructor (
    public modelAttribute: ModelAttribute<T>,
    public apiSync: Sync<T>,
    public events: Events
  ) {}

  set = (data: T): void => {
    this.modelAttribute.set(data)
    this.trigger(MODEL_EVENT_NAME.CHANGE)
  }

  getData = (): T => {
    return this.modelAttribute.getData()
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.modelAttribute.get(key)
  }

  on = this.events.on
  trigger = this.events.trigger

  fetch (): void {
    const id = this.modelAttribute.get('id')
    if (id) {
      void this.apiSync.fetch(id).then((dataResponse: AxiosResponse): void => {
        this.set(dataResponse.data)
      })
    }
  }

  save (): void {
    const data = this.getData()
    void this.apiSync.save(data).then(() => {
      this.events.trigger(MODEL_EVENT_NAME.SAVE)
    }).catch(() => {
      this.events.trigger(MODEL_EVENT_NAME.ERROR)
    })
  }
}
