
type Callback = () => void

export class Event {
  events: Record<string, Callback[]> = {}

  on = (eventName: string, callback: Callback): void => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const handlers = this.events[eventName] || []
    handlers.push(callback)
    this.events[eventName] = handlers
  }

  trigger = (eventName: string): void => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const handlers: Callback[] = this.events[eventName] || []
    handlers.forEach((callback) => { callback() })
  }
}
