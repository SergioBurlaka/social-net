
let db = require('../model');

// var mongoose = require('mongoose');
// var newId = new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca');

const ObjectId = require('mongodb').ObjectID;


let mockUsers = [
  {
    login: "Bill",
    password: "123",
  },
  {
    login: "Louis",
    password: "123",
  },
  {
    login: "Jim",
    password: "123",
  },
  {
    login: "Doug",
    password: "123",
  },
  {
    login: "Ricky",
    password: "123",
  },
  {
    login: "Dave",
    password: "123",
  },
  {
    login: "Kevin",
    password: "123",
  },
]



const addUser = (login, password) => {

  let newUser = new db.userMongooseModel({
      login: login,
      password: password,
      friends: [],
      pending_req_out: [],
      pending_req_in: [],
  });

  newUser.save();
}


const deleteAllUsers = () => {
  console.log(" remove all users sevice")
  db.userMongooseModel.remove({})
    .then( res => {
      console.log( "deleteAllUsers res ", res)
    })

}

const getUsers = () => {
  console.log(" get users sevice")
  return db.userMongooseModel.find({})
}

const seedUsers = () => {
  console.log(" seed  users sevice")

  mockUsers.forEach( item => {
    addUser(item.login, item.password)
  })
}


const checkUser = (userToCheck) => {
  console.log(" seed  users sevice")
  return db.userMongooseModel.find(userToCheck)
}

const addToReqOutColection = (user, id) => {
  user.pending_req_out.push(ObjectId(id))
  return user.save()
}


const addToReqInColection = (user, id) => {
  user.pending_req_in.push(ObjectId(id))
  return user.save()
}
const addFriendToMaster = (user, id) => {
  user.friends.push(ObjectId(id))
  return user.save()
}


const getTwoPersonFromDb = (firestPersonId, secondPersonId) => {
  return  Promise.all([
    db.userMongooseModel.findById(ObjectId(firestPersonId)),
    db.userMongooseModel.findById(ObjectId(secondPersonId))
  ])
}



const addFriendRequestOut = (info) => {
  console.log(" addFriendRequestOut ")
  getTwoPersonFromDb(info.from, info.to)
    .then(result => {
      let fromPerson = result[0]
      let toPerson = result[1]
      addToReqOutColection(fromPerson, info.to)
      addToReqInColection(toPerson, info.from)
    })
}


const deleteFromReqOutColection = (user, id) => {
  const newPending_req_out = user.pending_req_out.filter( item => id !== item.toString() )
  user.pending_req_out = newPending_req_out;
  return user.save()
}


const deleteFromReqInColection = (user, id) => {
  const newPending_req_in = user.pending_req_in.filter( item => id !== item.toString() )
  user.pending_req_in = newPending_req_in;
  return user.save()
}

const deleteFromFriend = (user, id) => {
  const newFriends = user.friends.filter( item => id !== item.toString() )
  user.friends = newFriends;
  return user.save()
}




const cancelFriendRequestOut = (info) => {
  console.log(" cancelFriendRequestOut ")
  getTwoPersonFromDb(info.from, info.to)
    .then(result => {
      let fromPerson = result[0]
      let toPerson = result[1]
      deleteFromReqOutColection(fromPerson, info.to)
      deleteFromReqInColection(toPerson, info.from)
    })
}


const cancelFriendRequestIn = (info) => {
  console.log(" cancelFriendRequestIn ")
  getTwoPersonFromDb(info.from, info.to)
    .then(result => {
      let fromPerson = result[0];
      let toPerson = result[1];
      deleteFromReqOutColection(toPerson, info.from)
      deleteFromReqInColection(fromPerson, info.to)
    })
}


const addFriend = (info) => {
  console.log(" addFriend ")

  getTwoPersonFromDb(info.from, info.to)
    .then(result => {
      let fromPerson = result[0];
      let toPerson = result[1];
      deleteFromReqOutColection(toPerson, info.from);
      deleteFromReqInColection(fromPerson, info.to);
      return getTwoPersonFromDb(info.from, info.to)
    })
    .then(result => {
      let fromPerson = result[0];
      let toPerson = result[1];
      addFriendToMaster(fromPerson, info.to)
      addFriendToMaster(toPerson, info.from)
    })
}

const removeFriend = (info) => {
  console.log(" removeFriend ")

  getTwoPersonFromDb(info.from, info.to)
    .then(result => {
      let fromPerson = result[0];
      let toPerson = result[1];
      deleteFromFriend(fromPerson,info.to)
      deleteFromFriend(toPerson, info.from)
    })
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
};