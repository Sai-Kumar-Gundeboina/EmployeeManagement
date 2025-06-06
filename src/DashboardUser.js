import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style';

export default function DashoardUser() {
  const navigate = useNavigate();
  const handleLogout=()=>{
    fetch('http://localhost:1880/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: localStorage.getItem('role') 
      })
    });
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/");
  }
  
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dashoard-User</h1>
      <button style={styles.button} onClick={()=>{navigate("/request-leave")}}>Leave Request</button>
      <button style={styles.button} onClick={()=>{navigate('/Leave-Request-View')}} >View Leaves</button>
      <button style={styles.button} onClick={()=>{navigate('/Employee-List-View')}} >View Employees</button>
      <button style={styles.cancelButton} onClick={handleLogout} >Logout</button>
    </div>
  )
}
