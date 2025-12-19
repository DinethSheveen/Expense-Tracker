import {Router} from "express"
import multer from "multer"
import { uploadPicture } from "../Controllers/userController.js"


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

userRouter.put("/profile/:userId",upload.single('image'),uploadPicture)

export default userRouter