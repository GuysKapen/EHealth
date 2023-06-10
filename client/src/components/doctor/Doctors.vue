<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-full py-8 px-6">
    <div class="mt-6 grid grid-cols-3">
      <DoctorItem
        v-for="(doctor, idx) in doctors"
        :key="idx"
        :doctor="doctor"
      />
    </div>
    <div v-if="pagesInfo" class="flex justify-end">
      <Pagination :options="pagesInfo" @onPageChanged="update" />
    </div>
  </div>
</template>

<script>
import { useDoctorStore } from "@/stores/doctors/doctors";
import { mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth/auth";
import DoctorItem from "@/components/doctor/DoctorItem.vue";
import axios from "axios";
import Pagination from "../Pagination.vue";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export default {
  data: () => ({
    doctors: [],
    pagesInfo: null,
    perpage: 6,
  }),
  async mounted() {
    if ("q" in this.$route.query || "search" in this.$route.query) {
      const res = await axios.get(`${serverUrl}/search/doctors`, {
        params: {
          name: this.$route.query["q"] || this.$route.query["search"],
          limit: this.perpage,
        },
      });
      const { docs, ...pagesInfo } = res.data;
      this.doctors = docs;
      this.pagesInfo = pagesInfo;
    } else {
      const { docs, ...pagesInfo } = await this.getDoctorsData(
        this.$route.query,
        this.perpage
      );

      this.doctors = docs;
      this.pagesInfo = pagesInfo;
    }
  },
  watch: {
    async $route() {
      // this will be called any time the route changes
      this.update();
    },
  },
  methods: {
    ...mapActions(useDoctorStore, ["getDoctorsData"]),
    async update(page = 0) {
      if ("q" in this.$route.query || "search" in this.$route.query) {
        const res = await axios.get(`${serverUrl}/search/doctors`, {
          params: {
            name: this.$route.query["q"] || this.$route.query["search"],
            page: page,
            limit: this.perpage,
          },
        });
        const { docs, ...pagesInfo } = res.data;
        this.recruitments = docs;
        this.pagesInfo = pagesInfo;
      } else {
        const { docs, ...pagesInfo } = await this.getDoctorsData(
          Object.assign({}, this.$route.query, { page: page }),
          this.perpage
        );
        this.recruitments = docs;
        this.pagesInfo = pagesInfo;
      }
    },
  },
  computed: {
    isDoctor() {
      const authStore = useAuthStore();
      if (
        authStore.token == null ||
        authStore.user == null ||
        (authStore.user.role !== "doctor" && authStore.user.role !== "admin")
      ) {
        return false;
      }
      return true;
    },
  },
  components: { DoctorItem, Pagination },
};
</script>
