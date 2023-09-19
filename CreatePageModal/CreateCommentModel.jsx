import axios from "axios";
import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../CreatePageModal/commentModelStyle.css"
import MsgSendIcon from "../Images/send-message.png";
import { useNavigate } from "react-router-dom";

// import userImage from "../Dashboard/DashboardImages/member-1.png";
// import sendIcon from "./send-message.png";
import { FaRegCommentAlt } from "react-icons/fa";

function CommentSection(props) {
    const {postid}=props;
    // console.log(comments)
    console.log(postid)
    const navigate=useNavigate();
    const userId=localStorage.getItem('userId')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [writeComment ,setWriteComment]=useState('')
  const [comments,setComments]=useState([])


  const handleChange=(e)=>{
setWriteComment(e.target.value)
  }
  // console.log(writeComment)
  const postComment=async()=>{
    // alert('hsdkjl')
    const updatedCommentData={
        postId:postid,
        userId:userId,
        userComment:writeComment

    }
    console.log(updatedCommentData)
await axios.post("http://localhost:5000/comment/userComment",updatedCommentData).then((res)=>{
  // console.log(res.data)
}).catch((err)=>{
  console.log(err)
})
// alert("post comment ")
// console.log(response)
// if(response){
 
// }
const response1=await axios.get(`http://localhost:5000/comment/postOfComment/${postid}`)
console.log(response1)
const commentData1=response1?.data
setComments(commentData1)

}

const buttonHandler=()=>{
  handleShow()
  showCommentData()
}
const showCommentData=async()=>{
const response=await axios.get(`http://localhost:5000/comment/postOfComment/${postid}`)
const commentData=response?.data
setComments(commentData)
}
// console.log(comments)
const clearForm=()=>{
  setWriteComment('')
    }
    const checkProfile = (userId) => {
      console.log(userId)
      return navigate(`/dashboard/userprofile/${userId}`);
    };
  return (
    <>
      <Button className="modal-comment-btn" onClick={buttonHandler}>
        <FaRegCommentAlt />
         Comment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-title">
          <Modal.Title>Add a Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body  comment">
          <div className="CommentContainer">
            
            <div className="Comment-Body">
                {
                    comments.map((item)=>(


                        <div className="comment user-comment">
                        <div className="moveImage">
                          <div className="comment-user-imagee-circlee">
                            <img
                              className="comment-user-imagee"
                              src={item.user.imageUrl}
                              alt=""
                              onClick={()=>checkProfile(item.user._id)}
                            />
                          </div>
                        </div>
                        <div>
                            
                          <p className="comment-text">
                            <span class="new-line-span">{item.user.name}</span>
                            {/* In this article, we will learn how to add icons to the
                             button. */}
                             {/* {item.userComment} */}
                            
                             {item.comment}
                             
                
                          </p>
                        </div>
                      </div>
                     ))
                }  
         
            </div>
            <div className="comment-input">
              <input 
              type="text" placeholder="Write a comment..." value={writeComment} onChange={handleChange}/>
              <button className="post-comment-btn" onClick={()=>{postComment();
                    clearForm();
                  }}>
                <img src={MsgSendIcon} alt="" width={25} height={20} />
              </button>
            </div>
          </div>
          
        </Modal.Body>
     
      </Modal>
    </>
  );
}

export default CommentSection;