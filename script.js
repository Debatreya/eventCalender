const calendar = document.querySelector(".calendar");
const data = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let today = new Date();
var activeDay
let month = today.getMonth();
let year = today.getFullYear();
const dateInput = document.querySelector(".date-input");
console.log(activeDay);
const months = [
    "January", 
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

//function to add days

function initCalendar(){
    //to get prev month days and current month all days and rem next month days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month+1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7-lastDay.getDay();

    //update date top of Calendar
    data.innerHTML = months[month]+ " "+ year;

    //adding days on dom
    let days = "";
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays-x+1}</div>`
    }
    //current month days
    for (let i = 1; i < lastDate; i++) {
        if (i == new Date().getDate() && year == new Date().getFullYear() && month == new Date().getMonth()) {
            days += `<div class="day today active">${i}</div>`;
        }
        else if(i == activeDay)
        {
            days += `<div class="day focus">${i}</div>`;
        }
        else{
            days += `<div class="day">${i}</div>`;
        }
        
    }

    //next month days
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
}
initCalendar();

//prev month
function prevMonth() {
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
    initCalendar();
}

//next month
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}
//going to today
function btntoday()
{
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    activeDay = today.getDate();
    initCalendar();
}
//adding eventlistner on prev and next
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);
document.querySelector(".today-btn").addEventListener("click", btntoday);

function go() {
    let input = dateInput.value;
    let d = new Date(input);
     year = d.getFullYear();
     month = d.getMonth();
     activeDay = d.getDate();
     initCalendar();
}