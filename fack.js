import axios from "axios";

const API_URL = "http://localhost:8080/api/medicines";

// Predefined data arrays
const names = ["Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin", "Ciprofloxacin", "Metformin", "Omeprazole", "Lisinopril", "Simvastatin", "Albuterol"];
const manufacturers = ["ABC Pharmaceuticals", "XYZ Pharma", "HealthCorp", "MediQuick", "Wellness Labs"];
const dosages = ["100mg", "250mg", "500mg", "750mg", "1000mg"];
const genericNames = ["Pain Reliever", "Anti-Inflammatory", "Analgesic", "Antibiotic", "Antiviral"];
const prices = [0.99, 1.49, 2.99, 5.00, 7.50];
const discounts = [0, 5, 10, 15, 20];

// Helper function to get a random item from an array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Helper function to generate a future expiry date in YYYY-MM-DD format
const generateExpiryDate = () => {
  const today = new Date();
  const expiryDate = new Date(today.setFullYear(today.getFullYear() + Math.floor(Math.random() * 3) + 1));
  return expiryDate.toISOString().split("T")[0];
};

// Function to generate fake medicine data
const generateFakeMedicine = () => ({
  name: getRandomItem(names),
  manufacturer: getRandomItem(manufacturers),
  genericName: getRandomItem(genericNames),
  dosage: getRandomItem(dosages),
  quantity: Math.floor(Math.random() * 400) + 50,
  price: getRandomItem(prices),
  discount: getRandomItem(discounts),
  expiryDate: generateExpiryDate(),
});

// Function to seed data
const seedData = async (count = 10) => {
  const medicines = Array.from({ length: count }, generateFakeMedicine);

  try {
    for (const medicine of medicines) {
      const response = await axios.post(API_URL, medicine);
      console.log("Data seeded:", response.data);
    }
    console.log(`Successfully seeded ${count} records.`);
  } catch (error) {
    console.error("Error seeding data:", error.message);
  }
};

// Run the seed function
seedData(10);
