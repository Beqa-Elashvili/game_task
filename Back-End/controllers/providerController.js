const { prisma, connectDb } = require("../lib/prisma");

exports.createProviders = async (req, res) => {
  try {
    await connectDb();

    const providers = req.body;

    if (!Array.isArray(providers) || providers.length === 0) {
      return res
        .status(400)
        .json({ error: "Providers must be a non-empty array. " });
    }

    const result = await prisma.provider.createMany({
      data: providers.map(({ name }) => {
        name;
      }),
    });

    return res
      .status(201)
      .json({ message: "Providers created successfully!", data: result });
  } catch (error) {
    console.error("Error creating providers:", error);
    return res.status(500).json({ error: "Failed to create providers" });
  }
};

exports.getProviders = async (req, res) => {
  try {
    await connectDb();

    const providers = await prisma.provider.findMany();

    if (providers.length === 0) {
      return res.status(200).json({ message: "No providers found!", data: [] });
    }

    return res.status(200).json({ data: providers });
  } catch (error) {
    console.error("Error fetching providers:", error);
    return res.status(500).json({ error: "Failed to get providers" });
  }
};

exports.deleteAllProviders = async (req, res) => {
  try {
    await connectDb();

    const result = await prisma.provider.deleteMany(); 

    return res
      .status(200)
      .json({ message: "All providers deleted successfully.", data: result });
  } catch (error) {
    console.error("Error deleting providers:", error);
    return res.status(500).json({ error: "Failed to delete providers" });
  }
};
