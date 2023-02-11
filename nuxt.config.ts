// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: '~/styles/globals.css',
  },
  runtimeConfig: {
    public: {
      openaiApiKey: '',
    },
  },
});
