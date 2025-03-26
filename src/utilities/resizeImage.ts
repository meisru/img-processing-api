import sharp from "sharp";

/**
 * Process image via sharp
 * @param {string}  filename - The filename of the image
 * @param {number}  width - The width of the image
 * @param {number}  height - The height of the image
 * @returns {Promise<string>} - The path to the processed image
 */
const resizeImage = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  const outputPath = `assets/thumb/${filename}_${width}_${height}.jpg`;

  try {
    await sharp(`assets/full/${filename}.jpg`)
      .resize(width, height)
      .toFile(outputPath);

    return outputPath;
  } catch (err) {
    throw new Error(`Error resizing image: ${(err as Error).message}`);
  }
};

export default resizeImage;
