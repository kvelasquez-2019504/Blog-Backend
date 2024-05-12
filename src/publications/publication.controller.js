import {request, response} from 'express';
import Publication from './publication.model.js';

export const publicationPost = async (req = request, res = response) => {
    //let userLog = await User.findById(id);
    const { title, mainText, link, category} = req.body;
    const publication = new Publication({ title, mainText,link, category
        // , idUser: id
    });
    //userLog.publications.push(publication.id);
    //await User.findByIdAndUpdate(id, { publications: userLog.publications });
    publication.save();
    res.status(200).json({
        msg: "The publication is upload.",
        publication
    })
}