import "dotenv/config"
import jwt from "jsonwebtoken"

const createToken = (user)=>{
    const token = jwt.sign({id : user._id},process.env.JWT_SECRET_KEY,{expiresIn : 3600})
    return token
}

export default createToken