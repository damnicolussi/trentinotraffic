const date = new Date;

function full_day_name(date: Date){
    return date.getDate() + "/" + (date.getMonth() + 1)  + "/" + date.getFullYear();
}

const label_hour = full_day_name(date);

var first = date.getDate() - date.getDay() + 1; // First day is the day of the month - the day of the week
var last = first + 6; // last day is the first day + 6

var firstday = new Date(date.setDate(first));
var lastday = new Date(date.setDate(last));

const label_day = "week " + full_day_name(firstday) + " - " + full_day_name(lastday);

const label_month = date.getFullYear();
const label_year = "";

export const title_labels = {
    hour: label_hour,
    day: label_day,
    month: label_month,
    year: label_year,
}