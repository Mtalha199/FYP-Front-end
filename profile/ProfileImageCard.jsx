import React from "react";
import { useState } from "react";
import camIcon from "../Images/camera-regular-24.png"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../UserContext/UserContext";
import { useContext } from "react";



const ProfileImageCard = () => {
  const {data,setData} =useContext(UserContext);

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
     

    const selectedImage = event.target.files[0];
    // setImage(URL.createObjectURL(selectedImage));
    setImage(selectedImage)
  ;
}

const formData = new FormData();
formData.append("image", image);
const id=data?.aridnoExist?._id;
  const postImage=async()=>{
    
    if (!image) {
      toast.error("Please select an image");
      return;

    }
    toast.success("Profile Photo is updating")


    await axios.put(`http://localhost:5000/profileImage/${id}`,formData,{
      headers:{
        
        "Content-Type":"multipart/form-data",
      }
  }).then((res)=>{
    const updatedImageObj={
      ...data,aridnoExist:{
        ...data.aridnoExist,imageUrl:res.data.imageUrl
      }
    }
    setData(updatedImageObj)
    window.location.reload();
}).catch((err)=>{
    toast.error(err.response.data)
    
})
  }

  return (
    <div className="profile_uploader-btn" >
      <label>
        <input
          className="profile_input-btn"
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="profileCamera_icon">
          <img className="camera_icon" src={camIcon} />
        </div>
      </label>

      <div className="profile_image-prev">
        <img className="profile_image" src={data?.aridnoExist?.imageUrl} alt="Profile" />
      </div>
      <button className="profileBtn" onClick={postImage}>Upload Profile</button>
      <ToastContainer />
    </div>
            

  );
};

export default ProfileImageCard;
