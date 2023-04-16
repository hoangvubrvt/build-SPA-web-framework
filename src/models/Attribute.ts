
export class Attribute<T> {
  constructor (public data: T) {
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.data[key]
  }

  set (data: T): void {
    this.data = { ...this.data, ...data }
  }

  getData (): T {
    return this.data
  }
}
