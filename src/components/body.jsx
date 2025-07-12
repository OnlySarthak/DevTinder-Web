import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import NavBar from './navbar';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const body = () => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async()=>{
    if(user)return;
    try {
    const res = await axios.post(
            BASE_URL + '/profile/view',
            {}, // body
            { withCredentials: true } // config
    );

      dispach(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
      console.error('Error fetching user data:', error.status);
    }
  }

  useEffect(() => {
    fetchUser();
  },[]);

  return (
    <div>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default body