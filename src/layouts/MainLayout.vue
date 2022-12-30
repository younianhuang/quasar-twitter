<template>
  <q-layout ref="layout" view="lHr lpR fFf" @resize="onResize">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <!-- q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /-->

        <q-toolbar-title class="text-weight-bold q-pa-md">
          {{ $route.name }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      bordered
      :width="300"
      :mini="miniModeState"
      :class="{ left: !miniModeState }"
      behavior="desktop"
    >
      <q-icon
        name="fa-brands fa-twitter"
        size="md"
        class="q-pa-md text-primary"
      />

      <q-list>
        <q-item clickable v-ripple exact to="/">
          <q-item-section avatar>
            <q-icon size="md" name="home" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple exact :to="{ name: 'About' }">
          <q-item-section avatar>
            <q-icon size="md" name="help" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
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
      :width="400"
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
      miniModeState: false,
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResize(size: any) {
      this.miniModeState = this.$q.platform.is.mobile
        ? true
        : size.width < 1024;
    },
  },

  mounted() {
    this.miniModeState = this.$q.platform.is.mobile as boolean;
  },
};
</script>

<style lang="scss">
.left {
  padding-left: 100px;
  padding-right: 20px;
}

.right-drawer {
  padding-right: 100px;
  padding-left: 20px;
}
</style>
