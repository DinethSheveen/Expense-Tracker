import { useContext, useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import { AuthContext } from "../Hooks/AuthContextProvider";
import { TbLockPassword } from "react-icons/tb";
import { TbPasswordFingerprint } from "react-icons/tb";
import Button from "../Components/Button"
import user from "../../public/user.jpg"
import axios from "axios";
import dayjs from "dayjs";

function Profile({loading,setLoading}) {

    const {state} = useContext(AuthContext)
    const imageRef = useRef(null)
    const [success,setSuccess] = useState(null)
    const [error,setError] = useState(null)
    const [passwordSuccess,setPasswordSuccess] = useState(null)
    const [passwordError,setPasswordError] = useState(null)
    const [passwordForm,setPasswordForm] = useState({
        currentPassword:"",
        newPassword : "",
        confirmPassword : ""
    })

    const [profileSuccess,setProfileSuccess] = useState(null)
    const [profileError,setProfileError] = useState(null)
    const [profileForm,setProfileForm] = useState({
        name:"",
        username : "",
        email : ""
    })

    // UPLOAD A PROFILE PICTURE
    const uploadPic = async(e)=>{
        const formData = new FormData()
        formData.append("image",e.target.files[0])
        try {
            const response = await axios.put(`http://localhost:3000/api/user/profile/${state.user && state.user._id}`,formData)
            setSuccess(response.data.message);
            
        } catch (error) {
            setError(error);
        }
    }

    // CHANGE THE PASSWORD
    const changePassword = async(e)=>{
        e.preventDefault()

        try {
            setLoading(true)
            const response = await axios.put(`http://localhost:3000/api/user/password-change/${state.user && state.user._id}`,passwordForm) 

            setPasswordError(null)
            setPasswordSuccess(response.data.message);
            setLoading(false)

            // RESETTING FORM DATA
            setPasswordForm(prevPassword => ({...prevPassword, currentPassword : ""}))
            setPasswordForm(prevPassword => ({...prevPassword, newPassword : ""}))
            setPasswordForm(prevPassword => ({...prevPassword, confirmPassword : ""}))

        } catch (error) {
            setPasswordSuccess(null)
            setPasswordError(error.response.data.message);
            setLoading(false)
        }
        setTimeout(()=>{
            setPasswordSuccess(null)
        },3000)
    }

    // UPDATE PROFILE
    const updateProfile = async(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.put(`http://localhost:3000/api/user/profileInfo-change/${state.user && state.user._id}`,profileForm) 
            setProfileError(null)
            setProfileSuccess(response.data.message)
            setLoading(false)
        } catch{
            setProfileSuccess(null)           
        }

        setTimeout(()=>{
            setProfileError(null)
            setProfileSuccess(null)
        },3000)
    }

    useEffect(()=>{
        // RETREIVING USER INFOR 
        const getUserInfo = async()=>{    
            try {
                const response = await axios.get(`http://localhost:3000/api/user/profileInfo/${state.user && state.user._id}`)
                const data = response.data
                setProfileForm({name:data.userInfo.name,username:data.userInfo.username,email:data.userInfo.email});
                
            } catch {
                return null          
            }
        }
        getUserInfo()
    },[state.user])

  return (
    <div className="pt-25 profile-page 2xl:pt-45">
        <div className="flex flex-col justify-center items-center gap-8 min-h-[95vh]">
            {/* PROFILE PICTURE */}
            <div className="flex flex-col items-center gap-2">
                {/* HEADER */}
                <p className="text-2xl font-bold 2xl:text-7xl">Profile</p>
                
                {/* IMAGE */}
                <input type="file" name="image" ref={imageRef} className="hidden" accept="image/*" onChange={uploadPic}/>
                <img src={state.user && state.user.image? `http://localhost:3000/images/${state.user.image}`:user} alt="profile picture" className="rounded-full w-30 h-30 cursor-pointer object-cover 2xl:w-80 2xl:h-80" onClick={()=>{imageRef.current.click()}}/>

                {/* MEMBER SINCE */}
                <p className="2xl:text-5xl">Member since : {state.user && dayjs(state.user.createdAt).format("MMMM-DD (YYYY)")}</p>

                {/* ALERTS */}
                {success && <div className="p-3 border-l-4 border-green-500 bg-green-300 text-green-800 font-semibold rounded-lg shadow-sm 2xl:shadow-2xl 2xl:border-l-15 2xl:p-10 2xl:my-5 2xl:text-5xl">{success}</div>}
                {error && <div className="p-3 border-l-4 border-red-500 bg-red-300 text-red-800 font-semibold rounded-lg shadow-sm 2xl:shadow-2xl 2xl:border-l-15 2xl:p-10 2xl:my-5 2xl:text-5xl">{error}</div>}
            </div>

            {/* USER INFORMATION */}
            <form onSubmit={updateProfile} className="flex flex-col gap-4 w-[90%] p-5 bg-gray-700 rounded-[10px] 2xl:gap-8">
                <p className="flex flex-wrap items-center gap-2 text-2xl font-bold 2xl:text-5xl">User <span className="flex items-center gap-1 2xl:gap-3">Information <FaUserCircle/></span></p>
                <div className="flex flex-wrap items-center justify-between bg-gray-600 py-1 px-2 font-bold rounded-[5px] 2xl:text-4xl 2xl:px-5 2xl:py-3">
                    <p>Name :</p>
                    <input type="text" className="flex-1 rounded-[5px] outline-none focus:ring-2 focus:ring-cyan-300 border border-gray-500 text-right" value={profileForm.name} onChange={(e)=>{setProfileForm(prevInfo=>({...prevInfo,name:e.target.value.trim()}))}}/>
                </div>
                <div className="flex flex-wrap items-center justify-between bg-gray-600 py-1 px-2 font-bold rounded-[5px] 2xl:text-4xl 2xl:px-5 2xl:py-3">
                    <p>Username :</p>
                    <input type="text" className="flex-1 rounded-[5px] outline-none focus:ring-2 focus:ring-cyan-300 border border-gray-500 text-right" value={profileForm.username} onChange={(e)=>{setProfileForm(prevInfo=>({...prevInfo,username:e.target.value.trim()}))}}/>
                </div>
                <div className="flex flex-wrap items-center justify-between bg-gray-600 py-1 px-2 font-bold rounded-[5px] 2xl:text-4xl 2xl:px-5 2xl:py-3">
                    <p>Email :</p>
                    <input type="text" className="flex-1 rounded-[5px] outline-none focus:ring-2 focus:ring-cyan-300 border border-gray-500 text-right" value={profileForm.email} onChange={(e)=>{setProfileForm(prevInfo=>({...prevInfo,email:e.target.value.trim()}))}}/>
                </div>

                <Button loading={loading} buttonText="Update Profile" />
                {/* ALERTS */}
                {profileSuccess && <div className="p-3 border-l-4 border-green-500 bg-green-200 text-green-700 font-semibold rounded-lg shadow-sm w-[50%]">{profileSuccess}</div>}
                {profileError && <div className="p-3 border-l-4 border-red-500 bg-red-200 text-red-700 font-semibold rounded-lg shadow-sm md:w-[50%]">{profileError}</div>}
            </form>

            {/* PASSWORD UPDATING */}
            <form onSubmit={changePassword} className="flex flex-col gap-4 w-[90%] p-5 bg-gray-700 rounded-[10px] 2xl:gap-8">
                <p className="flex flex-wrap items-center gap-2 text-2xl font-bold 2xl:text-5xl">Password <span className="flex items-center gap-1 2xl:gap-3">Updation <TbPasswordUser/></span></p>
                <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-600 py-1 px-2 font-bold rounded-[5px] 2xl:text-4xl 2xl:px-5 2xl:py-3">
                    <p className="flex items-center gap-1">Current Password <TbLockPassword/>:</p>
                    <input type="password" className="flex-1 rounded-[5px] outline-none focus:ring-2 focus:ring-cyan-300 border border-gray-500" value={passwordForm.currentPassword} onChange={(e)=>{setPasswordForm(prevForm=>({...prevForm,currentPassword:e.target.value.trim()}))}}/>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-600 py-1 px-2 font-bold rounded-[5px] 2xl:text-4xl 2xl:px-5 2xl:py-3">
                    <p className="flex items-center gap-1">New Password <TbPasswordFingerprint/>:</p>
                    <input type="password" className="flex-1 rounded-[5px] outline-none focus:ring-2 focus:ring-cyan-300 border border-gray-500" value={passwordForm.newPassword} onChange={(e)=>{setPasswordForm(prevForm=>({...prevForm,newPassword:e.target.value.trim()}))}}/>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-600 py-1 px-2 font-bold rounded-[5px] 2xl:text-4xl 2xl:px-5 2xl:py-3">
                    <p className="flex items-center gap-1">Confirm Password <TbPasswordFingerprint/>:</p>
                    <input type="password" className="flex-1 rounded-[5px] outline-none focus:ring-2 focus:ring-cyan-300 border border-gray-500" value={passwordForm.confirmPassword} onChange={(e)=>{setPasswordForm(prevForm=>({...prevForm,confirmPassword:e.target.value.trim()}))}}/>
                </div>
                <Button loading={loading} buttonText="Change Password"/>
                {/* ALERTS */}
                {passwordSuccess && <div className="p-3 border-l-4 border-green-500 bg-green-200 text-green-700 font-semibold rounded-lg shadow-sm w-[50%]">{passwordSuccess}</div>}
                {passwordError && <div className="p-3 border-l-4 border-red-500 bg-red-200 text-red-700 font-semibold rounded-lg shadow-sm md:w-[50%]">{passwordError}</div>}
            </form>
        </div>
    </div>
  )
}

export default Profile