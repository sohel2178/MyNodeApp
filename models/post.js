const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    published_date: {type:Date, default: Date.now},
    title : {type:String,required:true},
    body:{type:String,required:true}
});


module.exports = mongoose.model('Post',postSchema);