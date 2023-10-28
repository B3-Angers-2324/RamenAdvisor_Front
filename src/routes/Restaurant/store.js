import { writable } from 'svelte/store';

export const restaurantStore = writable({
  name : '',
  address : '',
  note : '',
  position : '',
  image : '',
  foodtype : '',
  id : '',
});
