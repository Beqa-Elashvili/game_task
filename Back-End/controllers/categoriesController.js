const { connectDb, prisma } = require("../lib/prisma");

exports.createCategories = async (req, res) => {
  try {
    await connectDb();
    const categories = req.body;

    if (!Array.isArray(categories) || categories.length === 0) {
      return res
        .status(400)
        .json({ error: "Categories must be a non-empty array. " });
    }
    const saveCategories = await prisma.category.createMany({
      data: categories.map(({ name, icon }) => ({ name, icon })),
    });
    res
      .status(201)
      .json({ message: "Categories created!", data: saveCategories });
  } catch (error) {
    console.error("Error creating categories", error);
    res.status(500).json({ error: "Failed to create categories" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    await connectDb();

    const categories = await prisma.Category.findMany();

    if (categories.length === 0) {
      return res
        .status(200)
        .json({ message: "No categories found.", data: [] });
    }

    return res.status(200).json({ data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ error: "Failed to get categories" });
  }
};
