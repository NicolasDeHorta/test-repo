
import './App.css';
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Registro from "./Components/Registro";
import Graphics from "./Components/Graphics";
import MakeTransaction from "./Components/MakeTransaction";
import {SuggestedOperations} from "./Components/SuggestedOperations";
import { store } from './Store/Store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const appRoutes = {
  login: '/', 
  Registro:'/Registro', 
  MakeTransaction:'/MakeTransaction',
  Graphics:'/Graphics',
  SuggestedOperations: '/SuggestedOperations',
  Dashboard: '/Dashboard'

}

function App() {
  return (



    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Login />} />
          <Route path='/Registro' element={<Registro />} />
          <Route path='/MakeTransaction' element={<MakeTransaction />} />
          <Route path='/Graphics' element={<Graphics />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/SuggestedOperations' element={<SuggestedOperations />} />

        </Routes>
      </BrowserRouter>
    </Provider>






  );
}

export default App;
