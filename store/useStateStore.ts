import {create} from 'zustand';
import {persist, devtools} from 'zustand/middleware';

interface StoreState {
  clicked: boolean;
  markerLocations: any;
  markerNumber: number;

  setClicked: (clicked: boolean) => void;
  setMarkerLocations: (locations: number[][]) => void;
  setMarkerNumber: (num: number) => void;
}
const stateStore = (set: any) => ({
  clicked: false,
  markerLocations: [[51.5074, -0.1272]],
  markerNumber: 0,

  setClicked: (clicked: boolean) => {
    set((state: StoreState) => ({
      ...state,
      clicked: clicked,
    }));
  },
  setMarkerLocations: (locations: number[][]) => {
    set((state: StoreState) => ({
      ...state,
      markerLocations: locations,
    }));
  },
  setMarkerNumber: (num: number) => {
    set((state: StoreState) => ({
      ...state,
      markerNumber: num,
    }));
  },
});

export const useStateStore = create<StoreState>()(devtools(stateStore));
