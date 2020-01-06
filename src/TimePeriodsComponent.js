import React, {useState} from 'react';

import './TimePeriods.css'

const TIMELAPSES = [
    {id: 'week', name: "Week"},
    {id: 'month', name: "Month"},
    {id: 'quarter', name: "Quarter"},
    {id: 'year', name: "Year"},
    {id: 'max', name: "Max"}
]


function TimeLapseComponent({timePeriodHandler, activePeriod}){
    const clickHandler = e => {
        timePeriodHandler(e.target.id)
    }
    return(
        <div className='buttons-wrapper'>
            {TIMELAPSES.map(time=>(
                <button
                    className={activePeriod === time.id ? 'active periods-button' : 'periods-button' }
                    key={time.id}
                    id={time.id}
                    onClick={clickHandler}
                >
                    {time.name}
                </button>
            ))}
        </div>
    )
}

export default  TimeLapseComponent