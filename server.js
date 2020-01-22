const { Server } = require('net');
const fs = require('fs');
const server = new Server();

const contentTypes = {
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

const generateResponse = function(text) {
  const [request, ...headers] = text.split('\n');
  const [method, requestUrl, protocol] = request.split(' ');
  if (method == 'GET' && requestUrl == '/') {
    const resources = getResponse('text/html', getFileContent('./index.html'));
    return resources;
  }
  if (method == 'GET' && requestUrl == '/favicon.ico') {
    return '';
  }
  const extension = requestUrl.match(/\.(.*$)/)[1];
  const contentType = contentTypes[extension];
  return getResponse(contentType, getFileContent(`.${requestUrl}`));
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
