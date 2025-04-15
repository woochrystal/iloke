const db = require('mysql2');
// Heroku에서 JAWSDB_URL 환경변수 사용하도록 설정(호스팅을 위함)

// 데이터베이스 연결 객체 생성

const connectionConfig = process.env.JAWSDB_URL
    ? process.env.JAWSDB_URL
    :{//로컬환경
        host: 'localhost',
        user: 'iloke',
        password: '1q2w3e4r!@#',
        database: 'iloke'
    };

const conn = db.createPool(connectionConfig);


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