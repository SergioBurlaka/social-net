
let mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true, useUnifiedTopology: true })

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connect error'));
db.once('open', function () {
    console.log('we are connected')
});

let Schema = mongoose.Schema;


let userSchema = mongoose.Schema({
  login: String,
  password: String,
  friends: [Schema.Types.ObjectId],
  pending_req_out: [Schema.Types.ObjectId],
  pending_req_in: [Schema.Types.ObjectId],

});

const userMongooseModel = mongoose.model('user', userSchema);



module.exports = {
 userMongooseModel
}