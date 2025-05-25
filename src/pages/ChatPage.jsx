import React, { useState, useEffect, useRef } from 'react';
import { IoIosSend } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import cloverImg from '../assets/clover.png';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '어떤 이야기든 괜찮아요. 힘든 일이 있거나, 그냥 누군가에게 말하고 싶은 게 있으면 편하게 얘기해 주세요.',
    },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newMessage, { sender: 'bot', text: null }]);
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
      const answer = data.response;

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { sender: 'bot', text: answer };
        return updated;
      });
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          sender: 'bot',
          text: '죄송해요. 잠시 오류가 발생했어요.',
        };
        return updated;
      });
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* 상단바 */}
      <div className="bg-[#9bcf9f] px-4 py-2 flex justify-between items-center">
        <button>
          <Link to="/">
            <FaArrowLeft size={20} color="white" />
          </Link>
        </button>
      </div>

      {/* 본문 */}
      <div className="flex flex-1 overflow-hidden bg-[#FFFAF1]">
        {/* 고정 사이드바 */}
        <div className="h-full w-[250px] bg-[#e7ddcb] p-4 shadow-lg z-10">
          <div className="bg-[#a1957e] p-3 rounded shadow mb-4 font-bold rounded-xl">새 채팅</div>
          <ul className="space-y-4">
            <li>
              <Link to="/consult">가까운 상담센터 찾기</Link>
            </li>
            <li>
              <Link to="/safety">안전 가이드</Link>
            </li>
          </ul>
          <div className="absolute bottom-4 left-4 text-gray-500 text-xl">
            <Link to="/mypage">
              <FaUser size={20} />
            </Link>
          </div>
        </div>

        {/* 채팅창 */}
        <div className="flex-1 max-w-[1000px] mx-auto p-4 flex flex-col bg-[#FFFAF1] rounded-md m-4 overflow-hidden">
          {/* 채팅 메시지 영역 */}
          <div
            id="chat-container"
            className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            {messages.map((msg, index) =>
              msg.sender === 'bot' ? (
                <div key={index} className="flex items-start space-x-2">
                  <img
                    src={cloverImg}
                    alt="bot"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="px-4 py-2 rounded-2xl text-[#000000] text-sm leading-loose whitespace-pre-line break-keep shadow-md max-w-[50%] w-fit bg-[#9bcf9f] text-left self-start">
                    {msg.text === null ? (
                      <span className="text-black italic animate-pulse">
                        답변 작성 중...
                      </span>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="px-4 py-2 rounded-2xl text-[#000000] text-sm leading-loose whitespace-pre-line break-keep shadow-md max-w-[50%] w-fit bg-[#ffffff] text-right self-end ml-auto"
                >
                  {msg.text}
                </div>
              )
            )}
            <div ref={bottomRef} />
          </div>

          {/* 입력창 */}
          <div className="flex items-center mt-4 border rounded-2xl px-3 py-2 bg-white shrink-0">
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
