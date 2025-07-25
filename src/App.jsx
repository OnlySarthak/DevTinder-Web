import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Chat from './components/Chat';
import Login from "./components/Login";
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';
import EditProfile from './components/EditProfile';
import { ToastContainer, toast } from 'react-toastify';
import Register from './components/Register';
import Connections from './components/Connections';
import Requests from './components/Requests';

function App() {

  return (
      <div>
        <Provider store={appStore}>
          <BrowserRouter basename='/'>
            <Routes>
              <Route path='/' element={<Body/>}>
                <Route path='/feed' element={<Feed/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/editProfile' element={<EditProfile/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/connections' element={<Connections/>}/>
                <Route path='/requests' element={<Requests/>}/>
                <Route path='/chat/:targetUserId' element={<Chat/>}/>
              </Route> 
            </Routes>
          </BrowserRouter>
        </Provider>
        <ToastContainer  position="top-center" autoClose={1500} theme='dark'/>
      </div>
  )
}

export default App
