import { options, devices, uuid } from '@/utils.js'
export default class Manager {
  constructor() {
    this.basePrice = 33000
    this.name = 'indoors'
    this.options = options.map((option) => {
      return {
        id: uuid(),
        ...option,
      }
    })
    this.devices = devices.map((device) => {
      return {
        ...device,
      }
    })
    this.chemicals = this.options[0].id
    this.use = true
  }
}
