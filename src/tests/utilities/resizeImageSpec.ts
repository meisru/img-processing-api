import resizeImage from "../../utilities/resizeImage";

describe("image resize function", function () {
  it("should resolve successfully", async function () {
    const result = await resizeImage("santamonica", 100, 100);
    expect(result).toBe("assets/thumb/santamonica_100_100.jpg");
  });

  it("should reject when dimensions are invalid", async function () {
    resizeImage("santamonica", -100, -100);
  });
});
