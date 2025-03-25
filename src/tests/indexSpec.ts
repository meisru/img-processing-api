import resizeImage from "../utilities/resizeImage";
import request from "supertest";
import app from "../index";

describe("test endpoint response", function () {
  it("gets the api/images endpoint", function () {
    expect(() => {
      fetch("http://localhost:3000/api/image");
    }).not.toThrowError();
  });

  it("should return 400 status for invalid filename", async () => {
    const response = await request(app).get("/api/image?width=100&height=100");
    expect(response.status).toBe(400);
    expect(response.text).toBe("<h1>Filename is required</h1>");
  });

  it("should return 400 status for invalid width", async () => {
    const response = await request(app).get(
      "/api/image?filename=santamonica&height=100"
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe("<h1>Please enter a valid width</h1>");
  });

  it("should return 400 status for invalid height", async () => {
    const response = await request(app).get(
      "/api/image?filename=santamonica&width=100"
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe("<h1>Please enter a valid height</h1>");
  });
});

describe("image resize function", function () {
  it("should resolve successfully", async function () {
    const result = await resizeImage("santamonica", 100, 100);
    expect(result).toBe("Image resized successfully");
  });

  it("should reject when dimensions are invalid", async function () {
    resizeImage("santamonica", -100, -100);
  });
});
