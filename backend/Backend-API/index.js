const express = require('express');
const diagnosisRouter = require('./routes/diagnosis');
const authRouter = require('./routes/auth');
const articleRouter = require('./routes/articles');
const usersRouter = require('./routes/users');
const { verifyFirebaseToken, urlFrontend } = require('./config');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: urlFrontend,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],  // Allow specified HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization']  // Allow specified headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/diagnosis', verifyFirebaseToken, diagnosisRouter);
app.use('/auth', authRouter); 
app.use('/articles', articleRouter);
app.use('/users', verifyFirebaseToken, usersRouter);

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send(`
    <p>Hello World!</p>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});