import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.2, duration: 0.6 },
  }),
};

const FeatureItem = ({ idx, image, title, desc, reverse }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // 배경색을 번갈아 적용
  const bgColors = ['bg-[#F6C998]', 'bg-[#BDA4D6]', 'bg-[#AED09B]', 'bg-[#F09693]'];
  const bgColor = bgColors[idx % bgColors.length];

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={idx}
      className={`flex flex-col md:flex-row ${
        reverse ? 'md:flex-row-reverse' : ''
      } items-center justify-start py-16 md:py-24 gap-10`}
    >
      {/* 이미지 박스 */}
      <div className={`w-48 h-48 rounded-lg shadow-md flex items-center justify-center ${bgColor}`}>
        <img src={image} alt={title} className="w-full h-full object-cover rounded-lg" />
      </div>


      {/* 텍스트 박스 */}
      <div className="max-w-md text-center md:text-left">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">{desc}</p>
      </div>
    </motion.div>
  );
};

export default FeatureItem;
