import React, { useEffect, useMemo } from 'react';
import './Week.css'
const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const Week = ({currentDate, handlePrevWeek, handleNextWeek, today, handleSetCurrentWeek}) => {
  const week = useMemo(() => getWeek(currentDate), [currentDate]);
  useEffect(() => {
    handleSetCurrentWeek(week);
  }, [week]);
	function getWeek(date) {
		const firstDayOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - ((date.getDay() + 6) % 7));
		const week = [];
		for (let i = 0; i < 7; i++) {
			week.push(new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() + i));
		}
		return week;
	}	
	
	const MnY = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }).charAt(0).toUpperCase() + currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }).slice(1);// month and year
	const isToday = currentDate.getDate() === today.getDate() &&
	currentDate.getMonth() === today.getMonth() &&
	currentDate.getFullYear() === today.getFullYear(); // is today a viewed day 
  return (
    <div className="week">
			<div className="current-week">
				<div className="day" key="empty01"></div>
			{daysOfWeek.map((day, index) => (
        <div key={index} className="day">
					<div className='day-of-week sub-text'>{day}</div>
          <div className={`day-in-week`}><label className={(isToday && week[index].getDate()===today.getDate()?' today':'')}>{week[index].getDate()}</label></div>
        </div>
      ))}
			</div>
			<div className="month-year">
			<div className="day" key="empty02"></div>
        <label className='red-l' onClick={handlePrevWeek}>←</label>
        <h2 className='sub-text'>{MnY}</h2>
        <label className='red-l' onClick={handleNextWeek}>→</label>
      </div>
    </div>
  );
};

export default Week;