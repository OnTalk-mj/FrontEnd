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
          >
            {`OnTalk은 사용자 식별, 상담 이력 관리, 서비스 제공 등을 위해 아래와 같은 개인정보를 수집 및 이용합니다.
- 수집 항목: 이메일(ID), 이름, 생년월일, 연락처
- 이용 목적: 회원 식별 및 관리, 상담 서비스 제공
- 보유 기간: 회원 탈퇴 시 또는 관련 법령에 따라 보관
※ 사용자는 개인정보 수집 및 이용에 동의하지 않을 수 있으나, 이 경우 회원가입이 제한됩니다.`}
          </textarea>
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
          >
            {`OnTalk은 지역 기반 상담센터 안내 및 관련 콘텐츠 추천을 위해 위치 정보를 활용할 수 있습니다.
- 수집 항목: IP 주소 기반 위치 정보
- 이용 목적: 주변 상담센터 추천, 위치 맞춤 콘텐츠 제공
- 보유 기간: 수집일로부터 1년
※ 사용자는 위치정보 수집을 거부할 수 있으나, 일부 서비스 이용이 제한될 수 있습니다.`}
          </textarea>
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
          >
            {`OnTalk은 상담 도중 위험 징후가 감지될 경우, 사용자 보호를 위해 관련 기관에 해당 내용을 이메일로 자동 전송할 수 있습니다.
- 전송 대상: 정신건강복지센터, 청소년상담복지센터 등 유관 기관
- 전송 내용:
  - 제목: [OnTalk] 사용자 위험 감지 알림
  - 내용: 위험이 감지된 시점, 입력 내용 요약, 사용자 식별 정보(이메일, 연령대 등)
- 전송 목적: 긴급 대응 및 사용자 보호, 전문 상담 연계
- 전송 조건: 사용자가 서비스 이용 중 작성한 텍스트에 위험 키워드가 포함되었을 경우 자동 발송
※ 본 약관에 동의하지 않을 경우, 위험 상황 발생 시 보호 조치를 위한 자동 통보가 제한될 수 있습니다.`}
          </textarea>
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
