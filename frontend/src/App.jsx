import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Layout from './components/Layout';
import Clients from './pages/Client'
import NewClient from './pages/NewClient/index'
import Recover from './pages/Recover'
import Dashboard from './pages/Dashboard'
import {PrivateRoute} from './components/PrivateRoute'
import Transactions from './pages/Transactions';
import NewPassword from './pages/NewPassword'



const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Signin/>}
        />
        <Route
          path="/signup"
          element={<Signup
          />}
        />
        <Route
          path="/forget-password"
          element={<Recover
          />}
        />
        <Route
          path="/new-password/:token"
          element={<NewPassword
          />}
        />

<Route
  path="/dashboard"
  element={
    <Layout>
        <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
      </Layout>
  }
/>
    
        <Route
          path="/home"
          element={<Layout><Dashboard/></Layout>}
        />
        <Route
          path="/clients"
          element={<Layout><Clients/></Layout>}
        />
        <Route
          path="/new-client"
          element={<Layout><NewClient/></Layout>}
        />
        <Route
          path="/transactions"
          element={<Layout><Transactions/></Layout>}
        />
  
        

        {/* Adicione mais rotas conforme necessário */}
      </Routes>


      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
