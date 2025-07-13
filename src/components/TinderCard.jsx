import React from 'react';

const TinderCard = ({ user }) => {
  return (    
    // <div className="flex flex-row items-center h-full">
      <div className="card w-96">
        <figure className="relative">
          <img
            src={user.photourl || "https://placehold.co/400x400?text=Profile"}
            alt="Profile"
            className="w-full h-96 object-cover"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <h2 className="text-2xl font-bold">
              {user.name}, {user.age}
            </h2>
            <p className="text-sm">{user.bio || 'No bio yet'}</p>
          </div>
        </figure>

        <div className="card-actions justify-between px-8 py-4">
          <button className="btn btn-circle btn-outline text-red-500 border-red-500 hover:bg-red-500 hover:text-white text-xl">
            ❌
          </button>
          <button className="btn btn-circle btn-outline text-green-500 border-green-500 hover:bg-green-500 hover:text-white text-xl">
            ❤️
          </button>
        </div>
      </div>
    // </div>
  );
};

export default TinderCard;
