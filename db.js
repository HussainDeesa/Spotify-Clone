const mongoose = require('mongoose')
const username = encodeURIComponent("Hussain");
const password = encodeURIComponent("Hussain@7860");
const mongoURi=`mongodb+srv://${username}:${password}@cluster0.pykl2.mongodb.net/Spotify?retryWrites=true&w=majority`
const connectToMongo = () => {
    mongoose.connect(mongoURi, {
    }).then(() => {
        console.log('connected to mongo successfully');
    }).catch((e) => {
        console.log(e, 'not connected');
    });
    

}
module.exports = connectToMongo