// Polyfill for crypto.getRandomValues
const { Storage } = require("megajs");

if (!global.crypto) {
  const crypto = require("crypto");
  global.crypto = {
    getRandomValues: (buffer) => crypto.randomFillSync(buffer),
  };
}

async function megaLogin() {
  try {
    const storage = new Storage({
      email: "farsin495@gmail.com",
      password: "Farsin@890",
    });

    await storage.ready; // Wait for login to complete
    console.log("Login succeeded!", storage);
    return storage; // Return the storage instance for further use
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

module.exports = { megaLogin };