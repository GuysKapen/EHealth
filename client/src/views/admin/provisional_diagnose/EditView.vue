<script setup>
import ItemForm from "@/components/admin/PDForm.vue";
</script>

<template>
  <div class="my-8 w-1/2 mx-auto py-16 px-8">
    <div class="header">
      <h2
        class="text-2xl font-black leading-7 text-gray-900 sm:text-3xl sm:truncate"
      >
        Edit provisional diagnose
      </h2>
    </div>
    <ItemForm :model="model" />
  </div>
</template>

<script>
import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { useAuthStore } from "@/stores/auth/auth";
export default {
  data: () => ({ model: null }),
  mounted() {
    const authStore = useAuthStore();
    axios
      .get(
        `${serverUrl}/admin/provisional-diagnosis/${this.$route.params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authStore.token}`,
            "x-access-token": authStore.token,
          },
        }
      )
      .then((res) => {
        this.model = res.data;
      });
  },
};
</script>
