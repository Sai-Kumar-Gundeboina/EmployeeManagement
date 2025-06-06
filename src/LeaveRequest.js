import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style';

export default function LeaveRequest() {
    const navigate = useNavigate();
    const [LeaveeRequestForm, setLeaveForm] = useState({date:"", reason:""})
    const handleChange = (e)=>{
      setLeaveForm({...LeaveeRequestForm, [e.target.name]:e.target.value})
    }
    const handleSubmitLeaveForm = async (e)=>{
      e.preventDefault();
      try{
        const token = localStorage.getItem("token");
        const res = await axios.post('http://localhost:1880/request-leave', LeaveeRequestForm, {
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        alert("Leave Request processed Successfully");
        navigate("/dashboard-user")
      }
      catch(err){
        console.log(err);
      }
      
      
    }
  return (
    <div style={styles.container}>
        <h1 style={styles.heading}>Leave Request Form</h1>
        <form >
            <label style={styles.label}>Date:</label>
            <input 
              type="date" 
              name="date"
              onChange={handleChange}
              value={LeaveeRequestForm.date}
              style={styles.input}
              required/>
            <br/>
            <label style={styles.label}>Reason:</label>
            <input 
              type="text" 
              placeholder='Enter the reason'
              name="reason"
              required
              style={styles.input}
              onChange={handleChange}
              value={LeaveeRequestForm.reason}
              />
            <br/>
            <button style={styles.button}onClick={handleSubmitLeaveForm}>submit</button>
            <button style={styles.cancelButton}onClick={()=>{navigate("/dashboard-user")}}>Cancel</button>
        </form>
    </div>
  )
}
