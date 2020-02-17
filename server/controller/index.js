

const userService = require('../services');



const checkUser = (req, res) => {
  userService.checkUser(req.query)
    .then(resp => res.send(resp))
}

const getUsers = (req, res) => {
  userService.getUsers()
    .then(resp => res.send(resp))
}

const deleteAllUsers = (req, res) => {
  userService.deleteAllUsers()
  res.send('users was deleted')
}


const seedUsers = (req, res) => {
  userService.seedUsers()
  res.send('users was seeded')
}


const addFriendRequestOut = (req, res) => {
  userService.addFriendRequestOut(req.body)
  res.send('addFriendRequestOut')
}

const cancelFriendRequestOut = (req, res) => {
  userService.cancelFriendRequestOut(req.body)
  res.send('cancelFriendRequestOut')
}

const cancelFriendRequestIn = (req, res) => {
  userService.cancelFriendRequestIn(req.body)
  res.send('cancelFriendRequestIn')
}

const addFriend = (req, res) => {
  userService.addFriend(req.body)
  res.send('addFriend')
}

const removeFriend = (req, res) => {
  userService.removeFriend(req.body)
  res.send('removeFriend ')
}



module.exports = {
  getUsers,
  seedUsers,
  deleteAllUsers,
  checkUser,
  addFriendRequestOut,
  cancelFriendRequestOut,
  cancelFriendRequestIn,
  addFriend,
  removeFriend,
}