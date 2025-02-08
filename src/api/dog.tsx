// dog breed names
// GET /dogs/breeds
// Return Value
// Returns an array of all possible breed names.
// ------------
// dogs by query
// GET /dogs/search
// Query Parameters
// The following query parameters can be supplied to filter the search results. All are optional; if none are provided, the search will match all dogs.

// breeds - an array of breeds
// zipCodes - an array of zip codes
// ageMin - a minimum age
// ageMax - a maximum age
// Additionally, the following query parameters can be used to configure the search:

// size - the number of results to return; defaults to 25 if omitted
// from - a cursor to be used when paginating results (optional)
// sort - the field by which to sort results, and the direction of the sort; in the format sort=field:[asc|desc].
// results can be sorted by the following fields:
// breed
// name
// age
// Ex: sort=breed:asc
// Return Value
// Returns an object with the following properties:

// resultIds - an array of dog IDs matching your query
// total - the total number of results for the query (not just the current page)
// next - a query to request the next page of results (if one exists)
// prev - a query to request the previous page of results (if one exists)
// The maximum total number of dogs that will be matched by a single query is 10,000.
// ------------
// 100 dog objects
// POST /dogs
// Body Parameters
// The body should be an array of no more than 100 dog IDs to fetch (no pun intended).

// API Request Function
// ...
// body: string[]
// ...
// Return Value
// Returns an array of dog objects
// --------------
// matches
// POST /dogs/match
// Body Parameters
// The body of this request should be an array of dog IDs.

// Example

// // API Request Function
// ...
// body: string[]
// ...
// Return Value
// This endpoint will select a single ID from the provided list of dog IDs. This ID represents the dog the user has been matched with for adoption.

// interface Match {
//     match: string
// }
