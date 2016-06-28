import compression from 'compression';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

const PORT = process.env.PORT || 8000;

const app = express();
app.use(compression());
app.use(morgan('tiny'));
app.use(bodyParser.json());

let tasks = [];
app.get('/api/task', (req, res) => {
  res.send(tasks);
});

app.post('/api/task', (req, res) => {
  tasks.push(req.body);
  res.sendStatus(200);
});

app.delete('/api/task', (req, res) => {
  tasks = tasks.filter((task) => {
    return task.label === req.body.label && task.status === req.body.status
  });
  res.sendStatus(200);
});

app.use('/', express.static(path.join(__dirname, '/../dist')));
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(path.join(__dirname, '/../dist/index.html')));
});

const server = http.createServer(app);
server.listen(PORT);

console.log(`Server started, listening at: http://localhost:${PORT}...`);
