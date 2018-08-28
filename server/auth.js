const router = require('express').Router()
const {User} = require('./db')
const session = require('express-session');

module.exports = router

router.use('/google', require('./oauth'));

const userNotFound = next => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
}

router.get('/me', (req, res, next) => {
  if (!req.user) {
    userNotFound(next)
  } else {
    User.findById(req.user.id)
      .then(user => user ? res.json(user) : userNotFound(next))
      .catch(next)
  }
})

router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
    .then(user => {
      if (user) {
        req.login(user, err => {
          if(err) return next(err);
          return res.json(user);
        })
      } else {
        const err = new Error('Incorrect email or password!')
        err.status = 401
        next(err)
      }
    })
    .catch(next)
})

router.delete('/logout', (req, res, next) => {
  req.session.destroy()
  res.status(204).end()
})
