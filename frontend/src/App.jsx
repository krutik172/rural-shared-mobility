import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewRequest from './pages/NewRequest';
import GroupView from './pages/GroupView';

// Basic Auth Guard wrapper (mocked)
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user_token');
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <Layout>
            <Login />
          </Layout>
        } />
        
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        
        <Route path="/request/new" element={
          <PrivateRoute>
            <NewRequest />
          </PrivateRoute>
        } />
        
        <Route path="/group/:id" element={
          <PrivateRoute>
             <GroupView />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
