import APIClient from "./APIClient.ts";

export interface UVIndexResponse {
    uv_index: number;
    color: string;
}

export interface UVIndexRequest {
    lat: string;
    lon: string;
}

class UVIndexService extends APIClient {
    constructor() {
        super("/UV-Index");
    }

    getUVIndex = (lat: string, lon: string) => {
        return this.post({ lat, lon });
    }
}

export default new UVIndexService();

