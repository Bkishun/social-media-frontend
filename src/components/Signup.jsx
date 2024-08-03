import React, { useState } from 'react';
import logo from "../assets/image/signup.png"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Signup() {
    const navigate = useNavigate();
    
    const [user, setUser] = useState({
        fullname: "", email: "", username: "", password: ""
    })

    const handleInputs = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
        console.log(user)
    }

    const postData = async (e) => {
        e.preventDefault();

        const {fullname, email, username, password} = user;

        try {
            const response = await axios.post("/api/v1/users/register", {
                fullname,
                username,
                email,
                password
            });

            if (response.status === 201) {
                console.log("user registered Successfully");
                navigate("/login");
            } else {
                window.alert(response.data.message); // Assuming your server sends back a message in the response
                console.log(response.data.message);
            }
        } catch (error) {
            window.alert(error.message);
        }
    }

    return (
        <div className="relative flex items-top justify-center min-h-[400px] bg-white sm:items-center sm:pt-0">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-6 mr-2 bg-gray-100 sm:rounded-lg">
                            <div className='mb-4'>
                                <img src={logo} alt="image" />
                            </div>
                        </div>

                        <form className="p-6 flex flex-col justify-center" method='POST' onSubmit={postData}>
                            <div className="flex flex-col mt-2">
                                <label htmlFor="fullname" className="hidden">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={user.fullname}
                                    id="fullname"
                                    placeholder="Full name"
                                    onChange={handleInputs}
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="email" className="hidden">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    id="email"
                                    placeholder="Email"
                                    onChange={handleInputs}
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="username" className="hidden">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={user.username}
                                    id="username"
                                    placeholder="Username"
                                    onChange={handleInputs}
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="password" className="hidden">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    id="password"
                                    placeholder=" *******"
                                    onChange={handleInputs}
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
