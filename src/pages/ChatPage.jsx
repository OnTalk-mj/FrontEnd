import React, { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { HiOutlineMenu } from 'react-icons/hi';
import { FaArrowLeft } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '어떤 이야기든 괜찮아요. 힘든 일이 있거나, 그냥 누군가에게 말하고 싶은 게 있으면 편하게 얘기해 주세요.' },
  ]);
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('서버 응답 오류');

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error('Error fetching bot response:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '죄송해요. 잠시 오류가 발생했어요.' },
      ]);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* 상단바 */}
      <div className="bg-[#F6C998] px-4 py-2 flex justify-between items-center">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <HiOutlineMenu size={24} color="white" />
        </button>
        <button>
          <Link to="/"><FaArrowLeft size={20} color="white" /></Link>
        </button>
      </div>

      {/* 본문 */}
      <div className="flex flex-1 relative">
        {/* 사이드바 */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 h-full w-64 bg-white p-4 shadow-lg z-10"
            >
              <div className="bg-[#FCECD6] p-3 rounded shadow mb-4 font-bold rounded-xl">
                새 채팅
              </div>
              <ul className="space-y-4">
                <li>
                  <Link to="/consult">
                    가까운 상담센터 찾기
                  </Link>
                </li>
                <li>
                  <Link to="/safety">
                    안전 가이드
                  </Link>
                </li>
              </ul>
              <div className="absolute bottom-4 left-4 text-gray-500 text-xl">
                <Link to="/mypage"><FaUser size={20} /></Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 채팅창 */}
        <div className="flex-1 p-4 flex flex-col bg-white border rounded-md m-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-2xl border text-sm max-w-[50%] break-words shadow-md ${
                  msg.sender === 'bot'
                    ? 'bg-[#ffffff] text-left self-start border-[#FCECD6]'
                    : 'bg-[#ffffff] text-right self-end border-[#F6C998] ml-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* 입력창 */}
          <div className="flex items-center mt-4 border rounded px-3 py-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="채팅을 입력하세요."
              className="flex-1 outline-none text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>
              <IoIosSend size={24} color="#f1cea0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
