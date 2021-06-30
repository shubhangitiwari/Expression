const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(
    ()=> console.log('connected to db')
).catch(
    (err)=> console.error(err)
);