import searchPnG from "../Images/search.png";
import { useNavigate } from "react-router-dom";
import homeButton from "../Images/home-button.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import("../AllNavbar/serchBox.css");

const TopNavbar = () => {
  const navigate = useNavigate();

  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState("");
  const userProfile = localStorage.getItem("userProfile");

  const searchBox = async () => {
    setShowResults(!showResults);
    await axios
      .get(`http://localhost:5000/search?query=${query}`)
      .then((res) => {
        if (res) {
          setUserData(res?.data);
        }
        console.log(res?.data);
      })
      .catch((err) => {
        console.log(err);

        setUserData(err?.response?.data);
      });
  };
  const goToUserProfile = (userId) => {
    console.log(userId);
    navigate(`/dashboard/userprofile/${userId}`);
    window.location.reload();
  };
  return (
    <>
      <nav className="top-navbar">
        <h1 className="navbar-logo">✧Talksians</h1>

        <div className="nav-left">
          <div className="search-box ">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              // onClick={setShowResults(false)}
            />
            <img
              className="left-Nav-img"
              src={searchPnG}
              onClick={() => searchBox()}
            />

            {showResults && (
              <ul className="search-bar-list">
                {userData == " User Not Exist" ? (
                  <li className="search-bar-list-item">user does not exist</li>
                ) : (
                  <li className="search-bar-list-item">
                    <div className="SearchBarImagecircle-container">
                      <img
                        className="Seacrhbar-preview-Image"
                        src={userData.imageUrl}
                        alt="Card Profile"
                        onClick={() => goToUserProfile(userData._id)}
                      />
                    </div>
                    <div>
                      <p className="searchbarName">{userData.name}</p>
                    </div>
                  </li>
                )}
              </ul>
            )}
          </div>
          <ul id="home">
            <Link to="/dashboard">
              <li>
                <img className="left-Nav-img" src={homeButton} />
              </li>
            </Link>
          </ul>
        </div>
        <div className="nav-right">
          <div className="nav-user-icon online">
            <div className="TopNavCircle-container">
              {" "}
              <img className="topNavpreview-Image" src={userProfile} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNavbar;
