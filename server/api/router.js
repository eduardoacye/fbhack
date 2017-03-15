/*
---------//---------
FbHack API explained
---------//---------

The API provides an interface with the back-end database
and facebook data-processing algorithms.

The basic functionality of the API is to communicate with
facebook to log in and retrive information. On top of that
the API can accept or respond with more complex data.

There are five types of data that are supported in this API:
1. Users
2. Threads
3. Participants
4. Messages
5. Statistics

.....
Users
.....

When someone successfully logs into facebook via a /api/login POST
request providing the username (called /vanity/ internally and on fb)
and password, the login facility obtains the user's /fbid/ (facebook ID)
which is used to query the DB for a User document with the same fbid.

If the user is using the program for the first time, the DB won't find
it's corresponding document so a new User will be created with the
appropiate vanity and fbid values.

The API can be requested to update the user information like the name,
the short name, and the source for the profile picture and cover photo.
This information won't be updated automatically so an "Update user info"
button is provided in the client-side program.

.......
Threads
.......

The threads are the list of conversations a user has hold with other
people (or with himself). When someone log into facebook successfully,
the login facility obtains a list of fbid corresponding to the threads
the user has participated in from the DB.

If the user is using the program for the first time, the DB won't find
any threads with /user_fbid/ corresponding to the user's /fbid/ so
the thread list will appear to be empty.

The API can be requested to update all of the user's threads with an
"Update thread list" button on the client-side.

............
Participants
............

Along with the thread list, the participants list is updated in the DB.
This list contains information of every person the user has had a
conversation with (his friends, his enemies and himself).

The information stored for each participant is used in conjuction with
a thread to render a full conversation (pictures included).

........
Messages
........

A message is bound to a user and a thread, it has a timestamp, a body and
(optionally) an attachment.

When a user requests to read a particular thread every message in the
visible range will be queried from the DB, when no messages are available
from the DB then a "Update thread messages" button can be pressed to
populate the DB with the entire conversation.

Groups of messages can be created for future reference as a favorite
messages list (or best-of conversation)

..........
Statistics
..........

FbHack provides some basic data analysis:
- Conversation density time series
- Conversation content distribution
- Top 100 used words

This statistics are stored in the DB and can be
updated incrementally, that is, the data is stored
raw. The density, distribution and word sorting are
computed as needed.

*/

const express = require('express')

const User = require('./user')
const Session = require('./session')

import login from '../src/login'
import user_info from '../src/user_info'


const apiRouter = express.Router()
apiRouter.use((req, res, next) => {
  console.log('FbHack API invoked')
  next()
})

apiRouter.get('/', (req, res) => res.json({
  message: 'Welcome to the FbHack API'
}))

apiRouter.route('/test')
  .get((req, res) => {
    let err = new Error('mal flow')
    res.json({success: false, message: err.message})
  })

/*=========//===========
  LOGING IN AND OUT
===========//=========*/

apiRouter.route('/login')
  .post((req, res) => {
    login(req.body.username, req.body.password)
      .then(({fbid, vanity, lsd, dtsg, jar}) => {
        User.get(fbid)
          .then(user => {
            if (user) {
              res.json({success: true, user})
            } else {
              User.post(fbid, vanity)
                .then(msg =>
                  Session.post(fbid, lsd, dtsg, jar)
                    .then(msg => res.json({success: true, user: {fbid, vanity}}))
                    .catch(err => res.json({success: false, error: 'While storing session in DB'})))
                .catch(err => res.json({success: false, error: 'While storing user in DB'}))
            }
          })
          .catch(err => res.json({success: false, error: 'While obtaining user from DB'}))
      })
      .catch(err => res.json({success: false, error: 'While logging in'}))
  })

/*=========//===========
      USER'S INFO
=========//===========*/
apiRouter.route('/users')
  .post((req, res) =>
    User.post(req.body.fbid,
              req.body.vanity,
              req.body.name,
              req.body.short_name,
              req.body.profile_pic_src,
              req.body.cover_photo_src)
      .then(msg => res.json(msg))
      .catch(err => res.send(err)))
  .get((req, res) =>
    User.get_all()
      .then(users => res.json(users))
      .catch(err => res.send(err)))

apiRouter.route('/users/:user_id')
  .get((req, res) =>
    User.get(req.params.user_id)
      .then(user => res.json(user))
      .catch(err => res.send(err)))
  .put((req, res) =>
    User.put(req.params.user_id,
             req.body.vanity,
             req.body.name,
             req.body.short_name,
             req.body.profile_pic_src,
             req.body.cover_photo_src)
      .then(msg => res.json(msg))
      .catch(err => res.send(err)))
  .delete((req, res) =>
    User.delete(req.params.user_id)
      .then(msg => res.json(msg))
      .catch(err => res.send(err)))

apiRouter.route('/users/:user_id/update')
  .post((req, res) =>
    Session.get(req.params.user_id)
      .then(session =>
        user_info(req.params.user_id, session)
          .then(({name, short_name, profile_pic_src, cover_photo_src}) =>
            User.put(req.params.user_id,
                     null,
                     name,
                     short_name,
                     profile_pic_src,
                     cover_photo_src)
              .then(msg => res.json(msg))
              .catch(err => res.send(err)))
          .catch(err => res.send(err)))
      .catch(err => res.send(err)))

apiRouter.route('/users/:user_id/logout')
  .post((req, res) =>
    Session.delete(req.params.user_id)
      .then(msg => res.json(msg))
      .catch(err => res.send(err)))

/*=========//===========
        THREADS
=========//===========*/

apiRouter.route('/users/:user_id/threads')
  .get((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })
  .post((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })
  .delete((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })

apiRouter.route('/users/:user_id/threads/:thread_id')
  .get((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })
  .delete((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })

apiRouter.route('/users/:user_id/threads/:thread_id/messages')
  .get((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })
  .post((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })
  .delete((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })

apiRouter.route('/users/:user_id/threads/:thread_id/favorites')
  .get((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })
  .post((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })

apiRouter.route('/users/:user_id/threads/:thread_id/favorites/:favorite_id')
  .get((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })
  .put((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })
  .delete((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })

/*=========//===========
      STATISTICS
=========//===========*/

apiRouter.route('/users/:user_id/threads/:thread_id/stats')
  .get((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })
  .post((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })

apiRouter.route('/users/:user_id/threads/:thread_id/stats/:stat_id')
  .get((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })
  .delete((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })

apiRouter.route('/users/:user_id/stats')
  .get((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })
  .post((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })

apiRouter.route('/users/:user_id/stats/:stat_id')
  .get((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })
  .delete((req, res) => {
    res.json({
      message: 'Not yet implemented'
    })
  })

module.exports = apiRouter
