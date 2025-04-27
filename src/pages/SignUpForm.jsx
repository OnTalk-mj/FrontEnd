import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignUpForm = () => {
  const handleCheckDuplicate = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/accounts/id-check/', {
        username: `${form.emailId}@${form.emailDomain}`,
      });
  
      if (res.data.exists) {
        alert('이미 존재하는 아이디입니다.');
      } else {
        alert('사용 가능한 아이디입니다!');
      }
    } catch (err) {
      alert('중복 확인 중 오류가 발생했습니다.');
      console.error(err);
    }
  };
  
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

  const [errors, setErrors] = useState({
    passwordMatch: false,
    birthFormat: false,
    phoneFormat: false,
  });

  const validateForm = () => {
    const passwordMatch = form.password === form.confirmPassword;
    const birthFormat = /^\d{8}$/.test(form.birth); // YYYYMMDD
    const phoneFormat = /^010\d{8}$/.test(form.phone); // 01012345678

    setErrors({
      passwordMatch: !passwordMatch,
      birthFormat: !birthFormat,
      phoneFormat: !phoneFormat
    });

    return passwordMatch && birthFormat && phoneFormat;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickPostCode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setForm((prev) => ({
          ...prev,
          zipcode: data.zonecode,
          address: data.roadAddress,
        }));
      },
    }).open();
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
      form.zipcode &&
      validateForm()
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
      alert('모든 항목을 올바르게 입력해주세요.');
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-baseline space-x-4 mb-6">
          <h2 className="text-2xl font-bold mb-2">회원가입</h2>
          <p className="text-gray-500 mb-2">
            &gt; 약관 동의 &nbsp;&nbsp; &gt; <b>아이디 생성</b> &nbsp;&nbsp; &gt; 완료
          </p>
        </div>

        {/* 이메일 */}
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            name="emailId"
            placeholder="abcd1234"
            className="w-1/3 px-3 py-2 border rounded"
            value={form.emailId}
            onChange={handleChange}
          />
          <span>@</span>
          <select
            name="emailDomain"
            value={form.emailDomain}
            onChange={handleChange}
            className="w-1/3 px-2 py-2 border rounded"
          >
            <option>naver.com</option>
            <option>gmail.com</option>
            <option>daum.net</option>
          </select>
          <button type="button"
          onClick={handleCheckDuplicate}
          className="px-4 py-2 border rounded text-sm">중복확인</button>
        </div>

        {/* 비밀번호 */}
        <div className="flex space-x-4 mb-6">
          <div className="w-1/2">
            <label className="block mb-1">비밀번호</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1">비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.passwordMatch && (
              <p className="text-red-500 text-sm mt-1">비밀번호가 일치하지 않습니다.</p>
            )}
          </div>
        </div>

        {/* 이름 */}
        <div className="mb-6">
          <label className="block mb-1">이름</label>
          <input
            name="name"
            className="w-full px-3 py-2 border rounded"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* 생년월일 */}
        <div className="mb-6">
          <label className="block mb-1">생년월일</label>
          <input
            name="birth"
            placeholder="11112233"
            className="w-full px-3 py-2 border rounded"
            value={form.birth}
            onChange={handleChange}
          />
          {errors.birthFormat && (
            <p className="text-red-500 text-sm mt-1">생년월일은 8자리 숫자(YYYYMMDD)로 입력해주세요.</p>
          )}
        </div>

        {/* 전화번호 */}
        <div className="mb-6">
          <label className="block mb-1">전화번호</label>
          <input
            name="phone"
            placeholder="01012345678"
            className="w-full px-3 py-2 border rounded"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phoneFormat && (
            <p className="text-red-500 text-sm mt-1">010으로 시작하는 8자리 숫자만 입력해주세요</p>
          )}
        </div>

        <div className="flex space-x-4 mb-6">
          {/* 주소 입력 */}
          <div className="w-2/3">
            <label className="block mb-1">주소</label>
            <input
              name="address"
              className="w-full px-3 py-2 border rounded h-[42px]"
              value={form.address}
              onChange={handleChange}
              readOnly
            />
          </div>
                
          {/* 우편번호 + 버튼 */}
          <div className="w-1/3">
            <label className="block mb-1">우편번호</label>
            <div className="flex space-x-2">
              <input
                name="zipcode"
                className="w-full px-3 py-2 border rounded h-[42px]"
                value={form.zipcode}
                onChange={handleChange}
                readOnly
              />
              <button
                type="button"
                onClick={handleClickPostCode}
                className="px-3 h-[42px] bg-gray-200 hover:bg-gray-300 border rounded text-sm whitespace-nowrap"
              >
                주소찾기
              </button>
            </div>
          </div>
        </div>


        <button
          className="w-full bg-[#e39292] hover:bg-[#d87c7c] text-white py-3 rounded"
          onClick={handleComplete}
        >
          회원가입 완료하기
        </button>
      </div>
    </>
  );
};

export default SignUpForm;
