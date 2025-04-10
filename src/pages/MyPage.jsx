import React, { useState } from 'react';

const MyPage = () => {
  const [form, setForm] = useState({
    email: 'test@example.com',
    name: '홍길동',
    birth: '20000101',
    phone: '01012345678',
    address: '서울시 강남구 테헤란로 123',
    zipcode: '12345',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClickPostCode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setForm(prev => ({
          ...prev,
          zipcode: data.zonecode,
          address: data.roadAddress,
        }));
      },
    }).open();
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">마이페이지</h2>

      {/* 이메일 (수정 불가) */}
      <div className="mb-6">
        <label className="block mb-1">이메일</label>
        <input
          name="email"
          value={form.email}
          disabled
          className="w-full px-3 py-2 border rounded bg-gray-100"
        />
      </div>

      {/* 이름 */}
      <div className="mb-6">
        <label className="block mb-1">이름</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* 생년월일 */}
      <div className="mb-6">
        <label className="block mb-1">생년월일</label>
        <input
          name="birth"
          value={form.birth}
          onChange={handleChange}
          placeholder="YYYYMMDD"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* 전화번호 */}
      <div className="mb-6">
        <label className="block mb-1">전화번호</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="01012345678"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* 주소 + 우편번호 */}
      <div className="flex space-x-4 mb-6">
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
        className="w-full bg-[#F6C998] hover:bg-[#EBB06F] text-black py-3 rounded"
        onClick={() => alert('추가예정')}
      >
        정보 수정하기
      </button>
    </div>
  );
};

export default MyPage;
