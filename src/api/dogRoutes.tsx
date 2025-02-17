import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ─── DOG BREED NAMES ─────────────────────────────
// Endpoint: GET /dogs/breeds
// Description: Retrieves an array of all possible dog breed names.

// Response:
// - Status: 200 OK
// - Body: Array of breed names

export const getBreeds = async (): Promise<string[]> => {
  try {
    const response = await axios.get(
      "https://frontend-take-home-service.fetch.com/dogs/breeds",
      {
        withCredentials: true, // Ensures cookies are included in requests
      }
    );

    // Return the list of breeds
    return response.data;
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
    throw new Error("Failed to fetch dog breeds");
  }
};

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

export const searchDogs = async ({
  breeds,
  zipCodes,
  ageMin,
  ageMax,
  size,
  from,
  sort,
}: {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: string;
  sort?: string;
}) => {
  try {
    // Correct:
    // https://frontend-take-home-service.fetch.com/dogs/search?breeds=Basenji&breeds=Beagle&size=25&sort=breed:asc&from=25

    // Incorrect:
    // https://frontend-take-home-service.fetch.com/dogs/search?breeds=Basenji,Beagle&size=25&sort=breed:asc&from=25
    // https://frontend-take-home-service.fetch.com/dogs/search?breeds=Basenji%2CBeagle&size=25&sort=breed:asc&from=25
    // https://frontend-take-home-service.fetch.com/dogs/search?breeds=Basenji%26Beagle&size=25&sort=breed:asc&from=25
    // https://frontend-take-home-service.fetch.com/dogs/search?breeds=Basenji%2CBeagle%2CBulldog&size=25&sort=breed:asc&from=25

    const response = await axios.get(`${API_BASE_URL}/dogs/search`, {
      params: {
        breeds: breeds,
        zipCodes: zipCodes,
        ageMin: ageMin,
        ageMax: ageMax,
        size: size,
        from: from,
        sort: sort,
      },

      withCredentials: true,
    });
    return response.data; // Return the list of dogs from the response
  } catch (error) {
    console.error("Error fetching dogs:", error);
    throw error;
  }
};

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

export const fetchDogsByIds = async (dogIds: string[]): Promise<any[]> => {
  try {
    if (!dogIds.length) {
      throw new Error("No dog IDs provided");
    }

    const response = await axios.post(`${API_BASE_URL}/dogs`, dogIds, {
      withCredentials: true, // Ensures cookies are included in requests
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // Returns the array of dog objects
  } catch (error) {
    console.error("Error fetching dogs by IDs:", error);
    throw new Error("Failed to fetch dog details");
  }
};

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
export const matchDog = async (dogIds: string[]): Promise<string> => {
  try {
    if (!dogIds.length) {
      throw new Error("No dog IDs provided for matching");
    }

    const response = await axios.post(`${API_BASE_URL}/dogs/match`, dogIds, {
      withCredentials: true, // Ensures cookies are included in requests
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.match; // Returns the matched dog ID
  } catch (error) {
    console.error("Error matching dog:", error);
    throw new Error("Failed to match a dog");
  }
};
