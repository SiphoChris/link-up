<template>
    <section id="footer">
      <p>Copyrights Reserved</p>
      <p>{{currentYear}}</p>
    </section>
  </template>
  
  <script>
  import { currentYear } from '../utils/index.js';
  export default {
    name: 'FooterComp',
  data() {
    return {
      currentYear: currentYear()
    }
  }
  }
  </script>
  <style scoped>
  #footer {
    background-color: black;
    color: white;
    text-align: center;
    padding: 2rem 0;
  }
  </style>