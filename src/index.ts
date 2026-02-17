import server from './bootstrap';

const PORT = Number(process.env.port || 3000);

server.start(PORT);