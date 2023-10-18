import React from 'react'
import { store, persistor } from '../../../app/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { CalendarView } from '../CalendarView/CalendarView';
import { ScheduleView } from '../ScheduleView/ScheduleView';

const router = createHashRouter([
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
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  )
}
