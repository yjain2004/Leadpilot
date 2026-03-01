import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
});

export const getLeads = () =>
    api.get("/leads");

export const getLeadById = (id) =>
    api.get(`/leads/${id}`);

export const updateLead = (id, data) =>
    api.patch(`/leads/${id}`, data);

export const sendEmailToLead = (id, emailContent) =>
    api.post(`/leads/${id}/send-email`, { emailContent });

export const adminLogin = (email, password) =>
    api.post("/admin/login", { email, password });

export const adminLogout = () =>
    api.post("/admin/logout");

export const getCurrentAdmin = () =>
    api.get("/admin/me");

export default api;
