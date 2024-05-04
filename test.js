import { PlankaService } from './dist/planka-client.js'

let test = new PlankaService()
await test.authorize({
  requestBody: {
    emailOrUsername: 'demo',
    password: 'demo',
  },
})

console.log(await test.getUsers())
