import React, { useState, useEffect } from 'react';
import clover from '../assets/clover.png'; // ✅ 이미지 경로에 맞게 수정

const MyPage = () => {
  const [form, setForm] = useState({
    email: '',
    name: '',
    birth: '',
    phone: '',
    address: '',
    zipcode: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:8000/api/accounts/mypage/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log('마이페이지 사용자 정보:', data);

        if (response.ok) {
          setForm({
            email: data.email || '',
            name: data.name || data.username || '',
            birth: data.birth || data.birthdate || '',
            phone: data.phone || '',
            address: data.address || '',
            zipcode: data.zipcode || '',
          });
        } else {
          alert('사용자 정보를 불러오는 데 실패했습니다.');
        }
      } catch (err) {
        console.error('유저 정보 요청 실패:', err);
        alert('서버와 연결할 수 없습니다.');
      }
    };

    fetchUserInfo();
  }, []);

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

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/api/accounts/mypage/update/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          birthdate: form.birth,
          phone: form.phone,
          address: form.address,
          zipcode: form.zipcode,
        }),
      });

      if (response.ok) {
        alert('정보가 성공적으로 수정되었습니다!');
      } else {
        const errorData = await response.json();
        console.error('수정 실패:', errorData);
        alert('수정에 실패했습니다.');
      }
    } catch (err) {
      console.error('요청 오류:', err);
      alert('서버와 연결할 수 없습니다.');
    }
  };

  return (
    <div className="bg-[#FFFAF1] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center space-x-3 mb-6">
          <img src={clover} alt="clover" className="w-6 h-6" />
          <h2 className="text-2xl font-bold">마이페이지</h2>
        </div>

        <div className="mb-6">
          <label className="block mb-1">이메일</label>
          <input
            name="email"
            value={form.email}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">이름</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

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
          className="w-full bg-[#ffffff] border-2 border-[#87C68C] hover:bg-[#87C68C] text-black py-3 rounded-2xl"
          onClick={handleUpdate}
        >
          정보 수정하기
        </button>
      </div>
    </div>
  );
};

export default MyPage;
