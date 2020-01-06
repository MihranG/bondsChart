import moment from 'moment';
import {Api} from './Api';

export const DATEFORMAT = 'DD-MM-YYYY';
const api = new Api('standard')

export const priceApiGetterStandard = (period, bond)=>{
    const endDay = moment();
    let data;
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
            break;
        case 'year':
            subPeriod = 'week';
            startDay = endDay.clone().subtract(1, period);
            break;
        case 'max':
            subPeriod = 'month';
            startDay = endDay.clone().subtract(3, 'year');
            break;
        default:
            break;

        
    }
    data = api.dataGetter(startDay, endDay, subPeriod);

    return new Promise((resolve)=>{
        setTimeout(()=>resolve(data), 500)
    })
}