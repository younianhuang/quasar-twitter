<template>
  <q-layout view="lHr LpR fFf" @resize="onResize">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <!-- q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /-->

        <q-toolbar-title class="text-weight-bold q-pa-md">
          {{ $route.name }}
        </q-toolbar-title>
        <logout-button v-if="user.id"></logout-button>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      bordered
      :width="leftDrawerWidth"
      :mini="miniModeState"
      :class="{ 'left-drawer': !miniModeState }"
      behavior="desktop"
    >
      <div :class="{ 'left-list': !miniModeState }">
        <q-icon
          name="fa-brands fa-twitter"
          size="md"
          class="text-primary q-py-lg"
          :class="miniModeState ? 'q-pl-md' : 'q-pl-lg'"
        />
        <q-list>
          <q-item clickable exact :to="{ name: 'Home' }" class="focus-item">
            <q-item-section avatar>
              <q-icon size="md" name="home" />
            </q-item-section>

            <q-item-section class="text-h6 text-weight-bold"
              >Home</q-item-section
            >
          </q-item>
          <q-item clickable exact :to="{ name: 'About' }" class="focus-item">
            <q-item-section avatar>
              <q-icon size="md" name="help" />
            </q-item-section>

            <q-item-section class="text-h6 text-weight-bold"
              >About</q-item-section
            >
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      bordered
      :width="rightDrawerWidth"
      :breakpoint="rightDrawerBreakPoint"
      class="right-drawer"
    >
      <div class="trends" v-show="showRightDrawerContent">
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
      </div>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <q-footer v-model="footerOpen" bordered class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title class="row justify-around">
          <q-btn flat round icon="home" />
          <q-btn flat round icon="search" />
          <q-btn flat round icon="notifications" />
          <q-btn flat round icon="mail" />
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { User } from 'stores/AuthStore';
import { inject } from 'vue';
import LogoutButton from 'components/auth/LogoutButton.vue';
import { AuthService } from '../auth';

const DefaultLeftDrawertWidth = 300;
const DefaultRightDrawertWidth = 360;
const RightDrawerDisplayWidth = 300;
const MiniWidth = 60;
const PageWidth = 600;

export default {
  name: 'MainLayout',
  components: {
    LogoutButton,
  },
  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      footerOpen: false,
      leftDrawerWidth: DefaultLeftDrawertWidth,
      rightDrawerWidth: DefaultRightDrawertWidth,
      searchText: '',
      miniModeState: false,
      authService: inject<AuthService>('AuthService'),
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
      if (!this.isMobile) {
        this.caculateLayout(size.width);
      }
    },
    caculateLayout(layoutWidth: number): void {
      this.miniModeState = layoutWidth < this.miniModeBreakPoint;

      if (this.miniModeState) {
        this.rightDrawerWidth = layoutWidth - PageWidth - MiniWidth;
      } else {
        this.rightDrawerWidth = Math.max(
          (layoutWidth - PageWidth) * 0.5,
          DefaultRightDrawertWidth
        );
        this.leftDrawerWidth = layoutWidth - PageWidth - this.rightDrawerWidth;
      }
    },
  },

  computed: {
    rightDrawerBreakPoint(): number {
      return PageWidth + MiniWidth;
    },

    miniModeBreakPoint(): number {
      return PageWidth + DefaultRightDrawertWidth + 200;
    },
    showRightDrawerContent(): boolean {
      return this.rightDrawerWidth > RightDrawerDisplayWidth;
    },

    isMobile(): boolean {
      return this.$q.platform.is.mobile ? true : false;
    },
    user(): User {
      return this.authService?.authState.user as User;
    },
  },

  mounted() {
    if (this.isMobile) {
      this.footerOpen = true;
      this.leftDrawerOpen = false;
      this.rightDrawerOpen = false;
    } else {
      this.footerOpen = false;
      this.leftDrawerOpen = true;
      this.rightDrawerOpen = true;
      const layout = this.$el as HTMLElement;
      this.caculateLayout(layout.clientWidth);
    }
  },
};
</script>

<style lang="scss">
$drawer-padding: 20px;

.left-drawer {
  display: flex;
  justify-content: flex-end;
  padding-right: $drawer-padding;
}

.left-list {
  width: 200px;
}

.right-drawer {
  display: flex;
  padding-left: $drawer-padding;
}

.trends {
  width: 300px;
}

.focus-item {
  border-radius: 25px;
  width: 80%;
  margin-left: 6px;
}
</style>
