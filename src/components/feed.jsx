import TinderCard from './TinderCard';

const dummyUser = {
  name: 'Lara',
  age: 23,
  photourl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  bio: 'Loves sunsets, dogs and building robots 🤖',
};

const feed = () => {

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <TinderCard user={dummyUser} />
    </div>
  )
}

export default feed