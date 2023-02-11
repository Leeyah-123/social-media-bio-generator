import Vue3Toastify, { toast, updateGlobalOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, { autoClose: 1000 });
  updateGlobalOptions({ theme: 'auto' });

  return {
    provide: { toast },
  };
});
