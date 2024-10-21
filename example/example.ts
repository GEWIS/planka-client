import {
  authorize,
  client,
  createBoard,
  createProject,
  deleteBoard,
  deleteProject,
} from '../dist/planka-client';

client.setConfig({
  baseUrl: 'http://localhost:3000',
});

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

const projectResponse = await createProject({
  body: {
    name: 'First Project',
  },
});
const project = projectResponse.data.item;

const boardResponse = await createBoard({
  path: {
    projectId: project.id,
  },
  body: {
    position: 0,
    name: 'First Project',
  },
});
const board = boardResponse.data.item;

await deleteBoard({
  path: {
    id: board.id,
  },
});

await deleteProject({
  path: {
    id: project.id,
  },
});
