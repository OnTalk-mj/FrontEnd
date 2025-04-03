import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const HomePage = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/chat'); // 챗봇 페이지로 이동
    } else {
      navigate('/login'); // 로그인 페이지로 이동
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center">
      

      {/* 메인 컨텐츠 */}
      <div className="flex flex-grow justify-center pt-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-96 h-96 bg-[#FCECD6] rounded-full flex flex-col items-center justify-center shadow-lg"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl font-bold text-center"
          >
            고민이 있나요?<br />챗봇에게 말해보세요!
          </motion.p>

          <motion.button
            onClick={handleButtonClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-6 px-6 py-2 bg-white border rounded-lg shadow-md hover:bg-gray-100"
          >
            {isLoggedIn ? '시작하기' : '로그인하기'}
          </motion.button>
        </motion.div>
       
      </div>
    </div>
  );
};

export default HomePage;
