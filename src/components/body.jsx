// import { Outlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import NavBar from './navbar';

const body = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default body