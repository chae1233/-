import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // 👈 Navigate 임포트 필수

// 1. 컴포넌트 임포트
import Navigation from './Navigation.jsx';
import Home from './Home.jsx'; 
import LoginPage from './LoginPage.jsx';
import MyPage from './MyPage.jsx'; // MyPage를 사용하는 경우를 대비하여 유지
import PetAdoptionSite from './PetAdoptionSite.jsx';
import BoardWebsite from './BoardWebsite.jsx';
import BoardWrite from './BoardWrite.jsx'; // 👈 이 줄을 추가합니다.
import BoardDetail from './BoardDetail.jsx';
import PetDiary from './PetDiary.jsx';
import ProfileManagement from './ProfileManagement.jsx';
import PetProductReview from './PetProductReview.jsx';
import Footer from './Footer.jsx'; 


// -------------------------------------------------------------------
// 💡 PrivateRoute 컴포넌트 (로그인 상태를 props로 받도록 수정)
// -------------------------------------------------------------------
// 이 컴포넌트는 App 컴포넌트에서 isLoggedIn 상태를 props로 전달받아 사용합니다.
function PrivateRoute({ isLoggedIn, children }) {
    // isLoggedIn 상태를 체크하여, 로그인이 안 되어 있으면 메인 페이지로 리다이렉트합니다.
    return isLoggedIn ? children : <Navigate to="/" />; 
}


function App() {
 
  // 1. 로그인 상태 관리 (App 컴포넌트 내부로 이동)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 👈 **App 함수 내부**에 위치해야 합니다.

  // 로그인/로그아웃 함수
  const handleLogin = () => {
    // 실제로는 API 호출 후 성공 시 true로 변경
    console.log("로그인 처리됨");
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    // 실제로는 API 호출 후 성공 시 false로 변경
    console.log("로그아웃 처리됨");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
         
        {/* Navigation 컴포넌트 배치 (로그인 상태와 함수를 prop으로 전달) */}
        {/* 중복된 <Navigation />은 제거했습니다. */}
        <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> 
        

        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          
          {/* 입양공고, 리뷰, 일기, 게시판 */}
          <Route path="/adoption" element={<PetAdoptionSite />} />
          <Route path="/reviews" element={<PetProductReview />} />
          <Route path="/diary" element={<PetDiary />} />

          {/* 게시판 상세 페이지 */}
          <Route path="/board/:id" element={<BoardDetail />} /> 
          <Route path="/board" element={<BoardWebsite />} />
          <Route path="/board/write" element={<BoardWrite />} /> {/* 👈 BoardWrite가 이제 제대로 연결됩니다. */}
          
          {/* 로그인 페이지 */}
          <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />


          {/* 💡 마이페이지/프로필 관리 (PrivateRoute 적용) */}
          {/* PrivateRoute에 isLoggedIn 상태를 prop으로 전달합니다. */}
          <Route 
            path="/mypage" 
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <ProfileManagement /> 
              </PrivateRoute>
            } 
          /> 
          <Route 
            path="/mypage/profile" 
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <ProfileManagement />
              </PrivateRoute>
            } 
          /> 
          
          {/* 404 페이지 */}
          <Route path="*" element={<h1>404 페이지를 찾을 수 없습니다.</h1>} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
