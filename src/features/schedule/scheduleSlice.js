import { createSlice } from '@reduxjs/toolkit'

import reservoirDogsPoster from "../../assets/moviePosters/Reservoir-Dogs-Movie-Poster.jpg"
import pulpFictionPoster from "../../assets/moviePosters/Pulp-Fiction.jpg"
import inglouriousBasterdsPoster from "../../assets/moviePosters/Inglourious-Basterds.jpg"
import HatefulEightPoster from "../../assets/moviePosters/Hateful-Eight.jpg"
import djangoPoster from "../../assets/moviePosters/Django.jpg"

const initialState = {
  selectedDate: null,
  cinemaSchedule: [
    {
      id: 1,
      start: 6,
      end: 8.5,
      title: "Reservoir Dogs",
      poster: reservoirDogsPoster,
    },
    {
      id: 2,
      start: 8.5,
      end: 11,
      title: "Pulp Fiction",
      poster: pulpFictionPoster,
    },
    {
      id: 3,
      start: 11,
      end: 13.5,
      title: "Inglourious Basterds",
      poster: inglouriousBasterdsPoster,
    },
    {
      id: 4,
      start: 13.5,
      end: 16,
      title: "Django Unchained",
      poster: djangoPoster,
    },
    {
      id: 5,
      start: 16,
      end: 18.5,
      title: "The Hateful Eight",
      poster: HatefulEightPoster,
    },
  ],
  schedule: {}
}

export const scheduleReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToSchedule: (state, action) => {
      let newActivity = [];
      newActivity = [...state.schedule[action.payload.date.getTime()].activity, action.payload.activityItem];
      newActivity = newActivity.sort((a, b) => a.finishTime - b.finishTime)
      state.schedule[action.payload.date.getTime()].activity = newActivity
    },
    updateActivity: (state, action) => {
      const itemIndex = state.schedule[action.payload.date.getTime()].activity.findIndex((activityItem) => activityItem.id === action.payload.id)
      const item = state.schedule[action.payload.date.getTime()].activity[itemIndex];
      state.schedule[action.payload.date.getTime()].activity[itemIndex] = {...item, ...action.payload.updatedFields}
    },
    removeFromSchedule: (state, action) => {
      state.schedule[action.payload.date.getTime()].activity = state.schedule[action.payload.date.getTime()].activity.filter((item) => item.id !== action.payload.id);
    },
    selectDate: (state, action) => {
      if(action.payload) {
        if(!state.schedule[action.payload.getTime()]) {
          state.schedule[action.payload.getTime()] = {activity: []};
        }
        state.selectedDate = action.payload.getTime()
      } else {
        state.selectedDate = null
      }
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToSchedule, removeFromSchedule, updateActivity, selectDate } = scheduleReducer.actions

export default scheduleReducer.reducer