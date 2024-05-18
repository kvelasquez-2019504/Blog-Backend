import {request, response} from 'express';
import Comment from '../comments/comment.model.js';
import User from '../users/user.model.js';

export const commentPost = async (req=request, res=response)=>{
    const {uid} =req.user;
    let userLog = await User.findById(uid);
    const {idPublication,comment}=req.body;
    const newComment = new Comment({comment:comment,idUser:uid,idPublication:idPublication});
    userLog.comments.push(newComment.id);
    await User.findByIdAndUpdate(uid,{comments:userLog.comments});
    newComment.save();
    res.status(200).json({
        newComment
    });
}

export const verifyComment = async (req,res,next)=>{
    const { idComment } = req.body;
    const { uid } = req.user;
    const userLog = await User.findById(uid);
    if (!userLog.comments.includes(idComment)) {
        return res.status(400).json({
            msg: "The comment not is your"
        });
    }
    next();
}

export const commentPut = async(req=request,res=response)=>{
    const { idComment } = req.body;
    const { _id, idUser,idPublication, ...comment } = req.body;
    await Comment.findByIdAndUpdate(idComment,{...comment});
    const newComment = await Comment.findById(idComment);
    res.status(200).json({
        msg:"The comment is now updated",
        newComment
    });
}

export const commentDelete = async(req=request,res=response)=>{
    const {id} = req.user;
    const userLog = await User.findById(id);
    const {idComment} = req.params;
    let index=0;
    if(userLog.comments.includes(idComment)){
        index=userLog.comments.indexOf(idComment);
    }
    const comment = await Comment.findById(idComment);

    await Comment.deleteOne({_id:idComment});
    res.status(200).json({
        msg:"Your comment is deleted",
        comment
    })
}

export const commentsGet = async (req=request, res=response)=>{
    const {uid} =req.user;
    const userLog =await User.findById(uid);
    let myComments=[];
    for(let idComment of userLog.comments){
        const comment = await Comment.findById(idComment);
        myComments.push(comment);
    }
    res.status(200).json({
        myComments
    });
}