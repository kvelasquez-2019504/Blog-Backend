import mongoose,{Schema} from 'mongoose';

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"]
    },
    password:{
        type:String,
        required:[true, "The password is mandatory"]
    },
    publications:{
        type:Array,
        default:[]
    },
    comments:{
        type:Array,
        default:[]
    }
});

UserSchema.methods.toJSON=function(){
    const {__v,_id,publications,comments,...user}=this.toObject();
    user.uid =_id;
    return user;
};

export default mongoose.model('User',UserSchema);