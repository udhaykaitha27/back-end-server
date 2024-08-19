const mongoose = require('mongoose');

const connectionMongo = async() =>
{
    try {
        const connectit = await mongoose.connect(process.env.DB_URI);
    console.log('db connection successfull '+connectit.connection.host);
        
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = connectionMongo;