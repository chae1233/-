// src/BoardDetail.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, MessageSquare, ThumbsUp } from 'lucide-react';

// 게시글 상세 정보를 찾기 위한 더미 데이터
// 실제로는 서버에서 이 데이터를 ID를 기준으로 가져와야 합니다.
const allPosts = [
    { id: 1, category: '공지사항', title: '2024년 새해 인사 및 공지사항', author: '관리자', date: '2024-01-02', views: 1234, likes: 45, comments: 12, content: '새해 복 많이 받으시고, 2024년 변경되는 서비스 정책을 확인해주세요. 상세 내용은 아래를 참고하시기 바랍니다.' },
    { id: 2, category: '공지사항', title: '서비스 점검 안내 (1월 15일)', author: '관리자', date: '2024-01-10', views: 892, likes: 23, comments: 8, content: '안정적인 서비스 제공을 위해 1월 15일 새벽 2시부터 4시까지 정기 점검이 있을 예정입니다. 이용에 불편을 드려 죄송합니다.' },
    { id: 3, category: '자유게시판', title: '안녕하세요! 처음 가입했습니다', author: '새내기123', date: '2024-01-15', views: 456, likes: 34, comments: 28, content: '반갑습니다! 이웃님들 잘 부탁드려요. 다들 어떤 동물을 키우시나요? 저는 귀여운 강아지를 키우고 있습니다. 자주 소통해요!' },
    // ID 4번부터 10번까지는 내용이 없다고 가정합니다.
];

export default function BoardDetail() {
    // URL 경로에서 동적인 ':id' 값을 추출합니다.
    const { id } = useParams();
    const navigate = useNavigate();

    // ID에 해당하는 게시글을 찾습니다. (문자열 ID를 숫자로 변환)
    const post = allPosts.find(p => p.id === parseInt(id));

    if (!post) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold mb-4">404</h1>
                <p>요청하신 게시글을 찾을 수 없습니다.</p>
                <button 
                    onClick={() => navigate('/board')} 
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    목록으로 돌아가기
                </button>
            </div>
        );
    }
    
    // 내용이 없는 경우를 위한 처리 (더미 데이터의 한계)
    const displayContent = post.content || `게시글 내용이 여기에 표시됩니다. (현재 ID: ${post.id})`;


    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* 게시글 제목 및 정보 */}
            <div className="bg-white p-6 rounded-lg shadow-xl border-b mb-6">
                <div className="mb-2">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        post.category === '공지사항' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                        {post.category}
                    </span>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
                
                <div className="flex items-center text-sm text-gray-500 border-t pt-3">
                    <span className="mr-4">작성자: <span className="font-medium text-gray-700">{post.author}</span></span>
                    <span className="mr-4">날짜: {post.date}</span>
                    <span className="flex items-center mr-4"><Eye className="w-4 h-4 mr-1" /> {post.views}</span>
                    <span className="flex items-center mr-4 text-red-500"><ThumbsUp className="w-4 h-4 mr-1" /> {post.likes}</span>
                    <span className="flex items-center"><MessageSquare className="w-4 h-4 mr-1" /> {post.comments}</span>
                </div>
            </div>

            {/* 게시글 내용 */}
            <div className="bg-white p-8 rounded-lg shadow-xl mb-6 min-h-[300px]">
                <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                    {displayContent}
                </p>
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-between items-center border-t pt-4">
                <button 
                    onClick={() => navigate('/board')} 
                    className="px-6 py-2 border rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition"
                >
                    목록으로
                </button>
                <div className="space-x-2">
                    {/* 로그인 상태에 따라 수정/삭제 버튼 표시 (추후 구현) */}
                    <button className="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-100">
                        수정
                    </button>
                    <button className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
                        삭제
                    </button>
                </div>
            </div>
            
            {/* 댓글 영역 (추후 구현) */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">댓글 ({post.comments})</h2>
                {/* 댓글 목록 및 작성 폼이 여기에 들어갑니다. */}
                <p className="text-gray-500">댓글 기능은 다음에 구현해 봅시다!</p>
            </div>

        </div>
    );
}