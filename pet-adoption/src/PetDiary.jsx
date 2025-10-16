// src/PetDiary.jsx

import React from 'react';

export default function PetDiary() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        반려동물 일기 🐾
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-600 mb-4">
          여기는 나의 소중한 반려동물과의 추억을 기록하는 공간입니다.
        </p>
        <p className="text-gray-500">
          일기장 목록, 사진 업로드, 글쓰기 등의 기능을 여기에 구현할 예정입니다.
        </p>
      </div>
      
      {/* 이 위치에 실제 일기 목록 및 작성 버튼이 들어갑니다. */}
      <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
        <p>기능 구현을 위해 곧 이 페이지를 수정할 예정입니다.</p>
      </div>
    </div>
  );
}