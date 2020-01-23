const { Server } = require('net');

const fs = require('fs');

const server = new Server();

const DIR_PATH = `${__dirname}/public`;

const CONTENT_TYPES = {
  js: 'text/javascript',
  css: 'text/css',
  ico: 'image/vnd.microsoft.icon',
  html: 'text/html'
};

const getFileContent = filePath => {
  return fs.readFileSync(`${filePath}`, 'utf8');
};

const getResponse = function(contentType, content) {
  const defaultResponse = [
    'HTTP/1.0 200 OK',
    `Content-type: ${contentType}`,
    `Content-Length: ${content.length}`,
    '',
    content
  ].join('\n');
  return defaultResponse;
};

const getRequest = function(text) {
  const [request, ...headers] = text.split('\n');
  const [method, url, protocol] = request.split(' ');
  const req = { request, headers, method, url, protocol };
  return req;
};

const generateResponse = function(text) {
  const request = getRequest(text);
  if (request.method == 'GET' && request.url == '/') {
    const resources = getResponse('text/html', getFileContent(`${DIR_PATH}/index.html`));
    return resources;
  }
  if (request.method == 'GET' && request.url == '/favicon.ico') {
    return '';
  }
  const [, extension] = request.url.match(/\.(.*$)/);
  const contentType = CONTENT_TYPES[extension];
  return getResponse(contentType, getFileContent(`${DIR_PATH}${request.url}`));
};

const handleConnection = function(socket) {
  socket.setEncoding('utf8');

  socket.on('data', text => {
    socket.write(generateResponse(text));
  });

  socket.on('end', () => console.log('client ended'));
};

const main = function() {
  server.on('connection', handleConnection).listen(8000);

  server.on('listening', () =>
    console.log('Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...')
  );
};

main();
