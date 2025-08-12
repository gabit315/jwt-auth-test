import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const USERS = [
  { id: 1, username: 'admin', password: '1234' },
  { id: 2, username: 'user',  password: 'qwerty' }
];

const SECRET = 'super-secret-key';

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Protected route
app.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    res.json({ message: `Welcome, ${user.username}!`, user });
  });
});

app.listen(3000, () => console.log('Backend running on port 3000'));
