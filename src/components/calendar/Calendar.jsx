import React, { useState } from 'react';
import Week from './Week';
import "./Calendar.css"
import TimeTable from './TimeTable';
import ModalAddDate from './ModalAddDate';
import dates from './iterviewDates.json';

export default function Calendar() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [currentWeek, setCurrentWeek] = useState([1,2,3,4,5,6,7])
  const [choosenDate, setChoosenDate] = useState(new Date(0))
	function handleDelete() {
		// eslint-disable-next-line no-restricted-globals
		if(confirm("Are you sure you want to delete every interview datetime in this interval?")){
			const plusHour = new Date(choosenDate.setHours(choosenDate.getHours()+1));
			choosenDate.setHours(choosenDate.getHours()-1);
			dates = dates.filter((d)=>{
				const date = new Date(d);
				console.log(choosenDate, plusHour)
				return !(date>=choosenDate&& date< plusHour)
			})
			setChoosenDate(new Date(0))
		}
	}
	function haveInterview(intervalDate) {
		const firstDate = new Date(intervalDate);
		const nextDate = new Date(firstDate).setHours(firstDate.getHours()+1);
		let have = false;
		dates.forEach(d => {
			const date = new Date(d)
			if (date>=firstDate && date<nextDate) {
				have=true;
			}
		});
		return have;
	}
	function chooseDate(date) {
		setChoosenDate(new Date(date))
	}
	function addDate(dateStr) {
		const date = new Date(dateStr);
		if (date == "Invalid Date") {
			alert('Неправильно введена дата');
		} else {
			dates.push(date.toISOString());
		}
	}
	function handleSetCurrentWeek(week){
		setCurrentWeek(week);
	}
  function handlePrevWeek() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
  }
  function handleNextWeek() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
  }
	function handleToday(){
		setCurrentDate(new Date())
	}  
	return (
		<div className='calendar'>
			<div className='calendar__header'> 
				<div className="calendar__headline">
					<h2>Interview Calendar</h2> 
					<ModalAddDate addDate={addDate} choosenDate={choosenDate}/>
				</div>
				
				<Week currentDate={currentDate}
						handleNextWeek={handleNextWeek}
						handlePrevWeek={handlePrevWeek}
						today={new Date()} 
						handleSetCurrentWeek={handleSetCurrentWeek}
				/>
			</div>
        
				<TimeTable currentWeek={currentWeek} haveInterview={haveInterview} chooseDate={chooseDate} choosenDate={choosenDate}/>
			<div className='calendar__footer'> <label className='red-l normal' onClick={handleToday}>Today</label>
			{haveInterview(choosenDate) &&
			<label className='red-l normal' onClick={handleDelete}>Delete</label>
			}
			</div>
			
		</div>
	)
}
