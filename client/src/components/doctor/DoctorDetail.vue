<script setup>
import HashLoader from "@/components/HashLoader.vue";

import moment from "moment";
</script>
<template>
  <div class="flex-grow">
    <div
      class="flex-grow flex justify-between px-8 py-12 mt-12"
      v-if="doctor != null"
    >
      <div
        class="flex-grow flex justify-between bg-white rounded-md shadow-lg px-8 py-6"
      >
        <div class="w-4/12 relative">
          <img
            :src="imgUrlFor(serverUrl, doctor.profile?.cover)"
            alt="profile"
            class="rounded-lg absolute -top-20 flex-shrink-0 object-cover aspect-[9/11]"
          />
        </div>
        <div class="flex w-7/12">
          <div class="flex-grow pr-8">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-bold text-gray-800">
                {{ doctor.name }}
              </h3>
              <div class="flex">
                <p class="text-sm text-gray-600 mr-4">
                  <span class="text-gray-800 font-bold"> Job updated: </span>
                  {{
                    moment(
                      new Date(parseInt(doctor._id.substring(0, 8), 16) * 1000)
                    ).fromNow()
                  }}
                </p>
                <p class="text-sm text-gray-600">
                  <span class="text-gray-800 font-bold"> Job ID: </span>
                  {{ doctor._id.slice(8, 18) }}
                </p>
              </div>
            </div>
            <div class="mt-6">
              <h2 class="text-2xl text-gray-800 font-black">
                {{ doctor.name }}
              </h2>
            </div>
            <div class="text-sm mt-2">
              <div v-html="doctor.profile?.about"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[28%] flex-shrink-0 px-4">
        <div
          class="bg-gray-100 rounded-md flex-col justify-center items-center text-center p-6"
          v-if="isAuth()"
        >
          <p class="text-sm">Sounds like a match?</p>
          <div
            @click="toggleApplyForm(true)"
            class="bg-indigo-700 hover:bg-indigo-800 cursor-pointer text-white font-black text-xs px-4 py-3 text-center rounded-md mt-4"
          >
            Schedule Now
          </div>
          <div
            class="bg-indigo-200 text-gray-800 font-black text-xs px-4 py-3 text-center rounded-md mt-4"
          >
            Subcribe for updates
          </div>
          <p class="text-sm mt-4">Already scheduled?</p>
        </div>

        <div
          class="bg-gray-100 rounded-md flex-col justify-center items-center text-center p-6"
          v-else
        >
          <p class="text-sm">Sounds like a match?</p>
          <div
            @click="toggleLoginForm()"
            class="bg-indigo-700 hover:bg-indigo-800 cursor-pointer text-white font-black text-xs px-4 py-3 text-center rounded-md mt-4"
          >
            Login to Schedule
          </div>
          <div
            class="bg-indigo-200 text-gray-800 font-black text-xs px-4 py-3 text-center rounded-md mt-4"
          >
            Subcribe for updates
          </div>
          <p class="text-sm mt-4">
            Don't have an account?
            <router-link
              :to="{ name: 'register' }"
              class="text-indigo-600 hover:text-indigo-800"
              >Register</router-link
            >
          </p>
        </div>

        <div
          class="bg-gray-100 rounded-md flex-col justify-center items-center text-center p-6 mt-4"
        >
          <div class="flex items-center">
            <div
              class="bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100"
            >
              <img
                :src="imgUrlFor(serverUrl, doctor.profile?.cover)"
                alt="profile"
                class="w-8 h-8 rounded-lg flex-shrink-0 object-cover"
              />
            </div>

            <div class="ml-3 text-sm">
              <p class="text-gray-800 text-left font-bold">
                {{ doctor.name }}
              </p>
              <span class="text-gray-300 text-sm">Contact Person</span>
            </div>
          </div>
          <div class="bg-white rounded-md p-4 text-left mt-4">
            <p class="text-sm">
              {{ doctor.profile?.about }}
            </p>
          </div>
          <div
            class="bg-indigo-200 text-gray-800 font-black text-xs px-4 py-3 text-center rounded-md mt-4"
          >
            Drop us a line
          </div>
        </div>
        <div class="text-center">
          <p class="text-sm mt-4">Share this job</p>
        </div>
      </div>

      <!-- Main modal Apply -->
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        v-if="showApplyForm"
        class="backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
      >
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md h-full md:h-auto"
        >
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              @click="toggleApplyForm(false)"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                data-darkreader-inline-fill=""
                style="--darkreader-inline-fill: currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="py-6 px-6 lg:px-8">
              <h3
                class="mb-4 text-base font-black text-gray-900 dark:text-white"
              >
                Schedule appointment with {{ doctor.name }}
              </h3>
              <form class="space-y-6" @submit.prevent="add()">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Datetime</label
                  >
                  <input
                    type="datetime-local"
                    name="datetime"
                    id="datetime"
                    v-model="datetime"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="02/12/2023"
                    required="true"
                  />
                </div>
                <div class="mt-2">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    class="string w-full required block px-4 py-2 rounded-lg font-medium border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white"
                    placeholder="Description"
                    name="description"
                    id="description"
                    v-model="description"
                    rows="6"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Schedule
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full flex justify-center pt-32">
      <HashLoader />
    </div>
  </div>
</template>

<script>
import { createToast } from "mosha-vue-toastify";

import { useDoctorStore } from "@/stores/doctors/doctors";
import { imgUrlFor } from "../../utils/utils";
import { mapState } from "pinia";
import { useAuthStore } from "../../stores/auth/auth";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export default {
  data: () => ({
    doctor: null,
    addingAnswer: false,
    showApplyForm: false,
    datetime: null,
    description: null,
  }),
  async mounted() {
    const docStore = useDoctorStore();
    this.doctor = await docStore.getDoctor(this.$route.params.id);
  },
  components: { HashLoader },

  methods: {
    isAuth() {
      const authStore = useAuthStore();
      return !(authStore.user == null || authStore.token == null);
    },
    toggleAddAnswer() {
      this.addingAnswer = !this.addingAnswer;
    },
    addedAnswer(answer) {
      this.post.answers.push(answer);
    },
    toggleApplyForm(show) {
      this.showApplyForm = show;
    },
    toggleLoginForm() {
      useAuthStore().showLoginForm(function () {});
    },
    async add() {
      const authStore = useAuthStore();

      this.error = "";
      if (!this.datetime) {
        this.error = "Please enter datetime";
        return;
      }
      const newModel = {
        datetime: this.datetime,
        description: this.description,
        doctorId: this.doctor._id,
      };
      axios
        .post(
          `${serverUrl}/users/${authStore.user._id}/appointments`,
          newModel,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authStore.token}`,
              "x-access-token": authStore.token,
            },
          }
        )
        .then(() => {
          createToast(`Success appoint with doctor ${this.doctor.name}`, {
            type: "success",
          });
          this.showApplyForm = false;
        });
    },
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
};
</script>
