const { prisma, connectDb } = require("../lib/prisma");

exports.getCollections = async (req, res) => {
  try {
    await connectDb();

    const collection = await prisma.collection.findMany();

    if (collection.length === 0) {
      return res
        .status(200)
        .json({ message: "No collections Found!", data: [] });
    }
    return res.status(200).json({ data: collection });
  } catch (error) {
    console.error("Error fetching collections!:", error);
    return res.status(500).json({ error: "Failed to get collections!" });
  }
};
