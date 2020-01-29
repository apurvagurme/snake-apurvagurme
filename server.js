const { Server } = require('http');
const fs = require('fs');
const DIR_PATH = `${__dirname}/public`;
const CONTENT_TYPES = {
  js: 'text/javascript',
  css: 'text/css',
  ico: 'image/x-icon',
  html: 'text/html',
  jpg: 'image/jpeg'
};

const getFileContent = filePath => {
  return fs.readFileSync(`${filePath}`, 'utf8');
};

const serveHomePage = function(req, res) {
  const content = getFileContent(`${DIR_PATH}/index.html`);
  res.setHeader('Content-Length', `${content.length}`);
  res.setHeader('Content-type', 'text/html');
  res.end(content);
};

const getContentType = function(req) {
  const [, extension] = req.url.match(/\.(.*$)/);
  return CONTENT_TYPES[extension];
};

const staticPage = function(req, res) {
  const content = getFileContent(`${DIR_PATH}${req.url}`);
  const contentType = getContentType(req);
  res.setHeader('Content-Length', `${content.length}`);
  res.setHeader('Content-type', `${contentType}`);
  res.end(content);
};

const getHandler = function(req) {
  if (req.method == 'GET' && req.url == '/') return serveHomePage;
  if (req.method == 'GET') return staticPage;
};

const handleConnection = function(req, res) {
  const handler = getHandler(req);
  handler(req, res);
};

const main = function() {
  const server = new Server(handleConnection);
  server.listen(8000, () =>
    console.log('Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...')
  );
};

main();
