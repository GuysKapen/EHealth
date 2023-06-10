<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/DoctorSideBar.vue";
import Doctors from "@/components/doctor/Doctors.vue";
</script>

<template>
  <main>
    <div>
      <Nav />
      <div class="flex bg-gray-100">
        <SideBar />
        <Doctors />
      </div>
    </div>
  </main>
</template>
