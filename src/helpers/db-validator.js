import Publication from '../publications/publication.model.js';
import User from '../users/user.model.js';

export const existsUsername = async( username="")=>{
    const [total]=await Promise.all([
        User.find({username:{$all:username}})
    ]);
    if(total.length==1){
        throw new Error(`The username ${username} already exists in the DataBase`);
    }
}

export const existsUserEmail = async( userEmail="")=>{
    const existsUserEmail = await User.findOne({userEmail});
    if(existsUserEmail){
        throw new Error(`The user email ${userEmail} already exists in the DataBase`);
    }
}

export const existPublication = async(idPublication='')=>{
    const publication = await Publication.findById(idPublication);
    if(!publication){
        throw new Error("The Publication not exists");
    }
}

export const verifyLengthCategory= async(category=[])=>{
    if(category.length==0){
        throw new Error("Is necessary one category");
    }
}