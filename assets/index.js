function whatToShowWhenBirtday(){
  document.getElementById("headline").innerText = "It's my birthday!";
  document.getElementById("countdown").style.display = "none";
  document.getElementById("content").style.display = "block";
}

function adjustBirthday(birthDate){
  let today = new Date(), 
    dd = String(today.getDate()).padStart(2, "0"),
    mm = String(today.getMonth() + 1).padStart(2, "0"),
    yyyy = today.getFullYear(),
    nextYear = yyyy + 1,
    dayMonth = birthDate,
    birthday = dayMonth + yyyy;
  
  today = mm + "/" + dd + "/" + yyyy;
  
  if (today > birthday) {
    birthday = dayMonth + nextYear;
  }
  return birthday;
}

function myCountDown(birthDate) {
    const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
    let birthday = adjustBirthday(birthDate);

    const countDown = new Date(birthday).getTime(), x = setInterval(function() {
      const now = new Date().getTime(), distance = countDown - now;
      document.getElementById("days").innerText = Math.floor(distance / (day)),
      document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
      document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
      document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

      //do something later when date is reached
      if (distance < 0) {
        whatToShowWhenBirtday();
        clearInterval(x);
      }
}, 0)}

function getNearestBirthday(data){
  const today = new Date();
  const currentYear = today.getFullYear();
  
  let nearestDate = null;
  let nearestName = null;
  let minDiff = Infinity;

  for (const [name, dateStr] of Object.entries(data)) {
    let date = new Date(`${currentYear}/${dateStr}`);

    if (date < today) {
      date = new Date(`${currentYear + 1}/${dateStr}`);
    }

    const diff = date - today;
    if (diff < minDiff) {
      minDiff = diff;
      nearestDate = date;
      nearestName = name;
    }
  }

  // return { name: nearestName, date: nearestDate.toDateString() };
  return { name: nearestName, date: data[nearestName] };
}

function showWhenNoBirthday(name, birthDate){
  let temp = document.getElementById("headline").innerText;
  console.log(temp);
  temp = temp + " \n" + name;
  document.getElementById("headline").innerText = temp;
}

const nearest = getNearestBirthday(data);
showWhenNoBirthday(nearest.name, nearest.date)
myCountDown(nearest.date);
// console.log(`The nearest date is for ${nearest.name} on ${nearest.date}`);