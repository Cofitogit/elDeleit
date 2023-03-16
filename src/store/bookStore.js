import { create } from 'zustand';

export const useBookStore = create((set) => ({
  finalD: [],
  finalI: '',
  ticketProp: {},
  updateFinalD: (u) => set({ finalD: u }),
  updateTicketProp: (u) => set({ ticketprop: u }),
  updateFinalI: (u) => set({ finalI: u })
}));
