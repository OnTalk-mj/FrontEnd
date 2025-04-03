import React from 'react';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUpComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 전달된 정보 받기
  const { email, name, phone, birth } = location.state || {};

  return (
    <>
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="bg-white border rounded-2xl shadow p-10 w-full max-w-md text-center space-y-6">
          <h2 className="text-2xl font-bold">회원가입 완료!</h2>

          <div className="text-left text-base space-y-2">
            <p>
              <strong>아이디</strong> &nbsp;&nbsp; {email || '정보 없음'}
            </p>
            <p>
              <strong>이름</strong> &nbsp;&nbsp; {name || '정보 없음'}
            </p>
            <p>
              <strong>전화번호</strong> &nbsp;&nbsp; {phone || '정보 없음'}
            </p>
            <p>
              <strong>생년월일</strong> &nbsp;&nbsp; {birth || '정보 없음'}
            </p>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="w-full bg-[#e39292] hover:bg-[#d87c7c] text-white py-2 rounded"
          >
            로그인으로 돌아가기
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUpComplete;
