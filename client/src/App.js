import React from 'react';
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import { ConnectionProvider } from './context/ConnectionContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Write from './pages/Write';
import Home from './pages/Home';
import Single from './pages/Single';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './style.scss';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const Layout2 = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout2 />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <ConnectionProvider> {/* Envuelve tu router con ConnectionProvider */}
      <div className="app">
        <div className="container">
          <RouterProvider router={router} />
        </div>
      </div>
    </ConnectionProvider>
  );
}

export default App;
