import camIcon from "../Images/camera-regular-24.png"
import { useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CoverImageCard = () => {

  const {data,setData} =useContext(UserContext);

        const [image, setImage] = useState(null);
      
        const handleCoverImageChange = (event) => {
          const selectedImage = event.target.files[0];
          // setImage(URL.createObjectURL(selectedImage));
          setImage(selectedImage)
        }
        const formData = new FormData();
formData.append("image", image);
const id=data?.aridnoExist?._id;
  const postCoverImage=async()=>{
    
    if (!image) {
      toast.error("Please select an image");
      return;
    }
   toast("Cover Image is Updating")


    await axios.put(`http://localhost:5000/coverImage/${id}`,formData,{
      headers:{
        
        "Content-Type":"multipart/form-data",
      }
  }).then((res)=>{
    console.log(res.data.coverImageUrl)
    const updatedCoverImageObj={
      ...data,aridnoExist:{
        ...data.aridnoExist,coverImageUrl:res.data.coverImageUrl
      }
    }
    setData(updatedCoverImageObj)
    console.log(updatedCoverImageObj)
    window.location.reload();
}).catch((err)=>{
    toast.error(err.response.data)
    
})
  }
    return ( 
        <>
 <div className="Cover_uploader-btn">
      <label>
        <input
          className="Cover_input-btn"
          type="file"
          hidden
          accept="image/*"
          onChange={handleCoverImageChange}
        />
        <div className="camerra_icon">
          <img  src={camIcon} />
        </div>
      </label>

      <div className="cover_image-prev">
        <img className="cover_image" src={data?.aridnoExist?.coverImageUrl} alt="Profile" />
      </div>
      <button className="coverBtn" onClick={ postCoverImage}>POST</button>
    </div>
    <ToastContainer />

        </>
     );
}
 
export default CoverImageCard;