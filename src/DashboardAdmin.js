import React from 'react'
import {  useNavigate } from 'react-router-dom';
import styles from './style';

export default function DashboardAdmin() {
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
  const handleRegisterEmp = ()=>{
    navigate("/register-employee")
  }
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>You are logged in as Admin</h1>
      <button style={styles.button} onClick={handleRegisterEmp}>Register an Employee</button>
      <button style={styles.button} onClick={()=>navigate("/Employee-List-View")}>Employee list</button>
      <button style={styles.button} onClick={()=>{navigate("/Leave-Request-View")}}>Leave Requests</button>
      <br/>
      <br/>
      <button style={styles.cancelButton} onClick={handleLogout}>Logout</button>
    </div>
  )
}
