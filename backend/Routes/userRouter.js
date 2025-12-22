import {Router} from "express"
import multer from "multer"
import { changePassword, updateProfileInfo, getProfileInfo, uploadPicture } from "../Controllers/userController.js"
import { verifyUserId } from "../Middleware/verifyUserId.js"

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null,"./public/images")
    },
    filename : function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})
const userRouter = Router()

userRouter.put("/profile/:userId",upload.single('image'),verifyUserId,uploadPicture)
userRouter.put("/password-change/:userId",verifyUserId,changePassword)
userRouter.get("/profileInfo/:userId",verifyUserId,getProfileInfo)
userRouter.put("/profileInfo-change/:userId",verifyUserId,updateProfileInfo)

export default userRouter