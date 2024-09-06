<template>
    <div id="task-bar" class="container-fluid text-center shadow">
      <div class="row py-4 m-0">
        <div class="col">
          <router-link to="/home"><i class="bi bi-house-fill"></i></router-link>
        </div>
        <div class="col">
          <router-link to="/messages"><i class="bi bi-chat-fill"></i></router-link>
        </div>
        <div class="col">
          <router-link to="/profile"
            ><i class="bi bi-person-circle"></i
          ></router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TaskBarComp",
  };
  </script>
  
  <style scoped>
  #task-bar {
    background-color: whitesmoke;
  }
  .bi {
    font-size: 30px;
    color: rgb(19, 18, 18);
  }
  
  @media screen and (max-width: 300px) {
    .bi { 
      font-size: 20px;
    }
  
    #task-bar {
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 1;
      border-top: 1px solid gray;
    }
    .row{
      padding: 1rem;
    }
  }
  @media (min-width: 300px) and (max-width: 450px) {
    .bi { 
      font-size: 20px;
    }
  }
  </style>
  