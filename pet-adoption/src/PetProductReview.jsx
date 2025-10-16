// src/PetProductReview.jsx

import React, { useState } from 'react';
import { Search, ChevronDown, Star, MessageSquare } from 'lucide-react';

// 리뷰 더미 데이터
const mockReviews = [
  { id: 1, title: "최고의 사료! 기호성 만점", product: "프리미엄 독 사료", category: "사료", rating: 5, author: "댕댕맘", date: "2024-09-01", comments: 12, image: "https://placehold.co/400x300/e0e7ff/1e3a8a?text=Dog+Food" },
  { id: 2, title: "자동 급식기, 외출 필수템", product: "스마트 자동 급식기", category: "급식용품", rating: 4, author: "워킹맘", date: "2024-08-28", comments: 5, image: "https://placehold.co/400x300/ffe4e6/991b1b?text=Feeder" },
  { id: 3, title: "물 없이 쓰는 샴푸 후기", product: "드라이 샴푸", category: "미용", rating: 3, author: "고양이집사", date: "2024-08-25", comments: 8, image: "https://placehold.co/400x300/d1fae5/065f46?text=Shampoo" },
  { id: 4, title: "튼튼한 삑삑이 장난감", product: "킹콩 장난감", category: "장난감", rating: 5, author: "에너지견주", date: "2024-08-20", comments: 20, image: "https://placehold.co/400x300/fff3b0/713f12?text=Toy" },
  { id: 5, title: "배변 패드 흡수력 좋아요", product: "대용량 패드", category: "위생용품", rating: 4, author: "초보집사", date: "2024-08-15", comments: 15, image: "https://placehold.co/400x300/fecaca/991b1b?text=Pad" },
];

// 별점 렌더링 컴포넌트
const StarRating = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
            ))}
        </div>
    );
};


export default function PetProductReview() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [sortOption, setSortOption] = useState('latest');

    const categories = ['전체', '사료', '간식', '급식용품', '장난감', '미용', '위생용품'];

    // 1. 필터링 로직
    const filteredReviews = mockReviews.filter(review => {
        const matchesCategory = selectedCategory === '전체' || review.category === selectedCategory;
        const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              review.product.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // 2. 정렬 로직
    const sortedReviews = filteredReviews.sort((a, b) => {
        if (sortOption === 'latest') {
            return new Date(b.date) - new Date(a.date); // 최신순
        }
        if (sortOption === 'highest') {
            return b.rating - a.rating; // 별점 높은순
        }
        return 0;
    });


    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 border-b pb-2 text-gray-800">
                펫 용품 리뷰 목록
            </h1>

            {/* 필터 및 정렬 영역 */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                
                {/* 카테고리 탭 */}
                <div className="flex border-b overflow-x-auto whitespace-nowrap bg-white p-2 rounded-lg shadow-sm">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 font-medium transition rounded-md ${
                                selectedCategory === cat
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* 검색 및 정렬 드롭다운 */}
                <div className="flex gap-3">
                    {/* 정렬 드롭다운 */}
                    <div className="relative">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="appearance-none pr-8 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                        >
                            <option value="latest">최신순</option>
                            <option value="highest">별점순</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>

                    {/* 검색창 */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="상품명, 제목 검색"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>


            {/* 리뷰 카드 목록 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedReviews.length > 0 ? (
                    sortedReviews.map(review => (
                        <div key={review.id} className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition duration-300 cursor-pointer">
                            {/* 리뷰 이미지 */}
                            <img 
                                src={review.image} 
                                alt={review.product} 
                                className="w-full h-48 object-cover" 
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = "https://placehold.co/400x300/cccccc/ffffff?text=No+Image"; 
                                }}
                            />
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                        {review.category}
                                    </span>
                                    <StarRating rating={review.rating} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 mb-1 truncate">{review.title}</h2>
                                <p className="text-sm text-gray-500 mb-3">{review.product}</p>
                                
                                <div className="flex justify-between items-center border-t pt-3 text-sm text-gray-500">
                                    <span>작성자: {review.author}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                            <MessageSquare className="w-4 h-4" /> {review.comments}
                                        </span>
                                        <span>{review.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center p-10 bg-white rounded-lg shadow-lg text-gray-500">
                        <p>😭 검색 조건에 맞는 리뷰가 없습니다.</p>
                    </div>
                )}
            </div>
            
            {/* 임시 등록 버튼 */}
            <div className="flex justify-center mt-10">
                <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-150 font-semibold">
                    나만의 리뷰 등록하기
                </button>
            </div>
            
        </div>
    );
}