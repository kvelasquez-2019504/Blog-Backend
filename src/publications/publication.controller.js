import {request, response} from 'express';
import User from "../users/user.model.js";
import Comment from '../comments/comment.model.js';
import Publication from './publication.model.js';

export const publicationPost = async (req = request, res = response) => {
    const { uid } = req.user;
    let userLog = await User.findById(uid);
    const { title, mainText, link, category} = req.body;
    const publication = new Publication({ title, mainText,link, category, idUser: uid
    });
    userLog.publications.push(publication.id);
    await User.findByIdAndUpdate(uid, { publications: userLog.publications });
    publication.save();
    res.status(200).json({
        msg: "The publication is upload.",
        publication
    })
}

export const publicationDelete = async (req = request, res = response) => {
    const { idPublication } = req.body;
    const {uid} = req.user;
    const userLog = await User.findById(uid);
    const publication = await Publication.findById(idPublication);
    const [arrayComments] = await Promise.all([
        Comment.find({idPublication:idPublication})
    ]);
    let comments=[];
    for(let comment of arrayComments){
        const userSearch = await User.findById(comment.idUser);
        let indexComment =userSearch.comments.indexOf(comment._id);
        userSearch.comments.pop(indexComment);
        await User.findByIdAndUpdate(userSearch._id,{comments:userSearch.comments});
        await Comment.deleteOne({_id:comment._id});
        comments.push({username:userSearch.username,comment:comment.comment});
    }
    userLog.publications.pop(userLog.publications.indexOf(idPublication));
    await User.findByIdAndUpdate(uid,{publications:userLog.publications});
    await Publication.deleteOne({_id:idPublication});
    res.status(200).json({
        msg: "Deleted publication",
        publication,
        comments
    });
}

export const publicationGetById = async (req, res) => {
    const { idPublication } = req.body;
    const publication = await Publication.findById(idPublication);
    let comments=[];
    const [countComments,arrayComments] = await Promise.all([
        Comment.countDocuments({idPublication:idPublication}),
        Comment.find({idPublication:idPublication})
    ]);

    for(let comment of arrayComments){
        const {username} = await User.findById(comment.idUser);
        comments.push({username,comment:comment.comment});
    }

    res.status(200).json({
        publication,
        countComments,
        comments
    });
}

export const publicationGet = async (req, res) => {
    const { uid } = req.user;
    const userLog = await User.findById(uid);
    let myPublications = [];
    for (let idPublication of userLog.publications) {
        const {id,title,category,date}= await Publication.findById(idPublication);
        let date2=date.toISOString().substring(0,10);
        const [numberComments] = await Promise.all([
            Comment.countDocuments({idPublication:idPublication})
        ]);
        myPublications.push({id,title,category,date:date2, numberComments});
    }
    res.status(200).json({
        myPublications
    });
}