require('dotenv').config();
const db = require('mysql2');

// 데이터베이스 연결 객체 생성
const conn = db.createPool(process.env.DATABASE_URL);

conn.query('show tables', function (err, results, fields) {
    console.log(results) // results contains rows returned by server
    console.log(fields) // fields contains extra metadata about results, if available
})

conn.query('select 1 from dual where ? = ?', [1, 1], function (err, results) {
    console.log(results)
})

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



