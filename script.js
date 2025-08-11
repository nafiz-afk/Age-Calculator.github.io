// Theme 
const themeToggle = document.getElementById("themeToggle");

// saved theme preference or use preferred color 
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.add(savedTheme);
} else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.body.classList.add("dark-mode");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const currentTheme = document.body.classList.contains("dark-mode")
    ? "dark-mode"
    : "";
  localStorage.setItem("theme", currentTheme);
});

//  function
function age() {
  const date = parseInt(document.getElementById("date").value);
  const month = parseInt(document.getElementById("MonthYear").value);
  const year = parseInt(document.getElementById("Year").value);

  //  inputs
  if (isNaN(date) || isNaN(month) || isNaN(year)) {
    document.getElementById("age").innerHTML = "Please enter valid numbers";
    return;
  }

  if (date < 1 || date > 31) {
    document.getElementById("age").innerHTML =
      "Please enter a valid date (1-31)";
    return;
  }

  if (month < 1 || month > 12) {
    document.getElementById("age").innerHTML =
      "Please enter a valid month (1-12)";
    return;
  }

  if (year < 1900 || year > new Date().getFullYear()) {
    document.getElementById("age").innerHTML =
      "Please enter a valid year (1900-current year)";
    return;
  }

  const today = new Date();
  const birthDate = new Date(year, month - 1, date);

  // Check if birth date is valid
  if (
    birthDate.getDate() !== date ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getFullYear() !== year
  ) {
    document.getElementById("age").innerHTML = "Please enter a valid date";
    return;
  }

  // Check if birth date is in the future
  if (birthDate > today) {
    document.getElementById("age").innerHTML = "You haven't been born yet!";
    return;
  }

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  // Adjust for negative months or days
  if (ageDays < 0) {
    ageMonths--;
    //  last day of the previous month
    const lastDayOfLastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    ageDays += lastDayOfLastMonth;
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  // result
  let result = `You are <span style="color: var(--primary); font-weight: bold;">${ageYears}</span> years`;

  if (ageMonths > 0 || ageDays > 0) {
    result += `, <span style="color: var(--primary); font-weight: bold;">${ageMonths}</span> months`;
  }

  if (ageDays > 0) {
    result += ` and <span style="color: var(--primary); font-weight: bold;">${ageDays}</span> days</span> old`;
  }

  document.getElementById("age").innerHTML = result;
}
