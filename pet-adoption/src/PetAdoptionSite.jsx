import React, { useState } from 'react';
import { Search, Heart, MapPin, Calendar, Info, Phone, Share2, Filter, X, ChevronDown } from 'lucide-react';

export default function PetAdoptionSite() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [likedPets, setLikedPets] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    species: 'all',
    gender: 'all',
    age: 'all',
    size: 'all',
    region: 'all'
  });

  const pets = [
    {
      id: 1,
      name: '복돌이',
      species: '개',
      breed: '믹스',
      age: 3,
      gender: '남',
      size: '중형',
      weight: 12,
      region: '서울시 강남구',
      shelter: '강남동물보호센터',
      phone: '02-1234-5678',
      rescueDate: '2024-02-15',
      neutered: true,
      vaccinated: true,
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
      description: '사람을 너무 좋아하는 활발한 성격의 강아지입니다. 산책을 매우 좋아하며 다른 강아지들과도 잘 어울립니다.',
      status: 'available'
    },
    {
      id: 2,
      name: '나비',
      species: '개',
      breed: '시츄',
      age: 5,
      gender: '여',
      size: '소형',
      weight: 6,
      region: '서울시 송파구',
      shelter: '송파동물보호센터',
      phone: '02-2345-6789',
      rescueDate: '2024-02-20',
      neutered: true,
      vaccinated: true,
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop',
      description: '조용하고 온순한 성격입니다. 노령견이지만 건강 상태가 좋으며, 조용한 환경을 선호합니다.',
      status: 'available'
    },
    {
      id: 3,
      name: '호랑이',
      species: '고양이',
      breed: '코리안숏헤어',
      age: 2,
      gender: '남',
      size: '중형',
      weight: 5,
      region: '경기도 성남시',
      shelter: '성남동물보호센터',
      phone: '031-3456-7890',
      rescueDate: '2024-03-01',
      neutered: true,
      vaccinated: true,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
      description: '사람을 잘 따르는 친화력 좋은 고양이입니다. 장난감 놀이를 좋아하며 혼자 있는 시간도 잘 견딥니다.',
      status: 'available'
    },
    {
      id: 4,
      name: '초코',
      species: '개',
      breed: '푸들',
      age: 4,
      gender: '여',
      size: '소형',
      weight: 7,
      region: '서울시 마포구',
      shelter: '마포동물보호센터',
      phone: '02-4567-8901',
      rescueDate: '2024-02-10',
      neutered: true,
      vaccinated: true,
      image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&h=400&fit=crop',
      description: '영리하고 사교적인 성격의 푸들입니다. 훈련이 잘 되어 있으며 아이들과도 잘 지냅니다.',
      status: 'available'
    },
    {
      id: 5,
      name: '구름',
      species: '고양이',
      breed: '터키시앙고라',
      age: 1,
      gender: '여',
      size: '중형',
      weight: 4,
      region: '서울시 강서구',
      shelter: '강서동물보호센터',
      phone: '02-5678-9012',
      rescueDate: '2024-03-05',
      neutered: false,
      vaccinated: true,
      image: 'https://images.unsplash.com/photo-1573865526739-10c1dd7aa5e0?w=400&h=400&fit=crop',
      description: '새하얀 털을 가진 아름다운 고양이입니다. 활발하고 호기심이 많으며 사람을 잘 따릅니다.',
      status: 'available'
    },
    {
      id: 6,
      name: '백구',
      species: '개',
      breed: '진돗개',
      age: 6,
      gender: '남',
      size: '대형',
      weight: 18,
      region: '경기도 고양시',
      shelter: '고양동물보호센터',
      phone: '031-6789-0123',
      rescueDate: '2024-01-28',
      neutered: true,
      vaccinated: true,
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop',
      description: '충직하고 주인을 잘 따르는 진돗개입니다. 활동량이 많아 넓은 공간이 필요합니다.',
      status: 'available'
    }
  ];

  const filteredPets = pets.filter(pet => {
    if (filters.species !== 'all' && pet.species !== filters.species) return false;
    if (filters.gender !== 'all' && pet.gender !== filters.gender) return false;
    if (filters.size !== 'all' && pet.size !== filters.size) return false;
    if (filters.age !== 'all') {
      if (filters.age === 'young' && pet.age > 2) return false;
      if (filters.age === 'adult' && (pet.age <= 2 || pet.age >= 7)) return false;
      if (filters.age === 'senior' && pet.age < 7) return false;
    }
    return true;
  });

  const toggleLike = (petId) => {
    setLikedPets(prev => 
      prev.includes(petId) 
        ? prev.filter(id => id !== petId)
        : [...prev, petId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-orange-500 fill-orange-500" />
              <h1 className="text-2xl font-bold text-gray-900">
                포인<span className="text-orange-500">핸드</span>
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">입양하기</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">실종신고</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">입양후기</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">보호소찾기</a>
            </nav>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
              로그인
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-400 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">사지말고 입양하세요</h2>
          <p className="text-xl mb-8 text-orange-50">
            전국 보호소의 유기동물과 사람을 이어주는 플랫폼
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="품종, 지역으로 검색하세요"
              className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-300"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-orange-500">1,234</p>
              <p className="text-gray-600 mt-1">입양 대기 중</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-500">5,678</p>
              <p className="text-gray-600 mt-1">입양 완료</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-500">320</p>
              <p className="text-gray-600 mt-1">전국 보호소</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-500">15,890</p>
              <p className="text-gray-600 mt-1">총 회원 수</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Button */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            입양 대기 동물 <span className="text-orange-500">({filteredPets.length})</span>
          </h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
          >
            <Filter className="w-5 h-5" />
            필터
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">동물 종류</label>
                <select
                  value={filters.species}
                  onChange={(e) => setFilters({...filters, species: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">전체</option>
                  <option value="개">강아지</option>
                  <option value="고양이">고양이</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
                <select
                  value={filters.gender}
                  onChange={(e) => setFilters({...filters, gender: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">전체</option>
                  <option value="남">남아</option>
                  <option value="여">여아</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">나이</label>
                <select
                  value={filters.age}
                  onChange={(e) => setFilters({...filters, age: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">전체</option>
                  <option value="young">어린 (0-2세)</option>
                  <option value="adult">성년 (3-6세)</option>
                  <option value="senior">노령 (7세 이상)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">크기</label>
                <select
                  value={filters.size}
                  onChange={(e) => setFilters({...filters, size: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">전체</option>
                  <option value="소형">소형</option>
                  <option value="중형">중형</option>
                  <option value="대형">대형</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setFilters({species: 'all', gender: 'all', age: 'all', size: 'all', region: 'all'})}
                  className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
                >
                  초기화
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map(pet => (
            <div
              key={pet.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedAnimal(pet)}
            >
              <div className="relative">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(pet.id);
                  }}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likedPets.includes(pet.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {pet.neutered && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      중성화
                    </span>
                  )}
                  {pet.vaccinated && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      접종완료
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                  <span className="text-sm text-gray-500">{pet.age}살</span>
                </div>
                <p className="text-gray-600 mb-3">
                  {pet.breed} · {pet.gender}아 · {pet.size}({pet.weight}kg)
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {pet.region}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  구조일: {pet.rescueDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAnimal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedAnimal.image}
                alt={selectedAnimal.name}
                className="w-full h-96 object-cover"
              />
              <button
                onClick={() => setSelectedAnimal(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedAnimal.name}</h2>
                  <p className="text-xl text-gray-600">
                    {selectedAnimal.breed} · {selectedAnimal.gender}아 · {selectedAnimal.age}살
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 border rounded-lg hover:bg-gray-50 transition">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => toggleLike(selectedAnimal.id)}
                    className="p-3 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedPets.includes(selectedAnimal.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500 mb-1">크기 / 체중</p>
                  <p className="font-semibold">{selectedAnimal.size} / {selectedAnimal.weight}kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">구조일</p>
                  <p className="font-semibold">{selectedAnimal.rescueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">중성화</p>
                  <p className="font-semibold">{selectedAnimal.neutered ? '완료' : '미완료'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">예방접종</p>
                  <p className="font-semibold">{selectedAnimal.vaccinated ? '완료' : '미완료'}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  상세 정보
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedAnimal.description}</p>
              </div>

              <div className="mb-6 p-4 border-2 border-orange-200 bg-orange-50 rounded-lg">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  보호센터 정보
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>보호소:</strong> {selectedAnimal.shelter}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>위치:</strong> {selectedAnimal.region}
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {selectedAnimal.phone}
                </p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition font-semibold text-lg">
                  입양 신청하기
                </button>
                <button className="px-6 py-4 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition font-semibold">
                  문의하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-orange-500 fill-orange-500" />
                <h3 className="text-xl font-bold">푸딩의 발자국</h3>
              </div>
              <p className="text-gray-400">
                유기동물과 사람을 이어주는<br />따뜻한 플랫폼
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">서비스</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">입양하기</a></li>
                <li><a href="#" className="hover:text-white">실종신고</a></li>
                <li><a href="#" className="hover:text-white">입양후기</a></li>
                <li><a href="#" className="hover:text-white">보호소찾기</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">고객지원</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">공지사항</a></li>
                <li><a href="#" className="hover:text-white">문의하기</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">앱 다운로드</h4>
              <div className="space-y-2">
                <button className="w-full bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                  App Store
                </button>
                <button className="w-full bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                  Google Play
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© 2024 푸딩의 발자국. All rights reserved.</p>
            <p className="mt-2 text-sm">사지말고 입양하세요 🧡</p>
          </div>
        </div>
      </footer>
    </div>
  );
}