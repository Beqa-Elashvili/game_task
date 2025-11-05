const { prisma, connectDb } = require("../lib/prisma");

exports.getNews = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page 1, limit 10
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const totalItems = await prisma.news.count();

    const news = await prisma.news.findMany({
      skip,
      take: limitNum,
    });

    const totalPages = Math.ceil(totalItems / limitNum);
    const paginationMeta = {
      current_page: pageNum,
      per_page: limitNum,
      total_items: totalItems,
      total_pages: totalPages,
      has_next_page: pageNum < totalPages,
      has_prev_page: pageNum > 1,
      next_page: pageNum < totalPages ? pageNum + 1 : null,
      prev_page: pageNum > 1 ? pageNum - 1 : null,
    };

    res.json({
      data: news,
      meta: paginationMeta,
    });
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
exports.createNews = async (req, res) => {
  try {
    await connectDb();

    const newsArray = Array.isArray(req.body) ? req.body : [req.body];

    const validNews = newsArray.filter((item) => item.img);

    if (validNews.length === 0) {
      return res.status(400).json({ error: "No valid images provided" });
    }

    const createdNews = await Promise.all(
      validNews.map((item) =>
        prisma.news.create({
          data: {
            img: item.img,
          },
        })
      )
    );

    res.status(201).json(createdNews);
  } catch (err) {
    console.error("Prisma Error:", err);
    res.status(500).json({ error: "Failed to create news" });
  }
};
