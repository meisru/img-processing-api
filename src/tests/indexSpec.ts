import request from "supertest";
import app from "../index";

describe("test endpoint response", function () {
  it("gets the / endpoint", async (): Promise<void> => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });

  it("gets the /api endpoint", async (): Promise<void> => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
  });

  it("gets the /api/images endpoint with valid parameters", async () => {
    const response = await request(app).get(
      "/api/image?filename=santamonica&width=100&height=100"
    );
    expect(response.status).toBe(200);
  });

  it("should return 404 status for non-existing filename", async () => {
    const response = await request(app).get("/api/image?filename=nonexisting");
    expect(response.status).toBe(404);
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
