<!-- Location map and business hours section -->
<template>
  <v-container class="pa-0 py-8 px-4">
    <!-- Map card with address -->
    <v-card flat class="rounded-xl overflow-hidden border mb-4">
      <!-- Static map image -->
      <v-img 
        src="https://maps.googleapis.com/maps/api/staticmap?center=37.7564,-122.4213&zoom=15&size=600x300&markers=color:red%7C37.7564,-122.4213&key=VOTRE_CLE_API"
        height="200"
        cover
      ></v-img>
      
      <!-- Address and directions -->
      <v-card-text class="pa-4 d-flex justify-space-between align-center">
        <div>
          <!-- Street address (clickable) -->
          <div class="text-subtitle-1 font-weight-bold text-blue-darken-2">
            1132 Valencia St
          </div>
          <!-- City, state, zip -->
          <div class="text-body-2 font-weight-bold">San Francisco, CA 94110</div>
          <!-- Neighborhood -->
          <div class="text-caption text-grey">Mission</div>
        </div>
        <!-- Get directions button -->
        <v-btn variant="outlined" class="text-none font-weight-bold rounded-lg" color="grey-darken-3">
          Get directions
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Business hours table -->
    <v-table density="compact" class="hours-table">
      <tbody>
        <tr v-for="(schedule, i) in businessHours" :key="i">
          <!-- Day of week -->
          <td class="font-weight-bold py-1 border-0" width="100">{{ schedule.day }}</td>
          <!-- Hours -->
          <td class="py-1 border-0">{{ schedule.hours }}</td>
          <!-- Status indicator -->
          <td class="py-1 border-0 text-right">
            <span v-if="schedule.isClosedNow" class="text-red-darken-1 font-weight-bold">
              Closed now
            </span>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
// Weekly business hours
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
/* Transparent table background */
.hours-table {
  background: transparent !important;
}

/* Remove hover effect */
.hours-table :deep(tr:hover) {
  background-color: transparent !important;
}

/* Clickable address link styling */
.text-blue-darken-2 {
  color: #0073bb !important;
  cursor: pointer;
}

.text-blue-darken-2:hover {
  text-decoration: underline;
}
</style>
