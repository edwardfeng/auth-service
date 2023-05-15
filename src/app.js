const http = require('http');

function createAuthServer() {
  const server = http.createServer((req, res) => {
    if (req.url === '/auth' && req.method === 'POST') {
      const authenticationHeader = req.headers['authentication'];
      if (authenticationHeader && authenticationHeader.startsWith('Bearer')) {
        res.writeHead(200);
        res.end();
      } else {
        res.writeHead(401);
        res.end();
      }
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  server.listen(3000, () => {
    console.log('Server started on port 3000');
  });

  return server;
}

function close(server) {
  server.close(() => {
    console.log('Server closed');
  });
}

if (require.main === module) {
  const server = createAuthServer();
  process.on('SIGINT', () => {
    close(server);
    process.exit();
  });
}

module.exports = { createAuthServer, close };
