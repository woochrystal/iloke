require('dotenv').config();
const db = require('mysql2');

// 데이터베이스 연결 객체 생성
const conn = db.createPool({
    // host: 'localhost',
    // user: 'iloke',
    // password: '1q2w3e4r!@#',
    // database: 'iloke'
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// 서버 종료 시 DB 연결 종료
process.on('SIGINT', () => {
    conn.end((err) => {
        if (err) {
            console.error('DB 종료 실패:', err.message);
        } else {
            console.log('DB 연결 종료 성공');
        }
        process.exit(0);
    });
});

// 커넥션 풀을 promise 방식으로 리턴
module.exports = conn.promise();



