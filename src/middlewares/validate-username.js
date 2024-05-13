import { request, response } from "express";
import User from "../users/user.model.js";

export const validateUsername = async (req = request, res = response, next) => {
    const { id } = req.user;
    const { username } = req.body;
    try {
        const userLog = await User.findById(id);
        const user = await User.findOne({ username: username });
        if (user) {
            const [total] = await Promise.all([
                User.find({ username: { $all: username } })
            ]);
            if (total.length == 1 && (userLog.username == user.username)) {
                return next();
            }else{
                return res.status(400).json({
                    msg:"The username is used for another user."
                });
            }
        }else{
            return next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Contact administrator"
        });
    }
}