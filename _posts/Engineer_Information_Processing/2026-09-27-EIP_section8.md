---
layout: post
title: "[정보처리기사] 8장 - SQL 응용"
excerpt: "정보처리기사 실기 8장 SQL 응용 내용 정리"

tags:
  - [정보처리기사]

toc: true

date: 2026-09-27
last_modified_at: 2026-09-28
---
# 정보처리기사
## SQL 응용
### 102. SQL - DDL
#### [1] DDL(Data Definition Language, 데이터 정의어)
- **DDL** : **DB를 구축하거나 수정할 목적으로 사용하는 언어**

- DDL의 3가지 유형

|명령어|기능|
|:---:|:---:|
|`CREATE`|SCHEMA, DOMAIN, TABLE, VIEW, INDEX를 정의|
|`ALTER`|TABLE에 대한 정의를 변경|
|`DROP`|SCHEMA, DOMAIN, TABLE, VIEW, INDEX를 삭제|

<br>

#### [2] `CREATE SCHEMA`

```sql
CREATE SCHEMA 스키마명 AUTHORIZATION 사용자_id;
```

<br>

#### [3] `CREATE DOMAIN`

```sql
CREATE DOMAIN 도메인명 [AS] 데이터타입
                [DEFAULT 기본값]
                [CONSTRAINT 제약조건명 CHECK (조건식)];
```

- 조건식에는 `VALUE IS NULL`, `VALUE IS NOT NULL`, `VALUE BETWEEN 값1 AND 값2`, `VALUE IN (값1, 값2, ...)`, `VALUE LIKE '패턴'` 등이 있음
  - 테이블의 `CHECK` 제약 조건과 달리 `VALUE`를 사용함  

<br>

#### [4] `CREATE TABLE`

```sql
CREATE TABLE 테이블명
                (속성명 데이터타입 [DEFAULT 기본값] [NOT NULL]
                [, PRIMARY KEY (기본키)]
                [, UNIQUE (대체키)]
                [, FOREIGN KEY (외래키)]
                                REFERENCES 참조테이블(기본키)
                                [ON DELETE 옵션]
                                [ON UPDATE 옵션]
                [, CONSTRAINT 제약조건명] [CHECK (조건식)]);
```

- 옵션에는 `CASCADE`, `SET NULL`, `SET DEFAULT`, `NO ACTION`이 있음

- 조건식에는 `속성명 IS NULL`, `속성명 IS NOT NULL`, `속성명 BETWEEN 값1 AND 값2`, `속성명 IN (값1, 값2, ...)`, `속성명 LIKE '패턴'` 등이 있음

<br>

#### [5] `CREATE VIEW`

```sql
CREATE VIEW 뷰명[(속성명[, 속성명, ...])]
AS SELECT 문;
```

<br>

#### [6] `CREATE INDEX`

```sql
CREATE [UNIQUE] INDEX 인덱스명
ON 테이블명(속성명 [ASC | DESC] [, 속성명 [ASC | DESC]])
[CLUSTER];
```

<br>

#### [7] `ALTER TABLE`

```sql
ALTER TABLE 테이블명 ADD 속성명 데이터_타입 [DEFAULT 기본값];

ALTER TABLE 테이블명 ALTER 속성명 [SET DEFAULT 기본값];

ALTER TABLE 테이블명 DROP COLUMN 속성명 [CASCADE];
```

<br>

#### [8] `DROP`

```sql
DROP SCHEMA 스키마명 [CASCADE | RESTRICT];

DROP DOMAIN 도메인명 [CASCADE | RESTRICT];

DROP TABLE 테이블명 [CASCADE | RESTRICT];

DROP VIEW 뷰명 [CASCADE | RESTRICT];

DROP INDEX 인덱스명 [CASCADE | RESTRICT];

DROP CONSTRAINT 제약조건명;
```

<br>
<br>

### 103. SQL - DCL
#### [1] DCL(Data Control Language, 데이터 제어어)
- **DCL** : **데이터의 보아, 무결성, 회복, 병행 제어 등을 정의하는 데 사용하는 언어**

- DCL의 종류

