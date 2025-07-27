import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [screenError, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + '/login',
                {
                    emailId,
                    password
                }, {
                withCredentials: true
            }
            );

            console.log('Logged in successfully');
            console.log(res.data.data);

            dispatch(addUser(res.data.data));
            return navigate('/feed');

        } catch (error) {
            setError(error?.response?.data);
        }

    }

    return (
        <div className='flex justify-center items-center my-10'>
            <div className="card card-border bg-base-300 w-96 shadow-2xl">
                <div className="card-body flex flex-col items-center" >
                    <h2 className="font-bold text-3xl text-center">Login</h2>
                    <div className="flex flex-col gap-4 mt-10 w-80">
                        <label className="input validator ">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input type="email"
                                placeholder="Email Id"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleLogin(); // ✅ call your send function
                                    }
                                }}
                                required />

                        </label>
                        <div className="validator-hint hidden">
                            Enter valid email address
                        </div>
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                    ></path>
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleLogin(); // ✅ call your send function
                                    }
                                }}
                            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            />
                        </label>
                        {screenError && (
                            <p className="text-red-500 text-sm">
                                {screenError}
                            </p>
                        )}
                    </div>
                    <button className="btn btn-primary mb-5 mt-10 w-30"
                        onClick={handleLogin}>
                        Login
                    </button>
                    <p className='text-gray-500'>OR</p>
                    <Link to={'/register'}>
                        <button className="btn btn-warning mx-5 w-50">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login