import moment from 'moment';
import {Api} from './Api';

export const DATEFORMAT = 'DD-MM-YYYY';
const api = new Api('standard')

export const priceApiGetterStandard = (period, bond)=>{
    const endDay = moment();
    // const startDay  = period === 'max' ? endDay.clone().subtract(3,'year'): endDay.clone().subtract(1,period)
    let data;
    const dataObj = {};
    let subPeriod = '';
    let  startDay;

    switch(period){
        case 'week':
            subPeriod = 'day';
            startDay = endDay.clone().subtract(1, period);
            break;
        case 'month':
            subPeriod = 'day';
            startDay = endDay.clone().subtract(1, period);
            break;
        case 'quarter':
            subPeriod = 'day';
            startDay = endDay.clone().subtract(1, period);
        case 'year':
            subPeriod = 'week';
            startDay = endDay.clone().subtract(1, period);
            break;
        case 'max':
            subPeriod = 'month';
            startDay = endDay.clone().subtract(3, 'year');
        
    }
    data = api.dataGetter(startDay, endDay, subPeriod);


    // dates.forEach(date=>{
    //     dataObj[date.format(DATEFORMAT)] = {
    //         price : Math.round(Math.random() * 30 * 1000)/1000,
    //         date,
    //     }
    // })

    return Promise.resolve(data)
}



export const api1 = ()=>Promise.resolve('fake')