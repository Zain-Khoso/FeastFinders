// Imports.
import axios from 'axios';

export const Api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
});
