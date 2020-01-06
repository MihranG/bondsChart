import {DATEFORMAT} from './fakeApiGetter';

export class Api{
    constructor(bondName){
        this.bondName = bondName;
        this.cachedData = {};
    };

    dataGetter = (start, end, subPeriod) =>{
        const datesArray = [];
        while(start.isBefore(end)){
            if(this.cachedData[start.format(DATEFORMAT)]){
                datesArray.push(this.cachedData[start.format(DATEFORMAT)])
            }else{
                const newDate = {
                    date: start.clone(),
                    price: 18+ Math.round((Math.random() * 10) * 1000)/1000,// in order to not have so flucuating graphic)
                    name: start.format(DATEFORMAT)
                };
                datesArray.push(newDate);
                this.cachedData[start.format(DATEFORMAT)] = newDate;
            }
            start.add(1,subPeriod)
        }
        return datesArray
    }


    

}