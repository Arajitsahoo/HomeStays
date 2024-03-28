import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Modal = ({setPopup}) => {
    const navigate =useNavigate()
    const [otp, setOtp] = useState(0)
    const hanldeOtp = async (e) => {
        e.preventDefault();
    const {email, name, password} = JSON.parse(localStorage.getItem('user'))
        try {
            const response = await axios.post("http://localhost:4000/otp/verifyOtp", {email, otp: Number(otp)})
            toast.success(response.data.message);
            if(response.statusText === "OK"){
                await axios.post("http://localhost:4000/user/register", {email, name, password})
                toast.success(`${name} Registered Successfully`)
                setPopup(false)
                localStorage.removeItem('user')
                navigate('/login')
            }

        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
    return (
    <div>
      <div className="w-screen h-screen bg-opacity-30 fixed top-50 right-0 flex justify-center ">
        
        <div className="bg-white p-10 rounded-md shadow-lg w-[25rem] h-[20rem]">
          
          <h1 className="font-bold text-center text-lg my-5">Enter OTP</h1>
          {/* <p>Sent OTP to : {user.email}</p> */}
          <div className="flex justify-center items-center w-80 ">
            
            <OtpInput
              inputType="number"
              inputStyle={{
                height: "3rem",
                width: "3rem",
                border: "1px solid rgba(0,0,0,.3)",
              }}
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <div className="flex justify-center items-center mt-4">
            <p id="timer">
              {/* <Timer setPopup={setPopup} /> */}
            </p>
          </div>
          <div className="flex justify-between mt-5">
            
            <button
              className="outline outline-1 outline-[#101f20] bg-[#101f20] text-white py-2 px-4 hover:bg-transparent hover:text-black"
              onClick={() => setPopup(false)}
            >
              No, Cancel
            </button>
            <button
              className="outline outline-1 outline-[#101f20] hover:bg-[#101f20] hover:text-white py-2 px-4 bg-transparent text-black"
              onClick={hanldeOtp}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
