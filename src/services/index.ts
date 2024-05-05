import { AuthService } from './AuthService'
import { UserService } from './UserService'

export class Planka {
  private accessToken: string = null
  public AuthService: AuthService
  public UserService: UserService

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken
  }

  getAccessToken() {
    return this.accessToken
  }

  constructor() {
    this.AuthService = new AuthService(this)
    this.UserService = new UserService(this)
  }
}
