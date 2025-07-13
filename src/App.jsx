import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Body from './components/body';
import Login from "./components/Login";
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/feed';
import EditProfile from './components/EditProfile';
import { ToastContainer, toast } from 'react-toastify';

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
              </Route> 
            </Routes>
          </BrowserRouter>
        </Provider>
        <ToastContainer  position="top-center" autoClose={1500} theme='dark'/>
      </div>
  )
}

export default App
