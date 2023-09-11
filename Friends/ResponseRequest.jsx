import axios from "axios";
import { useEffect ,useContext,useState } from "react";
import { UserContext } from "../UserContext/UserContext";



const ResponseRequest = () => {
  const {data,setData}=useContext(UserContext)
  const [userData,setUserData]=useState([])



  const acceptRequest=async(senderId,objectId)=>
  {

   const updatedData={
    objectId:objectId,
    senderId:senderId,
    recieverId:data?.aridnoExist?._id
   }   

    await axios.post("http://localhost:5000/responseRequest",updatedData).then((res)=>{
        console.log(res)
        if(res)
        {
           const hwawai= userData.filter(item=>item._id !== senderId)
           setUserData(hwawai)
           window.location.reload();
        }
    }).catch((e)=>{
        console.log(e)
    })
  }



    const fetchAllRequestedFriend=async()=>{

        
        try{
            const response= await axios.get(`http://localhost:5000/requestedFriend/${data?.aridnoExist?._id}`)
            setUserData(response?.data)
            console.log(response?.data)
            // console.log(response.data)
        }
        catch(err)
        {
            console.log(err)
        }
       

    }
    useEffect(()=>{

        fetchAllRequestedFriend();
    },[])

    // console.log(userData)

    return ( 
        <>
          <div class="BoxForFriendCard">
          <div className="LMSBar">

          <div className="LMSTitle">

        <h5 className="LMSHeading">Friend Requests</h5>
      </div>
    </div>

    <div className="FriendCard-Container">
            {
                    userData.map((item)=>(
<div class="FriendRequestCard">
                       
                        
        <div className="wrapper">
          <div className="circle-container">


                    
                    <img className="preview-Image" src={item.senderProfile} alt="Card Profile" />
                    </div>    
                </div>
                    <h2 className="titleOfFriendReqCard">{item.senderName}</h2>
                    <div className="buttons-container">
                    <button className="AddFriendBtn" onClick={()=>{acceptRequest(item.senderId,item._id)}}>
                        Accept
                    </button>
                    <button className="DeleteBtn">Cancel</button>
                    </div>
                    </div>
                
                    ))}
             </div>
      
    </div>
      
        </>
     );
}
 
export default ResponseRequest;