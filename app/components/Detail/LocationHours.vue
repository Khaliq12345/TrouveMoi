<template>
  <v-container class="pa-0 py-8 px-4">
    <v-row>
      <v-col cols="12" md="6">
        <v-card flat class="rounded-xl overflow-hidden border mb-4">
          <v-img 
            src="https://maps.googleapis.com/maps/api/staticmap?center=37.7564,-122.4213&zoom=15&size=600x300&markers=color:red%7C37.7564,-122.4213&key=VOTRE_CLE_API"
            height="200"
            cover
          ></v-img>
          
          <v-card-text class="pa-4 d-flex justify-space-between align-center">
            <div>
              <div class="text-subtitle-1 font-weight-bold text-blue-darken-2">
                1132 Valencia St
              </div>
              <div class="text-body-2 font-weight-bold">San Francisco, CA 94110</div>
              <div class="text-caption text-grey">Mission</div>
            </div>
            <v-btn variant="outlined" class="text-none font-weight-bold rounded-lg" color="grey-darken-3">
              Get directions
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-table density="compact" class="hours-table">
          <tbody>
            <tr v-for="(schedule, i) in businessHours" :key="i">
              <td class="font-weight-bold py-1 border-0" width="100">{{ schedule.day }}</td>
              <td class="py-1 border-0">{{ schedule.hours }}</td>
              <td class="py-1 border-0 text-right">
                <span v-if="schedule.isClosedNow" class="text-red-darken-1 font-weight-bold">
                  Closed now
                </span>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const businessHours = [
  { day: 'Mon', hours: '11:00 AM - 11:00 PM', isClosedNow: false },
  { day: 'Tue', hours: '11:00 AM - 11:00 PM', isClosedNow: true },
  { day: 'Wed', hours: '11:00 AM - 11:00 PM', isClosedNow: false },
  { day: 'Thu', hours: '11:00 AM - 11:00 PM', isClosedNow: false },
  { day: 'Fri', hours: '11:00 AM - 11:00 PM', isClosedNow: false },
  { day: 'Sat', hours: '11:00 AM - 11:00 PM', isClosedNow: false },
  { day: 'Sun', hours: '11:00 AM - 11:00 PM', isClosedNow: false },
];
</script>

<style scoped>
.hours-table {
  background: transparent !important;
}

/* On enlève les bordures par défaut des lignes pour un look épuré */
.hours-table :deep(tr:hover) {
  background-color: transparent !important;
}

.text-blue-darken-2 {
  color: #0073bb !important;
  cursor: pointer;
}

.text-blue-darken-2:hover {
  text-decoration: underline;
}
</style>