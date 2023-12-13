import { useState } from "react";
import logo from "../Images/uniLogo.png"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ForgotToRecovery = () => {
const navigate=useNavigate();
  const {state}=useLocation();
  // console.log(state)
  const {email}=state;
  // console.log("tarar ala email",email)

const initialForm={
  password:'',
  confirmpassword:''
}

  const [newPassword,setNewPassword]=useState(initialForm)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(newPassword)
  }
  const updatedpassword={
    password:newPassword.password,
    email:email
  }
  // console.log(updatedpassword)
  const handleSubmit=()=>{
      if(newPassword.password!==newPassword.confirmpassword)

      {
        toast.error("Password should be match")
      }

      else
      {

        axios.post("http://localhost:5000/updateNewPassword",updatedpassword).then((res)=>{

        navigate("/login")
         toast.success("updated")
        }).catch((err) => {
          console.log(err);
          toast.error(err?.response?.data);
        });
      }
  }
    return ( 
        <>
               <div className="parent">
      <div className="child1">
        <div className="heading">
          <h1 className="Talk">✧Talksians</h1>
           <img src={logo} alt="logo" width="70px" />
        </div>
      </div>
      <div className="child2">
        <h1 className="HeadingTitle">Account Recovery</h1>
        <div className="inputBox">
          <input type="password" required="required" name="password"  
          value={newPassword.password}
              onChange={(e) => handleChange(e)}
              />
          <span>New Password</span>
        </div>
        <div className="inputBox">
          <input type="password" required="required" name="confirmpassword" 
          value={newPassword.confirmpassword}
              onChange={(e) => handleChange(e)} 
               />
          <span>Confirm Password</span>
        </div>
            {/* <Link to='/login'> */}
          <button className="Loginbtn" type="submit" onClick={handleSubmit}>
            Verify
          </button>
          {/* </Link> */}
      </div>
    </div>
    <ToastContainer />
        </>
     );
}

 
export default ForgotToRecovery;