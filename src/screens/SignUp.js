import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
export default function SignUp(props) {
    const navigate = useNavigate();
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://foodapp12345.onrender.com/api/Createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation
            })
        });
        const json = await response.json();
        if (json.success) {
            navigate("/login");
            props.showAlerts("SignedIn In successfully", "success");
        }
        else {
            props.showAlerts("Please Enter valid details", "danger");
        }

    }
    return (

        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>

            <div>
                <Navbar />
            </div>
            <div className="container my-3">
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" onChange={onChange} value={credentials.name} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={onChange} name="password" value={credentials.password} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="geolocation" className="form-label">Address</label>
                        <input type="text" className="form-control" name="geolocation" onChange={onChange} value={credentials.geolocation} />
                    </div>
                    <button type="submit" className="btn btn-danger m-3">SignUp</button>
                    <Link to="/login" className='m-3 mx-1 btn btn-success'>Already a User</Link>
                </form>
            </div>
        </div>
    )
}
