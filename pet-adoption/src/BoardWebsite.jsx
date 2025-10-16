import React, { useState } from 'react';
import { Search, Plus, Eye, MessageSquare, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BoardWebsite() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '공지사항', '자유게시판', '질문답변', 'FAQ'];

  const initialPosts = [
    { id: 1, category: '공지사항', title: '2024년 새해 인사 및 공지사항', author: '관리자', date: '2024-01-02', views: 1234, likes: 45, comments: 12, isNotice: true },
    { id: 2, category: '공지사항', title: '서비스 점검 안내 (1월 15일)', author: '관리자', date: '2024-01-10', views: 892, likes: 23, comments: 8, isNotice: true },
    { id: 3, category: '자유게시판', title: '안녕하세요! 처음 가입했습니다', author: '새내기123', date: '2024-01-15', views: 456, likes: 34, comments: 28 },
    { id: 4, category: '질문답변', title: '회원가입 오류 문의드립니다', author: '질문왕', date: '2024-01-14', views: 234, likes: 12, comments: 15 },
    { id: 5, category: '자유게시판', title: '오늘 날씨 정말 좋네요!', author: '날씨맨', date: '2024-01-13', views: 678, likes: 56, comments: 42 },
    { id: 6, category: 'FAQ', title: '비밀번호 변경은 어떻게 하나요?', author: '헬프데스크', date: '2024-01-12', views: 1567, likes: 89, comments: 5 },
    { id: 7, category: '질문답변', title: '프로필 사진 업로드 관련 질문', author: '유저456', date: '2024-01-11', views: 345, likes: 21, comments: 9 },
    { id: 8, category: '자유게시판', title: '주말에 뭐하고 지내셨나요?', author: '주말러', date: '2024-01-10', views: 789, likes: 67, comments: 53 },
    { id: 9, category: '자유게시판', title: '맛집 추천 부탁드립니다', author: '먹방러버', date: '2024-01-09', views: 567, likes: 43, comments: 36 },
    { id: 10, category: '질문답변', title: '회원 등급은 어떻게 올라가나요?', author: '초보유저', date: '2024-01-08', views: 432, likes: 28, comments: 18 },
  ];

  const [posts] = useState(initialPosts);

  const postsPerPage = 10;

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const noticePosts = filteredPosts.filter(post => post.isNotice);
  const regularPosts = filteredPosts.filter(post => !post.isNotice);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">커뮤니티 게시판</h1>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-900">로그인</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                회원가입
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-6 py-4 font-medium whitespace-nowrap transition ${selectedCategory === category
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Write Button */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="제목, 작성자로 검색하세요"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Link to="/board/write" //  이동할 경로 지정
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            글쓰기
          </Link>
        </div>

        {/* Board List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b font-medium text-gray-700">
            <div className="col-span-1 text-center">번호</div>
            <div className="col-span-2">카테고리</div>
            <div className="col-span-5">제목</div>
            <div className="col-span-2">작성자</div>
            <div className="col-span-1 text-center">조회</div>
            <div className="col-span-1 text-center">날짜</div>
          </div>

          {/* Notice Posts */}
          {noticePosts.map(post => (
            <div
              key={post.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b hover:bg-gray-50 transition cursor-pointer bg-blue-50"
            >
              <div className="md:col-span-1 flex md:justify-center items-center">
                <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">공지</span>
              </div>
              <div className="md:col-span-2 flex items-center">
                <span className="text-sm text-blue-600 font-medium">{post.category}</span>
              </div>
              <div className="md:col-span-5 flex items-center gap-2">
                <Link to={`/board/${post.id}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <MessageSquare className="w-4 h-4" />
                  {post.comments}
                </span>
              </div>
              <div className="md:col-span-2 flex items-center text-sm text-gray-600">
                {post.author}
              </div>
              <div className="md:col-span-1 flex md:justify-center items-center text-sm text-gray-500">
                <Eye className="w-4 h-4 mr-1" />
                {post.views}
              </div>
              <div className="md:col-span-1 flex md:justify-center items-center text-sm text-gray-500">
                {post.date.slice(5)}
              </div>
            </div>
          ))}

          {/* Regular Posts */}
          {currentPosts.map(post => (
            <div
              key={post.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b hover:bg-gray-50 transition cursor-pointer"
            >
              <div className="md:col-span-1 flex md:justify-center items-center text-gray-500">
                {post.id}
              </div>
              <div className="md:col-span-2 flex items-center">
                <span className="text-sm text-gray-600">{post.category}</span>
              </div>
              <div className="md:col-span-5 flex items-center gap-2">
                <Link to={`/board/${post.id}`} className="hover:text-blue-600">
        {post.title}
    </Link>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <MessageSquare className="w-4 h-4" />
                  {post.comments}
                </span>
                <span className="flex items-center gap-1 text-sm text-red-500">
                  <ThumbsUp className="w-4 h-4" />
                  {post.likes}
                </span>
              </div>
              <div className="md:col-span-2 flex items-center text-sm text-gray-600">
                {post.author}
              </div>
              <div className="md:col-span-1 flex md:justify-center items-center text-sm text-gray-500">
                {post.views}
              </div>
              <div className="md:col-span-1 flex md:justify-center items-center text-sm text-gray-500">
                {post.date.slice(5)}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-lg font-medium transition ${currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'border hover:bg-gray-50'
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 커뮤니티 게시판. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}