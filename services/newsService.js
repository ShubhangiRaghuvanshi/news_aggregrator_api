const axios=require('axios');
require('dotenv').config();
const{getCache,setCache}=require("./cacheService");
const newsService= async(query)=>{
    try{
    if(!query || query.trim()=== '' || typeof query !== "string")
    {
        throw new Error("Enter a valid query string");
}
    const NEWS_API_URL = "https://newsapi.org/v2/everything";
    const API_KEY = process.env.API_KEY;
    const url = `${NEWS_API_URL}?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
    console.log(url);
const cachedNews=await getCache(query);
if(cachedNews)
{
    console.log("Returning cached news");
    return JSON.parse(cachedNews);
}

   const response= await axios.get(url);
   if(response.data.articles.length>0 && response.data.status=='ok')
   {


await    setCache(query,3600,JSON.stringify(response.data.articles))
return response.data.articles;
   }

   else{
    
    throw new Error("No articles found for this query");
   }

}
catch(error)
{
    console.error("Error fetching news:", error.message);
    throw error;
}
}
module.exports={newsService};