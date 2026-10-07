import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Events from './Pages/Events';
import Layout from './components/Layout';
import Contact from './Pages/Contact';
import Gallery from './Pages/Gallery';
import Register from './Pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
        </Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App