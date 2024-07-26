import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            password: hash
        })
        const anas =  await newUser.save()
        res.status(200).json(anas)
    } catch (error) {
        console.log(error)

    }
}
export const login = async (req, res) => {
    try {
        console.log(req.body.name)
        const user = await User.findOne({ email: req.body.email })
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
