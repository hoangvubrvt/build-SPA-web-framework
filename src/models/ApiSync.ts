import axios, { type AxiosResponse } from 'axios'

interface HasId {
  id?: number
}

export class ApiSync<T extends HasId> {
  constructor (private readonly apiURL: string) {
  }

  fetch = async (id: number): Promise<AxiosResponse> => {
    return await axios.get(`${this.apiURL}/${id}`)
  }

  save = async (data: T): Promise<AxiosResponse> => {
    const { id } = data
    if (id) {
      return await axios.put(`${this.apiURL}/${id}`, data)
    } else {
      return await axios.post(`${this.apiURL}`, data)
    }
  }
}
