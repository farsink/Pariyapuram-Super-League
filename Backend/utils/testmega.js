const { megaLogin } = require("./Mega");
const fs = require("fs");
const path = require("path");

const downloadFolderFiles = async (folderPath, outputDir) => {
  try {
    const storage = await megaLogin();

    // Navigate to the folder
    const folder = storage.navigate(folderPath);
    if (!folder || folder.directory !== true) {
      throw new Error("Invalid folder path or folder not found.");
    }

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Iterate through all children in the folder
    for (const child of folder.children) {
      if (child.directory) {
        console.log(`Skipping folder: ${child.name}`);
        continue; // Skip subfolders
      }

      console.log(`Downloading file: ${child.name}`);

      // Check if attributes are already loaded
      if (!child.attributes) {
        await child.loadAttributes(); // Load attributes only if not already loaded
      }

      // Download the file
      const fileData = await child.downloadBuffer();

      // Save the file locally
      const filePath = path.join(outputDir, child.name);
      fs.writeFileSync(filePath, fileData);

      console.log(`File saved: ${filePath}`);
    }

    console.log("All files downloaded successfully.");
  } catch (error) {
    console.error("Error during download:", error);
  }
};

// Example usage

// Example usage
(async () => {
  const folderPath = "PSL"; // Replace with your folder path
  const outputDir = "./downloads"; // Replace with your desired output directory
  await downloadFolderFiles(folderPath, outputDir);
})();
