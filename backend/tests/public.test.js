// tests/public.test.js
const path = require('path');
const request = require('supertest');
const fs = require('fs');
const rimraf = require('rimraf');

const app = require(path.join(__dirname, '..', 'src', 'app.js'));

const publicRoot = path.join(__dirname, '..', 'public');

describe('Public file serving', () => {
  const subPath = 'mypage';
  const dirName = 'assets';
  const fileName = 'hello.txt';
  const absoluteDir = path.join(publicRoot, subPath, dirName);

  beforeAll(() => {
    fs.mkdirSync(absoluteDir, { recursive: true });
    fs.writeFileSync(path.join(absoluteDir, fileName), 'hello world', 'utf8');
  });

  afterAll(() => {
    rimraf.sync(path.join(publicRoot, subPath));
  });

  it('serves an existing file', async () => {
    const res = await request(app)
      .get(`/public/${encodeURIComponent(subPath)}/${encodeURIComponent(dirName)}/${encodeURIComponent(fileName)}`)
      .expect(200);

    expect(res.text).toContain('hello world');
  });

  it('returns 404 when the file does not exist', async () => {
    await request(app)
      .get(`/public/${encodeURIComponent(subPath)}/${encodeURIComponent(dirName)}/not-found.txt`)
      .expect(404);
  });

  it('returns 400 for path traversal attempt', async () => {
    // traversal attempt using '..'
    const evil = '..%2Fsecret';
    await request(app)
      .get(`/public/${evil}/${encodeURIComponent(dirName)}/${encodeURIComponent(fileName)}`)
      .expect(400);
  });
});
