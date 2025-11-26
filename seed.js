import mongoose from "mongoose";

// Define Product schema inline
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  type: { type: String, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
});
const Product = mongoose.model("Product", productSchema);

// Define User schema inline
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, default: "user" },
});
const User = mongoose.model("User", userSchema);

async function seedDatabase() {
  try {
    // Connect to MongoDB using same logic as app
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
    const dbName = process.env.MONGO_DB || 'Man';
    console.log("Using URI:", mongoUri, "DB:", dbName);

    await mongoose.connect(mongoUri, { dbName });

    console.log("Connected to MongoDB");

    // Sample products for each type
    const products = [
      // Mangalsutras
      {
        name: "Traditional Gold Mangalsutra",
        image:
          "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
        price: "₹45,000",
        type: "mangalsutra",
        stock: 5,
        description:
          "Beautiful traditional gold mangalsutra with intricate design",
        tags: ["gold", "traditional", "wedding"],
      },
      {
        name: "Modern Diamond Mangalsutra",
        image:
          "https://images.unsplash.com/photo-1542990254-85e6a2ef92?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        price: "₹75,000",
        type: "mangalsutra",
        stock: 3,
        description: "Elegant modern mangalsutra with diamond accents",
        tags: ["diamond", "modern", "wedding"],
      },
      {
        name: "Classic Black Bead Mangalsutra",
        image:
          "https://images.unsplash.com/photo-1550368566-f9cc32d7392d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        price: "₹25,000",
        type: "mangalsutra",
        stock: 8,
        description: "Timeless black bead mangalsutra with gold pendant",
        tags: ["black bead", "classic", "traditional"],
      },

      // Bracelets
      {
        name: "Gold Bangle Set",
        image:
          "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        price: "₹35,000",
        type: "bracelets",
        stock: 6,
        description: "Set of 4 gold bangles with intricate patterns",
        tags: ["gold", "bangles", "set"],
      },
      {
        name: "Diamond Tennis Bracelet",
        image:
          "https://images.unsplash.com/photo-1680690935158-7b7f2d5259dd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
        price: "₹85,000",
        type: "bracelets",
        stock: 2,
        description: "Stunning diamond tennis bracelet in white gold",
        tags: ["diamond", "tennis", "white gold"],
      },
      {
        name: "Silver Chain Bracelet",
        image:
          "https://images.unsplash.com/photo-1705326453292-f3d35cd96514?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        price: "₹8,500",
        type: "bracelets",
        stock: 12,
        description: "Delicate silver chain bracelet with heart charm",
        tags: ["silver", "chain", "charm"],
      },

      // Earrings
      {
        name: "Gold Hoop Earrings",
        image:
          "https://images.unsplash.com/photo-1650785468216-39788ac5a0dd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        price: "₹15,000",
        type: "earrings",
        stock: 10,
        description: "Classic gold hoop earrings with modern twist",
        tags: ["gold", "hoop", "modern"],
      },
      {
        name: "Diamond Stud Earrings",
        image:
          "https://images.unsplash.com/photo-1721103418218-416182aca079?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        price: "₹55,000",
        type: "earrings",
        stock: 4,
        description: "Elegant diamond stud earrings in platinum setting",
        tags: ["diamond", "stud", "platinum"],
      },
      {
        name: "Pearl Drop Earrings",
        image:
          "https://images.unsplash.com/photo-1739194097821-a0fbea48a3f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
        price: "₹12,000",
        type: "earrings",
        stock: 7,
        description: "Graceful pearl drop earrings with gold accents",
        tags: ["pearl", "drop", "gold"],
      },

      // Necklaces
      {
        name: "Gold Chain Necklace",
        image:
          "https://plus.unsplash.com/premium_photo-1674255466849-b23fc5f5d3eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        price: "₹28,000",
        type: "necklaces",
        stock: 9,
        description: "Heavy gold chain necklace with pendant",
        tags: ["gold", "chain", "heavy"],
      },
      {
        name: "Diamond Pendant Necklace",
        image:
          "https://images.unsplash.com/photo-1708390250220-803af1100d31?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        price: "₹65,000",
        type: "necklaces",
        stock: 3,
        description: "Exquisite diamond pendant on delicate chain",
        tags: ["diamond", "pendant", "delicate"],
      },
      {
        name: "Silver Locket Necklace",
        image:
          "https://images.unsplash.com/photo-1685970731194-e27b477e87ba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
        price: "₹5,500",
        type: "necklaces",
        stock: 15,
        description: "Heart-shaped silver locket with photo compartment",
        tags: ["silver", "locket", "heart"],
      },

      // Rings
      {
        name: "Gold Wedding Band",
        image:
          "https://plus.unsplash.com/premium_photo-1661308304093-009586f280a5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        price: "₹32,000",
        type: "rings",
        stock: 8,
        description: "Classic gold wedding band with engraving option",
        tags: ["gold", "wedding", "band"],
      },
      {
        name: "Diamond Engagement Ring",
        image:
          "https://plus.unsplash.com/premium_photo-1739548337724-f641c8b5c886?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        price: "₹95,000",
        type: "rings",
        stock: 2,
        description: "Stunning 2-carat diamond engagement ring",
        tags: ["diamond", "engagement", "2-carat"],
      },
      {
        name: "Silver Promise Ring",
        image:
          "https://images.unsplash.com/photo-1663079899584-64acea4d6858?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        price: "₹8,000",
        type: "rings",
        stock: 11,
        description: "Delicate silver promise ring with birthstone",
        tags: ["silver", "promise", "birthstone"],
      },

      // Daily Wear
      {
        name: "Gold Nose Pin",
        image:
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
        price: "₹2,500",
        type: "daily-wear",
        stock: 20,
        description: "Simple gold nose pin for everyday wear",
        tags: ["gold", "nose pin", "simple"],
      },
      {
        name: "Silver Anklet",
        image:
          "https://plus.unsplash.com/premium_photo-1674748385436-db725f68e312?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        price: "₹3,200",
        type: "daily-wear",
        stock: 14,
        description: "Light silver anklet with bell charms",
        tags: ["silver", "anklet", "bell"],
      },
      {
        name: "Gold Hair Accessories Set",
        image:
          "https://plus.unsplash.com/premium_photo-1669835163351-785a187cdf95?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
        price: "₹4,500",
        type: "daily-wear",
        stock: 6,
        description: "Set of gold hair clips and pins",
        tags: ["gold", "hair", "accessories"],
      },

      // Party Wear
      {
        name: "Diamond Choker Necklace",
        image:
          "https://plus.unsplash.com/premium_photo-1740020264402-3a493f16dac8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        price: "₹125,000",
        type: "party-wear",
        stock: 1,
        description: "Extravagant diamond choker for special occasions",
        tags: ["diamond", "choker", "extravagant"],
      },
      {
        name: "Gold Bridal Set",
        image:
          "https://images.unsplash.com/photo-1758995115785-d13726ac93f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        price: "₹180,000",
        type: "party-wear",
        stock: 1,
        description: "Complete gold bridal jewelry set",
        tags: ["gold", "bridal", "set"],
      },
      {
        name: "Platinum Party Earrings",
        image:
          "https://images.unsplash.com/photo-1758995115682-1452a1a9e35b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=990",
        price: "₹75,000",
        type: "party-wear",
        stock: 3,
        description: "Statement platinum earrings with gemstones",
        tags: ["platinum", "statement", "gemstones"],
      },
    ];

    // Insert products
    await Product.insertMany(products);
    console.log(`Inserted ${products.length} products`);

    // Sample users with properly hashed passwords
    const bcrypt = await import("bcryptjs");
    const users = [
      {
        name: "Admin User",
        email: "admin@mangarulesaraf.com",
        password: await bcrypt.default.hash("admin123", 10),
        phone: "9876543210",
        role: "admin",
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: await bcrypt.default.hash("password123", 10),
        phone: "9876543211",
        role: "user",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: await bcrypt.default.hash("password123", 10),
        phone: "9876543212",
        role: "user",
      },
    ];

    // Insert users
    await User.insertMany(users);
    console.log(`Inserted ${users.length} users`);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Run the seed function
seedDatabase().catch(console.error);
