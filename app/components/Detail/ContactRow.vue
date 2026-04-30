<template>
  <div
    class="d-flex align-center justify-space-between py-3 border-b hover-effect"
    :class="{ 'cursor-pointer': !!href }"
    @click="handleClick"
  >
    <div class="pe-4 overflow-hidden">
      <div
        v-if="label"
        class="text-caption font-weight-bold text-primary mb-n1"
      >
        {{ label }}
      </div>

      <div class="text-body-1 text-grey-darken-3 text-wrap">
        {{
          typeof value === "string"
            ? value
            : value?.address || value?.name || ""
        }}
      </div>
    </div>

    <v-icon :icon="icon" color="grey-darken-1" size="20" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string;
  value: any;
  icon: string;
  href?: string;
}>();

const handleClick = () => {
  if (!props.href) return;
  window.open(props.href, "_blank");
};
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid #eeeeee;
}
.border-b:last-of-type {
  border-bottom: none;
}
</style>
