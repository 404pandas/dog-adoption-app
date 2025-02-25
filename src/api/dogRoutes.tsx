// external modules
import axios from "axios";

// local modules
import { FavoriteDog } from "../types/dog";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ─── GET DOG BREEDS ────────────────────────────

export const getBreeds = async (): Promise<string[]> => {
  try {
    const response = await axios.get(
      "https://frontend-take-home-service.fetch.com/dogs/breeds",
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
    throw new Error("Failed to fetch dog breeds");
  }
};

// ─── SEARCH DOGS WITH PAGINATION ───────────────

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
  ageMin?: number | undefined;
  ageMax?: number | undefined;
  size?: number;
  from?: number;
  sort?: string | null | undefined;
}) => {
  try {
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
    return response.data;
  } catch (error) {
    console.error("Error fetching dogs:", error);
    throw error;
  }
};

// ─── FETCH DOG DETAILS BY IDS ──────────────────

export const fetchDogsByIds = async (
  dogIds: string[]
): Promise<FavoriteDog[]> => {
  try {
    if (!dogIds.length) {
      throw new Error("No dog IDs provided");
    }

    const response = await axios.post(`${API_BASE_URL}/dogs`, dogIds, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching dogs by IDs:", error);
    throw new Error("Failed to fetch dog details");
  }
};

// ─── MATCH A DOG ───────────────────────────────

export const matchDog = async (dogIds: string[]): Promise<string> => {
  try {
    if (!dogIds.length) {
      throw new Error("No dog IDs provided for matching");
    }

    const response = await axios.post(`${API_BASE_URL}/dogs/match`, dogIds, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.match;
  } catch (error) {
    console.error("Error matching dog:", error);
    throw new Error("Failed to match a dog");
  }
};
