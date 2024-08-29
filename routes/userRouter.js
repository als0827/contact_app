// const express = require('express') // CommonJS 문법 --> 현지는 ESM방식
import express from "express";

const router = express.Router()
import userControl from '../controller/userController.js';
// 요청에 따른 응답 시간 (=성능측정 용도)
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// User(연락처) 생성
router.post('/', userControl.createUser);

//  modue.exports = router; // Commonjs 내보내기 문법 --> 현지는 esm방식
export default router;