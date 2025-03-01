
const express=require("express");
const router=express.Router();
const newsController=require("../controllers/news");
const authMiddleware=require("../middlewares/authMiddleware");
router.get("/news",authMiddleware,newsController.getNews);
router.post("/news/read",authMiddleware,newsController.markArticleAsRead);
router.get("/news/read",authMiddleware,newsController.getReadArticles);

module.exports=router;
