// src/BoardWrite.jsx

import React, { useState } from 'react'; // 👈 입력 값 관리를 위해 useState 임포트
import { useNavigate } from 'react-router-dom';

export default function BoardWrite() {
    const navigate = useNavigate();

    // 폼 입력 값을 관리할 상태
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 폼 제출 시 실행되는 함수
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 1. 필수 값 검증
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        // 2. 🌟 서버 통신 시뮬레이션 🌟
        console.log('--- 새 게시글 데이터 ---');
        console.log('제목:', title);
        console.log('내용:', content);
        console.log('-------------------------');
        alert('글이 성공적으로 작성되었습니다! (실제 저장 로직은 여기에 추가)');

        // 3. 폼 제출 후 목록 페이지로 돌아가기
        navigate('/board'); 
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 border-b pb-2 text-gray-800">새 글 작성</h1>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl space-y-6">
                
                {/* 제목 입력 */}
                <div>
                    <label htmlFor="post-title" className="sr-only">제목</label>
                    <input 
                        id="post-title"
                        type="text" 
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    />
                </div>

                {/* 내용 입력 */}
                <div>
                    <label htmlFor="post-content" className="sr-only">내용</label>
                    <textarea 
                        id="post-content"
                        rows="15" 
                        placeholder="내용을 입력하세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    />
                </div>

                {/* 버튼 영역 */}
                <div className="flex justify-end gap-3">
                    <button 
                        type="button" 
                        onClick={() => navigate('/board')}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition duration-150"
                    >
                        작성 취소
                    </button>
                    <button 
                        type="submit" 
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-150"
                    >
                        게시글 등록
                    </button>
                </div>
            </form>
        </div>
    );
}