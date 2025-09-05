import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/register'
import ForgotPassword from './pages/forgotPassword'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from './pages/VerifyEmail'


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/" element={<ResetPassword />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />       {/* For OTP */}
        <Route path="/verifyemail/:token" element={<VerifyEmail />} /> {/* For link */}
      </Routes>
    </Router>
  )
}



