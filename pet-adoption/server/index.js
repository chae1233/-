const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// --- 데이터 저장소 (DB 대신 메모리 사용) ---
// 1. 입양 공고 데이터 (초기 목록)
const adoptionPosts = [
    { id: 1, name: "복돌이", species: "개", breed: "믹스", age: 3, gender: "남", size: "중형", region: "서울시 강남구", image: "https://placehold.co/400x400/ff7f50/ffffff?text=Bokdol" },
    { id: 2, name: "나비", species: "개", breed: "시츄", age: 5, gender: "여", size: "소형", region: "서울시 송파구", image: "https://placehold.co/400x400/9acd32/ffffff?text=Nabi" },
    { id: 3, name: "호랑이", species: "고양이", breed: "코숏", age: 2, gender: "남", size: "중형", region: "경기도 성남시", image: "https://placehold.co/400x400/1e90ff/ffffff?text=Horang" },
    { id: 4, name: "초코", species: "개", breed: "푸들", age: 4, gender: "여", size: "소형", region: "서울시 마포구", image: "https://placehold.co/400x400/ffa07a/ffffff?text=Choco" },
    { id: 5, name: "구름", species: "고양이", breed: "터키시앙고라", age: 1, gender: "여", size: "중형", region: "서울시 강서구", image: "https://placehold.co/400x400/ff4500/ffffff?text=Gureum" },
    { id: 6, name: "백구", species: "개", breed: "진돗개", age: 6, gender: "남", size: "대형", region: "경기도 고양시", image: "https://placehold.co/400x400/7b68ee/ffffff?text=Baekgu" },
];

// 2. 게시글 목록 데이터 (작성된 글이 여기에 추가됨)
let boardPosts = [
    // 초기 더미 데이터 (프론트엔드와 맞춰서)
    { id: 1, category: '공지사항', title: '2024년 새해 인사 및 공지사항', author: '관리자', date: '2024-01-02', views: 1234, likes: 45, comments: 12, isNotice: true, content: "공지사항 내용" },
    { id: 2, category: '자유게시판', title: '처음 가입했습니다!', author: '새내기123', date: '2024-10-15', views: 50, likes: 5, comments: 2, isNotice: false, content: "반갑습니다!" },
];
let nextPostId = 3; // 다음 글에 부여할 ID

// 미들웨어 설정
app.use(cors()); 
app.use(express.json()); 

// ----------------------------------------------------
// 1. 입양 공고 API (GET)
// ----------------------------------------------------
app.get('/api/adoption', (req, res) => {
    // 입양 공고 목록 제공
    res.json(adoptionPosts);
});

// ----------------------------------------------------
// 2. 게시판 API (GET: 목록 읽기) 👈 새로 추가된 기능
// ----------------------------------------------------
app.get('/api/posts', (req, res) => {
    // 모든 게시글 목록 제공
    res.json(boardPosts);
});

// ----------------------------------------------------
// 3. 게시판 API (POST: 글쓰기)
// ----------------------------------------------------
app.post('/api/posts', (req, res) => {
    const { title, content, author = '익명사용자' } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ message: '제목과 내용을 입력해야 합니다.' });
    }

    const newPost = {
        id: nextPostId++, // ID 자동 증가
        category: '자유게시판', 
        title,
        content,
        author,
        date: new Date().toISOString().slice(0, 10), // 오늘 날짜
        views: 0,
        likes: 0,
        comments: 0,
        isNotice: false,
    };
    
    // 게시글 목록에 새 글 추가 (DB 저장 대신 메모리 사용)
    boardPosts.push(newPost);
    
    console.log('✅ 새 게시글 수신 및 저장 완료. 현재 글 수:', boardPosts.length);
    res.status(201).json({ message: '게시글이 성공적으로 등록되었습니다.', postId: newPost.id });
});


// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ Node.js 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
