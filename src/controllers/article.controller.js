const { SuccessResponse, CREATED } = require("../core/success.response.js");
const ArticleService = require("../services/article.service.js");
class MedicineController {
  static getAllArticles = async (req, res) => {
    new SuccessResponse({
      message: "Get all articles Success!",
      data: await ArticleService.getAllArticles(req.query),
    }).send(res)
  }

  static getArticleDetail = async (req, res) => {
    new SuccessResponse({
      message: "Get article detail Success!",
      data: await ArticleService.getArticleDetail(req.params),
    }).send(res)
  }

  static createArticle = async (req, res) => {
    new CREATED({
      message: "Create article OK!",
      data: await ArticleService.createArticle(req.body),
    }).send(res)
  }
}

module.exports = MedicineController