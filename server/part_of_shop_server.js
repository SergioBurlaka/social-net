const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

const controller = require('./controller')
const port = process.env.PORT || 8080;
app.use( bodyParser.json() );

app.use(express.static(path.join(__dirname, '../build')));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});



app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});



app.get('/users-login', controller.checkUser);

app.get('/users', controller.getUsers);
app.put('/seed-users', controller.seedUsers);
app.delete('/users', controller.deleteAllUsers);

app.put('/users-add-friend-req-out', controller.addFriendRequestOut);
app.put('/users-cancel-friend-req-out', controller.cancelFriendRequestOut);
app.put('/users-cancel-friend-req-in', controller.cancelFriendRequestIn);
app.put('/users-add-friend', controller.addFriend);
app.put('/users-rempve-friend', controller.removeFriend);



app.listen(port, () => console.log(`Listening on port ${port}`));




