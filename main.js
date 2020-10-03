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

next_mth_el.addEventListener('click', goToNextMonth);
prev_mth_el.addEventListener('click', goToPrevMonth);

// functions 

function toggleDatePicker (e) {
  // console.log(checkEventPathForClass(e.path, 'dates'));
  // console.log('event path', e.path);
  if (!checkEventPathForClass(e.path, 'dates')) {
    dates_el.classList.toggle('active'); 
    selected_date_el.classList.toggle('purple'); 
  }  
}

function toggleForMobile (e) {
  // change the class to check what it isn't from dates - the calendar block
  //   to specific day that is tapped. in mobile, 'dates' doesn't show up
  //    in classList for the day.
  if(!checkEventPathMobile(e.target, 'dates', 'day', 'arrows')) {
    dates_el.classList.toggle('active'); 
    selected_date_el.classList.toggle('purple'); 
  }
}

function checkEventPathMobile (target, selector, selector2, selector3) {
  // console.log('check mobile path fired');
  // console.log('target in fn', target);
  // console.log('targetClass in fn', target.classList );
  // console.log('selector in fn', selector);
  // console.log('selector in fn', target.classList.contains(selector));

  // in mobile the target and class list data renders different than on desktop
  //  rewrote the conditional to account for this
  if(target && target.classList.contains(selector) || target.classList.contains(selector2) || target.classList.contains(selector3)) {
    return true;
  }
  return false;
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
  console.log('selectedDay', selectedDay);
  console.log('selectedDate', selectedDate);

  let clear = document.createElement('div');
  clear.className = 'clear';
  days_el.appendChild(clear);
}
loadCalendarDays();

//Helper Functions
function checkEventPathForClass (path, selector) {
  // console.log('target in fn', path);
  for (let i = 0; i < path.length; i++ ) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      // console.log('targetClass in fn', path[i].classList );
      // console.log('selector in fn', selector);
      // console.log('selector in fn', path[i].classList.contains(selector));
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
// if(document.documentElement.clientWidth <= 900) {
//   console.log("i'm on a mobile device");
//   document.getElementsByTagName('body')[0].style.backgroundColor = 'blue';
// } else {
//   console.log("NOT on mobile");
//   document.getElementsByTagName('body')[0].style.backgroundColor = '#ffce00';
// }

function watchWindowSize() {
  if(document.documentElement.clientWidth <= 700) {
    console.log("i'm on a mobile device");
    
    date_picker_el.removeEventListener('click', toggleDatePicker);
    document.getElementsByTagName('body')[0].style.backgroundColor = 'blue';

    date_picker_el.addEventListener('mouseup', toggleForMobile, false);
    // date_picker_el.addEventListener('touchstart', function(e) {
    //   // e.stopPropagation();
    //   // console.log('propagation stopped');
    // });
    // date_picker_el.addEventListener('touchstart', function(e) {
    //   for(let i=0; i< e.targetTouches.length; i++) {
    //     console.log('touchpoint[' + i + '].target= ',  e.targetTouches[i].target);
    //   }
    // }); 
  } else {
    console.log("NOT on mobile");
    date_picker_el.addEventListener('click', toggleDatePicker);
    document.getElementsByTagName('body')[0].style.backgroundColor = '#ffce00';
  }
}

window.addEventListener('resize', watchWindowSize);