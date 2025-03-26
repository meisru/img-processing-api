import fs from "fs";

/**
 * Check if a file exists
 * @param {string} imagePath - The path to the image file
 * @returns {boolean} - True if the file exists, false otherwise
 */
const fileExist = (imagePath: string): boolean => {
  try {
    fs.accessSync(imagePath);
    return true;
  } catch (err) {
    return false;
  }
};

export default fileExist;
