const db = require('./dbUtil');

async function createTable() {
    const sqlList = [
    {
        name: '파일 관리 테이블',
        sql: `
            CREATE TABLE file_manage(
                id VARCHAR(14) NOT NULL COMMENT '고유 id',
                turn int(2) NOT NULL COMMENT '순서',
                api_url VARCHAR(50) DEFAULT NULL COMMENT '요청 url',
                org_name VARCHAR(100) NOT NULL COMMENT '원본 파일명',
                new_name VARCHAR(255) NOT NULL COMMENT '변경 파일명',
                ext VARCHAR(10) DEFAULT NULL COMMENT '확장자명',
                path VARCHAR(255) DEFAULT NULL COMMENT '파일 저장 경로',
                size BIGINT DEFAULT NULL COMMENT '파일 크기',
                dsct TEXT DEFAULT NULL COMMENT '설명',
                reg_id VARCHAR(60) NOT NULL COMMENT '등록자',
                reg_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일시',
                upt_id VARCHAR(60) DEFAULT NULL COMMENT '수정자',
                upt_date DATETIME DEFAULT NULL COMMENT '수정 일시',
                PRIMARY KEY (id, turn)
            ) COMMENT = '파일 관리 테이블';
        `
    },
    {
        name: '답변 관리',
        sql: `
            CREATE TABLE answer (
                id VARCHAR(14) NOT NULL COMMENT '고유id',
                turn INT(3) NOT NULL DEFAULT 1 COMMENT '순번',      
                comment text NOT NULL  COMMENT '답변',     
                delete_yn TINYINT(1) NOT NULL DEFAULT '0' COMMENT '삭제여부',                 
                reg_id VARCHAR(60) NOT NULL COMMENT '등록자',
                reg_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일시',
                upt_id VARCHAR(60) DEFAULT NULL COMMENT '수정자',
                upt_date DATETIME DEFAULT NULL COMMENT '수정 일시',
                PRIMARY KEY (id, turn)            
            ) COMMENT = '답변 관리';
        `
    },
    {
        name: '회원 관리 테이블',
        sql: `
            CREATE TABLE mem_info ( 
                id VARCHAR(50) PRIMARY KEY COMMENT '회원 아이디', 
                pw VARCHAR(255) NOT NULL COMMENT '비밀번호', 
                name VARCHAR(100) NOT NULL COMMENT '회원명', 
                nick VARCHAR(50) COMMENT '닉네임', 
                birth_date DATE COMMENT '생년월일', 
                phone_num VARCHAR(20) COMMENT '휴대전화', 
                email VARCHAR(100) COMMENT '이메일', 
                addr VARCHAR(255) COMMENT '주소', 
                role ENUM('관리자', '회원', '비회원', '탈퇴회원') DEFAULT '회원' COMMENT '접근 권한',  -- DEFAULT 값 수정
                type ENUM('일반', '블랙리스트', '휴면계정') DEFAULT '일반'  COMMENT '회원 구분',-- DEFAULT 값 수정
                level ENUM('브론즈', '실버', '골드', 'VIP') DEFAULT '브론즈' COMMENT '회원 등급', -- DEFAULT 값 수정
                join_date DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '가입일시', 
                last_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '최근접속일', 
                m_remain INT DEFAULT 0 COMMENT '잔여 마일리지',
                reg_id VARCHAR(60) NOT NULL COMMENT '작성자', 
                reg_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성일시', 
                upt_id VARCHAR(60) DEFAULT NULL COMMENT '수정자',
                upt_date DATETIME DEFAULT NULL COMMENT '수정일시'
            )   COMMENT = '회원 관리 테이블';
        `
    },
    {
        name: '마일리지 관리 테이블',
        sql: `
            CREATE TABLE mileage(
                turn INT AUTO_INCREMENT PRIMARY KEY COMMENT '순서', 
                id VARCHAR(50) NOT NULL COMMENT '회원 아이디', 
                earn_date DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '적립 날짜', 
                description TEXT COMMENT '적립 내용', 
                valid_date DATE COMMENT '유효 날짜', 
                change_val INT NOT NULL COMMENT '변동 내역',
                reg_id VARCHAR(60) COMMENT '작성자',
                reg_date DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '작성 일시', 
                upt_id VARCHAR(60) COMMENT '수정자', 
                upt_date DATETIME DEFAULT NULL COMMENT '수정 일시'
            )   COMMENT = '마일리지 관리 테이블';
        `
    },
    {
        name: '주문 테이블',
        sql: `
            CREATE TABLE \`order\` (
                order_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '주문 번호',
                member_id VARCHAR(50) NOT NULL COMMENT '회원 ID (FK)',
                order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '주문 일자',
                pay_method ENUM('휴대폰', '신용카드') NOT NULL COMMENT '결제 수단',
                mileage_used INT DEFAULT 0 COMMENT '사용 마일리지',
                mileage_id INT COMMENT '마일리지 ID',
                is_confirmed CHAR(1) DEFAULT 'N' COMMENT '구매 확정 여부 (Y/N)',
                total_price INT NOT NULL COMMENT '총 금액',
                receiver_name VARCHAR(50) NOT NULL COMMENT '수령자 이름' ,
                receiver_phone VARCHAR(20) NOT NULL COMMENT '수령자 전화번호' ,
                receiver_address VARCHAR(255) NOT NULL COMMENT '수령자 주소' ,
                reg_id VARCHAR(50) NOT NULL COMMENT '작성자',
                reg_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성일시',
                upt_id VARCHAR(50) DEFAULT NULL COMMENT '수정자',
                upt_date DATETIME DEFAULT NULL COMMENT '수정일시'
            ) COMMENT='주문 테이블';
        `
    },
    {
        name: '주문 상품 테이블',
        sql: `
            CREATE TABLE order_product (
                order_product_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '주문상품 ID',
                order_id INT NOT NULL COMMENT '주문번호',
                product_id VARCHAR(14) NOT NULL COMMENT '상품 ID',
                quantity INT NOT NULL COMMENT '수량',
                unit_price INT NOT NULL COMMENT '낱개 금액',
                options JSON DEFAULT NULL COMMENT '상품 옵션 정보',
                reg_id VARCHAR(50) NOT NULL COMMENT '작성자',
                reg_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성 일시',
                upt_id VARCHAR(50) DEFAULT NULL COMMENT '수정자',
                upt_date DATETIME DEFAULT NULL COMMENT '수정 일시'
            ) COMMENT = '주문 상품 테이블';
        `
    },
    {
        name: '장바구니 테이블',
        sql: `
            CREATE TABLE cart (
                cart_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '장바구니 번호',
                product_id VARCHAR(14) NOT NULL COMMENT '상품 번호',
                member_id VARCHAR(50) NOT NULL COMMENT '회원 ID',
                quantity INT NOT NULL COMMENT '상품 수량',
                options JSON DEFAULT NULL COMMENT '상품 옵션 정보',
                option_unit_price int NOT NULL DEFAULT 0 COMMENT '옵션 포함 개별 상품 가격',
                reg_id VARCHAR(50) NOT NULL COMMENT '작성자',
                reg_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성 일시',
                upt_id VARCHAR(50) DEFAULT NULL COMMENT '수정자',
                upt_date DATETIME DEFAULT NULL COMMENT '수정 일시'
            ) COMMENT='장바구니 테이블';
        `
    },
    {
        name: '배송 정보 테이블',
        sql: `
            CREATE TABLE deliveries (
                delivery_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '배송 번호',
                order_id INT NOT NULL COMMENT '주문 번호(FK)',
                member_id VARCHAR(50) NOT NULL COMMENT '회원 ID(FK)',
                order_status ENUM(
                    '배송준비', 
                    '배송중', '배송완료', '취소요청', 
                    '취소완료', '반품요청', '반품완료'
                ) DEFAULT '배송준비' COMMENT '주문 상태',
                prep_date DATETIME DEFAULT NULL COMMENT '배송 준비 날짜',
                start_date DATETIME DEFAULT NULL COMMENT '배송 시작 날짜',
                done_date DATETIME DEFAULT NULL COMMENT '배송 완료 날짜',
                cancel_req_date DATETIME DEFAULT NULL COMMENT '취소 요청 날짜',
                cancel_done_date DATETIME DEFAULT NULL COMMENT '취소 완료 날짜',
                return_req_date DATETIME DEFAULT NULL COMMENT '반품 요청 날짜',
                return_done_date DATETIME DEFAULT NULL COMMENT '반품 완료 날짜',
                req_reasons TEXT DEFAULT NULL COMMENT '요청 사유',
                refuse_reasons TEXT DEFAULT NULL COMMENT '요청 거절 사유',
                reg_id VARCHAR(50) NOT NULL COMMENT '작성자',
                reg_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성일시',
                upt_id VARCHAR(50) DEFAULT NULL COMMENT '수정자',
                upt_date DATETIME DEFAULT NULL COMMENT '수정일시'
            ) COMMENT='배송 정보 테이블'
        `
    },
    {
        name: '키워드, 옵션 항목',
        sql: `
            CREATE Table option_keyword(
                code INT AUTO_INCREMENT PRIMARY KEY COMMENT '고유 코드 자동생성',
                type BOOLEAN NOT NULL COMMENT '옵션or키워드 구분',
                name VARCHAR(100) NOT NULL COMMENT '명칭',
                req BOOLEAN NOT NULL COMMENT '필수 선택 여부',
                status BOOLEAN NOT NULL COMMENT '사용 여부',
                reg_id VARCHAR(60) NOT NULL COMMENT '등록자',
                reg_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일시',
                upt_id VARCHAR(60) DEFAULT NULL COMMENT '수정자',
                upt_date DATETIME DEFAULT NULL COMMENT '수정 일시'
            ) COMMENT = '키워드, 옵션 항목';
        `
    },
    {
        name: '옵션,키워드 하위 값',
        sql: `
            CREATE Table opKey_value(
                main_code INT NOT NULL COMMENT '상위 항목 고유 코드',
                code INT NOT NULL COMMENT '하위 값 고유 코드',
                type BOOLEAN NOT NULL COMMENT '옵션or키워드 구분',
                name VARCHAR(100) NOT NULL COMMENT '값 명칭',
                price INT NOT NULL COMMENT '값 가격',
                status TINYINT(1) NOT NULL COMMENT '사용 여부',
                reg_id VARCHAR(60) NOT NULL COMMENT '등록자',
                reg_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일시',
                upt_id VARCHAR(60) DEFAULT NULL COMMENT '수정자',
                upt_date DATETIME DEFAULT NULL COMMENT '수정 일시',
                PRIMARY KEY (main_code, code)
            ) COMMENT = '옵션,키워드 하위 값';
        `
    },
    {
        name: '상품',
        sql: `
            CREATE Table products(
                id VARCHAR(14) PRIMARY KEY COMMENT '고유 id',
                name VARCHAR(100) NOT NULL COMMENT '상품명',
                price INT NOT NULL COMMENT '상품 가격',
                discount INT COMMENT '할인율',
                detail_exist BOOLEAN NOT NULL COMMENT '상세 이미지 유무',
                quan INT NOT NULL COMMENT '등록 재고 수량',
                status BOOLEAN NOT NULL COMMENT '사용 여부',
                benefit TEXT COMMENT '혜택',
                reg_id VARCHAR(60) NOT NULL COMMENT '등록자',
                reg_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일시',
                upt_id VARCHAR(60) DEFAULT NULL COMMENT '수정자',
                upt_date DATETIME DEFAULT NULL COMMENT '수정 일시'
            ) COMMENT = '상품';
        `
    },
    {
        name: '상품 디테일',
        sql: `
            CREATE Table product_detail(
                main_code INT NOT NULL COMMENT '상위 option_keyword 코드',
                code INT NOT NULL COMMENT 'opkey_value 고유 코드',
                id VARCHAR(14)  NOT NULL COMMENT '고유 products id',
                turn INT(2) NOT NULL COMMENT '순서',
                type CHAR(1) NOT NULL COMMENT '옵션or키워드 구분',
                reg_id VARCHAR(60) NOT NULL COMMENT '등록자',
                reg_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일시',
                upt_id VARCHAR(60) DEFAULT NULL COMMENT '수정자',
                upt_date DATETIME DEFAULT NULL COMMENT '수정 일시',
                PRIMARY KEY (main_code, code, id)
            ) COMMENT = '상품 디테일';
        `
    },
    ];
  
    try {
      const connection = await db.getConnection();

      for (const {name, sql} of sqlList) {
          await connection.query(sql);
          console.log(`테이블 생성 완료:${name}`);// 생성된 테이블명 출력
      }
      connection.release();

    } catch (err) {
      console.error("에러 발생:", err);
    }
  }
  
  createTable();