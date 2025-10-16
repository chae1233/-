// src/MyPage.jsx

import React from 'react';
import { Navigate } from 'react-router-dom'; // 👈 리다이렉트를 위한 Navigate 임포트

// isLoggedIn과 handleLogout 함수를 prop으로 받습니다.
function MyPage({ isLoggedIn, handleLogout }) {
  
  // 1. 로그인 상태 확인: 로그인이 안 되어 있으면 /login으로 리다이렉트
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 2. 로그인이 되어 있으면 실제 마이페이지 내용 표시
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold border-b pb-4 mb-6">마이페이지</h1>
      <p>환영합니다! 사용자 정보, 입양 신청 내역 등을 볼 수 있습니다.</p>
      
      {/* 3. 로그아웃 버튼 (handleLogout 함수를 실행) */}
      <button 
        onClick={handleLogout} 
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        로그아웃
      </button>
      
    </div>
  );
}

export default MyPage;