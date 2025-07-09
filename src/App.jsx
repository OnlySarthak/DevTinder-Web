import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Body from './body';

function App() {

  return (
      <div>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Body/>}/> 
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
