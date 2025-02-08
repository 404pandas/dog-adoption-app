// ─── LIST OF LOCATIONS ───────────────────────────
// Endpoint: POST /locations
// Description: Retrieves location data for a list of ZIP codes.

// Body Parameters:
// - Array of ZIP codes (max: 100)

// Example Request Body:
// [
//     "12345",
//     "67890",
//     "54321"
// ]

// Response:
// - Status: 200 OK
// - Body: Array of Location objects

// ─── LOCATION BY QUERY ───────────────────────────
// Endpoint: POST /locations/search
// Description: Searches for locations based on various filters.

// Body Parameters (All optional):
// - city (string) → Full or partial city name
// - states (string[]) → Array of two-letter state/territory abbreviations
// - geoBoundingBox (object) → Defines a geographic bounding box

// geoBoundingBox Object:
// Must contain one of the following combinations of properties:
// 1. `top`, `left`, `bottom`, `right`
// 2. `bottom_left`, `top_right`
// 3. `bottom_right`, `top_left`

// Each coordinate property should be an object with:
// - lat (number) → Latitude
// - lon (number) → Longitude

// Additional Parameters:
// - size (number) → Number of results to return (default: 25)
// - from (number) → Cursor for paginating results

// Example Request Body:
// {
//     "city": "San Francisco",
//     "states": ["CA", "OR"],
//     "geoBoundingBox": {
//         "top": { "lat": 37.8, "lon": -122.5 },
//         "bottom": { "lat": 37.7, "lon": -122.4 }
//     },
//     "size": 50,
//     "from": 100
// }

// Response:
// - Status: 200 OK
// - Body:
// {
//     "results": Location[],  // Array of Location objects
//     "total": number         // Total number of results (max: 10,000)
// }
export {};
