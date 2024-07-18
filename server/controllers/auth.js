import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt"

export const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            password: hash
        })
        await newUser.save()
        res.status(200).json("User has been created ")
    } catch (error) {
        console.log(error)

    }
}
export const login = async (req, res) => {
    try {
        console.log(req.body.name)
        const user = await User.findOne({ name: req.body.name })
        if (!user) return res.status(500).json("user not found");
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) return res.status(500).json("wrong password");
        const token = jwt.sign(
            {id : user.id},
            process.env.JWT
        );
        const {password, ...otherDetails} = user._doc
        res.cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({details : {...otherDetails}})

    } catch (error) {
        console.log(error)

    }
}