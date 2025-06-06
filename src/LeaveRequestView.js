import React, { useState } from 'react'
import axios, { AxiosHeaders } from 'axios';
import { useEffect } from 'react';
import styles from './style';
import { useNavigate } from 'react-router-dom';

export default function LeaveRequestView() {
  const[LeaveRequest, setLeaveRequests]= useState([])
  const[userList, setUserList]= useState([]);
  const navigate = useNavigate();
  useEffect(()=>{ getRequests(); },[])
  const getRequests = async ()=>{
    try{
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:1880/GetLeaves",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      setLeaveRequests(res.data);
    }
    catch(err){
      console.log(err);
    }
  }
  const handleAction = async (id, action)=>{
    try{    
      const token = localStorage.getItem("token");
      console.log(`http://localhost:1880/${action}-leave/${id}`) ;
      const res = await axios.post(`http://localhost:1880/${action}-leave/${id}`,{},{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      alert(`Successfully ${action}d`);
      window.location.reload();
   }
   catch(err){
    console.log(err)
   }
    
  }
  //
  // const getRequests = async ()=>{
  //   try{
  //     const token = localStorage.getItem("token");
  //     const res = await axios.get("http://localhost:1880/GetLeavesList",{
  //       headers: {
  //          Authorization: `Bearer ${token}`
  //        }
  //      });
  //      setLeaveRequests(res.data);
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // }
  // const getUserName = (id)=>{
  //   const user = userList.find(u=>u.id === id);
  //   console.log(user, id);
  //   return user? user.username:"unknown-user";
  // }
  // const getUserList = async ()=>{
  //   try{
  //     const token = localStorage.getItem("token");
  //     const res = await axios.get("http://localhost:1880/GetUsersList",{
  //       headers: {
  //          Authorization: `Bearer ${token}`
  //        }
  //      });
  //      setUserList(res.data);
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // }
  return (
  <div style={styles.container}>
    <h1 style={styles.heading}>Leave Request List</h1>
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Email</th>
          <th style={styles.th}>Date</th>
          <th style={styles.th}>Reason</th>
          <th style={styles.th}>Status</th>
          {localStorage.getItem('role') === "admin" && (
            <>
              <th style={styles.th}>Accept</th>
              <th style={styles.th}>Reject</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {LeaveRequest.map((leave) => (
          <tr key={leave.id} style={styles.tr}>
            <td style={styles.td}>{leave.email}</td>
            <td style={styles.td}>{new Date(leave.date).toISOString().slice(0, 10)}</td>
            <td style={styles.td}>{leave.reason.toUpperCase()}</td>
            <td style={styles.td}><strong>{leave.status.toUpperCase()}</strong></td>
            {localStorage.getItem('role') === "admin" && (
              <>
                <td style={styles.td}>
                  <button 
                    style={styles.button} 
                    onClick={() => handleAction(leave.id, "approve")}
                  >
                    Accept
                  </button>
                </td>
                <td style={styles.td}>
                  <button 
                    style={styles.cancelButton} 
                    onClick={() => handleAction(leave.id, "reject")}
                  >
                    Reject
                  </button>
                </td>
              </>
            )}
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
);

}
