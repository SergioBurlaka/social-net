# social-net

list of used technologies
- Node.js
- Express
- Mongoose (is an library for MongoDB and Node.js)
- React
- Redux

Installation
Caution!!!
!!!! For run this app at your computer, on your computer must be instaled Node.js and MongoDb.!!!!!

1.load project 

2. Start aplication:
  1. at root folder enter comand "npm install"
  2. at root folder enter comand "npm start"
3. Start server:
  1. at server folder enter comand "npm install"
  2. at server folder enter comand "npm start"
  
When application were starts at first time you need to init database.
To do this you have to click gears at right corner of screen.
![Alt text](http://dl4.joxi.net/drive/2020/02/17/0021/0128/1405056/56/7544d1dc0e.jpg)
Click on "Seed users", will create Users colection. And filled the database.
[\
  {
    login: "Bill",
    password: "123",
  }\
  {
    login: "Louis",
    password: "123",
  }\
  {
    login: "Jim",
    password: "123",
  }\
  {
    login: "Doug",
    password: "123",
  }\
  {
    login: "Ricky",
    password: "123",
  }\
  {
    login: "Dave",
    password: "123",
  }\
  {
    login: "Kevin",
    password: "123",
  }\
]

User scheme looks like:
{\
  login: String,\
  password: String,\
  friends: [],\
  pending_req_out: [],\
  pending_req_in: [],\
}

![Alt text](http://dl3.joxi.net/drive/2020/02/17/0021/0128/1405056/56/cccd965ff2.jpg)
Now, if you click on 'back'. You can login, enter for example:\
Login: Dave\
Password: 123

![Alt text](http://dl4.joxi.net/drive/2020/02/17/0021/0128/1405056/56/fc8d60c518.jpg)
And after login you will see users screen.
![Alt text](http://dl4.joxi.net/drive/2020/02/17/0021/0128/1405056/56/0d6d9bee83.jpg)
![Alt text](http://dl4.joxi.net/drive/2020/02/17/0021/0128/1405056/56/6f7aac7714.jpg)

