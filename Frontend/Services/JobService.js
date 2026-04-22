import axios from "axios";

const API_URL = "http://localhost:8080/api/jobs";

export const loadSampleJobs = () => axios.post(`${API_URL}/load-sample`);
export const getJobs = (params) => axios.get(API_URL, { params });
export const getJobById = (id) => axios.get(`${API_URL}/${id}`);
