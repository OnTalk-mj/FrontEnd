import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 border-b bg-white">
      <div className="flex items-center space-x-8">
        <Link to="/">
          <img src="/logo.jpg" alt="onTALK 로고" className="h-10 object-contain" />
        </Link>
        <div className="flex space-x-6 text-base">
          <Link to="#">서비스 소개</Link>
          <Link to="#">상담센터 찾기</Link>
          <Link to="#">안전 가이드</Link>
        </div>
      </div>

      {isLoggedIn && (
        <div className="flex space-x-6 text-base">
          <Link to="/mypage" className="hover:underline">
          마이페이지
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
