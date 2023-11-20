# 마음연구소 기업과제

---

## 서버 실행 방법

1. git clone

2. 로컬 컴퓨터에 postgresql이 설치되어 있는 지 확인

3. .env.sample 파일을 참고해 .env 파일 생성 후 db 정보 입력

4. npm ci

5. npm run start

6. 자동으로 생성된 db 스키마 확인 후 user 테이블에 새로운 유저 1명 입력 필요 & 이후 userId가 필요한 모든 api에서 userId=1

```
INSERT INTO "user" ("id", "name") VALUES (1, '유저1');
```

---

## api

- 서버 실행 후 http://[::1]:4000/graphql에서 모든 api 확인 가능

---

## ERD
