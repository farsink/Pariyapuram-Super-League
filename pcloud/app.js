// Replace 'YOUR_ACCESS_TOKEN' with the actual access token you obtained
const ACC_TOKEN =
  "7b22757365726e616d65223a2266617273696e36373840676d61696c2e636f6d222c2270617373776f7264223a2246617273696e40383930227d";

window.onload = async function () {
  // Authenticate with pCloud
  await pcloud.auth(ACC_TOKEN);

  await pcloud.ref("/").then((e) => {
    e.list().then((files) => {
      console.log("Files in directory:", files);
    });
  });

  // Example: Upload a file when the "Submit" button is clicked
  document.getElementById("submit-btn").onclick = async function () {
    const fileInput = document.getElementById("files");
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      try {
        await pcloud.ref().then(async (e) => {
          e.uploadFile(file, file.name, (progress) => {
            console.log("Upload Progress:", progress);
          });
          console.log("File uploaded successfully");
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("No file selected");
    }
  };
};
