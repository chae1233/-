import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BoardWrite() {
    const navigate = useNavigate();

    // 폼 입력 값을 관리할 상태
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 폼 제출 시 실행되는 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 1. 필수 값 검증
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        // 2. 서버로 보낼 데이터 객체 생성 (실제 사용자 정보는 로그인 세션에서 가져와야 함)
        const newPost = {
            title: title,
            content: content,
            // 임시 사용자 정보 추가 (실제 구현 시 로그인 사용자 정보 사용)
            author: "익명사용자", 
            category: "자유게시판",
            date: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식
            views: 0,
            likes: 0,
            comments: 0,
            isNotice: false,
        };

        try {
            // 3. 🌟 서버로 POST 요청 전송 🌟
            const response = await fetch('http://localhost:3001/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost), // 데이터를 JSON 문자열로 변환하여 전송
            });

            if (!response.ok) {
                // 서버가 200번대가 아닌 응답을 보냈을 경우
                throw new Error(`글 등록에 실패했습니다: ${response.status}`);
            }

            // 4. 성공 응답 처리
            alert('게시글이 성공적으로 등록되었습니다!');
            
            // 5. 글쓰기 완료 후 게시판 목록으로 이동
            navigate('/board'); 

        } catch (error) {
            console.error('데이터 전송 중 오류 발생:', error);
            alert(`게시글 등록 중 오류가 발생했습니다. 서버 상태를 확인하세요. (${error.message})`);
        }
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
