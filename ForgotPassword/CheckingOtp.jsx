import { useState } from "react";
import logo from "../Images/uniLogo.png";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CheckingOtp=()=>{
  const {state }= useLocation();
  // console.log("jksd",state)
  const { email } = state;
  // console.log("talha",email.checkEmail)
    const navigate=useNavigate();
    const initialForm={
        otp:''
    }

    const [otp,setOtp]=useState(initialForm)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOtp((prev) => ({
          ...prev,
          [name]: value,

        }));
      };
      const otpUpdated={
        otp:otp.otp,
        email:email.checkEmail
      }
      // console.log(otpUpdated.email)
      const verifyOtp=()=>{
        axios.post("http://localhost:5000/checkOtp",otpUpdated).then((res)=>{
            if(res)
            {
              return navigate("/forgotToRecovery",{state:{email:otpUpdated.email}});
            }
          }).catch((err)=>{
            toast.error(err.response.data)
          })
      }
    return(
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
            <input
              type="text"
              required="required"
              name="otp"
              value={otp.otp}
              onChange={(e) => handleChange(e)}
            />
            <span>OTP</span>
          </div>
          {/* <Link to='/forgottorecovery'> */}
          <button className="Loginbtn" type="submit" onClick={verifyOtp} >
            Verify
          </button>
          {/* <button className="Loginbtn" type="submit" >
            Resend Code
          </button> */}
          {/* </Link> */}
        </div>
      </div>
      <ToastContainer />

        </>
    )
}
export default CheckingOtp;