|명령어|기능|
|:---:|:---:|
|`COMMIT`|수행된 결과를 실제 물리적 디스크로 저장|
|`ROLLBACK`|조작 작업이 비정상적으로 종료되었을 때 원래의 상태로 복구|
|`GRANT`|사용자에게 권한을 부여|
|`REVOKE`|사용자에게 부여된 권한을 회수|
|`SAVEPOINT`|트랜잭션 내에 `ROLLBACK`할 위치인 저장점을 지정하는 명령어|

<br>

#### [2] `GRANT` / `REVOKE`

```sql
GRANT 사용자등급 TO 사용자_ID_리스트 [IDENTIFIED BY 암호];
GRANT 권한_리스트 ON 개체 TO 사용자 [WITH GRANT OPTION];

REVOKE 사용자등급 FROM 사용자_ID_리스트;
REVOKE [GRANT OPTION FOR] 권한_리스트 ON 개체 FROM 사용자 [CASCADE];
```

<br>
<br>

### 104. SQL - DML
#### [1] DML(Data Manipulation Language, 데이터 조작어)
- **DML** : **저장된 데이터를 실질적으로 관리하는데 사용되는 언어**

- DML의 종류

|명령어|기능|
|:---:|:---:|
|`SELECT`|튜플을 검색|
|`INSERT`|튜플을 삽입|
|`DELETE`|튜플을 삭제|
|`UPDATE`|튜플을 갱신|

<br>

#### [2] `INSERT INTO`

```sql
INSERT INTO 테이블명([속성명1, 속성명2, ...])
VALUES (데이터1, 데이터2, ...);  
```

<br>

#### [3] `DELETE FROM`

```sql
DELETE
FROM 테이블명
[WHERE 조건];
```

<br>

#### [4] `UPDATE ~ SET`

```sql
UPDATE 테이블명
SET 속성명 = 데이터[, 속성명 = 데이터, ...]
[WHERE 조건];
```

<br>
<br>

### 105. DML - SELECT-1
#### [1] 일반 형식

```sql
SELECT [PREDICATE] [테이블명.]속성명 [AS 별칭][, [테이블명.]속성명, ...]
FROM 테이블명[, 테이블명, ...]
[WHERE 조건]
[ORDER BY 속성명[ASC | DESC]];
```  

- `PREDICATE` : 검색할 튜플 수를 제한
  - `DISTINCT` : 중복 제거

- `AS` : Alias

- `WHERE` : 검색할 조건 기술

- `ORDER BY` : 데이터를 정렬하여 검색  

<br>

#### [2] 조건 연산자
- 비교 연산자

|연산자|설명|
|:---:|:---:|
|`=`|같다|
|`<>`|같지 않다|
|`>`|크다|
|`<`|작다|
|`>=`|크거나 같다|
|`<=`|작거나 같다|

- 논리 연산자 : `NOT`, `AND`, `OR`

- LIKE 연산자 : 문자 패턴과 일치하는 튜플을 검색하기 위해 사용

|대표문자|의미|
|:---:|:---:|
|`%`|모든 문자를 대표|
|`_`|문자 하나를 대표|
|`#`|숫자 하나를 대표|

<br>

#### [3] 기본 검색
- 예제

```sql
SELECT * FROM 사원;
```

<br>

#### [4] 조건 지정 검색
- 예제

```sql
SELECT * FROM 사원
WHERE 이름 LIKE '김%';
```

<br>

#### [5] 정렬 검색
- 예제

```sql
-- TOP N : 검색할 튜플 수를 제한(PREDICATE)
SELECT TOP 2 * FROM 사원
ORDER BY 주소 DESC;
```

<br>

#### [6] 하위 질의
- 예제

```sql
SELECT * FROM 사원
WHERE 이름 NOT IN (SELECT 이름 FROM 여가활동);
```

```sql
SELECT 이름, 기본급, 주소
FROM 사원
WHERE 기본급 < ALL (SELECT 기본급 FROM 사원 WHERE 주소 = '망원동');
```

<br>

#### [7] 복수 테이블 검색
- 예제

```sql
SELECT 사원.이름, 사원.부서, 여가활동.취미, 여가활동.경력
FROM 사원, 여가활동
WHERE 여가활동.경력 >= 10 AND 사원.이름 = 여가활동.이름;
```

<br>
<br>

### 106. DML - SELECT-2
#### [1] 일반 형식(심화)

