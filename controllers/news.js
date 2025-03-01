const { newsService } = require("../services/newsService");

const User = require("../models/user");

const getNews = async (req, res) => {
  try {
    const dbUser = await User.findById(req.user.id);
    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const query = dbUser.preferences.join(" ");



    console.log(query);
    if (!query.trim()) {
      return res.status(400).json({ message: "No search query available from preferences" });
    }

    const news = await newsService(query);
    res.status(200).json({ news });
  } catch (error) {
    console.error("Error in getNews:", error.message);
    res.status(500).json({ message: "Error fetching news", error: error.message });
  }
};




const markArticleAsRead = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { articleUrl } = req.body;

    if (!articleUrl) {
      return res.status(400).json({ message: "Article URL is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    if (!user.readArticles.includes(articleUrl)) {
      user.readArticles.push(articleUrl);
      await user.save();
    }

    res.status(200).json({ message: "Article marked as read" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



  
const getReadArticles = async (req, res) => {
    try {
      const userId = req.user.id; 
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ readArticles: user.readArticles });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

module.exports = { getNews,markArticleAsRead  ,getReadArticles};
