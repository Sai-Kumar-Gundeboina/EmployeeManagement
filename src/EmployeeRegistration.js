import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import styles from './style';

export default function EmployeeRegistration() {
    const navigate = useNavigate();
    const [RegisterForm, setForm] = useState({username:"", email:"", password:"", role:"employee"})
    const handleCancel = ()=>{
        navigate("/dashboard-admin")
    }
    const handleSave = async () => {
     try {
       const token = localStorage.getItem("token");
       const res = await axios.post("http://localhost:1880/register-employee", RegisterForm, {
         headers: {
           Authorization: `Bearer ${token}`
         }
       });
       alert("Registered Successfully..");
       navigate("/dashboard-admin")
     } catch (err) {
       console.error(err);
        alert("Failed to Register..")
    }
  };
  const handleChange = (e)=>{
    setForm({...RegisterForm, [e.target.name]:e.target.value    })
  }
  
  return (
    <div style={styles.container}>
        <h1 style={styles.heading}>Employee Registration</h1>
        <label style={styles.label}>Username: </label>
        <input 
            type='text'
            placeholder='user name'
            onChange={handleChange}
            value={RegisterForm.username}
            name="username"
            style={styles.input}
            required/>
        <br/>
        <label style={styles.label}>Email: </label>
        <input 
            type='email'
            placeholder='email id'
            onChange={handleChange}
            name='email'
            style={styles.input}
            value={RegisterForm.email}
            required/>
        <br/>
        <label style={styles.label}>Password: </label>
        <input 
            name='password'
            value={RegisterForm.password}
            type='password'
            placeholder='password'
            onChange={handleChange}
            style={styles.input}
            required/>
        <br/>
        <label style={styles.label}>Role: </label>
        <select style={styles.select} name='role' value={RegisterForm.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="employee" selected>Employee</option>
        </select>
        <br/>
        <button style={styles.button} onClick={handleSave}>Save</button>
        <button style={styles.cancelButton} onClick={handleCancel}>Cancel</button>
    </div>
  )
}
