import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

    const payload = {
      email: email, 
      password: password
    };

    console.log('보내는 로그인 요청:', JSON.stringify(payload));

    try {
      const response = await fetch('http://localhost:8000/api/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('로그인 응답:', data);

      if (response.ok && data.access && data.refresh) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        setIsLoggedIn(true); // 로그인 상태 업데이트
        navigate('/'); // 메인 페이지로 이동
      } else {
        const message =
          data.non_field_errors?.[0] ||
          data.detail ||
          '로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.';
        alert(message);
      }
    } catch (error) {
      console.error('로그인 중 에러 발생:', error);
      alert('서버에 연결할 수 없습니다.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFFAF1]">
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

        <div className="text-right mb-6">
          <Link to="/signup" className="text-sm text-blue-700 hover:underline">
            회원가입
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#ffffff] hover:bg-[#9bcf9f] text-black py-2 rounded-2xl font-medium border-2 border-[#9bcf9f]"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
