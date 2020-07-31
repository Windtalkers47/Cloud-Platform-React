import React, { Component } from 'react'
import Chart from "chart.js";
import axios from 'axios';

// const url ='http://203.151.34.28:5000/api/getAllDevices';
const vm = process.env.REACT_APP_API_VM;

// ทำ UserLogin ตัวส่งออกไปยัง api จำลองดูก่อน
export const UserLogin = (user) => {
    return new Promise ((resolve, reject)=>{
        axios.post(url + '/login',user).then(res=>{
            resolve(res.data)
        })
    })
}

// ทำ registerUser ไว้สมัครสมาชิก
export const registerUser = (user) => {
    return new Promise((resolve,reject) => {
        axios.post(url + '/register',user).then(res => {
            resolve(res.data)
        })
    })
}

// รับ gerAllUser ใน DB มาใช้
export const getAllUser = () => {
    return new Promise((resolve, reject) => {
        axios.get(url + '/users').then(res => {
            resolve(res.data)
        })
    })
}

// export const selectVM = ()

// export default class api extends Component {
//     render() {
//         return (
//             <div>
                
//             </div>
//         )
//     }
// }
