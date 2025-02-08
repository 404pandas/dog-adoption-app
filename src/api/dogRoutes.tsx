// ─── DOG BREED NAMES ─────────────────────────────
// Endpoint: GET /dogs/breeds
// Description: Retrieves an array of all possible dog breed names.

// Response:
// - Status: 200 OK
// - Body: Array of breed names

// ─── DOGS BY QUERY ───────────────────────────────
// Endpoint: GET /dogs/search
// Description: Searches for dogs based on various query parameters.

// Query Parameters (All optional):
// - breeds (string[]) → An array of breed names to filter by
// - zipCodes (string[]) → An array of zip codes to filter by
// - ageMin (number) → Minimum age filter
// - ageMax (number) → Maximum age filter

// Additional Query Parameters:
// - size (number) → Number of results to return (default: 25)
// - from (string) → Cursor for paginating results
// - sort (string) → Sorting format: `sort=field:[asc|desc]`
//   - Sortable fields: breed, name, age
//   - Example: `sort=breed:asc`

// Response:
// - Status: 200 OK
// - Body:
//   {
//       "resultIds": string[],  // Array of dog IDs matching the query
//       "total": number,        // Total number of results (max: 10,000)
//       "next": string | null,  // Query for the next page (if available)
//       "prev": string | null   // Query for the previous page (if available)
//   }

// ─── FETCH 100 DOG OBJECTS ───────────────────────
// Endpoint: POST /dogs
// Description: Fetches up to 100 dog objects by their IDs.

// Body Parameters:
// - Array of dog IDs (max: 100)

// Example Request Body:
// [
//     "dogId1",
//     "dogId2",
//     "dogId3"
// ]

// Response:
// - Status: 200 OK
// - Body: Array of dog objects

// ─── MATCH A DOG ────────────────────────────────
// Endpoint: POST /dogs/match
// Description: Selects a single dog ID from a provided list of dog IDs for adoption matching.

// Body Parameters:
// - Array of dog IDs

// Example Request Body:
// [
//     "dogId1",
//     "dogId2",
//     "dogId3"
// ]

// Response:
// - Status: 200 OK
// - Body:
//   {
//       "match": "selectedDogId"  // The matched dog's ID
//   }
export {};
