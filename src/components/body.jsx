import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // const fetchUser = async()=>{
  //   if(user)return;
  //   if (location.pathname === '/login') return;
  //   if(!user){
      
  //     console.log("hi");
  //       try {
  //       const res = await axios.post(
  //               BASE_URL + '/profile/view',
  //               {}, // body
  //               { withCredentials: true } // config
  //           );

  //         dispach(addUser(res.data));
  //       } catch (error) {
  //           if (error.status === 401) {
  //             navigate('/login');
  //           }
  //         console.error('Error fetching user data:', error.status);
  //       }
  //   }
  // }

  // useEffect(() => {
  //   fetchUser();
  // },[]);

  useEffect(() => {
  if (user || location.pathname === '/login') return;

  const fetchUser = async () => {
    try {
      const res = await axios.post(BASE_URL + '/profile/view', {}, {
        withCredentials: true
      });
      dispatch(addUser(res.data.data));
      console.log("hi");
      
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate('/login');
      }
      console.error('Error fetching user data:', error?.response?.status);
    }
  };

  fetchUser();
  
}, [user]);

  return (
    <div className='h-screen flex flex-col'>
        <NavBar />
        <Outlet />
    </div>

  )
}

export default Body