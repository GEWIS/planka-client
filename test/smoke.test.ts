import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import {
  acceptTerms,
  client,
  createAccessToken,
  createBoard,
  createProject,
  createUserApiKey,
  deleteAccessToken,
  deleteBoard,
  deleteProject,
  getProjects,
  getTerms,
  getUsers,
  withApiKey,
  withBearerToken,
} from '../src';

const baseUrl = process.env.PLANKA_URL ?? 'http://localhost:3000/api';

const unwrap = <T, E>(res: { data?: T; error?: E }, label: string): T => {
  if (res.error) throw new Error(`${label}: ${JSON.stringify(res.error)}`);
  if (res.data === undefined) throw new Error(`${label}: empty response`);
  return res.data;
};

const login = async (emailOrUsername: string, password: string): Promise<string> => {
  const res = await createAccessToken({ body: { emailOrUsername, password } });
  if (res.data) return res.data.item;

  const err = res.error as { code?: string; message?: string; pendingToken?: string } | undefined;
  if (err?.message === 'Terms acceptance required' && err.pendingToken) {
    const terms = unwrap(await getTerms({ query: { language: 'en-US' } }), 'getTerms');
    const accepted = unwrap(
      await acceptTerms({ body: { pendingToken: err.pendingToken, signature: terms.item.signature } }),
      'acceptTerms',
    );
    return accepted.item;
  }
  throw new Error(`login: ${JSON.stringify(res.error)}`);
};

let token: string;

beforeAll(async () => {
  client.setConfig({ baseUrl });
  token = await login('demo', 'demo');
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
    const users = unwrap(await getUsers(), 'getUsers');
    const demoUser = users.items.find((u) => u.username === 'demo');
    if (!demoUser) throw new Error('demo user not found in getUsers response');

    const minted = unwrap(await createUserApiKey({ path: { id: demoUser.id } }), 'createUserApiKey');
    const apiKey = minted.included.apiKey;
    expect(apiKey).toBeTruthy();

    client.setConfig({ baseUrl, ...withApiKey(apiKey) });
    const viaKey = unwrap(await getProjects(), 'getProjects (api key)');
    expect(Array.isArray(viaKey.items)).toBe(true);

    client.setConfig({ baseUrl, ...withBearerToken(token) });
  });
});
