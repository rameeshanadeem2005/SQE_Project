const path = require('path');
const request = require('supertest');

const mockDownloadPdf = jest.fn((req, res) => {
  // simulate success response
  res.status(200).json({
    success: true,
    directory: req.params.directory,
    id: req.params.file.replace(/\D/g, ''), // extract digits
  });
});

jest.mock('@/handlers/downloadHandler/downloadPdf', () => mockDownloadPdf);

const app = require(path.join(__dirname, '..', 'src', 'app.js'));

describe('Download route', () => {
  it('GET /download/:directory/:file calls downloadPdf', async () => {
    const res = await request(app)
      .get('/download/invoices/invoices1234.pdf')
      .expect(200);

    expect(mockDownloadPdf).toHaveBeenCalled();
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('directory', 'invoices');
    expect(res.body).toHaveProperty('id', '1234');
  });

  it('GET /download with bad filename returns JSON 503 if handler throws', async () => {
    mockDownloadPdf.mockImplementationOnce(() => {
      throw new Error('boom');
    });

    const res = await request(app)
      .get('/download/invoices/badfile.pdf')
      .expect(503);

    expect(res.body).toHaveProperty('success', false);
  });
});
