const { megaLogin } = require("./Mega");

(async () => {
  try {
    const storage = await megaLogin();

    const targetFolderName = "PSL";
    const targetFolder = storage.find((folder) => folder.name === targetFolderName);

    if (targetFolder) {
      console.log(`Found folder: ${targetFolder.name}`);
      console.log(`Node ID: ${targetFolder.nodeId}`);
    } else {
      console.log(`Folder "${targetFolderName}" not found.`);
    }
  } catch (error) {
    console.error("Login failed:", error.message);
  }
})();
