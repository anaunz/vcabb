<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item is-size-4">VCABB</router-link>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/abb" class="navbar-item">
          ABB Calculation
        </router-link>
        <router-link to="/summon" class="navbar-item">
          Summon Cards
        </router-link>
      </div>
    </div>
  </nav>
</template>
