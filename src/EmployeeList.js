
import React, { useState } from 'react'
import axios, { AxiosHeaders } from 'axios';
import { useEffect } from 'react';
import styles from './style';
import { useNavigate } from 'react-router-dom';

export default function EmployeeList() {
    const[EmployeeList, setEmployeeList,]= useState([])
  const navigate = useNavigate();
  useEffect(()=>{ getRequests(); },[])
  const getRequests = async ()=>{
    try{
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:1880/GetEmployeeList",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      
      setEmployeeList(res.data);
    }
    catch(err){
      console.log(err);
    }
  }
  const handleDelete = async (id)=>{
    try{    
      const token = localStorage.getItem("token");
      const res = await axios.post(`http://localhost:1880/Delete-Employee/${id}`,{},{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      alert(`Successfully deleted`);
      window.location.reload();
   }
   catch(err){
    console.log(err)
   }
    
  }
  return (
     <div style={styles.container}>
    <h1 style={styles.heading}>Leave Request List</h1>
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Username</th>
          <th style={styles.th}>Email</th>
          <th style={styles.th}>Role</th>
          {localStorage.getItem('role') === "admin" && (
            <>
          <th style={styles.th}>Action</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {EmployeeList.map((employee) => (
          <tr key={employee.id} style={styles.tr}>
            <td style={styles.td}>{employee.username}</td>
            <td style={styles.td}>{employee.email.toUpperCase()}</td>
            <td style={styles.td}><strong>{employee.role.toUpperCase()}</strong></td>
            { localStorage.getItem('role') === "admin"?(
                <>
                    <td><button style={styles.button} onClick={()=>handleDelete(employee.id)}>Delete</button></td>
                </>
            ):null}
            
          </tr>
        ))}
      </tbody>
    </table>
    <br/>
    <button
      style={styles.cancelButton}
      onClick={() => {
        localStorage.getItem('role') === "admin"
          ? navigate('/dashboard-admin')
          : navigate('/dashboard-user');
      }}
    >
      Close
    </button>
  </div>
  )
}
