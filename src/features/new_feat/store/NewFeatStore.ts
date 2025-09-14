import { create } from 'zustand';

interface NewFeatureState {
  data: any[];
  loading: boolean;
  fetchData: () => Promise<void>;
}

export const useNewFeatureStore = create<NewFeatureState>(set => ({
  data: [],
  loading: false,

  fetchData: async () => {
    set({ loading: true });

    // Simulate API call
    setTimeout(() => {
      set({
        data: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
        ],
        loading: false,
      });
    }, 1000);
  },
}));
