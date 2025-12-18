import { useContext, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../Hooks/AuthContextProvider";
import user from "../../public/user.jpg"
import axios from "axios";

function Profile() {

    const {state} = useContext(AuthContext)
    const imageRef = useRef(null)
    const [success,setSuccess] = useState(null)
    const [error,setError] = useState(null)

    const uploadPic = async(e)=>{
        const formData = new FormData()
        formData.append("image",e.target.files[0])
        try {
            const response = await axios.post(`http://localhost:3000/api/user/profile/${state.user && state.user._id}`,formData)
            setSuccess(response.data.message);
            
        } catch (error) {
            setError(error);
        }
    }

  return (
    <div className="pt-18 profile-page">
        <div className="flex flex-col justify-center items-center gap-8 min-h-screen">
            {/* PROFILE PICTURE */}
            <div className="flex flex-col items-center gap-2">
                {/* HEADER */}
                <p className="text-2xl font-bold">Profile</p>
                
                {/* IMAGE */}
                <input type="file" name="image" ref={imageRef} className="hidden" accept="image/*" onChange={uploadPic}/>
                <img src={state.user && state.user.image? `http://localhost:3000/images/${state.user.image}`:user} alt="profile picture" className="rounded-full w-30 h-30 cursor-pointer object-cover" onClick={()=>{imageRef.current.click()}}/>

                {/* ALERTS */}
                {success && <div className="p-1 border-3 border-green-600 bg-green-400 text-green-900 font-bold rounded-[5px]">{success}</div>}
                {error && <div className="p-2 border border-red-600 bg-red-400">{error}</div>}

                {/* MEMBER SINCE */}
                <p>Member since : 2022/02/02</p>
            </div>

            {/* USER INFORMATION */}
            <div className="flex flex-col gap-4 w-[90%] p-5 bg-gray-700 rounded-[10px]">
                <p className="flex items-center gap-2 text-2xl font-bold">User Information <FaUserCircle/></p>
                <div className="flex flex-wrap items-center justify-between bg-gray-600 py-1 px-2 font-bold rounded-[5px]">
                    <p>Name :</p>
                    <p>{state.user && state.user.name}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between bg-gray-600 py-1 px-2 font-bold rounded-[5px]">
                    <p>Username :</p>
                    <p>{state.user && state.user.username}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between bg-gray-600 py-1 px-2 font-bold rounded-[5px]">
                    <p>Email :</p>
                    <p>{state.user && state.user.email}</p>
                </div>
            </div>

            {/* PASSWORD UPDATING */}
            <div className="flex flex-col gap-4 w-[90%] p-5 bg-gray-700 rounded-[10px]">
                <p className="text-2xl font-bold">Password Updation</p>
                <div className="flex flex-wrap items-center justify-between bg-gray-600 py-1 px-2 font-bold rounded-[5px]">
                    <p>Name :</p>
                    <input type="password" />
                </div>
                <div className="flex flex-wrap items-center justify-between bg-gray-600 py-1 px-2 font-bold rounded-[5px]">
                    <p>Username :</p>
                    <input type="password" />
                </div>
                <div className="flex flex-wrap items-center justify-between bg-gray-600 py-1 px-2 font-bold rounded-[5px]">
                    <p>Email :</p>
                    <input type="password" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile