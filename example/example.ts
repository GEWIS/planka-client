/**
 * Minimal end-to-end example: log in with username/password, create a project +
 * board, then clean up. Requires a running Planka instance (see docker-compose.yml).
 *
 *   yarn example
 */
import {
  client,
  createAccessToken,
  createBoard,
  createProject,
  deleteAccessToken,
  deleteBoard,
  deleteProject,
  withBearerToken,
} from '../src';

client.setConfig({
  baseUrl: 'http://localhost:3000/api',
});

const tokenRes = await createAccessToken({
  body: { emailOrUsername: 'demo', password: 'demo' },
});
if (tokenRes.error) throw new Error(`createAccessToken: ${JSON.stringify(tokenRes.error)}`);
const token = tokenRes.data.item;

client.setConfig({
  baseUrl: 'http://localhost:3000/api',
  ...withBearerToken(token),
});

const projectRes = await createProject({
  body: { type: 'private', name: 'First Project' },
});
if (projectRes.error) throw new Error(`createProject: ${JSON.stringify(projectRes.error)}`);
const project = projectRes.data.item;

const boardRes = await createBoard({
  path: { projectId: project.id },
  body: { position: 0, name: 'First Board' },
});
if (boardRes.error) throw new Error(`createBoard: ${JSON.stringify(boardRes.error)}`);
const board = boardRes.data.item;

await deleteBoard({ path: { id: board.id } });
await deleteProject({ path: { id: project.id } });
await deleteAccessToken();
