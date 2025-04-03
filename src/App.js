import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import SignUpPage from './pages/SignUpTerms';
import ChatPage from './pages/ChatPage';
import Header from './components/Header';
import SignUpTerms from './pages/SignUpTerms';
import SignUpForm from './pages/SignUpForm';
import SignUpComplete from './pages/SignUpComplete';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <MainLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
}

function MainLayout({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const hideHeaderOn = ['/chat']; // Header를 숨기고 싶은 경로

  const shouldHideHeader = hideHeaderOn.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/mypage"
          element={isLoggedIn ? <MyPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={isLoggedIn ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route path="/signup/terms" element={<SignUpTerms />} />
        <Route path="/signup/form" element={<SignUpForm />} />
        <Route path="/signup/complete" element={<SignUpComplete />} />

      </Routes>
    </>
  );
}

export default App;
