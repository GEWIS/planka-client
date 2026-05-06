import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import {
  client,
  createAccessToken,
  createBoard,
  createProject,
  createUserApiKey,
  deleteAccessToken,
  deleteBoard,
  deleteProject,
  getProjects,
  withApiKey,
  withBearerToken,
} from '../src';

const baseUrl = process.env.PLANKA_URL ?? 'http://localhost:3000/api';

const unwrap = <T, E>(res: { data?: T; error?: E }, label: string): T => {
  if (res.error) throw new Error(`${label}: ${JSON.stringify(res.error)}`);
  if (res.data === undefined) throw new Error(`${label}: empty response`);
  return res.data;
};

let token: string;

beforeAll(async () => {
  client.setConfig({ baseUrl });
  const res = await createAccessToken({
    body: { emailOrUsername: 'demo', password: 'demo' },
  });
  token = unwrap(res, 'login').item;
  client.setConfig({ baseUrl, ...withBearerToken(token) });
});

afterAll(async () => {
  client.setConfig({ baseUrl, ...withBearerToken(token) });
  await deleteAccessToken();
});

describe('smoke', () => {
  test('bearer auth: createProject + createBoard + cleanup', async () => {
    const project = unwrap(
      await createProject({ body: { type: 'private', name: `smoke-${Date.now()}` } }),
      'createProject',
    ).item;

    const board = unwrap(
      await createBoard({
        path: { projectId: project.id },
        body: { position: 0, name: 'Smoke Board' },
      }),
      'createBoard',
    ).item;

    const projects = unwrap(await getProjects(), 'getProjects');
    expect(projects.items.some((p) => p.id === project.id)).toBe(true);

    await deleteBoard({ path: { id: board.id } });
    await deleteProject({ path: { id: project.id } });
  });

  test('api key auth: mint key, then use it via withApiKey', async () => {
    const projects = unwrap(await getProjects(), 'getProjects');
    const demoUser = projects.included?.users?.find((u) => u.username === 'demo');
    if (!demoUser) throw new Error('demo user not found in projects.included.users');

    const minted = unwrap(await createUserApiKey({ path: { id: demoUser.id } }), 'createUserApiKey');
    const apiKey = minted.included.apiKey;
    expect(apiKey).toBeTruthy();

    client.setConfig({ baseUrl, ...withApiKey(apiKey) });
    const viaKey = unwrap(await getProjects(), 'getProjects (api key)');
    expect(Array.isArray(viaKey.items)).toBe(true);

    client.setConfig({ baseUrl, ...withBearerToken(token) });
  });
});
