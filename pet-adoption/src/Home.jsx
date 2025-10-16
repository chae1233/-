// src/PetAdoptionSite.jsx (메인 페이지 레이아웃)

//import React from 'react';

import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트

import Carousel from './Carousel'; // 캐러셀 임포트
// 손 모양 이미지를 위한 Placeholder 컴포넌트
const HandPlaceholder = ({ text = "손 모양" }) => (
  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg shadow-sm">
    <span className="text-gray-500 text-sm">{text}</span>
  </div>
);

// 개/고양이 아이콘 Placeholder 컴포넌트
const PetIconPlaceholder = ({ name, imageSrc }) => (
  <div className="flex flex-col items-center">
    {/* 이미지 */}
    <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden mb-2 border-2 border-gray-400">
        <img src={imageSrc} alt={name} className="w-full h-full object-cover"/>
    </div>
    {/* 텍스트 */}
    <span className="text-sm font-medium text-gray-700">{name}</span>
    <span className="text-xs text-gray-500">분류</span>
  </div>
);


export default function Home({ isLoggedIn }) {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      
      {/* 1. 상단 내비게이션 (이미 Navigation.jsx에서 처리되지만, 이미지에 맞춰 헤더 구조를 한번 더 구현합니다) */}
      <header className="border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <nav className="flex space-x-6 text-sm font-medium">
            <a href="#" className="hover:text-orange-500">반려동물일기</a>
            <a href="#" className="hover:text-orange-500">지역커뮤니티</a>
            <a href="#" className="hover:text-orange-500">소통정보공유</a>
            <a href="#" className="hover:text-orange-500">입양공고</a>
            <a href="#" className="hover:text-orange-500">펫용품 리뷰</a>
          </nav>
<div className="flex items-center space-x-4 text-sm">
            {/*  <a> 태그를 Link 컴포넌트로 변경 */}
            {/* 👈 로그인 상태에 따라 링크 변경 */}
                {isLoggedIn ? (
                    // 로그인 상태: 마이페이지 링크 표시
                    <>
                        <Link to="/mypage" className="hover:text-orange-500">마이페이지</Link>
                    </>
                ) : (
                    // 로그아웃 상태: 로그인 링크 표시
                    <Link to="/login" className="hover:text-orange-500">로그인</Link>
                )}
            <div className="border rounded-full flex items-center px-3 py-1">
                <input type="text" placeholder="검색" className="focus:outline-none w-20 text-sm" />
                <span className="ml-2 text-gray-400">🔍</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. 메인 콘텐츠 영역 */}
      <main className="max-w-7xl mx-auto px-4 pt-8 pb-16 grid grid-cols-12 gap-8">
        
        {/* 중앙 콘텐츠 (9/12 컬럼) */}
        <section className="col-span-12 lg:col-span-9 space-y-8">
          
          {/* 2-1. 캐러셀/슬라이드 영역 */}
          <div className="relative h-64 border border-gray-300 rounded-lg overflow-hidden">
            {/* 2. Carousel 컴포넌트로 대체 */}
            <Carousel /> 
          </div>
          
          {/* 2-2. 공지사항 및 추천 동물 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 공지 사항 */}
            <div className="md:col-span-1 space-y-4">
              <h2 className="text-lg font-bold border-b pb-2">공지사항</h2>
              <div className="space-y-4">
                <PetIconPlaceholder name="복돌이" imageSrc="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop" />
                <PetIconPlaceholder name="둥가" imageSrc="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop" />
                <PetIconPlaceholder name="보리" imageSrc="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&h=400&fit=crop" />
              </div>
            </div>
            
            {/* 오늘의 추천 반려동물 */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-bold border-b pb-2">오늘의 추천 반려동물</h2>
              <div className="grid grid-cols-4 gap-4 pt-4">
                {/* 4개의 손 모양 Placeholder */}
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="aspect-square">
                    <HandPlaceholder text="" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2-3. 카테고리별 공고 섹션 */}
          <div className="space-y-8">
            
            {/* 강아지 섹션 */}
            <div>
              <h2 className="text-lg font-bold border-b pb-2 mb-4">강아지 입양</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {/* 5개의 손 모양 Placeholder */}
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="aspect-square">
                    <HandPlaceholder text="" />
                  </div>
                ))}
              </div>
            </div>

            {/* 고양이 섹션 */}
            <div>
              <h2 className="text-lg font-bold border-b pb-2 mb-4">고양이 입양</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {/* 5개의 손 모양 Placeholder */}
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="aspect-square">
                    <HandPlaceholder text="" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* 사이드바 (3/12 컬럼) */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="p-4 bg-gray-100 rounded-lg border h-40 flex items-center justify-center">
            <p className="text-gray-500 text-sm">광고<br/>(position fixed)</p>
          </div>
        </aside>

      </main>
       </div>
  );
}
      