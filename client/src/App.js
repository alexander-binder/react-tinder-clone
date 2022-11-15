
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  
  const authToken = cookie.AuthToken;
  
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route  path={'/'} element={<Home/>} />
              { authToken && <Route  path={'/dashboard'} element={<Dashboard/>} />}
              { authToken &&<Route  path={'/onboarding'} element={<OnBoarding/>} />}
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
