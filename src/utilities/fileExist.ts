import fs from "fs";

// utility function to check if a file exists
const fileExist = async (imagePath: string) => {
  try {
    fs.accessSync(imagePath);
    return true;
  } catch (err) {
    return false;
  }
};

export default fileExist;
