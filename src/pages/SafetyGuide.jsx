import React, { useState } from 'react';

const SafetyGuide = () => {
  const [activeTab, setActiveTab] = useState('자살');

  const tabs = ['자살', '폭력', '우울', '부모'];

  const tabContent = {
    자살: {
      title: '자살 고민, 혼자가 아닙니다',
      subtitle: '이럴 땐 이렇게 대처해요',
      steps: [
        '가까운 친구나 신뢰할 수 있는 어른에게 고민을 이야기해보세요.',
        '상담센터에 연락해 전문가와 이야기해보는 것도 큰 도움이 됩니다.',
        '당신의 감정은 정당하며, 누군가에게는 반드시 소중한 존재입니다.',
      ],
      helpLinks: [
        { label: '청소년 전화 1388', url: 'https://www.cyber1388.kr' },
        { label: '마인드포스트 (자살 예방 정보)', url: 'https://www.mindpost.or.kr' },
      ],
    },
    폭력: {
      title: '폭력에 노출되었다면?',
      subtitle: '이렇게 도움을 받을 수 있어요',
      steps: [
        '안전한 공간으로 이동하세요.',
        '믿을 수 있는 사람에게 상황을 알리세요.',
        '경찰(112)이나 학교폭력 신고센터(117)에 연락할 수 있어요.',
      ],
      helpLinks: [
        { label: '학교폭력 신고센터', url: 'https://www.stopbully.or.kr' },
        { label: '경찰청 사이버안전국', url: 'https://cyberbureau.police.go.kr' },
      ],
    },
    우울: {
      title: '우울할 때 이렇게 해보세요',
      subtitle: '마음이 무거울 땐 작은 변화부터 시작하세요',
      steps: [
        '산책, 가벼운 운동 등으로 몸을 움직여보세요.',
        '일기를 써보거나 감정을 정리해보세요.',
        '심리상담 앱이나 기관을 이용해보세요.',
      ],
      helpLinks: [
        { label: '정신건강복지센터', url: 'https://www.mentalhealth.or.kr' },
        { label: '마음터치', url: 'https://www.maumtact.com' },
      ],
    },
    부모: {
      title: '부모와의 갈등이 힘들다면',
      subtitle: '감정을 해치지 않으면서 의사 표현하는 법',
      steps: [
        '감정을 비난이 아닌 “나는 ~해서 힘들어” 방식으로 표현해보세요.',
        '거리두기와 진정 시간을 갖는 것도 좋아요.',
        '청소년 상담센터를 통해 제3자의 도움을 받을 수 있어요.',
      ],
      helpLinks: [
        { label: '청소년 상담센터', url: 'https://www.youth.go.kr' },
      ],
    },
  };

  const current = tabContent[activeTab];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">안전 가이드</h1>

      {/* 탭 */}
      <div className="flex flex ">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-5 py-2 rounded-t-2xl ${
              activeTab === tab ? 'bg-[#f4e0d6] font-semibold' : 'bg-gray-100'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 내용 */}
      <div className="bg-[#fbe3d5] p-6 rounded shadow mb-8">
        <h2 className="text-xl font-bold mb-2">{current.title}</h2>
        <p className="text-gray-700 mb-4">{current.subtitle}</p>
        <ul className="list-disc pl-5 space-y-2">
          {current.steps.map((step, index) => (
            <li key={index} className="text-gray-800">{step}</li>
          ))}
        </ul>
      </div>

      {/* 도움 링크 */}
      <div className="bg-white border rounded p-6">
        <h3 className="font-semibold mb-3">도움이 될 수 있는 링크</h3>
        <ul className="list-disc pl-5 space-y-2">
          {current.helpLinks.map((link, idx) => (
            <li key={idx}>
              <a href={link.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SafetyGuide;
