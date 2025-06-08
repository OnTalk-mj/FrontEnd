import React, { useState, useEffect, useRef } from 'react';
import { IoIosSend } from 'react-icons/io';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import cloverImg from '../assets/clover.png';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    resetChat();
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const typeBotMessage = (fullText) => {
    let index = 0;
    const interval = 30;
    let currentText = '';

    const botMsg = { sender: 'bot', text: '' };
    setMessages((prev) => [...prev, botMsg]);

    const typing = setInterval(() => {
      currentText += fullText[index];
      index++;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { sender: 'bot', text: currentText };
        return updated;
      });
      if (index >= fullText.length) clearInterval(typing);
    }, interval);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    const userInput = input;
    setInput('');

    try {
      const response = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) throw new Error('서버 응답 오류');

      const data = await response.json();
      typeBotMessage(data.response);
    } catch (error) {
      typeBotMessage('죄송해요. 잠시 오류가 발생했어요.');
    }
  };

  const resetChat = () => {
    setMessages([]);
    setTimeout(() => {
      typeBotMessage('어떤 이야기든 괜찮아요. 힘든 일이 있거나, 그냥 누군가에게 말하고 싶은 게 있으면 편하게 얘기해 주세요.');
    }, 100);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="bg-[#9bcf9f] px-4 py-2 flex justify-between items-center">
        <Link to="/">
          <FaArrowLeft size={20} color="white" />
        </Link>
      </div>

      <div className="flex flex-1 overflow-hidden bg-[#FFFAF1]">
        <div className="h-full w-[250px] bg-[#e7ddcb] p-4 shadow-lg z-10">
          <button
            onClick={resetChat}
            className="bg-[#a1957e] p-3 rounded shadow mb-4 font-bold rounded-xl w-full text-left"
          >
            새 채팅
          </button>
          <ul className="space-y-4">
            <li><Link to="/consult">가까운 상담센터 찾기</Link></li>
            <li><Link to="/safety">심리 자가진단</Link></li>
          </ul>
          <div className="absolute bottom-4 left-4 text-gray-500 text-xl">
            <Link to="/mypage">
              <FaUser size={20} />
            </Link>
          </div>
        </div>

        <div className="flex-1 max-w-[1000px] mx-auto p-4 flex flex-col bg-[#FFFAF1] rounded-md m-4 overflow-hidden">
          <div
            id="chat-container"
            className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            {messages.map((msg, index) => (
              msg.text && msg.sender === 'bot' ? (
                <motion.div
                  key={index}
                  className="flex items-start space-x-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={cloverImg} alt="bot" className="w-8 h-8 rounded-full object-cover" />
                  <div className="px-4 py-2 rounded-2xl text-[#000000] text-sm leading-loose whitespace-pre-wrap break-keep shadow-md bg-[#9bcf9f] text-left self-start max-w-[60%] w-fit">
                    {msg.text}
                  </div>
                </motion.div>
              ) : msg.text && msg.sender === 'user' ? (
                <motion.div
                  key={index}
                  className="px-4 py-2 rounded-2xl text-[#000000] text-sm leading-loose whitespace-pre-wrap break-keep shadow-md bg-[#ffffff] text-right self-end ml-auto max-w-[60%] w-fit"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {msg.text}
                </motion.div>
              ) : null
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="flex items-center mt-4 border rounded-2xl px-3 py-2 bg-white shrink-0 gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="채팅을 입력하세요."
              className="flex-1 outline-none text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>
              <IoIosSend size={24} color="#9c7e69" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
