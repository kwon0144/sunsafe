export interface City {
    name: string;
    lat: string;
    lon: string;
}

export interface UVIndexResponse {
    uv_index: number;
    color: string;
}

export interface UVIndexRequest {
    lat: string;
    lon: string;
}

export interface UseUVIndexResult {
    selectedCity: string;
    setSelectedCity: (city: string) => void;
    uvIndex: number | null;
    error: string;
    isLoading: boolean;
    cities: City[];
    getUvLevelColor: (index: number) => string;
    getUvLevelText: (index: number) => string;
    getProtectionAdvice: (index: number) => string;
    fetchUVIndex: () => Promise<void>;
}

export enum UVLevel {
    Low = 2,
    Moderate = 5,
    High = 7,
    VeryHigh = 10,
    Extreme = 11
}

export const UV_COLORS = {
    [UVLevel.Low]: "bg-green-500",
    [UVLevel.Moderate]: "bg-yellow-500",
    [UVLevel.High]: "bg-orange-500",
    [UVLevel.VeryHigh]: "bg-red-500",
    [UVLevel.Extreme]: "bg-purple-600"
} as const;

export const UV_LEVEL_TEXT = {
    [UVLevel.Low]: "Low",
    [UVLevel.Moderate]: "Moderate",
    [UVLevel.High]: "High",
    [UVLevel.VeryHigh]: "Very High",
    [UVLevel.Extreme]: "Extreme"
} as const;

export const UV_PROTECTION_ADVICE = {
    [UVLevel.Low]: "Minimal protection required for normal activity",
    [UVLevel.Moderate]: "Wear sunscreen, hat and sunglasses",
    [UVLevel.High]: "Reduce time in the sun between 10 a.m. and 4 p.m.",
    [UVLevel.VeryHigh]: "Apply broad-spectrum SPF 50+ sunscreen every 2 hours",
    [UVLevel.Extreme]: "Avoid sun exposure between 10 a.m. and 4 p.m."
} as const; 