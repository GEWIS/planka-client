import { beforeEach, test, expect, describe } from 'vitest';
import {
  authorize,
  Board,
  BoardMembership,
  Card,
  CardLabel,
  CardMembership,
  client,
  createBoard,
  createBoardMembership,
  createLabel,
  createProject,
  createProjectManager,
  createUser,
  deleteBoard,
  deleteBoardMembership,
  deleteLabel,
  deleteList,
  deleteProject,
  deleteProjectManager,
  deleteUser,
  getBoard,
  getConfig,
  getProject,
  getProjects,
  getUser,
  getUsers,
  Label,
  List,
  Project,
  ProjectManager,
  StatusCode,
  unauthorize,
  updateBoard,
  updateBoardMembership,
  updateLabel,
  updateProject,
  updateProjectBackgroundImage,
  updateUser,
  updateUserAvatar,
  updateUserEmail,
  updateUserPassword,
  updateUserUsername,
  User,
  Task,
  Attachment,
  Comment,
  createList,
  updateList,
  sortList,
  createCard,
  deleteCard,
  updateCard,
  duplicateCard,
  getCard,
  createCardMembership,
  deleteCardMembership,
  createCardLabel,
  deleteCardLabel,
  createTask,
  updateTask,
  deleteTask,
  getCardActions,
  createCommentAction,
  updateCommentAction,
  deleteCommentAction,
  getNotifications,
  Notification,
  getNotification,
  updateNotifications,
  createAttachment,
  updateAttachment,
  deleteAttachment,
} from '../src';
import * as fs from 'node:fs';
import * as path from 'node:path';

let globalUser = {} as User;
let globalProject = {} as Project;
let globalManager = {} as ProjectManager;
let globalBoard = {} as Board;
let globalBoardMembership = {} as BoardMembership;
let globalLabel = {} as Label;
let globalList = {} as List;
let globalCard = {} as Card;
let globalCardMembership = {} as CardMembership;
let globalCardLabel = {} as CardLabel;
let globalTask = {} as Task;
let globalAttachment = {} as Attachment;
let globalComment = {} as Comment;
let globalNotification = {} as Notification;

beforeEach(async () => {
  await setAccessToken('demo', 'demo');
});

