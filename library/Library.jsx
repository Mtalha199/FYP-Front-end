import "../library/Library.css"
import { UserContext } from "../UserContext/UserContext";
import { useContext, useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import CreateBookModel from "../CreatePageModal/CreateBookModel";
import axios from "axios";
const Library = () => {
  const {data,setData}=useContext(UserContext)
  const isAdmin=data?.aridnoExist?.isAdmin;
  const [books,setBooks]=useState([])


  const fetchAllPages = async () => {
    axios
      .get("http://localhost:5000/showBooks")
      .then((res) => {
        console.log(res.data);
        setBooks(res?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };






  useEffect(() => {
    fetchAllPages();
  }, []);

  const deleteBook=async(bookId)=>{

    const response=await axios.put(`http://localhost:5000/deleteBook/${bookId}`)
    toast.success(response.data)
    window.location.reload();

}
    return ( 
        <>
<div className="divaa">
{
    isAdmin==='TARAR' ? <CreateBookModel /> : null
  }


<div className="Books-Container">
 
{
  books.map((item)=>(
    <div className="Book-Card">
        <div className="BookCard-ImageDiv">
          <img
            className="Book-Image-Preview"
            src={item.bookCover}
            alt="Book-Cover"
          />
        </div>

        <div className="Book-TitleDiv">
          <div className="book-contants">
            <p className="para">
              <span className="book-span">{item.bookName}</span>
            </p>
            <p className="para">
              <span className="book-span">Author:</span>{" "}
              <span className="name-span">{item.bookAuthor}</span>
            </p>
            <p className="para">
              <span className="book-span">Edition:</span>{" "}
              <span className="name-span">{item.bookEdition}</span>
            </p>
          </div>
        </div>

        <div>
          {" "}
          <a className="Download-Link" target="_blank"  href={item.bookPdf}>
            Download
          </a>
          {
            isAdmin==='TARAR' ?<button className="library-delete-btn"  onClick={()=>deleteBook(item._id)}>Delete</button>:null
          }
          
        </div>
      </div>


  ))
}
      

     
      </div>
      <ToastContainer />
      </div>
        </>
     );
}
 
export default Library;