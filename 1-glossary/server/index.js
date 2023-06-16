require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require('./db.js');
const { wordRoutes } = require('./wordRoutes');
const { authRoutes } = require('./authRoutes');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  // parseCookies
  const cookieString = req.get('Cookie') || '';
  const cookies = cookieString.split('; ')
    .reduce((cookies, cookie) => {
      if (cookie.length) {
        let index = cookie.indexOf('=');
        let key = cookie.slice(0, index);
        let token = cookie.slice(index + 1);
        cookies[key] = token;
      }
      return cookies;
    }, {})

  req.cookies = cookies;

  next();
});

app.use(async (req, res, next) => {
  if (req.cookies && req.cookies.glossary) {
    const session = await db.Sessions.findOne({ hash: req.cookies.glossary });
    console.log(session);
    if (session) {
      req.sessionId = session._id;
    }
  }
  next();
});

async function authReq(req, res, next) {
  if (req.sessionId) {
    const session = await db.Sessions.findById(req.sessionId);
    if (session) {
      req.userId = session.userId;
      return next();
    }
  }
  return res.sendStatus(401);
}

// Serves up all static and generated assets in in a specified folder.
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/words', authReq, wordRoutes(db));
app.use('/authenticate', authRoutes(db));

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
