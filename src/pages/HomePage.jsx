import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import megaphone from '../assets/megaphone.png';
import finger from '../assets/finger.png';
import bell from '../assets/bell.png';
import chat from '../assets/chat.png';
import FeatureItem from '../components/FeatureItem';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


const HomePage = ({ isLoggedIn, serviceRef }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#service' && serviceRef.current) {
      serviceRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location, serviceRef]);

  const handleButtonClick = () => {
    navigate(isLoggedIn ? '/chat' : '/login');
  };

  const scrollToService = () => {
    if (serviceRef.current) {
      serviceRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };  

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.6 },
    }),
  };

  const features = [
    {
      image: megaphone,
      title: '혼자 고민하지 마세요',
      desc: '24시간 언제든지 챗봇과 상담할 수 있어요.',
    },
    {
      image: finger,
      title: '상황에 맞는 유튜브 영상 추천',
      desc: '마음이 힘들 때 도움이 되는 영상들을 찾아드려요.',
    },
    {
      image: bell,
      title: '위험한 고민? 걱정하지 마세요',
      desc: '필요할 때 신뢰할 수 있는 전문가 기관과 연결해 드려요.',
    },
    {
      image: chat,
      title: '익명으로 안전하게 상담하세요',
      desc: '당신의 개인정보는 보호됩니다. 편하게 이야기하세요.',
    },
  ];


  return (
    <div className="w-full flex flex-col items-center">
      

      {/* 메인 원형 */}
      <div className="flex justify-center mt-20 mb-32">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-96 h-96 bg-[#FCECD6] rounded-full flex flex-col items-center justify-center shadow-md"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl font-bold text-center"
          >
            고민이 있나요?<br />챗봇에게 말해보세요!
          </motion.p>

          <motion.button
            onClick={handleButtonClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-6 px-6 py-2 bg-white border rounded-lg shadow hover:bg-gray-100"
          >
            {isLoggedIn ? '시작하기' : '로그인하기'}
          </motion.button>
        </motion.div>
      </div>

      {/* 기능 설명 박스 */}
      <div ref={serviceRef} className="w-full max-w-5xl px-4 space-y-20 pb-32 mt-32">
        {features.map((item, idx) => (
          <FeatureItem
          key={idx}
          idx={idx}
          image={item.image}
          title={item.title}
          desc={item.desc}
          reverse={idx % 2 !== 0}
        />
        
        ))}
      </div>
    </div>
  );
};

export default HomePage;
