const { prisma, connectDb } = require("../lib/prisma");

exports.getNews = async (req, res) => {
  try {
    const news = await prisma.news.findMany();

    res.json({
      data: news,
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
