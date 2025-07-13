import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFc5RPTXrd_aINy3a9AewvAreBJAtOD4hgg&s");
  const [firstName, setFirstName] = useState("");

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      dispatch(addUser(null));
      console.log('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    if (user) {

      setPhotoUrl(
        user?.photourl ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFc5RPTXrd_aINy3a9AewvAreBJAtOD4hgg&s"
      );

      setFirstName(user?.firstName || "Guest");
    }
  }, [user]); // ✅ Include user in dependency


  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          🐦‍🔥 DevTinder
        </Link>
      </div>
      <div className="flex gap-2">
        {user &&
          <div className="dropdown dropdown-end mx-5 flex gap-6">
            <div className="my-1">Welcome {firstName} </div>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-9 w-52 p-2 shadow">
              <li>
                <Link className="justify-between" to={'/editProfile'}>
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li> <Link to="/register">Logout</Link></li>
              <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar;