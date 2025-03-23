import sharp from "sharp";

const resizeImage = async (filename: string, width: number, height: number) => {
  try {
    await sharp(`assets/full/${filename}.jpg`)
      .resize(width, height)
      .toFile(`assets/thumb/${filename}.jpg`);
  } catch (err) {
    console.error("Error resizing image", err);
  }
};

export default resizeImage;
