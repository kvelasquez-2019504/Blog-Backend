import {mongoose, Schema} from 'mongoose';

const commentSchema= mongoose.Schema({
    comment:{
        type:String,
        required:[true,"The comment is required for comment"]
    },
    idUser:{
        type:Schema.Types.ObjectId,
        required:[true,"The id User is required for comment"]
    },
    idPublication:{
        type:Schema.Types.ObjectId,
        required:[true,"The id Publication is required for comment"]
    }
});

commentSchema.method.JSON = function(){
    const {__v,_id,...comment} = this.toObject();
    comment.uid=id;
    return comment;
}

export default mongoose.model('Comment', commentSchema);
