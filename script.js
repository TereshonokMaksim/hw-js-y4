// To run file, write "npm run start" in terminal
// Чтобы запустить этот файл, напишите "npm run start" в командную строку

const momentModule = require("moment");

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

// console.log(`Today is ${getCurrentDay()}, ${getCurrentMonth()}, ${getCurrentYear()} year`) // TASK 1 MODULE 1
console.log(getDate()) // TASK 2 MODULE 1