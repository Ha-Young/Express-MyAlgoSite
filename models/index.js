const mongoose = require('mongoose');

module.exports = () => {

    const connect = () => { 
        mongoose.connect('mongodb://localhost:27017/codewars', { useNewUrlParser: true });
    }

    connect();

    mongoose.connection.on('error', (error) => {
        console.log('mongoDB 연결 에러');
    })

    mongoose.connection.on('disconnected', (error) => {
        console.log('mongoDB 연결 재시도');
        connect();
    })

    require('./User');
    require('./Problem');
    
}
