const { prisma, connectDb } = require("../lib/prisma");

// GET /games
exports.getGames = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, provider } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build filter
    const where = {};
    if (category) where.categories = { has: category };
    if (provider) where.provider = provider;
    if (search) where.name = { contains: search, mode: "insensitive" };

    const games = await prisma.game.findMany({
      where,
      skip,
      take: parseInt(limit),
    });

    const total = await prisma.game.count({ where });

    res.json({
      data: games,
      filters_applied: {
        providers: provider ? [provider] : [],
        categories: category ? [category] : [],
        search: search || "",
      },
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(total / limit),
        has_next_page: parseInt(page) < Math.ceil(total / limit),
        has_prev_page: parseInt(page) > 1,
        next_page:
          parseInt(page) < Math.ceil(total / limit) ? parseInt(page) + 1 : null,
        prev_page: parseInt(page) > 1 ? parseInt(page) - 1 : null,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch games" });
  }
};

// POST /games

exports.createGame = async (req, res) => {
  try {
    await connectDb();

    const games = req.body;

    if (!Array.isArray(games)) {
      return res
        .status(400)
        .json({ error: "Request body must be an array of games" });
    }

    const createdGames = await Promise.all(
      games.map((game) =>
        prisma.game.create({
          data: {
            name: game.name,
            provider: game.provider,
            image: game.image,
            categories: game.categories,
            videoUrl: game.videoUrl || null,
          },
        })
      )
    );

    res.status(201).json(createdGames);
  } catch (err) {
    console.error("Prisma Error:", err);
    res.status(500).json({ error: "Failed to create games" });
  }
};
