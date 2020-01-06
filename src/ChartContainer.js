import React from 'react';
import './ChartContainer.css';
import {LineChart, YAxis, XAxis, Tooltip, CartesianGrid, Line} from 'recharts'


function ChartContainer({data}){
    return(
        <div className='chart-wrapper'>
            <LineChart
                width={400}
                height={400}
                data={data}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="price" stroke="#ff7300" yAxisId={0} />
            </LineChart>
        </div>
    )
}

export default ChartContainer