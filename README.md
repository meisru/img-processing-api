# Image Processing API
A simple placeholder API which can be used to place images into frontend with the size set via URL parameters.
### Scripts
- Build: ```npm run build```
- Lint: ```npm run lint```
- Prettier: ```npm run prettier```
- Run tests: ```npm run test```
- Start server: ```npm run start```

### Usage
The server runs on port 3000.
To use the API, you need to pass the image filename and the desired width and height as query parameters.

#### Example 1:
```http://localhost:3000/api/image?filename=santamonica```
This will return the image with the original dimensions.

#### Example 2:
```http://localhost:3000/api/image?filename=santamonica&width=200&height=200```
This will return the image with the dimensions 200x200.