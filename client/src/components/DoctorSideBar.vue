<template>
  <div class="w-3/12 flex-shrink-0 pr-8">
    <div
      class="overflow-hidden pl-6 bg-gray-50 pt-6 tabs-panel shadow-md border-r border-gray-100"
    >
      <div class="px-4 py-5 space-y-6 sm:p-6">
        <h3 class="text-base font-medium text-gray-900">Specializations</h3>
        <div class="mt-4 space-y-6">
          <div
            class="tab-panel group"
            v-for="(obj, idx) in specializations"
            :key="idx"
          >
            <router-link
              :to="{
                name: 'recruitments',
                query: { company: obj.company.slug },
              }"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div
                    class="bg-gray-100 rounded-lg flex items-center justify-center ml-4 w-6 h-6 flex-shrink-0 border border-gray-100"
                  >
                    <span
                      class="w-[6px] h-[6px] rounded-full bg-indigo-600 border border-gray-200"
                    ></span>
                  </div>

                  <div class="ml-3 text-sm">
                    <p class="text-gray-500 group-hover:text-indigo-600">
                      {{ obj.company.name }}
                    </p>
                  </div>
                </div>
                <div
                  class="bg-gray-100 rounded-lg flex items-center justify-center ml-4 w-6 h-6 flex-shrink-0 border border-gray-100"
                >
                  <span class="text-xs text-indigo-600">{{ obj.count }}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="px-4 py-3 sm:px-6 text-center w-full">
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-8 w-full border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line prettier/prettier
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export default {
  data: () => ({ specializations: [], skills: [], fields: [] }),
  mounted() {
    axios.get(`${serverUrl}/specializations`).then((res) => {
      this.specializations = res.data;
    });
  },
};
</script>