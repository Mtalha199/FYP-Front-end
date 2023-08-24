import "font-awesome/css/font-awesome.min.css";
import Signuppage from "../src/SignUpPage/Signuppage";
import Loginpage from "../src/LoginPage/Loginpage";
import Dashboard from "../src/Dashboard/Dashboard";
import Error from "./Route/Error";
import { Route,Routes } from "react-router-dom";
import Timeline from "./Timeline/Timeline";
import Friends from "./Friends/Friends";
import Layout from "./layout/Layout";
import ProtectedRoute from "./Route/ProtectedRoute";
import CheckingEmail from "./ForgotPassword/CheckingEmail";
import CheckingOtp from "./ForgotPassword/CheckingOtp"
import ForgotToRecovery from "./ForgotPassword/ForgotToRecovery";
import Profile from "./profile/Profile";
import ResponseRequest from "./Friends/ResponseRequest";
import MyProvider from "./UserContext/MyProvider";
import AllFriend from "./profile/AllFriend";
import Pages from "./Pages/Pages";
import DashboardToProfile from "./profile/DashboardToProfile";
import Library from "./library/Library";
import PagesToPage from "./Pages/PagesToPage";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  return (
    <>
<MyProvider >
<Routes>
<Route exact path="/Login" element={<Loginpage />}></Route>
  <Route path="/signuppage" element={<Signuppage />}></Route>
  <Route path="/checkingEmail" element={<CheckingEmail />}></Route>
  <Route path="/checkingOtp" element={<CheckingOtp />}></Route>
  <Route path="/forgottorecovery" element={<ForgotToRecovery />}></Route>
  <Route path="/" element={  <ProtectedRoute  Component={Layout} />}>
  <Route index element={<Dashboard/>}></Route>
  <Route path="dashboard" index  element={<Dashboard />}></Route>
  <Route path="dashboard/userprofile/:userId" element={<DashboardToProfile />}></Route>
  <Route path="pages" element={<Pages />}></Route>
  <Route path="dashboard/page/:pageId" element={<PagesToPage />}></Route>
  <Route path="timeline" element={<Timeline />}></Route>
  <Route path="friends" element={<Friends />}></Route>
  <Route path="friendRequests" element={<ResponseRequest />}></Route>
  <Route path="allfriends" element={<AllFriend />}></Route>
  <Route path="library" element={<Library />}></Route>
  <Route path="/profile" element={<Profile />}></Route>
</Route>
  <Route path="*" element={<Error />}></Route>
</Routes>
</MyProvider>
    </>
  );
}
export default App;
