import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const SignUpTerms = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState({
    terms: true,
    location: true,
    email: true,
  });

  const allChecked = Object.values(checkedItems).every(Boolean);

  const handleCheck = (key) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNext = () => {
    if (allChecked) {
      navigate('/signup/form');
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-12 min-h-[calc(100vh-80px)]">
        <div className="flex items-baseline space-x-4 mb-6">
          <h2 className="text-2xl font-bold mb-4">회원가입</h2>
          <p className="mb-6 text-gray-500">
            &gt; <b>약관 동의</b> &nbsp;&nbsp; &gt; 아이디 생성 &nbsp;&nbsp; &gt; 완료
          </p>
        </div>

        {/* 항목 1 */}
        <div className="mb-6">
          <label className="flex items-start space-x-2 mb-1">
            <input
              type="checkbox"
              checked={checkedItems.terms}
              onChange={() => handleCheck('terms')}
              className="mt-1"
            />
            <span className="font-medium">[필수] 개인정보 수집 및 이용</span>
          </label>
          <textarea
            readOnly
            className="w-full h-28 p-2 border rounded resize-none overflow-y-auto"
          ></textarea>
        </div>

        {/* 항목 2 */}
        <div className="mb-6">
          <label className="flex items-start space-x-2 mb-1">
            <input
              type="checkbox"
              checked={checkedItems.location}
              onChange={() => handleCheck('location')}
              className="mt-1"
            />
            <span className="font-medium">[필수] 위치기반서비스 이용약관</span>
          </label>
          <textarea
            readOnly
            className="w-full h-28 p-2 border rounded resize-none overflow-y-auto"
          ></textarea>
        </div>

        {/* 항목 3 */}
        <div className="mb-8">
          <label className="flex items-start space-x-2 mb-1">
            <input
              type="checkbox"
              checked={checkedItems.email}
              onChange={() => handleCheck('email')}
              className="mt-1"
            />
            <span className="font-medium">[필수] 이메일 전송 동의</span>
          </label>
          <textarea
            readOnly
            className="w-full h-28 p-2 border rounded resize-none overflow-y-auto"
          ></textarea>
        </div>

        <button
          className={`w-full py-2 text-white rounded ${
            allChecked
              ? 'bg-[#e39292] hover:bg-[#d87c7c]'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          onClick={handleNext}
          disabled={!allChecked}
        >
          다음
        </button>
      </div>
    </>
  );
};

export default SignUpTerms;
