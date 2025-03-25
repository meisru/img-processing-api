import sharp from "sharp";

/**
 * Process image via sharp
 * @param {string}  filename - The filename of the image
 * @param {number}  width - The width of the image
 * @param {number}  height - The height of the image
 * @returns {Promise<string>} - The result of the image processing
 */
const resizeImage = async (filename: string, width: number, height: number) => {
  try {
    await sharp(`assets/full/${filename}.jpg`)
      .resize(width, height)
      .toFile(`assets/thumb/${filename}_thumb.jpg`);
    return "Image resized successfully";
  } catch (err) {
    throw new Error(`Error resizing image: ${(err as Error).message}`);
  }
};

export default resizeImage;
