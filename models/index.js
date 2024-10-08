// 이미 생성되어 있는 기본 코드는 모두 삭제
import dotenv from "dotenv";
dotenv.config();
// json 포맷을 node.js에서 불러올때는 assert {type: 'json'}을 삽입해야 한다.
import config from "../config/config.json" assert {type: 'json'};
const env = process.env.NODE_ENV || "development";
const configEnv = config[env]; // username, database, passworde, host....
console.log(env);

import User from "./User.js"; // User 모델 불러오기
import { Sequelize } from "sequelize";
const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
  host: configEnv.host,
  dialect: configEnv.dialect,
  port: 3306,
  logging: (msg) => console.log(msg)
});

// DB 연결 테스트
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Model - Table 동기화(Synchronization) ==> Promises 객체를 반환 : 비동기
await sequelize.sync({ force: true }).then(() => {
  console.log('All models were synchronized successfully.');
}).catch((error) => {
  console.log("Error Occured : " + error);
});

// DB 정의
const db = {}; // 여러 객체(모델)를 한번에 저장해서 db라는 이름으로 내보내기 위한 용도
//객체.속성 = "값"
db.equelize = sequelize; // 시퀄라이즈 인스턴스(DB 접속정보)
db.User = User;
User.init(sequelize); // User 모델의 컬럼, 자료형 --> MariaDB에 생성

export default db;