import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NewPassword from './pages/NewPassword';
import Recover from './pages/Recover'
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthProvider';
import { PrivateRoute } from './components/PrivateRoute';
import CreateBills from './components/CreateBills';

export default function App() {

  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>
          <Route
  path="/newBill"
  element={
    <PrivateRoute>
      <CreateBills />
    </PrivateRoute>
  }
/>
            <Route exact path="/recover" element={<Recover/>}/>
            <Route exact path="/new-password/:token" element={<NewPassword/>}/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