async function setAccessToken(emailOrUsername: string, password: string) {
  const accessTokenResponse = await authorize({
    body: {
      emailOrUsername: emailOrUsername,
      password: password,
    },
  });
  const accessToken = accessTokenResponse.data.item;

  client.setConfig({
    baseUrl: 'http://localhost:3000',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

describe('Config', () => {
  client.setConfig({
    baseUrl: 'http://localhost:3000',
  });

  test('GET /api/config', async () => {
    await getConfig({}).then((res) => {
      expect(res.error).to.equal(undefined);
      expect(res.data.item).toEqual(
        expect.objectContaining({
          oidc: null,
        }),
      );
    });
  });
});

describe('Authorization', () => {
  test('DELETE /api/access-tokens/me', async () => {
    await unauthorize({});

    await getUsers({}).then((res) => {
      expect(res.error.code).to.equal(StatusCode.s401);
      expect(res.error.message).to.equal('Access token is missing, invalid or expired');
    });
  });

  test('GET /api/access-tokens', async () => {
    await authorize({
      body: {
        emailOrUsername: 'demo',
        password: 'demo',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
    });
  });
});

describe('Users', () => {
  test('POST /api/users', async () => {
    await createUser({
      body: {
        email: 'jane@doe.dev',
        password: 'x8ugIcH5ZwtpBd',
        name: 'Jane Doe',
        username: 'Jane',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const user = res.data.item;
      expect(user.email).to.equal('jane@doe.dev');
      expect(user.isAdmin).to.equal(false);
      expect(user.name).to.equal('Jane Doe');
      expect(user.username).to.equal('jane');
      expect(user.phone).to.equal(null);
      expect(user.organization).to.equal(null);
      expect(user.language).to.equal(null);
      expect(user.subscribeToOwnCards).to.equal(false);
      expect(user.avatarUrl).to.equal(null);
      globalUser = user;
    });
  });

  test('GET /api/users', async () => {
    await getUsers({}).then((res) => {
      expect(res.error).to.equal(undefined);
      expect(res.data.items.length).to.equal(2);

      const defaultUser = res.data.items[0];
      expect(defaultUser.email).to.equal('demo@demo.demo');
      expect(defaultUser.isAdmin).to.equal(true);
      expect(defaultUser.name).to.equal('Demo Demo');
      expect(defaultUser.username).to.equal('demo');

      const user = res.data.items[1];
      expect(JSON.stringify(user)).to.equal(JSON.stringify(globalUser));
    });
  });

  test('PATCH /api/users/:id/email', async () => {
    await updateUserEmail({
      path: {
        id: globalUser.id,
      },
      body: {
        email: 'john@doe.dev',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const user = res.data.item;
      expect(user.email).to.equal('john@doe.dev');
      globalUser.email = 'john@doe.dev';
      globalUser.updatedAt = user.updatedAt;
      expect(JSON.stringify(user)).to.equal(JSON.stringify(globalUser));
    });
  });

  test('PATCH /api/users/:id/password', async () => {
    await updateUserPassword({
      path: {
        id: globalUser.id,
      },
      body: {
        password: 'fo52SMQcoJgWja',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      expect(res.response.ok).to.equal(true);
    });
  });

  test('PATCH /api/users/:id/username', async () => {
    await updateUserUsername({
      path: {
        id: globalUser.id,
      },
      body: {
        username: 'john',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const user = res.data.item;
      expect(user.username).to.equal('john');
      globalUser.username = 'john';
      globalUser.updatedAt = user.updatedAt;
      expect(JSON.stringify(user)).to.equal(JSON.stringify(globalUser));
    });
  });

  test('PATCH /api/users/:id/avatar', async () => {
    const imagePath = path.join(__dirname, 'gewis.jpg');
    const fileBuffer = fs.readFileSync(imagePath);
    const file = new File([fileBuffer], 'gewis.jpg', { type: 'image/jpeg' });

    await updateUserAvatar({
      path: {
        id: globalUser.id,
      },
      body: {
        file: file,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const user = res.data.item;
      expect(user.avatarUrl).to.contain('http://localhost:3000/user-avatars');
      globalUser.avatarUrl = user.avatarUrl;
      globalUser.updatedAt = user.updatedAt;
      expect(JSON.stringify(user)).to.equal(JSON.stringify(globalUser));
    });
  });

  test('PATCH /api/user/:id', async () => {
    await updateUser({
      path: {
        id: globalUser.id,
      },
      body: {
        name: 'John Doe',
        phone: '123456789',
        organization: 'GEWIS',
        language: 'nl-NL',
        subscribeToOwnCards: true,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const user = res.data.item;
      expect(user.name).to.equal('John Doe');
      globalUser.name = user.name;
      expect(user.phone).to.equal('123456789');
      globalUser.phone = user.phone;
      expect(user.organization).to.equal('GEWIS');
      globalUser.organization = user.organization;
      expect(user.language).to.equal('nl-NL');
      globalUser.language = user.language;
      expect(user.subscribeToOwnCards).to.equal(true);
      globalUser.subscribeToOwnCards = user.subscribeToOwnCards;
      globalUser.updatedAt = user.updatedAt;
      expect(JSON.stringify(user)).to.equal(JSON.stringify(globalUser));
    });
  });

  test('GET /api/user/:id', async () => {
    await getUser({
      path: {
        id: globalUser.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const user = res.data.item;
      expect(JSON.stringify(user)).to.equal(JSON.stringify(globalUser));
    });
  });
});

describe('Projects', () => {
  test('POST /api/projects', async () => {
    await createProject({
      body: {
        name: 'Test Project',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const project = res.data.item;
      expect(project.name).to.equal('Test Project');
      globalProject = res.data.item;
    });
  });

  test('GET /api/projects', async () => {
    await getProjects({}).then((res) => {
      expect(res.error).to.equal(undefined);
      const projects = res.data.items;
      expect(projects.length).to.equal(1);
      expect(JSON.stringify(projects[0].name)).to.equal(JSON.stringify(globalProject.name));
    });
  });

  test('PATCH /api/projects/:id', async () => {
    await updateProject({
      path: {
        id: globalProject.id,
      },
      body: {
        name: 'Test Project Updated',
        background: {
          name: 'red-curtain',
          type: 'gradient',
        },
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const project = res.data.item;
      expect(project.name).to.equal('Test Project Updated');
      globalProject.name = 'Test Project Updated';
      expect(project.background).to.not.equal(null);
      expect(project.background.type).to.equal('gradient');
      expect(project.background.name).to.equal('red-curtain');
      globalProject.background = project.background;
      globalProject.updatedAt = project.updatedAt;
      expect(JSON.stringify(project)).to.equal(JSON.stringify(globalProject));
    });
  });

  test('PATCH /api/projects/:id/background-image', async () => {
    const imagePath = path.join(__dirname, 'gewis.jpg');
    const fileBuffer = fs.readFileSync(imagePath);
    const file = new File([fileBuffer], 'gewis.jpg', { type: 'image/jpeg' });

    await updateProjectBackgroundImage({
      path: {
        id: globalProject.id,
      },
      body: {
        file: file,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const project = res.data.item;
      expect(project.backgroundImage?.url).to.contain(
        'http://localhost:3000/project-background-images',
      );
      globalProject.backgroundImage = project.backgroundImage;
      expect(project.background).to.not.equal(null);
      expect(project.background.type).to.equal('image');
      globalProject.background = project.background;
      globalProject.updatedAt = project.updatedAt;
      expect(JSON.stringify(project)).to.equal(JSON.stringify(globalProject));
    });
  });

  test('GET /api/project/:id', async () => {
    await getProject({
      path: {
        id: globalProject.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const project = res.data.item;
      expect(JSON.stringify(project)).to.equal(JSON.stringify(globalProject));
    });
  });

  test('POST /api/projects/:projectId/manager', async () => {
    await createProjectManager({
      path: {
        projectId: globalProject.id,
      },
      body: {
        userId: globalUser.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const projectManager = res.data.item;
      expect(projectManager.projectId).to.equal(globalProject.id);
      expect(projectManager.userId).to.equal(globalUser.id);
      globalManager = projectManager;
    });
  });
});

describe('Board', () => {
  test('POST /api/projects/:projectId/boards', async () => {
    await createBoard({
      path: {
        projectId: globalProject.id,
      },
      body: {
        position: 1,
        name: 'Test Board',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const board = res.data.item;
      expect(board.projectId).to.equal(globalProject.id);
      expect(board.position).to.equal(1);
      expect(board.name).to.equal('Test Board');
      globalBoard = board;
    });
  });

  test('PATCH /api/boards/:id', async () => {
    await updateBoard({
      path: {
        id: globalBoard.id,
      },
      body: {
        name: 'Test Board Updated',
        position: 2,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const board = res.data.item;
      expect(board.name).to.equal('Test Board Updated');
      globalBoard.name = board.name;
      expect(board.position).to.equal(2);
      globalBoard.position = board.position;
      globalBoard.updatedAt = board.updatedAt;
      expect(JSON.stringify(board)).to.equal(JSON.stringify(globalBoard));
    });
  });

  test('GET /api/boards/:id', async () => {
    await getBoard({
      path: {
        id: globalBoard.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const board = res.data.item;
      expect(JSON.stringify(board)).to.equal(JSON.stringify(globalBoard));
    });
  });

  test('POST /api/boards/:boardId/memberships', async () => {
    await createBoardMembership({
      path: {
        boardId: globalBoard.id,
      },
      body: {
        userId: globalUser.id,
        role: 'editor',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const membership = res.data.item;
      expect(membership.boardId).to.equal(globalBoard.id);
      expect(membership.userId).to.equal(globalUser.id);
      expect(membership.role).to.equal('editor');
      globalBoardMembership = membership;
    });
  });

  test('PATCH /api/board-memberships/:id', async () => {
    await updateBoardMembership({
      path: {
        id: globalBoardMembership.id,
      },
      body: {
        role: 'editor',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const membership = res.data.item;
      expect(membership.role).to.equal('editor');
      globalBoardMembership.role = membership.role;
      globalBoardMembership.updatedAt = membership.updatedAt;
      expect(JSON.stringify(membership)).to.equal(JSON.stringify(globalBoardMembership));
    });
  });

  test('POST /api/boards/:boardId/labels', async () => {
    await createLabel({
      path: {
        boardId: globalBoard.id,
      },
      body: {
        name: 'Test Label',
        position: 1,
        color: 'pink-tulip',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const label = res.data.item;
      expect(label.name).to.equal('Test Label');
      expect(label.position).to.equal(1);
      expect(label.color).to.equal('pink-tulip');
      globalLabel = label;
    });
  });

  test('PATCH /api/labels/:id', async () => {
    await updateLabel({
      path: {
        id: globalLabel.id,
      },
      body: {
        name: 'Test Label Updated',
        position: 2,
        color: 'antique-blue',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const label = res.data.item;
      expect(label.name).to.equal('Test Label Updated');
      globalLabel.name = label.name;
      expect(label.position).to.equal(2);
      globalLabel.position = label.position;
      expect(label.color).to.equal('antique-blue');
      globalLabel.color = label.color;
      globalLabel.updatedAt = label.updatedAt;
      globalLabel = label;
    });
  });
});

describe('Lists', () => {
  test('POST /api/boards/:boardId/lists', async () => {
    await createList({
      path: {
        boardId: globalBoard.id,
      },
      body: {
        name: 'Test List',
        position: 1,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const list = res.data.item;
      expect(list.name).to.equal('Test List');
      expect(list.position).to.equal(1);
      globalList = list;
    });
  });

  test('PATCH /api/lists/:id', async () => {
    await updateList({
      path: {
        id: globalList.id,
      },
      body: {
        name: 'Test List Updated',
        position: 2,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const list = res.data.item;
      expect(list.name).to.equal('Test List Updated');
      globalList.name = list.name;
      expect(list.position).to.equal(2);
      globalList.position = list.position;
      globalList.updatedAt = list.updatedAt;
      globalList = list;
    });
  });
});

describe('Cards', () => {
  test('POST /api/lists/:listId/cards', async () => {
    await createCard({
      path: {
        listId: globalList.id,
      },
      body: {
        name: 'Test Card',
        position: 1,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const card = res.data.item;
      expect(card.name).to.equal('Test Card');
      expect(card.position).to.equal(1);
      globalCard = card;
    });
  });

  let duplicatedCard = {} as Card;
  test('POST /api/cards/:id/duplicate', async () => {
    await duplicateCard({
      path: {
        id: globalCard.id,
      },
      body: {
        position: 3,
      },
    }).then(async (res) => {
      expect(res.error).to.equal(undefined);
      const card = res.data.item;
      expect(card.id).to.not.equal(globalCard.id);
      expect(card.createdAt).to.not.equal(globalCard.createdAt);
      expect(card.updatedAt).to.equal(null);
      expect(card.position).to.not.equal(globalCard.position);
      expect(card.position).to.equal(3);
      expect(card.name).to.equal(globalCard.name);
      expect(card.description).to.equal(globalCard.description);
      expect(card.dueDate).to.equal(globalCard.dueDate);
      expect(card.isDueDateCompleted).to.equal(globalCard.isDueDateCompleted);
      expect(card.boardId).to.equal(globalCard.boardId);
      expect(card.listId).to.equal(globalCard.listId);
      expect(card.coverAttachmentId).to.equal(null);
      duplicatedCard = card;

      // Check if there is an actual duplicate card in the same list
      await getBoard({
        path: {
          id: globalBoard.id,
        },
      }).then((boardRes) => {
        const boardCards = boardRes.data.included.cards;
        // This field is only returned for GET and DUPLICATE
        card.isSubscribed = false;
        const maskedGlobalCard = structuredClone(globalCard);
        maskedGlobalCard.isSubscribed = false;
        expect(JSON.stringify(maskedGlobalCard)).to.equal(JSON.stringify(boardCards[0]));
        expect(JSON.stringify(card)).to.equal(JSON.stringify(boardCards[1]));
        expect(boardCards[0].listId).to.equal(boardCards[1].listId);
      });
    });
  });

  // Test is in a bit of unusual order, but required to check the sort
  test('POST /api/lists/:id/sort', async () => {
    const sortBoard = await getBoard({
      path: {
        id: globalBoard.id,
      },
    });
    const originalCards = sortBoard.data.included.cards;

    await sortList({
      path: {
        id: globalList.id,
      },
      body: {
        type: 'createdAt_desc',
      },
    }).then(async (res) => {
      expect(res.error).to.equal(undefined);
      const sortedCards = res.data.included.cards;
      expect(originalCards[0].id).to.equal(sortedCards[1].id);
      expect(originalCards[1].id).to.equal(sortedCards[0].id);
      globalCard = sortedCards[1];
    });
  });

  test('PATCH /api/cards/:id', async () => {
    const cardBoard = await createBoard({
      path: {
        projectId: globalProject.id,
      },
      body: {
        position: 123,
        name: 'Card Board',
      },
    });
    const cardBoardList = await createList({
      path: {
        boardId: cardBoard.data.item.id,
      },
      body: {
        position: 123,
        name: 'Card List',
      },
    });

    const dueDate = new Date();
    await updateCard({
      path: {
        id: duplicatedCard.id,
      },
      body: {
        name: 'Updated Test Card',
        position: 2,
        description: 'Test Description',
        dueDate: dueDate,
        isDueDateCompleted: true,
        // Stopwatch is cannot be set by API
        // Can also move to other board/list
        listId: cardBoardList.data.item.id,
        boardId: cardBoard.data.item.id,
        coverAttachmentId: '123',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const card = res.data.item;
      expect(card.name).to.equal('Updated Test Card');
      duplicatedCard.name = card.name;
      expect(card.position).to.equal(2);
      duplicatedCard.position = card.position;
      expect(card.description).to.equal('Test Description');
      duplicatedCard.description = card.description;
      expect(card.dueDate).to.equal(dueDate.toISOString());
      duplicatedCard.dueDate = card.dueDate;
      expect(card.isDueDateCompleted).to.equal(true);
      duplicatedCard.isDueDateCompleted = card.isDueDateCompleted;
      expect(card.coverAttachmentId).to.equal('123');
      duplicatedCard.coverAttachmentId = card.coverAttachmentId;
      expect(card.boardId).to.equal(cardBoard.data.item.id);
      duplicatedCard.boardId = card.boardId;
      expect(card.listId).to.equal(cardBoardList.data.item.id);
      duplicatedCard.listId = card.listId;

      duplicatedCard.updatedAt = card.updatedAt;
      // Value is set as we used DUPLICATE card
      card.isSubscribed = false;
      expect(JSON.stringify(card)).to.equal(JSON.stringify(duplicatedCard));
    });
  });

  test('GET /api/cards/:id', async () => {
    await getCard({
      path: {
        id: duplicatedCard.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const card = res.data.item;
      // This field is only returned for GET and DUPLICATE
      const maskedGlobalCard = structuredClone(duplicatedCard);
      maskedGlobalCard.isSubscribed = false;
      expect(JSON.stringify(card)).to.equal(JSON.stringify(maskedGlobalCard));
    });
  });

  test('POST /api/cards/:cardId/memberships', async () => {
    await createCardMembership({
      path: {
        cardId: globalCard.id,
      },
      body: {
        userId: globalUser.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const membership = res.data.item;
      expect(membership.cardId).to.equal(globalCard.id);
      expect(membership.userId).to.equal(globalUser.id);
      globalCardMembership = membership;
    });
  });

  test('POST /api/cards/:cardId/labels', async () => {
    await createCardLabel({
      path: {
        cardId: globalCard.id,
      },
      body: {
        labelId: globalLabel.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const label = res.data.item;
      expect(label.cardId).to.equal(globalCard.id);
      expect(label.labelId).to.equal(globalLabel.id);
      globalCardLabel = label;
    });
  });

  test('POST /api/cards/:cardId/tasks', async () => {
    await createTask({
      path: {
        cardId: globalCard.id,
      },
      body: {
        position: 1,
        name: 'Test Task',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const task = res.data.item;
      expect(task.cardId).to.equal(globalCard.id);
      expect(task.position).to.equal(1);
      expect(task.name).to.equal('Test Task');
      globalTask = task;
    });
  });

  test('PATCH /api/tasks/:id', async () => {
    await updateTask({
      path: {
        id: globalTask.id,
      },
      body: {
        name: 'Updated Test Task',
        position: 2,
        isCompleted: true,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const task = res.data.item;
      expect(task.name).to.equal('Updated Test Task');
      globalTask.name = task.name;
      expect(task.position).to.equal(2);
      globalTask.position = task.position;
      expect(task.isCompleted).to.equal(true);
      globalTask.isCompleted = task.isCompleted;
      globalTask.updatedAt = task.updatedAt;
      expect(JSON.stringify(task)).to.equal(JSON.stringify(globalTask));
    });
  });
});

describe('Attachments', () => {
  test('POST /api/cards/:cardId/attachments', async () => {
    const imagePath = path.join(__dirname, 'gewis.jpg');
    const fileBuffer = fs.readFileSync(imagePath);
    const file = new File([fileBuffer], 'gewis.jpg', { type: 'image/jpeg' });

    await createAttachment({
      path: {
        cardId: globalCard.id,
      },
      body: {
        file: file,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const attachment = res.data.item;
      expect(attachment.name).to.equal('gewis.jpg');
      globalAttachment = attachment;
    });
  });

  test('PATCH /api/attachments/:id', async () => {
    await updateAttachment({
      path: {
        id: globalAttachment.id,
      },
      body: {
        name: 'GEWIS',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const attachment = res.data.item;
      expect(attachment.name).to.equal('GEWIS');
      globalAttachment.name = attachment.name;
      globalAttachment.updatedAt = attachment.updatedAt;
      expect(JSON.stringify(attachment)).to.equal(JSON.stringify(globalAttachment));
    });
  });
});

describe('Comments', () => {
  test('POST /api/cards/:cardId/comment-actions', async () => {
    await createCommentAction({
      path: {
        cardId: globalCard.id,
      },
      body: {
        text: 'Test Comment Action',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const comment = res.data.item;
      expect(comment.cardId).to.equal(globalCard.id);
      expect(comment.data.text).to.equal('Test Comment Action');
      globalComment = comment;
    });
  });

  test('PATCH /api/comment-actions/:id', async () => {
    await updateCommentAction({
      path: {
        id: globalComment.id,
      },
      body: {
        text: 'Updated Test Comment Action',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const comment = res.data.item;
      expect(comment.data.text).to.equal('Updated Test Comment Action');
      globalComment.data.text = comment.data.text;
      globalComment.updatedAt = comment.updatedAt;
      expect(JSON.stringify(comment)).to.equal(JSON.stringify(globalComment));
    });
  });

  test('GET /api/cards/:cardId/actions', async () => {
    await getCardActions({
      path: {
        cardId: globalCard.id,
      },
    }).then((res) => {
      console.log(res.data.items);
      expect(res.error).to.equal(undefined);
      const actions = res.data.items;
      expect(actions.length).to.equal(1);
      expect(actions[0].data.text).to.equal('Updated Test Comment Action');
    });
  });
});

describe('Notifications', () => {
  test('GET /api/notifications', async () => {
    // We log in as the test user -- should have a single notification
    await setAccessToken('john@doe.dev', 'fo52SMQcoJgWja');

    await getNotifications({}).then((res) => {
      expect(res.error).to.equal(undefined);
      const notifications = res.data.items;
      expect(notifications.length).to.equal(1);
      globalNotification = notifications[0];
    });
  });

  test('GET /api/notifications/:id', async () => {
    // We log in as the test user -- should have a single notification
    await setAccessToken('john@doe.dev', 'fo52SMQcoJgWja');

    await getNotification({
      path: {
        id: globalNotification.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const notification = res.data.item;
      expect(JSON.stringify(globalNotification)).to.equal(JSON.stringify(notification));
    });
  });

  test('PATCH /api/notifications/:ids', async () => {
    // We log in as the test user -- should have a single notification
    await setAccessToken('john@doe.dev', 'fo52SMQcoJgWja');

    await updateNotifications({
      path: {
        ids: [globalNotification.id],
      },
      body: {
        isRead: true,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const notification = res.data.items[0];
      expect(notification.isRead).to.equal(true);
      globalNotification.isRead = notification.isRead;
      globalNotification.updatedAt = notification.updatedAt;
      expect(JSON.stringify(notification)).to.equal(JSON.stringify(globalNotification));
    });
  });
});

describe('Delete', () => {
  test('DELETE /api/attachments/:id', async () => {
    await deleteAttachment({
      path: {
        id: globalAttachment.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const attachment = res.data.item;
      expect(JSON.stringify(attachment)).to.equal(JSON.stringify(globalAttachment));
    });
  });

  test('DELETE /api/comment-actions/:id', async () => {
    await deleteCommentAction({
      path: {
        id: globalComment.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const comment = res.data.item;
      expect(JSON.stringify(comment)).to.equal(JSON.stringify(globalComment));
    });
  });

  test('DELETE /api/tasks/:id', async () => {
    await deleteTask({
      path: {
        id: globalTask.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const task = res.data.item;
      expect(JSON.stringify(task)).to.equal(JSON.stringify(globalTask));
    });
  });

  test('DELETE /api/cards/:cardId/labels/:labelId', async () => {
    await deleteCardLabel({
      path: {
        cardId: globalCard.id,
        labelId: globalCardLabel.labelId,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const label = res.data.item;
      expect(JSON.stringify(label)).to.equal(JSON.stringify(globalCardLabel));
    });
  });

  test('DELETE /api/cards/:cardId/memberships', async () => {
    await deleteCardMembership({
      path: {
        cardId: globalCard.id,
      },
      body: {
        userId: globalUser.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const membership = res.data.item;
      expect(JSON.stringify(membership)).to.equal(JSON.stringify(globalCardMembership));
    });
  });

  test('DELETE /api/cards/:id', async () => {
    await deleteCard({
      path: {
        id: globalCard.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const card = res.data.item;
      // Card has been updated because we added cover attachment
      globalCard.updatedAt = card.updatedAt;
      expect(JSON.stringify(card)).to.equal(JSON.stringify(globalCard));
    });
  });

  test('DELETE /api/lists/:id', async () => {
    await deleteList({
      path: {
        id: globalList.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const list = res.data.item;
      expect(JSON.stringify(list)).to.equal(JSON.stringify(globalList));
    });
  });

  test('DELETE /api/labels/:id', async () => {
    await deleteLabel({
      path: {
        id: globalLabel.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const label = res.data.item;
      expect(JSON.stringify(label)).to.equal(JSON.stringify(globalLabel));
    });
  });

  test('DELETE /api/project-managers/:id', async () => {
    await deleteProjectManager({
      path: {
        id: globalManager.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const manager = res.data.item;
      expect(JSON.stringify(manager)).to.equal(JSON.stringify(globalManager));
    });
  });

  test('DELETE /api/board-memberships/:id', async () => {
    await deleteBoardMembership({
      path: {
        id: globalBoardMembership.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const membership = res.data.item;
      expect(JSON.stringify(membership)).to.equal(JSON.stringify(globalBoardMembership));
    });
  });

  test('DELETE /api/boards/:id', async () => {
    await deleteBoard({
      path: {
        id: globalBoard.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const board = res.data.item;
      expect(JSON.stringify(board)).to.equal(JSON.stringify(globalBoard));
    });
  });

  test('DELETE /api/users', async () => {
    await deleteUser({
      path: {
        id: globalUser.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const user = res.data.item;
      expect(user.deletedAt).to.not.equal(null);
      globalUser.deletedAt = user.deletedAt;
      globalUser.updatedAt = user.updatedAt;
      expect(JSON.stringify(user)).to.equal(JSON.stringify(globalUser));
    });
  });

  test('DELETE /api/project', async () => {
    await deleteProject({
      path: {
        id: globalProject.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const project = res.data.item;
      expect(JSON.stringify(project)).to.equal(JSON.stringify(globalProject));
    });
  });
});
