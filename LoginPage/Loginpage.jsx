import "../SignUpPage/SignupPage.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../Images/uniLogo.png";
import { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../UserContext/UserContext";
// import { MyContext } from "../UserContext/MyContextProvider";
function Loginpage() {
  const {data,setData}=useContext(UserContext)
  // console.log(data)
  const navigate = useNavigate();
  const login = () => {
 
    axios
      .post("http://localhost:5000/login", loginForm)
      .then((res) => {
        if (res?.data?.token !== "undefined") {
          localStorage.setItem("userToken", res?.data?.token);
          localStorage.setItem("userId",res?.data?.aridnoExist._id)
          localStorage.setItem("userName",res?.data?.aridnoExist.name)
          localStorage.setItem("userProfile",res?.data.aridnoExist.imageUrl)
          console.log(res.data)
          setData(res.data)
          // console.log(hoyaE)
          return navigate("/");
        } else {
          toast("unauthorized user");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data);
      });
  };
  const initialform = {
    aridNo: "",
    password: "",
  };
  const [loginForm, setLoginForm] = useState(initialform);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <Link>
        <div className="parent">
          <div className="child1">
            <div className="heading">
              <h1 className="Talk">✧Talksians</h1>
              <img src={logo} alt="logo" width="70px" />
            </div>
          </div>

          <div className="child2">
            <h1 className="HeadingTitle">Login Into Your Account</h1>
            <div className="inputBox">
              <input
                type="text"
                required
                name="aridNo"
                value={loginForm.aridNo}
                onChange={(e) => handleChange(e)}
              />
              <span>00-ARID-0000</span>
            </div>

            <div className="inputBox">
              <input
                type="password"
                required
                name="password"
                value={loginForm.password}
                onChange={(e) => handleChange(e)}
              />
              <span>Password </span>
            </div>
            <button className="Loginbtn" onClick={() => login()}>
              Login
            </button>
            <Link to="/signuppage">Dont have account ? Register</Link>
            <Link to="/checkingEmail">Forget Password ?</Link>
          </div>
        </div>
      </Link>
      <Outlet />
      <ToastContainer />
    </>
  );
}
export default Loginpage;
