import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [about, setAbout] = useState('');
    const [age, setAge] = useState(16);
    const [gender, setGender] = useState("male");
    const [photourl, setPhotourl] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFc5RPTXrd_aINy3a9AewvAreBJAtOD4hgg&s');

    const validateInputFeilds = () => {
        const VALID_GENDERS = ['male', 'female', 'other'];
        let error_msg = null;

        if (Number(age) < 15 || Number(age) > 100) {
            error_msg = "Age must be between 15 and 100!";
        } else if (firstName.length < 2 || firstName.length > 10) {
            error_msg = "First name must be 2-10 characters!";
        } else if (lastName.length < 2 || lastName.length > 10) {
            error_msg = "Last name must be 2-10 characters!";
        } else if (about.length < 1 || about.length > 100) {
            error_msg = "About must be 1-100 characters!";
        } else if (!VALID_GENDERS.includes(gender.toLowerCase())) {
            error_msg = "Gender must be male, female, or other!";
        }

        if (error_msg) {
            toast.error(error_msg);
            return false;
        }
        return true;
    };


    const handleRegister = async (e) => {
        try {
            if (!validateInputFeilds()) {
                return;
            }

            const res = await axios.post(
                BASE_URL + '/register',
                {
                    firstName,
                    lastName,
                    emailId,
                    password,
                    age,
                    gender, // this was missing in your screenshot!
                    about,
                    photourl
                },
                { withCredentials: true }
            );

            console.log('User registeres successfully');
            console.log(res.data.data);
            toast.success('Profile updated successfully');
          
            return navigate('/login');
        } catch (error) {
            console.error('Error registration profile:', error);
        }
    }

    return (
        <div>
            <div className='flex justify-center items-center my-10'>
                {/* input card */}
                <div className="card card-border bg-base-300 w-96 shadow-2xl rounded-4xl">
                    <div className="card-body" >
                        <h2 className="card-title">Register</h2>
                        <div>
                            {/* First Name */}
                            <fieldset className="fieldset mt-2">
                                <legend className="fieldset-legend">First Name</legend>
                                <input type="text" className="input" value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </fieldset>

                            {/* Last Name */}
                            <fieldset className="fieldset mt-2">
                                <legend className="fieldset-legend">Last Name</legend>
                                <input type="text" className="input" value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>

                            {/* Email Id */}
                            <fieldset className="fieldset mt-2">
                                <legend className="fieldset-legend">Email Id</legend>
                                <input type="text" className="input" value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)} />
                            </fieldset>

                            {/* Password */}
                            <fieldset className="fieldset mt-2">
                                <legend className="fieldset-legend">Password</legend>
                                <input type="text" className="input" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </fieldset>

                            {/* Age & Gender - Side by Side */}
                            <div className="flex flex-col md:flex-row gap-6 mt-2 w-full">
                                <div className="flex flex-col md:flex-row gap-6 mt-2 w-full">
                                    {/* Age */}
                                    <fieldset className="fieldset w-full">
                                        <legend className="fieldset-legend">Age</legend>
                                        <input
                                            type="text"
                                            className="input w-full"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                    </fieldset>

                                    {/* Gender */}
                                    <fieldset className="fieldset w-full">
                                        <legend className="fieldset-legend">Gender</legend>
                                        <div className="dropdown w-full">
                                            <div tabIndex={0} role="button" className="input w-full">
                                                {gender}
                                            </div>
                                            <ul
                                                tabIndex={0}
                                                className="dropdown-content menu bg-base-100 rounded-box z-10 w-full p-2 shadow"
                                            >
                                                <li><a onClick={() => setGender('male')}>Male</a></li>
                                                <li><a onClick={() => setGender('female')}>Female</a></li>
                                                <li><a onClick={() => setGender('other')}>Other</a></li>
                                            </ul>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>

                            {/* About */}
                            <fieldset className="fieldset mt-2 w-full">
                                <legend className="fieldset-legend">Photo URL</legend>
                                <input type="text" className="input" value={photourl}
                                    onChange={(e) => setPhotourl(e.target.value)} />
                            </fieldset>

                            {/* photourl */}
                            <fieldset className="fieldset mt-2 w-full">
                                <legend className="fieldset-legend">About</legend>
                                <input type="text" className="input" value={about}
                                    onChange={(e) => setAbout(e.target.value)} />
                            </fieldset>


                        </div>
                        <button className="btn btn-primary mt-5" onClick={handleRegister}>
                            Register
                        </button>
                    </div>
                </div>
                {/* output Card */}
                <div className="card w-96 h-96 ml-0" style={{ marginLeft: "-18px" }}>
                    <figure className="relative rounded-4xl">
                        <img
                            src={photourl}
                            alt="Profile"
                            className="w-full h-96 object-cover"
                        />
                    </figure>
                </div>
            </div>
        </div>
    )
}

export default Register