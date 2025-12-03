import express from "express"; //ES Modules] 최신 JS 방식, 설정 필요
// const express = require("express"); //CommonJS] Node 기본, 설정 필요 없음
import {
  //뭐지 저절로 생김
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
const router = express.Router();

//Get all posts
router.get("/", getPosts);

//Get single post
router.get("/:id", getPost);

//Create new post
router.post("/", createPost);

//Update Post 업데이트기능
router.put("/:id", updatePost);

//Delete Post 삭제!
router.delete("/:id", deletePost);
export default router;
