import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './style';

export default function Login() {
    const [form, setForm]=useState({email:"", password:""});
    const navigate = useNavigate();
    const handleChange= (e)=>{
        const {name, value} = e.target;
        setForm((form)=>({...form, [name]:value}));
    };
    const login = async (e) => {
      e.preventDefault();
    if (!form.email || !form.password) {
      alert("Please enter both username and password");
      return;
    }
 
    try {
      const res = await axios.post("http://localhost:1880/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      if (res.data.role ==="admin"){
        navigate("dashboard-admin");
      }
      else{
        navigate("dashboard-user");
      }
      alert("Login successful!");
      
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };
  return (
    <div style={styles.container}>
        <h1 style={styles.heading}>Login</h1>
        <form onSubmit={login} method='post'>
            <input 
              type="text" 
              placeholder='email' 
              name="email" 
              onChange={handleChange}
              value={form.email} 
              style={styles.input}
              required/>

            <input 
              type="password" 
              placeholder='Password' 
              name="password" 
              onChange={handleChange} 
              value={form.password} 
              style={styles.input}
              required/>
            <button type='submit' style={styles.button}>Login</button>
        </form>
        
    </div>
  )
}
