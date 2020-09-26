const date_picker_el = document.querySelector('.date-picker');
const selected_date_el = document.querySelector('.date-picker .selected-date');
const dates_el = document.querySelector('.date-picker .dates');
const mth_el = document.querySelector('.date-picker .dates .month .mth');
const next_mth_el = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_el = document.querySelector('.date-picker .dates .month .prev-mth');
const days_el = document.querySelector('.date-picker .dates .days');
const week_el = document.querySelector('.week');
const weekday_el = document.querySelector('.week .weekday');

const months = ["January","February","March","April","May","June","July",
"August","September","October","November","December"];

let date = new Date();
let day = date.getDate();
let weekday = date.getDay(); //find where to start calendar day of week?
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_el.textContent = months[month] + ' ' + year;  

selected_date_el.textContent = formatDate(date);
selected_date_el.dataset.value = selectedDate;

// event listeners
date_picker_el.addEventListener('click', toggleDatePicker);
date_picker_el.addEventListener('touch', toggleDatePicker);
next_mth_el.addEventListener('click', goToNextMonth);
prev_mth_el.addEventListener('click', goToPrevMonth);

// functions 
function toggleDatePicker (e) {
  console.log('event path', e.path);
  if (!checkEventPathForClass(e.path, 'dates')) {
    dates_el.classList.toggle('active'); 
    selected_date_el.classList.toggle('purple'); 
  }  
}

function goToNextMonth (e) {
  month++;
  // months are numbered on 0 start -- december is 11
  if(month >11 ) {
    month = 0;
    year++;
  }
  mth_el.textContent = months[month] + ' ' + year;
  loadCalendarDays();
}

function goToPrevMonth(e) {
  month--;
  if(month < 0 ) {
    month = 11;
    year--;
  }
  mth_el.textContent = months[month] + ' ' + year
  loadCalendarDays();
}


function loadCalendarDays() {
  days_el.innerHTML = '';

  let tmpDate = new Date(year, month, 0);
  let num = daysInMonth(month, year);
  let dayofweek = tmpDate.getDay(); // find where to start calendar day of week

  //create day prefixes 
  for(let i = 0; i <= dayofweek; i++) {
    let d = document.createElement('div');
    d.classList.add('day');
    d.classList.add('blank');
    days_el.appendChild(d);
  }

  //render the rest of the days
  for(let i = 0; i < num; i++) {    
    const day_el = document.createElement('div');
     day_el.classList.add('day');
     day_el.textContent = i + 1;  

     if(selectedDay ==( i + 1) && selectedYear == year && selectedMonth == month) {
      day_el.classList.add('selected');
    }

    day_el.addEventListener('click', function() {
      selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
      selectedDay = (i + 1);
      selectedMonth = month;
      selectedYear = year;
      selected_date_el.textContent = formatDate(selectedDate); //selected_date_el is the el showing the formatted date that was selected
      selected_date_el.dataset.value = selectedDate;

      loadCalendarDays();
    });
    days_el.appendChild(day_el);
  }

  let clear = document.createElement('div');
  clear.className = 'clear';
  days_el.appendChild(clear);
}
loadCalendarDays();

//Helper Functions
function checkEventPathForClass (path, selector) {
  for (let i = 0; i < path.length; i++ ) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }
  return false;
}

function formatDate (d) {
  let day = d.getDate();
  if(day < 10 ) {
    day = '0' + day;
  }

  let month = d.getMonth() + 1;
  if(month < 10 ) {
    month = '0' + month;
  }

  let year = d.getFullYear();

  return month + '/' + day + '/' + year;
}

function daysInMonth(month, year) {
  let d = new Date(year, month+1, 0);
  return d.getDate();
}

// FOR MOBILE
if(document.documentElement.clientWidth <= 900) {
  console.log("i'm on a mobile device");
} else {
  console.log("NOT on mobile");
}