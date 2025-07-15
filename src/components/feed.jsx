import axios from 'axios';
import TinderCard from './TinderCard';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/userFeed';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';


const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store)=>store.feed);

  const getFeed = async()=>{
    try {
      const res = await axios.get(BASE_URL+'/feed',
        {
          withCredentials:true
        }
      )
      console.log(res.data);
      dispatch(addFeed(res.data));
      toast.success("Refreshing...");      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getFeed();
  },[!feed.length]);

  if (!feed.length) {
  return <p className="text-center">Kyu nahi ho rahi padhai</p>;
  }


  return (
    <div className="flex flex-col items-center justify-center h-full">
      <TinderCard user={feed[0]} />
    </div>
  )
}

export default Feed