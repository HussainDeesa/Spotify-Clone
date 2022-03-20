const mongoose = require('mongoose')
const username = encodeURIComponent("Hussain");
const password = encodeURIComponent("Hussain@7860");
// const mongoURi=`mongodb+srv://${username}:${password}@cluster0.pykl2.mongodb.net/Spotify?retryWrites=true&w=majority`
const mongoURi = 'mongodb://localhost:27017/Spotify?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const connectToMongo = () => {
    mongoose.connect(mongoURi, {
    }).then(() => {
        console.log('connected to mongo successfully');
    }).catch((e) => {
        console.log(e, 'not connected');
    });
    

}
module.exports = connectToMongo