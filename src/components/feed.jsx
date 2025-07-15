import axios from 'axios';
import TinderCard from './TinderCard';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/userFeed';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';


const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/feed',
        {
          withCredentials: true
        }
      )
      console.log(res.data);
      dispatch(addFeed(res.data));
      toast.success("Refreshing...");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFeed();
  }, [!feed.length]);

  if (!feed.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="card w-96 rounded-2xl">
          <figure className="relative">
            <img
              src={"https://docs.weweb.io/assets/skeleton-loader-wave-animation.--zZ5_Ax.gif"}
              alt="Profile"
              className="w-full h-96 object-cover"
            />
          </figure>

          <div className="card-actions justify-between px-8 py-4">
            <button
              className="btn btn-circle btn-outline text-red-500 border-red-500 hover:bg-red-500 hover:text-white text-xl">
              ❌
            </button>
            <button
              className="btn btn-circle btn-outline text-green-500 border-green-500 hover:bg-green-500 hover:text-white text-xl">
              ❤️
            </button>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="flex flex-col items-center justify-center h-full">
      <TinderCard user={feed[0]} />
    </div>
  )
}

export default Feed