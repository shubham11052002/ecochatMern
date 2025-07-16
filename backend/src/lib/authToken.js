import jwt from 'jsonwebtoken';

export const createToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,  //valid for 7 days 
        httpOnly: true,
        samesite: "None",
        secure: process.env.NODE_ENV !== "production",
    })
    return token;
}

