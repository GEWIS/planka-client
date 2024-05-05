import { Planka } from './dist/planka-client.js'

let planka = new Planka()
let test = await planka.AuthService.authorize({
  requestBody: {
    emailOrUsername: 'demo',
    password: 'demo',
  },
})
console.log(test)

console.log(await planka.UserService.getUsers())
