# **π Meeting Management System**

## **β¨ Installation**

### **Github**

- Clone Repository

```bash
 git clone https://github.com/lucent-intern-orgmeeting-management-system.git
```

### **Frontend web Setting**

- frontend/web/src/url.tsx

```typescript
export const SERVER = "http://<ip>:<server_port>";
```

- frontend/web/.env

```
REACT_APP_GOOGLE_CLIENT_ID=<google_client_id>
SKIP_PREFLIGHT_CHECK=true
```

### **Backend Setting**

- backend/ormconfig.json

```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "YOUR_PASSWORD",
  "database": "meeting_management",
  "entities": ["dist/**/*{.d.ts,.js}"],
  "synchronize": false
}
```

## **π Start**

### **web**

```
cd ./frontend/web
npm install
npm run start
```

### **app**

```
cd ./frontend/app
flutter pub get
flutter run
```

### **backend**

```
cd ./backend
npm install
npm run start
```

## **π  Tech Stack**

[βΆ Tech Stack μ μ  μ΄μ ](https://tar-lung-e93.notion.site/Tech-Stack-e5cdb5da0a0946c480e0bdaed8e5611d)  
<br>

| λΆλ₯     | κΈ°μ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|          |
| Frontend | ![react](https://img.shields.io/badge/react-gray?logo=react) ![Typescript](https://img.shields.io/badge/typescript-grey?logo=typescript) ![axios](https://img.shields.io/badge/axios-gray?logo=axios) ![Styled-components](https://img.shields.io/badge/styled_components-gray?logo=styled-components) ![npm](https://img.shields.io/badge/npm-8.16.0-red?logo=npm) ![recoil](https://img.shields.io/badge/recoil-grey?logo=recoil) ![React-Query](https://img.shields.io/badge/react_query-grey?logo=react_query) ![flutter](https://img.shields.io/badge/flutter-3.0.4-blue?logo=flutter) |
| Backend  | ![NestJS](https://img.shields.io/badge/nestjs-9.0.0-red?logo=nestjs) ![Node](https://img.shields.io/badge/node-16.16.0-skyblue?logo=node) ![TypeOrm](https://img.shields.io/badge/typeorm-grey?logo=typeorm) ![Postman](https://img.shields.io/badge/postman-gray?logo=postman)                                                                                                                                                                                                                                                                                                             |
| DB       | ![MySQL](https://img.shields.io/badge/mysql-gray?logo=mysql)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

## **π File Tree**

```
π¦Meeting-Management-System
β£ πbackend
β πfrontend
  β£ πweb
  β πapp
```
