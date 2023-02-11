<template>
  <section id="results" class="results">
    <header class="text-center lg:text-start border-b border-slate-200 dark:border-slate-400">
      <h1 class="text-slate-700 dark:text-slate-50 font-black text-lg">
        Results</h1>
    </header>

    <div class="mt-10 flex flex-wrap gap-5">
      <div v-if="results.length !== 0" v-for="result, index in results" :key="index"
        class="relative text-slate-700 dark:text-slate-50 font-light mb-4 text-left outline outline-2 outline-slate-200 dark:outline-slate-400 p-7 rounded-lg md:max-w-xs lg:text-justify lg:max-w-sm">
        {{ result }}
        <span class="cursor-pointer absolute top-2 right-2 h-5 w-5" @click="copyToClipboard(index)">
          <svg xmlns=" http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Copy to clipboard</title>
            <path
              d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
              class="fill-slate-700 dark:fill-white" />
          </svg>
        </span>
      </div>
      <p v-if="results.length === 0">
        No results to show
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { $toast } = useNuxtApp();
const results = useResults();

const copyToClipboard = (index: number) => {
  navigator.clipboard.writeText(results.value[index])
  $toast.success("Bio copied to clipboard")
}
</script>