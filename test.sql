-- work_list 테이블 생성
CREATE TABLE work_list (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	client TEXT NOT NULL,
	work_title TEXT NOT NULL,
	work_order TEXT CHECK (work_order IN ('절단 작업', '제작 작업')),
	work_status TEXT CHECK (work_status IN ('시작 전', '절단완료', '제작완료')),
	limit_day TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	weight REAL,
	price INTEGER,
	payment TEXT CHECK (payment IN ('결제전', '결제완료', '외상')),
	part_price INTEGER,
	worklist TEXT NOT NULL,
	request_day TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	weight_sum REAL,
	count_sum INTEGER,
	cost INTEGER
);

-- use_list 테이블 생성
CREATE TABLE use_list (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	work_id INTEGER NOT NULL,
	barname TEXT NOT NULL,
	color TEXT NOT NULL,
	length REAL NOT NULL,
	FOREIGN KEY (work_id) REFERENCES work_list (id) ON DELETE CASCADE
);


-- update table(insert table) 예시
INSERT INTO sample_data (name, last_update) 
VALUES ('Alice', '2025-03-22 19:30:00');
