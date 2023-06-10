import { defineStore } from "pinia";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const useDoctorStore = defineStore({
  id: "doctor",
  state: () => ({
    posts: null,
    recruitments: [],
  }),
  actions: {
    async getDoctor(id) {
      const res = await axios.get(`${serverUrl}/doctors/${id}`);
      return res.data;
    },
    async getDoctorsData(params = {}, limit = 6) {
      const res = await axios.get(`${serverUrl}/doctors`, {
        params: Object.assign(params, { limit: limit }),
      });
      this.posts = res.data;
      return res.data;
    },
    async getTopDoctorsData(params) {
      const res = await axios.get(`${serverUrl}/top-doctors`, {
        params: params,
      });
      return res.data;
    },
  },
});
