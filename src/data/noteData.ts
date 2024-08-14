export type Note = {
  id: number;
  userId: number;
  title: string;
  tags: string[];
  content: string;
  date: Date;
};

export const notes: Note[] = [
  {
    id: 1,
    userId: 101,
    title: '하루 일과 정리',
    tags: ['일상', '회고'],
    content: '<li>오늘의 일과</li>',
    date: new Date('2024-08-13'),
  },
  {
    id: 2,
    userId: 102,
    title: '프로젝트 계획서',
    tags: ['프로젝트', '기획'],
    content: '<em>프로젝트 개요</em>',
    date: new Date('2024-08-14'),
  },
  {
    id: 3,
    userId: 101,
    title: '개발 아이디어',
    tags: ['아이디어', '개발', '기술'],
    content: '<u>새로운 기능 제안</u>',
    date: new Date('2024-08-15'),
  },
  {
    id: 4,
    userId: 103,
    title: '팀 회의록',
    tags: ['회의', '업무', '정리'],
    content: '<h3>회의 내용 요약</h3>',
    date: new Date('2024-08-16'),
  },
  {
    id: 5,
    userId: 102,
    title: '발표 자료 준비',
    tags: ['발표', '기획', '자료'],
    content: '<h2>발표 내용 구성</h2>',
    date: new Date('2024-08-17'),
  },
  {
    id: 6,
    userId: 102,
    title: '데이터 분석 보고서',
    tags: ['데이터', '분석', '리포트'],
    content: '<h2>분석 결과</h2>',
    date: new Date('2024-08-17'),
  },
  {
    id: 7,
    userId: 102,
    title: '주간 업무 계획',
    tags: ['업무', '계획', '주간'],
    content: '<h2>이번 주 목표</h2>',
    date: new Date('2024-08-17'),
  },
  {
    id: 8,
    userId: 102,
    title: '기술 블로그 포스팅',
    tags: ['기술', '블로그', '글쓰기'],
    content: '<h2>포스팅 주제</h2>',
    date: new Date('2024-08-17'),
  },
  {
    id: 9,
    userId: 102,
    title: '프로덕트 리뷰',
    tags: ['리뷰', '프로덕트', '피드백'],
    content: '<h2>리뷰 내용</h2>',
    date: new Date('2024-08-17'),
  },
];
