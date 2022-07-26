<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>mdi-robot-happy-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Commandes:</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item :key="'codeCarefully()'">
            <v-list-item-title
              ><strong>codeCarefully()</strong></v-list-item-title
            >
          </v-list-item>
          <v-list-item :key="'codeQuickly()'">
            <v-list-item-title
              ><strong>codeQuickly()</strong></v-list-item-title
            >
          </v-list-item>
          <v-list-item :key="'debug()'">
            <v-list-item-title><strong>debug()</strong></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :color="'transparent'" :elevation="0" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer /> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-footer :color="'transparent'" :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      // clipped: false,
      drawer: false,
      // fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Accueil",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Interface",
          to: "/interface",
        },
        {
          icon: "mdi-history",
          title: "Historique",
          to: "/history",
        },
      ],
      // miniVariant: false,
      // right: true,
      // rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>
