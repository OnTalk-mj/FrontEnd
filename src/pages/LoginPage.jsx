import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력하세요!');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8000/api/accounts/login/', {
        username: email,
        password: password,
      });
  
      // 로그인 성공
      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      if (error.response) {
        const message = error.response.data?.non_field_errors?.[0] || '로그인에 실패했습니다.';
        if (message.includes('No active account found')) {
          alert('없는 아이디입니다.');
        } else if (message.includes('Unable to log in')) {
          alert('비밀번호가 틀렸습니다.');
        } else {
          alert(message);
        }
      } else {
        alert('서버에 연결할 수 없습니다.');
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">  
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md p-10 border rounded-2xl shadow-lg -translate-y-10"
      >
        <h2 className="text-3xl font-bold mb-8 text-black">로그인</h2>

        <label className="block mb-1 text-sm text-black font-medium">ID</label>
        <input
          type="email"
          placeholder="abcd@mju.ac.kr"
          className="w-full px-3 py-2 mb-4 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-1 text-sm text-black font-medium">Password</label>
        <input
          type="password"
          placeholder="******"
          className="w-full px-3 py-2 mb-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 회원가입 링크 */}
        <div className="text-right mb-6">
          <Link to="/signup" className="text-sm text-blue-700 hover:underline">
            회원가입
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#f4cfa1] hover:bg-[#f1c593] text-black py-2 rounded-md font-medium"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
