"use strict"
const express = require("express")
const asyncHandler = require("../../helpers/asyncHandler")
const ArticleController = require("../../controllers/article.controller")
const router = express.Router()

router.get("/articles", asyncHandler(ArticleController.getAllArticles))
router.get("/articles/:id", asyncHandler(ArticleController.getArticleDetail))
router.post("/article", asyncHandler(ArticleController.createArticle))

module.exports = router