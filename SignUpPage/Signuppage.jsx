import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";
import logo from "../Images/uniLogo.png";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateCNIC, validateAridNo, validateEmail } from "../Validations";

function Signuppage() {
  const navigate = useNavigate();
  const initialValues = {
    aridNo: "",
    name: "",
    cnic: "",
    fatherName: "",
    email: "",
    password: "",
    cpassword: "",
  };
  const [error, setError] = useState();
  const [form, setForm] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filedValidations = () => {
    setError(!error);
  };

  const handleSubmit = () => {
    

    toast.error(error);
    if (!validateAridNo(form.aridNo)) {
      return setError("Please Enter Arid No in specific Format(xx-ARID-XXXX).");
    } else if (!form.name) {
      return setError("Please Enter your Name");
    } else if (!validateCNIC(form.cnic)) {
      return setError("Enter your CNIC in specific Format (xxxxx-xxxxxxx-x");
    } else if (!form.fatherName) {
      return setError("Enter your Father Name");
    } else if (!validateEmail(form.email)) {
      return setError("Enter Email in Correct Format");
    } else if (!form.password) {
      return setError("Enter your password");
    } else if (!form.cpassword) {
      return setError("Enter confirm password");
    } else if (form.password !== form.cpassword) {
      return setError("password should be match");
    }
    
    {
      let formData = {
        aridno: form.aridNo,
        name: form.name,
        cnic: form.cnic.replace(/-/g, ""),
        fathername: form.fatherName,
        email: form.email,
        password: form.password,
      };
      axios
        .post("http://localhost:5000/signup", formData)
        .then((res) => {
          console.log("posting data");
          toast.success("You are Registered");
          navigate("/Login");
        })
        .catch((err) => {
          console.log(err?.response?.data);
          toast.error(err?.response?.data);
        });
    }
  };

  return (
    <div className="parent">
      <div className="child1">
        <div className="heading">
          <h1 className="headinglogo">✧Talksians</h1>
          <img src={logo} alt="logo" width="70px" />
        </div>
      </div>
      <div className="child2">
        <p className="HeadingTitle">Register Your Account</p>
        <div className="inputBox">
          <input
            type="text"
            name="aridNo"
            required
            value={form.aridNo}
            onClick={() => filedValidations()}
            onChange={(e) => handleChange(e)}
          />
          <span>00-ARID-0000</span>
        </div>
        <div className="inputBox">
          <input
            type="text"
            required
            name="name"
            onClick={() => filedValidations()}
            value={form.name}
            onChange={(e) => handleChange(e)}
          />
          <span>Enter Name</span>
        </div>
        <div className="inputBox">
          <input
            type="text"
            required
            onClick={() => filedValidations()}
            name="cnic"
            value={form.cnic}
            onChange={(e) => handleChange(e)}
          />
          <span>CNIC 00000-0000000-0</span>
        </div>
        <div className="inputBox">
          <input
            type="text"
            required
            onClick={() => filedValidations()}
            name="fatherName"
            onChange={(e) => handleChange(e)}
            value={form.fatherName}
          />
          <span>Father Name</span>
        </div>
        <div className="inputBox">
          <input
            type="text"
            required
            name="email"
            onClick={() => filedValidations()}
            onChange={(e) => handleChange(e)}
            value={form.email}
          />
          <span>Enter Your Email</span>
        </div>
        <div className="inputBox">
          <input
            type="password"
            required
            onClick={() => filedValidations()}
            name="password"
            onChange={(e) => handleChange(e)}
            value={form.password}
          />
          <span>Password </span>
        </div>
        <div className="inputBox">
          <input
            type="password"
            required
            name="cpassword"
            onClick={() => filedValidations()}
            onChange={(e) => handleChange(e)}
            value={form.cpassword}
          />
          <span>Confirm Password </span>
          {/* {error? <><p style={{color:'red'}}>{toast.error(error) }</p></>:<></>} */}
        </div>
        <button className="Loginbtn" type="button" onClick={(e) => handleSubmit(e)}>
          Register
        </button>
        <Link to="/login"> Do you have an account ? Login</Link>
      </div>

      <ToastContainer />
    </div>
  );
}
export default Signuppage;
