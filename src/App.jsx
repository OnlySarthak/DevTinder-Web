import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Body from './components/body';
import Login from "./components/Login";
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/feed';
import Profile from './components/Profile';

function App() {

  return (
      <div>
        <Provider store={appStore}>
          <BrowserRouter basename='/'>
            <Routes>
              <Route path='/' element={<Body/>}>
                <Route path='/feed' element={<Feed/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/profile' element={<Profile/>}/>
              </Route> 
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
  )
}

export default App
