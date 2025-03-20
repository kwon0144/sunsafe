import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export interface LambdaResponse {
    statusCode: number;
    headers?: Record<string, string>;
    body: string;
}

class APIClient {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    post = (data: any, config?: AxiosRequestConfig) => {
        return axiosInstance
            .post<LambdaResponse>(this.endpoint, data, config)
            .then(res => JSON.parse(res.data.body));
    };

    get = (config?: AxiosRequestConfig) => {
        return axiosInstance
            .get<LambdaResponse>(this.endpoint, config)
            .then(res => JSON.parse(res.data.body));
    };
}

export default APIClient;
