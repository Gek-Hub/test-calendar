import React from 'react';
import './TimeTable.css';

export default function TimeTable({ currentWeek, haveInterview, choosenDate, chooseDate }) {
	
  const rows = [];
  for (let i = 0; i < 24; i++) {
    const cells = [];
    for (let j = 0; j < 8; j++) {
      if (j === 0) {
        cells.push(<td key={j} className="cell border-invisible"><label className='time'>{`${i<10?'0'+i:i}:00`}</label></td>);
      } else {
				const cellDate = new Date(currentWeek[j-1]).setHours(i);
				const nextDate = new Date(currentWeek[j-1]).setHours(i+1);
				let haveI = haveInterview(cellDate)
				let haveChoosen =  choosenDate >= cellDate && choosenDate<nextDate;
        cells.push(<td key={j} className={"cell"+(haveI?" interview-cell":'') + (haveChoosen?" choosen-cell":"")} onClick={(e)=>{ chooseDate(cellDate);}}></td>);
      }
    }
    rows.push(<tr key={i}>{cells}</tr>);
  }
	//console.log(new Date(rows[0].props.children[1].props.date))
  return (
    <div className="table-container">
      <table><tbody>{rows}</tbody></table>
    </div>
  );
}
