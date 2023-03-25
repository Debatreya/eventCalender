const calendar = document.querySelector(".calendar");
const data = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let today = new Date();
let activeDay
let month = today.getMonth();
let year = today.getFullYear();
const dateInput = document.querySelector(".date-input");
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
//default events array
const eventsArr =[
    {
        day: 26,
        month: 3,
        year: 2023,
        events: [
            {
                title: "Technobyte Freshers party",
                time: "10:00 AM",
            },
            {
                title: "4days left for midsem 1",
                time: "08:00PM",
            },
        ]
    },
    {
        day: 20,
        month: 4,
        year: 2023,
        events: [
            {
                title: "Technobyte Freshers party",
                time: "10:00 AM",
            },
            {
                title: "4days left for midsem 1",
                time: "08:00PM",
            },
            {
                title: "Event 3",
                time: "08:00AM",
            },
        ]
    },
]
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
        //check if event is present
        let event = false;
        for (let p = 0; p < eventsArr.length; p++) {
            const element = eventsArr[p];
            eventsArr.forEach((eventObj) => {
                if(eventObj.day == i && eventObj.month == month+1 && eventObj.year==year){
                    event = true;
                }
            });
        }
        if (i == new Date().getDate() && year == new Date().getFullYear() && month == new Date().getMonth()) {
            if(event){
                days += `<div class="day event active today">${i}</div>`;
            }
            else{
                days += `<div class="day active today">${i}</div>`;
            }
        }
        else if(i == activeDay)
        {
            console.log(activeDay);
            if(event){
                days += `<div class="day event focus">${i}</div>`;
            }
            else
                days += `<div class="day focus">${i}</div>`;
        }
        else{
            if(event){
                days += `<div class="day event">${i}</div>`;
            }
            else
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
     console.log(activeDay);
     initCalendar();
}


//For the events
const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".time-from"),
    addEventTo = document.querySelector(".time-to")

addEventBtn.addEventListener("click", () =>{
    addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () =>{
    addEventContainer.classList.remove("active");
});

//Allowing only 50 characters
addEventTitle.addEventListener("input", (e)=>{
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});
//Remove everything else numbers
addEventFrom.addEventListener("input", (e)=>{
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if (addEventFrom.value.length == 2) {
        addEventFrom.value += ":"
    }
    if(addEventFrom.value.length > 5){
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});
addEventTo.addEventListener("input", (e)=>{
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if (addEventTo.value.length == 2) {
        addEventTo.value += ":"
    }
    if(addEventTo.value.length > 5){
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});
// function addListner() {
//     const days = document.querySelector(".day")
//     days.forEach((day) => {
//         day.addEventListener("click", (e)=>{
//             activeDay = Number(e.target.innerHTML)
//             days.forEach((day) => {
//                 day.classList.remove("active");
//             });
//         });
        
//     });
// }