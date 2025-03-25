import resizeImage from "../../utilities/resizeImage";

describe("image resize function", function () {
  it("should resolve successfully", async function () {
    const result = await resizeImage("santamonica", 100, 100);
    expect(result).toBe("Image resized successfully");
  });

  it("should reject when dimensions are invalid", async function () {
    resizeImage("santamonica", -100, -100);
  });
});
