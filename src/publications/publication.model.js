import {Schema,model} from 'mongoose';

const PublicationSchema =Schema({
    title:{
        type:String,
        required:[true,"The title is required in the post"]
    },
    mainText:{
        type:String,
        required:[true,"The main text is required in the post"]
    },
    link:{
        type:String,
        required:[true,"The link is required in the post"]
    },
    category:{
        type:String,
        required:[true, "The category is required in the post"]
    },
    // idUser:{
    //     type:Schema.Types.ObjectId,
    //     default:""
    // }
    user:{
        type:String,
        default:"Kenneth Velásquez"
    }
});
PublicationSchema.methods.toJSON = function(){
    const {__v,_id,...post} = this.toObject();
    post.id = _id;
    return post;
}
export default model('Publication',PublicationSchema);