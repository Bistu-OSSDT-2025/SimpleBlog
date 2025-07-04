import { defineStore } from 'pinia';

export const useFavoriteStore = defineStore('favorites', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('favorites') || '[]')
  }),
  actions: {
    toggleFavorite(articleId: number) {
      const index = this.items.findIndex(id => id === articleId);
      if (index > -1) {
        this.items.splice(index, 1);
      } else {
        this.items.push(articleId);
      }
      localStorage.setItem('favorites', JSON.stringify(this.items));
    },
    removeFavorite(articleId: number) {
      const index = this.items.findIndex(id => id === articleId);
      if (index > -1) {
        this.items.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(this.items));
      }
    }
  }
});
