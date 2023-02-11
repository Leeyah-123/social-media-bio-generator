<template>
  <main>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<script lang="ts" setup>
useHead({
  title: 'Social Media Bio Generator',
  meta: [
    { name: 'description', content: 'A GPT3 Powered Social Media Bio Generator' },
    { name: 'keywords', content: 'AI, GPT3, Social Media, Bio Generator' }
  ]
})
</script>
