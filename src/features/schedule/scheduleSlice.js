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
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio placeat excepturi pariatur iure. Tempore repudiandae ipsam temporibus, illum quos nesciunt.",
      poster: reservoirDogsPoster,
    },
    {
      id: 2,
      start: 8.5,
      end: 11,
      title: "Pulp Fiction",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio placeat excepturi pariatur iure. Tempore repudiandae ipsam temporibus, illum quos nesciunt.",
      poster: pulpFictionPoster,
    },
    {
      id: 3,
      start: 11,
      end: 13.5,
      title: "Inglourious Basterds",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio placeat excepturi pariatur iure. Tempore repudiandae ipsam temporibus, illum quos nesciunt.",
      poster: inglouriousBasterdsPoster,
    },
    {
      id: 4,
      start: 13.5,
      end: 16,
      title: "Django Unchained",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio placeat excepturi pariatur iure. Tempore repudiandae ipsam temporibus, illum quos nesciunt.",
      poster: djangoPoster,
    },
    {
      id: 5,
      start: 16,
      end: 18.5,
      title: "The Hateful Eight",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio placeat excepturi pariatur iure. Tempore repudiandae ipsam temporibus, illum quos nesciunt.",
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
      newActivity = [...state.schedule[action.payload.date].activity, action.payload.activityItem];
      newActivity = newActivity.sort((a, b) => a.finishTime - b.finishTime)
      state.schedule[action.payload.date].activity = newActivity
    },
    updateScheduleWithICS: (state, action) => {
      for(let event of action.payload) {
        const startDate = new Date(event.dtstart.value)
        const endDate = new Date(event.dtend.value)

        const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

        if(!state.schedule[startDay.getTime()]) {
          state.schedule[startDay.getTime()] = {activity: []}
        }

        state.schedule[startDay.getTime()].activity = [
          ...state.schedule[startDay.getTime()].activity,
          {
            id: Math.random(),
            startTime: startDate.getHours() + startDate.getMinutes()/60,
            finishTime: endDate.getHours() + endDate.getMinutes()/60,
            name: event.summary.value
          }
        ]
      }
    },
    updateActivity: (state, action) => {
      const itemIndex = state.schedule[action.payload.date].activity.findIndex((activityItem) => activityItem.id === action.payload.id)
      const item = state.schedule[action.payload.date].activity[itemIndex];
      state.schedule[action.payload.date].activity[itemIndex] = {...item, ...action.payload.updatedFields}
    },
    removeFromSchedule: (state, action) => {
      state.schedule[action.payload.date].activity = state.schedule[action.payload.date].activity.filter((item) => item.id !== action.payload.id);
    },
    selectDate: (state, action) => {
      if(action.payload) {
        if(!state.schedule[action.payload.getTime()]) {
          state.schedule[action.payload.getTime()] = {activity: []};
        }
      }
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToSchedule, removeFromSchedule, updateActivity, selectDate, updateScheduleWithICS } = scheduleReducer.actions

export default scheduleReducer.reducer