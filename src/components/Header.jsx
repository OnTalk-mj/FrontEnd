import { Link } from 'react-router-dom';
import clover from '../assets/clover.png'; 

const Header = ({ isLoggedIn, onServiceClick }) => {
  return (
    <nav className="relative z-30 w-full flex justify-between items-center px-8 py-4 border-b-2 shadow-lg bg-[#ffffff]">
      {/* 왼쪽: 로고 + 메뉴 */}
      <div className="flex items-center space-x-8">
        <Link to="/">
          <img src="/logo.png" alt="onTALK 로고" className="h-10 object-contain" />
        </Link>
        <div className="flex space-x-6 text-base">
          <Link to="/#service">서비스 소개</Link>
          <Link to="/consult">상담센터 찾기</Link>
          <Link to="/safety">심리 자가진단</Link>
        </div>
      </div>

      {/* 오른쪽: 마이페이지 + 클로버 */}
      <div className="flex items-center space-x-6 text-base">
        {isLoggedIn && (
          <Link to="/mypage">
            마이페이지
          </Link>
        )}
        <img src={clover} alt="clover" className="h-8 w-8 object-contain" />
      </div>
    </nav>
  );
};

export default Header;