```sql
SELECT [PREDICATE] [테이블명.]속성명 [AS 별칭][, [테이블명.]속성명, ...]
[, 그룹함수(속성명) [AS 별칭]]
[, WINDOW함수 OVER (PARTITION BY 속성명1, 속성명2, ... ORDER BY 속성명3, 속성명4, ...) [AS 별칭]]

FROM 테이블명[, 테이블명, ...]
[WHERE 조건]
[GROUP BY 속성명, 속성명, ...]
[HAVING 조건]
[ORDER BY 속성명[ASC | DESC]];
```

- 그룹함수 : `GROUP BY` 절과 함께 사용되며, 그룹별로 속성의 값을 집계할 함수를 지정
  - `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` 등

- WINDOW 함수 : `GROUP BY` 절 **없이**, 속성의 값을 집계할 함수를 지정
  - `ROW_NUMBER`, `RANK`, `DENSE_RANK` 등

- `GROUP BY` : 일반적으로 그룹 함수와 함께 사용되며, 특정 속성을 기준으로 그룹화할 떄 사용

- `HAVING` : 반드시 `GROUP BY` 절과 함께 사용되는 조건문이며, 그룹에 대한 조건을 지정  

<br>

#### [2] 그룹함수

|함수|기능|
|:---:|:---:|
|`COUNT(속성명)`|`NULL`이 아닌 그룹별 튜플의 수|
|`SUM(속성명)`|그룹별 함계|
|`AVG(속성명)`|그룹별 평균|
|`MAX(속성명)`|그룹별 최대값|
|`MIN(속성명)`|그룹별 최소값|
|`STDDEV(속성명)`|그룹별 표준편차|
|`VARIANCE(속성명)`|그룹별 분산|
|`ROLLUP(속성명, 속성명, ...)`|그룹별 소계|
|`CUBE(속성명, 속성명, ...)`|모든 조합의 그룹별 소계|

<br>

#### [3] WINDOW 함수
- 윈도우 : 함수의 인수로 지정한 속성이 집계할 범위

- 윈도우 함수
  - `ROW_NUMBER()` : 윈도우별로 각 레코드에 대한 일련번호 부여
  - `RANK()` : 윈도우별로 순위를 반환, 공동 순위를 반영
  - `DENSE_RANK()` : 윈도우별로 순위를 반환, 공동 순위를 무시하고 순위를 부여

<br>

#### [4] WINDOW 함수 이용 검색
- 예제

```sql
SELECT 상여내역, 상여금,
        ROW_NUMBER() OVER (PARTITION BY 상여내역 ORDER BY 상여금 DESC) AS NO
FROM 상여금;
```

<br>

#### [5] 그룹 지정 검색
- 예제

```sql
-- 상여금 테이블에서 상여금이 100 이상인 사원의 수가 2명 이상인 부서의 부서명과 사원수를 검색
SELECT 부서, COUNT(*) AS 사원수
FROM 상여금
WHERE 상여금 >= 100
GROUP BY 부서
HAVING COUNT(*) >= 2;
```

<br>

#### [6] 집함 연산자를 이용한 통합 질의
- 표기 형식

```sql
SELECT 속성명1, 속성명2, ...
FROM 테이블명1
UNION | UNION ALL | INTERSECT | EXCEPT
SELECT 속성명1, 속성명2, ...
FROM 테이블명2
[ORDER BY 속성명 [ASC | DESC]];
```

<br>
<br>

### 107. DML - JOIN
#### [1] JOIN
- **JOIN** : **연관된 튜플들을 결합하여, 하나의 새로운 릴레이션을 반환**

- JOIN의 종류
  - **INNER JOIN** : THETA JOIN, EQUI JOIN, NATURAL JOIN, NON-EQUI JOIN
  - **OUTER JOIN** : LEFT OUTER JOIN, RIGHT OUTER JOIN, FULL OUTER JOIN

<br>

#### [2] INNER JOIN
- **THETA JOIN** : 두 릴레이션의 속성 값을 비교하여 조건을 만족하는 튜플만 반환하는 조인
  - 조인에 사용되는 조건에는 `=`, `≠`, `<`, `>`, `≤`, `≥` 등이 있음

- **EQUI JOIN** : THETA JOIN의 조건이 `=`인 경우
  - 이 때 사용되는 조건 속성을 **조인 속성**이라고 한다.

- **NATURAL JOIN** : EQUI JOIN에서 중복된 속성을 제거하여 한 번만 표기하는 조인

