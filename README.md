# Image Processing API
A simple placeholder API which can be used to place images (jpg) into frontend with the size set via URL parameters.
### Scripts
- Build: ```npm run build```
- Lint: ```npm run lint```
- Prettier: ```npm run prettier```
- Run tests: ```npm run test```
- Start server: ```npm run start```

---
### Usage
The server runs on port 3000.

#### - Instructions:
```http://localhost:3000/api```

#### - Endpoint to resize images:
```http://localhost:3000/api/image```

  Query parameters needed:
  - filename: Available filenames are:
    - santamonica
    - fjord
    - icelandwaterfall
  - width: > 0
  - height: > 0

---
#### Example 1:
```http://localhost:3000/api```\
will return api instructions

#### Example 2:
```http://localhost:3000/api/image```\
will ask for a filename to be provided

#### Example 3:
```http://localhost:3000/api/image?filename=santamonica```\
will return the image with the original dimensions

#### Example 4:
```http://localhost:3000/api/image?filename=santamonica&width=200&height=200```\
will return the image with the dimensions 200x200
