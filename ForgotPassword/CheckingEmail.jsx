import { useState } from "react";
import logo from "../Images/uniLogo.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
const CheckingEmail = () => {
  const navigate=useNavigate();
  let initialValues = {
    checkEmail: "",
  };

  const [email, setEmail] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = () => {
    
    axios.post("http://localhost:5000/checkEmail",email).then((res)=>{
      if(res)
      {

        return navigate('/checkingOtp', { state: { email: email} })
        // return navigate("/checkingOtp");
      }
    }).catch((err)=>{
      toast.error(err.response.data)
    })
  };
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
            <input
              type="text"
              required="required"
              name="checkEmail"
              value={email.checkEmail}
              onChange={(e) => handleChange(e)}
            />
            <span>Email</span>
          </div>
          {/* <Link to='/forgottorecovery'> */}
          <button className="Loginbtn" type="submit" onClick={submit}>
            Verify
          </button>
          {/* </Link> */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CheckingEmail;
