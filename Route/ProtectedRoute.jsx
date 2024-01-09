import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const {Component} =props;
    const navigate=useNavigate();
    const userToken=localStorage.getItem('userToken');
    useEffect(()=>{
        // debugger
        if(userToken===null ){
        navigate('/login')
    }
    })



    return ( 
      


        <>

            <Component />

        </>
     );
}
 
export default ProtectedRoute;