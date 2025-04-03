import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    emailId: '',
    emailDomain: 'naver.com',
    password: '',
    confirmPassword: '',
    name: '',
    birth: '',
    phone: '',
    address: '',
    zipcode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleComplete = () => {
    if (
      form.emailId &&
      form.password &&
      form.confirmPassword &&
      form.name &&
      form.birth &&
      form.phone &&
      form.address &&
      form.zipcode
    ) {
      navigate('/signup/complete', {
        state: {
          email: `${form.emailId}@${form.emailDomain}`,
          name: form.name,
          phone: form.phone,
          birth: form.birth,
        },
      });
    } else {
      alert('모든 항목을 입력해주세요.');
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
        <div className="flex items-baseline space-x-4 mb-6">
          <h2 className="text-2xl font-bold mb-2">회원가입</h2>
          <p className="text-gray-500 mb-6">
            &gt; 약관 동의 &nbsp;&nbsp; &gt; <b>아이디 생성</b> &nbsp;&nbsp; &gt; 완료
          </p>
        </div>

        {/* 이메일 */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            name="emailId"
            placeholder="abcd1234"
            className="w-1/3 px-3 py-1 border rounded"
            value={form.emailId}
            onChange={handleChange}
          />
          <span>@</span>
          <select
            name="emailDomain"
            value={form.emailDomain}
            onChange={handleChange}
            className="w-1/3 px-2 py-1 border rounded"
          >
            <option>naver.com</option>
            <option>gmail.com</option>
            <option>daum.net</option>
          </select>
          <button className="px-4 py-1 border rounded text-sm">중복확인</button>
        </div>

        {/* 비밀번호 */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block mb-1">비밀번호</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-1 border rounded"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1">비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-1 border rounded"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 이름 */}
        <div>
          <label className="block mb-1">이름</label>
          <input
            name="name"
            className="w-full px-3 py-1 border rounded"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* 생년월일 */}
        <div>
          <label className="block mb-1">생년월일</label>
          <input
            name="birth"
            placeholder="20010123"
            className="w-full px-3 py-1 border rounded"
            value={form.birth}
            onChange={handleChange}
          />
        </div>

        {/* 전화번호 */}
        <div>
          <label className="block mb-1">전화번호</label>
          <input
            name="phone"
            placeholder="01012345678"
            className="w-full px-3 py-1 border rounded"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        {/* 주소 */}
        <div className="flex space-x-2">
          <div className="w-2/3">
            <label className="block mb-1">주소</label>
            <input
              name="address"
              className="w-full px-3 py-1 border rounded"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/3">
            <label className="block mb-1">우편번호</label>
            <input
              name="zipcode"
              className="w-full px-3 py-1 border rounded"
              value={form.zipcode}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 완료 버튼 */}
        <button
          className="w-full bg-[#e39292] hover:bg-[#d87c7c] text-white py-2 rounded"
          onClick={handleComplete}
        >
          회원가입 완료하기
        </button>
      </div>
    </>
  );
};

export default SignUpForm;
