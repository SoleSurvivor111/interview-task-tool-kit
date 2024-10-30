import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';

export const setSearchQuery = createEvent<string>();
export const setCurrentPage = createEvent<number>();
export const resetPagination = createEvent();

export const $searchQuery = createStore<string>('').on(setSearchQuery, (_, query) => query);
export const $currentPage = createStore<number>(1)
  .on(setCurrentPage, (_, page) => page)
  .on(resetPagination, () => 1);

// persist store `$counter` in `localStorage` with key 'counter'
persist({ store: $searchQuery, key: 'searchQuery' });

// if your storage has a name, you can omit `key` field
persist({ store: $currentPage, key: 'currentPage' });
