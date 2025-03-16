import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: "https://dii6ds9ge8.execute-api.ap-southeast-2.amazonaws.com/test312"
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
}
export default APIClient;
