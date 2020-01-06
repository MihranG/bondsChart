import {DATEFORMAT} from './fakeApiGetter';

export class Api{
    constructor(bondName){
        this.bondName = bondName;
        this.cachedData = {};
    };

    dataGetter = (start, end, subPeriod) =>{
        const datesArray = [];
        while(!start.isAfter(end)){
            if(this.cachedData[start.format(DATEFORMAT)]){
                datesArray.push(this.cachedData[start.format(DATEFORMAT)])
            }else{
                const rnd= Math.random() * 12 ;
                const newDate = {
                    price: Math.round((rnd+18) * 1000)/1000, // in order to not have so flucuating graphic)
                    spread: Math.round((1 + Math.random() * 4) *100)/100,
                    yield: Math.round(Math.random() *100)/10,
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