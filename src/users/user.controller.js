import { request, response } from 'express';
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const userPut = async (req, res) => {
    const { id } = req.user;
    const { _id, userEmail, publications, comments, ...rest } = req.body;
    const salt = bcryptjs.genSaltSync();
    rest.passwordNew = bcryptjs.hashSync(rest.passwordNew, salt);
    await User.findByIdAndUpdate(id, {username:rest.username,password:rest.passwordNew});
    const userSearch = await User.findById(id);
    res.status(200).json({
        userSearch
    });
}

export const verifyPassword = async (req, res, next) => {
    const { id } = req.user;
    const { passwordOld } = req.body;
    const user = await User.findById(id);
    const validatePassword = bcryptjs.compareSync(passwordOld, user.password);
    if (!validatePassword) {
        return res.status(400).json({ 
            msg: "The old password entered is not equal"
        });
    }
    next();
}

export const userPost = async (req, res) => {
    const { name, username, userEmail, password } = req.body;
    const user = new User({ name, username, userEmail, password });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    res.status(200).json({
        user
    });
}