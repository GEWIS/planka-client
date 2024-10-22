import { beforeAll, test, expect, describe } from 'vitest';
import {
  authorize,
  Board,
  BoardMembership,
  client,
  createBoard,
  createBoardMembership,
  createProject,
  createProjectManager,
  createUser,
  deleteBoard,
  deleteBoardMembership,
  deleteProject,
  deleteProjectManager,
  deleteUser,
  getBoard,
  getConfig,
  getProject,
  getProjects,
  getUser,
  getUsers,
  Project,
  ProjectManager,
  StatusCode,
  unauthorize,
  updateBoard,
  updateBoardMembership,
  updateProject,
  updateProjectBackgroundImage,
  updateUser,
  updateUserAvatar,
  updateUserEmail,
  updateUserPassword,
  updateUserUsername,
  User,
} from '../src';
import * as fs from 'node:fs';
import * as path from 'node:path';

let globalUser = {} as User;
let globalProject = {} as Project;
let globalManager = {} as ProjectManager;
let globalBoard = {} as Board;
let globalMembership = {} as BoardMembership;

beforeAll(() => {
  test('GET /api/access-tokens', async () => {
    const accessTokenResponse = await authorize({
      body: {
        emailOrUsername: 'demo',
        password: 'demo',
      },
    });
    const accessToken = accessTokenResponse.data.item;

    client.setConfig({
      baseUrl: 'http://localhost:3000',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });
});

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
    const accessTokenResponse = await authorize({
      body: {
        emailOrUsername: 'demo',
        password: 'demo',
      },
    });
    const accessToken = accessTokenResponse.data.item;

    client.setConfig({
      baseUrl: 'http://localhost:3000',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
});

describe('Memberships', () => {
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
      globalMembership = membership;
    });
  });

  test('PATCH /api/board-memberships/:id', async () => {
    await updateBoardMembership({
      path: {
        id: globalMembership.id,
      },
      body: {
        role: 'editor',
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const membership = res.data.item;
      expect(membership.role).to.equal('editor');
      globalMembership.role = membership.role;
      globalMembership.updatedAt = membership.updatedAt;
      expect(JSON.stringify(membership)).to.equal(JSON.stringify(globalMembership));
    });
  });
});

describe('Delete', () => {
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
    console.log(globalManager);
    await deleteBoardMembership({
      path: {
        id: globalMembership.id,
      },
    }).then((res) => {
      expect(res.error).to.equal(undefined);
      const membership = res.data.item;
      expect(JSON.stringify(membership)).to.equal(JSON.stringify(globalMembership));
    });
  });

  test('DELETE /api/boards/:id', async () => {
    console.log(globalBoard);
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
      const project = res.data.item;
      expect(JSON.stringify(project)).to.equal(JSON.stringify(globalProject));
    });
  });
});
