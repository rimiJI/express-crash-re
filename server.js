import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
// const express = require("express"); //express불러오기
// const path = require("path");
// const posts = require("./routes/posts"); //오타 주의 post❌, routes폴더의 posts를 읽어라~
const port = process.env.PORT || 8000;
//Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); //디렉토리 네임

const app = express(); //app 객체로 라우팅,미들웨어서버시작,포트수신대기 .. 작업들 처리

//Body parser middleware
app.use(express.json()); // JSON 형식의 body 파싱(=raw Json 을 제출하게)
app.use(express.urlencoded({ extended: false })); //URL로 인코딩 된 데이터객체를 받아서 양식 데이터를 보낼 수 있다.

//Logger middleware
app.use(logger);

//setup static folder 정적 폴더로 처리
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/posts", posts); //💥  이게 주소

//Error handler
app.use(notFound);
app.use(errorHandler);

//서버실행
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
