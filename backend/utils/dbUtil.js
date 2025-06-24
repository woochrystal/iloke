require('dotenv').config();
const db = require('mysql2/promise');
const { parse } = require('url');
const dbUrl = process.env.DATABASE_URL;
console.log(dbUrl)
const parsedUrl = new URL(dbUrl);

// 데이터베이스 연결 객체 생성
const conn = db.createPool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
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
//mysql2/promise 써서 conn.promise() 할 필요 없음
module.exports = conn;



