<script setup>
import { imgUrlFor } from "@/utils/utils";
import { images } from "@/constants";
const serverUrl = import.meta.env.VITE_SERVER_URL;
</script>
<template>
  <div
    class="flex flex-wrap bg-white rounded-md text-black cursor-pointer m-4 p-3 justify-center hover:shadow-md"
  >
    <router-link
      class="hover:text-indigo-600"
      class-active="active"
      :to="`/doctors/${doctor._id}`"
      exact
    >
      <div class="flex justify-center w-full aspect-[1/1] relative">
        <img
          class="w-full h-full rounded-sm object-cover"
          :src="imgUrlFor(serverUrl, doctor.profile?.cover, images.avatar)"
          alt="{work.title}"
        />

        <motion.div class="app__work-hover app__flex">
          <a href="{work.projectLink}" target="_blank" rel="noreferrer">
            <div class="app__flex">
              <AiFillEye />
            </div>
          </a>

          <a href="{work.codeLink}" target="_blank" rel="noreferrer">
            <motion.div class="app__flex">
              <AiFillGithub />
            </motion.div>
          </a>
        </motion.div>
      </div>

      <div
        class="flex justify-center items-center p-2 w-full relative flex-col app__flex"
      >
        <h4 class="text-base font-extrabold text-left">{{ doctor.name }}</h4>
        <p class="text-sm text-gray-600 leading-6 mt-2 text-left">
          {{ truncate(doctor?.profile?.about, 100) }}
        </p>

        <div
          class="absolute px-6 py-1 rounded-lg bg-white top-[-28px] flex justify-center items-center"
        >
          <p class="text-sm text-gray-600 leading-6 text-left">
            {{ doctor.name }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth/auth";
import axios from "axios";
import { createToast } from "mosha-vue-toastify";

export default {
  props: ["doctor"],
  methods: {
    truncate(value, length) {
      if (!value) return "";
      value = value.toString();
      if (value.length > length) {
        return value.substring(0, length) + " ...";
      } else {
        return value;
      }
    },
    addToSave() {
      const authStore = useAuthStore();
      if (authStore.user == null) {
        // Use arrow for callback to reference to this
        authStore.showLoginForm((err) => {
          if (err) return;
          authStore.hideLoginForm();
          this.addToSave();
        });
        return;
      }

      try {
        axios
          .post(
            `${serverUrl}/users/${authStore.user._id}/save`,
            { doctor: this.recruitment._id },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authStore.token}`,
                "x-access-token": authStore.token,
              },
            }
          )
          .then(() => {
            createToast("Save doctor succeed!", { type: "success" });
          });
      } catch (error) {
        console.error("Add to save", error);
      }
    },
    download() {
      window.open(`${serverUrl}/doctors/${this.doctor._id}/download`);
    },
  },
  computed: {
    strippedContent() {
      let regex = /(<([^>]+)>)/gi;
      return this.doctor.content.replace(regex, "");
    },
    truncatedContent() {
      return this.truncate(this.doctor.content, 250);
    },
  },
};
</script>
