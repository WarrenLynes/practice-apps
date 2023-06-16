const router = require('express').Router();
const { hash, createSession } = require('./util');

module.exports.authRoutes = function (db) {
  router.get('/', async (req, res) => {
    const sessionId = req.sessionId;
    console.log(sessionId);
    const session = await db.Sessions.findById(sessionId);
    if (session) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });
  router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await db.Users.create({
        username,
        password: hash(password)
      });

      const session = await db.Sessions.create({
        userId: user._id,
        hash: hash(createSession())
      })

      res.send({ user, session })
    } catch (err) {
      res.sendStatus(401);
    }
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.Users.findOne({ username });

    if (!user || user.password !== hash(password)) {
      res.status(401).send('login fail');
    } else {
      let session = await db.Sessions.findOne({ userId: user._id });
      if (!session) {
        session = await db.Sessions.create({
          userId: user._id,
          hash: hash(createSession())
        });
      }

      res.cookie('glossary', session.hash).send({ user, session })
    }
  })

  router.get('/logout', async (req, res) => {
    const sessionId = req.sessionId;
    const session = await db.Sessions.findById(sessionId);
    console.log(session);
    await db.Sessions.deleteOne({ _id: sessionId });
    res.clearCookie('glossary');
    res.send('loggedout');
  });

  return router;
}