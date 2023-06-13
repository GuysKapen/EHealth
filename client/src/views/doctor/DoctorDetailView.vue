<script setup>
import Nav from "@/components/Nav.vue";
// import SideBar from "@/components/doctor/DoctorSideBar.vue";
import Detail from "@/components/doctor/DoctorDetail.vue";
</script>

<template>
  <main>
    <div>
      <Nav />
      <div class="flex bg-gray-50">
        <!-- <SideBar /> -->
        <Detail />
      </div>
    </div>
  </main>
</template>
