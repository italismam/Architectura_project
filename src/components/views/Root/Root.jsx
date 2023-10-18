import React, { useEffect } from 'react'
import { store, persistor } from '../../../app/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { Outlet, Route, Router, HashRouter as RouterProvider, Routes, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom';
import { CalendarView } from '../CalendarView/CalendarView';
import history from '../../../utils/history';
import { ScheduleView } from '../ScheduleView/ScheduleView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CalendarView/>,
  },
  {
    path: ":selectedDate",
    element: <ScheduleView/>,
  },
]);

export const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider basename="/cinema_calendar" router={router} />
      </PersistGate>
    </Provider>
  )
}
