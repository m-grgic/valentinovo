import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: '404.html' // Važno za GitHub Pages
    }),
    paths: {
      // Ako je tvoj repo 'moj-poklon', stavi '/moj-poklon'
      // Ako je glavni (korisnik.github.io), ostavi prazan string ''
      base: process.env.NODE_ENV === 'production' ? '/ime-tvog-repozitorija' : '',
    }
  }
};

export default config;