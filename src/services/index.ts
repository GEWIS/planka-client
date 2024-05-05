import { AuthService } from './AuthService'
import { UserService } from './UserService'
import { ActionService } from './ActionService'
import { AttachmentService } from './AttachmentService'
import { BoardService } from './BoardService'
import { CardService } from './CardService'
import { LabelService } from './LabelService'
import { ListService } from './ListService'
import { NotificationService } from './NotificationService'
import { ProjectService } from './ProjectService'
import { TaskService } from './TaskService'

export class Planka {
  /*
    Helper methods to share accessTokens between classes
   */
  private accessToken: string = null

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken
  }

  getAccessToken() {
    return this.accessToken
  }

  /*
    All services
   */
  public ActionService: ActionService
  public AttachmentService: AttachmentService
  public AuthService: AuthService
  public BoardService: BoardService
  public CardService: CardService
  public LabelService: LabelService
  public ListService: ListService
  public NotificationService: NotificationService
  public ProjectService: ProjectService
  public TaskService: TaskService
  public UserService: UserService

  constructor() {
    this.ActionService = new ActionService(this)
    this.AttachmentService = new AttachmentService(this)
    this.AuthService = new AuthService(this)
    this.BoardService = new BoardService(this)
    this.CardService = new CardService(this)
    this.LabelService = new LabelService(this)
    this.ListService = new ListService(this)
    this.NotificationService = new NotificationService(this)
    this.ProjectService = new ProjectService(this)
    this.TaskService = new TaskService(this)
    this.UserService = new UserService(this)
  }
}
