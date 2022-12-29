<template>
  <q-layout view="lHr lpR fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold q-pa-md">
          Home
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      bordered
      :width="300"
      class="left-drawer"
    >
      <q-icon
        name="fa-brands fa-twitter"
        size="md"
        class="q-pa-md text-primary"
      />

      <q-list>
        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon size="md" color="black" name="home" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold text-black"
            >Home</q-item-section
          >
        </q-item>
        <q-item clickable v-ripple to="/about">
          <q-item-section avatar>
            <q-icon size="md" color="black" name="help" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold text-black"
            >About</q-item-section
          >
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      bordered
      class="right-drawer"
    >
      <q-input
        v-model="searchText"
        dense
        rounded
        outlined
        placeholder="search"
        class="q-pa-sm"
        bg-color="grey-3"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list padding>
        <q-item-label class="text-h6 text-black text-weight-bold" header
          >Trends for you</q-item-label
        >
        <q-item>
          <q-item-section>
            <q-item-label overline class="text-grey">OVERLINE</q-item-label>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption>1234 tweets</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label overline class="text-grey">OVERLINE</q-item-label>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption>1234 tweets</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
export default {
  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      searchText: '',
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },
  },
};
</script>

<style lang="scss">
.left-drawer {
  padding-left: 100px;
  padding-right: 20px;
}

.right-drawer {
  padding-right: 100px;
  padding-left: 20px;
}
</style>
