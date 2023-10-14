import logo from './logo.svg';
import './App.css';
import Calendar from './components/organisms/Calendar/Calendar';
import "./styles/calendar.scss"
import "./styles/day-schedule.scss"
import "./styles/schedule-editor.scss"
import "./styles/time-input.scss"
import "./styles/text-input.scss"
import "./styles/button.scss"
import "./styles/cinema-schedule.scss"
import DaySchedule from './components/organisms/DaySchedule/DaySchedule';
import { ScheduleEditor } from './components/molecules/ScheduleEditor/ScheduleEditor';
import { useSelector } from 'react-redux';

function App() {
  const selectedDate = useSelector((state) => state.schedule.selectedDate)

  return (
    <div className="App">
      {selectedDate ?
        <DaySchedule date={selectedDate}/>
        :
        <Calendar/>
      }
    </div>
  );
}

export default App;
