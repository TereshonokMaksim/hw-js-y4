// This file is now reserved for functions
// Этот файл теперь зарезервирован для функций

import momentModule from "moment";

function getCurrentDay(){
    return momentModule.weekdays(momentModule().day());
}

function getCurrentMonth(){
    return momentModule.months(momentModule().month());
}

function getCurrentYear(){
    return momentModule().year();
}

function getDate(){
    let date;
    let mom = momentModule();
    // Первый вариант - Отклонен, отображает 2025/12/9, а не 2025/12/09
    // date = `${mom.year()}/${mom.date()}/${mom.month() + 1} ${mom.hours()}:${mom.minutes()}:${mom.seconds()}`
    // Второй вариант - Принят, отображает 2025/12/9 20:52:05
    date = mom.format("YYYY/DD/MM HH:mm:ss")

    return date
}

function getCurrentWeekday(number: number){
    if (number){
        return momentModule().day()
    }   
    else{
        return getCurrentDay()
    } 
}


// console.log(`Today is ${getCurrentDay()}, ${getCurrentMonth()}, ${getCurrentYear()} year`) // TASK 1 MODULE 1
// console.log(getDate()) // TASK 2 MODULE 1
// console.log(`Number ver: ${getCurrentWeekday(true)}\nWord ver: ${getCurrentWeekday(false)}`) // TASK 3 MODULE 1

export {getDate}