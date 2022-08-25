# **📆 Meeting Management System**

## **✨ Installation**

### **Github**

- Clone Repository

  ```bash
  git clone https://github.com/lucent-intern-org/meeting-management-system.git
  ```

### **Frontend web Setting**

- url.tsx

```typescript
export const SERVER = "http://<ip>:<server_port>";
```

### **Backend Setting**

- ormconfig.json

```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "user_password",
  "database": "meeting_management",
  "entities": ["dist/**/*{.d.ts,.js}"],
  "synchronize": false
}
```

## **📌 Start**

### **web**

```
npm run start
```

### **app**

```
flutter pub get
flutter run
```

### **backend**

```
npm run start
```

## **🛠 Tech Stack**

[▶ Tech Stack 선정 이유](https://tar-lung-e93.notion.site/Tech-Stack-e5cdb5da0a0946c480e0bdaed8e5611d)  
<br>

| 분류     | 기술                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|          |
| Frontend | ![react](https://img.shields.io/badge/react-gray?logo=react) ![Typescript](https://img.shields.io/badge/typescript-grey?logo=typescript) ![axios](https://img.shields.io/badge/axios-gray?logo=axios) ![Styled-components](https://img.shields.io/badge/styled_components-gray?logo=styled-components) ![npm](https://img.shields.io/badge/npm-8.16.0-red?logo=npm) ![recoil](https://img.shields.io/badge/recoil-grey?logo=recoil) ![React-Query](https://img.shields.io/badge/react_query-grey?logo=react_query) ![flutter](https://img.shields.io/badge/flutter-3.0.4-blue?logo=flutter) |
| Backend  | ![NestJS](https://img.shields.io/badge/nestjs-9.0.0-red?logo=nestjs) ![Node](https://img.shields.io/badge/node-16.16.0-skyblue?logo=node) ![Postman](https://img.shields.io/badge/postman-gray?logo=postman)                                                                                                                                                                                                                                                                                                                                                                                |
| DB       | ![MySQL](https://img.shields.io/badge/mysql-gray?logo=mysql)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
