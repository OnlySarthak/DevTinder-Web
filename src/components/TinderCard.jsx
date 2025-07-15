import axios from 'axios';
import { removeFeed } from '../utils/userFeed';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';

const TinderCard = ({ user }) => {
  const dispatch = useDispatch();
  
  const handleIgnore = async (id) => {
    try {
      const res = await axios.post(BASE_URL+'/request/send/ignored/'+id,
        {},
        {
          withCredentials: true
        }
      )
      dispatch(removeFeed(id));
    } catch (error) {
      console.error(error);
    }
  }

  const handleIntrested = async (id) => {
    try {
      const res = await axios.post(BASE_URL+'/request/send/intrested/'+id,
        {},
        {
          withCredentials: true
        }
      )
      dispatch(removeFeed(id));
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="card w-96  rounded-2xl">
      <figure className="relative">
        <img
          src={user.photourl || "https://placehold.co/400x400?text=Profile"}
          alt="Profile"
          className="w-full h-96 object-cover"
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h2 className="text-2xl font-bold">
            {user.firstName} {user.lastName}, {user.age}
          </h2>
          <p className="text-sm">{user.about || 'No about yet'}</p>
        </div>
      </figure>

      <div className="card-actions justify-between px-8 py-4">
        <button
          onClick={() => handleIgnore(user._id)}
          className="btn btn-circle btn-outline text-red-500 border-red-500 hover:bg-red-500 hover:text-white text-xl">
          ❌
        </button>
        <button
          onClick={() => handleIntrested(user._id)}
          className="btn btn-circle btn-outline text-green-500 border-green-500 hover:bg-green-500 hover:text-white text-xl">
          ❤️
        </button>
      </div>
    </div>
  );
};

export default TinderCard;