- **NON-EQUI JOIN** : THETA JOIN의 조건이 `=`가 아닌 나머지 연산자인 경우

<br>

- EQUI JOIN은 `WHERE`절로 표현할 수 있다.

```sql
SELECT [테이블명1.]속성명, [테이블명2.]속성명
FROM 테이블명1, 테이블명2
WHERE 테이블명1.조인속성 = 테이블명2.조인속성;
```

- `NATURAL JOIN`절을 이용한 EQUI JOIN의 표기 형식

```sql
SELECT [테이블명1.]속성명, [테이블명2.]속성명
FROM 테이블명1 NATURAL JOIN 테이블명2;
```

- `JOIN` ~ `USING` 절을 이용한 EQUI JOIN의 표기 형식

```sql
SELECT [테이블명1.]속성명, [테이블명2.]속성명
FROM 테이블명1 JOIN 테이블명2 USING (조인속성);
```  

<br>

#### [3] OUTER JOIN
- **OUTER JOIN** : JOIN 조건에 만족하지 않는 튜플도 결과로 출력하기 위한 JOIN 방법

- **LEFT OUTER JOIN** : INNER JOIN의 결과를 구한 후, 왼쪽 릴레이션에만 존재하는 튜플에 대해 NULL 값을 채워서 결과에 포함시키는 JOIN 방법 (왼쪽 릴레이션 우선)

```sql
SELECT [테이블명1].속성명, [테이블명2.]속성명
FROM 테이블명1, 테이블명2
WHERE 테이블명1.조인속성 = 테이블명2.조인속성(+);

SELECT [테이블명1].속성명, [테이블명2.]속성명
FROM 테이블명1 LEFT OUTER JOIN 테이블명2
ON 테이블명1.조인속성 = 테이블명2.조인속성;
```

- **RIGHT OUTER JOIN** : INNER JOIN의 결과를 구한 후, 오른쪽 릴레이션에만 존재하는 튜플에 대해 NULL 값을 채워서 결과에 포함시키는 JOIN 방법 (오른쪽 릴레이션 우선)

```sql
SELECT [테이블명1].속성명, [테이블명2.]속성명
FROM 테이블명1, 테이블명2
WHERE 테이블명1.조인속성(+) = 테이블명2.조인속성;

SELECT [테이블명1].속성명, [테이블명2.]속성명
FROM 테이블명1 RIGHT OUTER JOIN 테이블명2
ON 테이블명1.조인속성 = 테이블명2.조인속성;
```

- **FULL OUTER JOIN** : LEFT OUTER JOIN과 RIGHT OUTER JOIN을 합친 것으로, 양쪽 릴레이션 각각에만 존재하는 튜플에 대해 NULL 값을 채워서 결과에 포함시키는 JOIN 방법

```sql
SELECT [테이블명1].속성명, [테이블명2.]속성명
FROM 테이블명1 FULL OUTER JOIN 테이블명2
ON 테이블명1.조인속성 = 테이블명2.조인속성;
```  

<br>
<br>

### 108. 트리거(Trigger)
#### [1] 트리거(Trigger)
- **트리거** : **이벤트(Event)가 발생할 때 관련 작업이 자동으로 수행되게 하는 절차형 SQL**

<br>

#### [2] 트리거의 생성

```sql
CREATE [OR REPLACE] TRIGGER 트리거명 [동작시기_옵션][동작 옵션] ON 테이블명
[REFERENCING [NEW | OLD] AS 테이블별칭]
FOR EACH ROW
[WHEN (조건식)]
BEGIN
    트리거 BODY;
END;
```

- `OR REPLACE` : 선택적인 예약어로, 트리거가 이미 존재하면 기존 트리거를 제거하고 새로 생성

- 동작시기 옵션
  - `AFTER`
  - `BEFORE`

- 동작 옵션
  - `INSERT`
  - `UPDATE`
  - `DELETE`

- `NEW | OLD` : 추가/수정(`NEW`) 또는 수정/삭제(`OLD`) 대상이 될 튜플들의 집합(테이블)을 의미하는 별칭을 지정

- `FOR EACH ROW` : 각 튜플마다 트리거를 적용한다는 의미

- `WHEN (조건식)` : 선택적인 예약어로, 트리거를 적용할 튜플 조건을 지정

<br>

#### [3] 트리거의 삭제

```sql
DROP TRIGGER 트리거명;
```