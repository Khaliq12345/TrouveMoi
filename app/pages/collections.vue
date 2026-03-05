<template>
  <v-layout>
    <HomeAppBar />
    <v-main>
      <v-container>
        <v-sheet color="transparent">
          <v-tabs v-model="tab" color="cyan">
            <v-tab value="self">Mes favoris</v-tab>
            <v-tab value="rated">Les plus noté</v-tab>
          </v-tabs>

          <v-divider></v-divider>

          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="self">
              <CollectionSelf />
            </v-tabs-window-item>
            <v-tabs-window-item value="rated">
              <CollectionRated />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-sheet>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script setup>
import { ref } from "vue";
const tab = ref("self");
</script>
