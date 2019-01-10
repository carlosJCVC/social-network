const mongoose = require('mongoose');
const env = require('../../env.json');

//connecting to database
const string_connection = `mongodb://${ env.HOST }/${ env.DATABASE_NAME }`;
//const string_connection = `mongodb://${ env.user_database }:${ env.password_database }@ds151354.mlab.com:51354/${ env.database_name }`;

mongoose.connect(string_connection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
})
    .then(db => console.log('conectada a db'))
    .catch(err => console.log(err));