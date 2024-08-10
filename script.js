"use strict";

const currentHours = document.querySelectorAll(".hours-spent");
const previousWeekHours = document.querySelectorAll(".previous-week");
const timePeriodLinks = document.querySelectorAll(".time-filter");
const activityTitle = document.querySelectorAll(".category-title");
const jsonData = "data.json";

timePeriodLinks.forEach((activeLink) => {
  activeLink.addEventListener("click", function () {
    const dataValue = this.dataset.value;
    timePeriodLinks.forEach((link) => {
      link.classList.remove("active");
    });

    highlightActivePeriod(activeLink);
    fetchData(dataValue);
  });
});

function highlightActivePeriod(link) {
  if (!link.classList.contains("active")) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
}

function updateUI(data, value) {
  for (let i = 0; i < data.length; i++) {
    const {
      title,
      timeframes: { daily, weekly, monthly },
    } = data[i];

    activityTitle[i].textContent = title;

    currentHours[i].textContent = `${
      value === "daily"
        ? daily.current
        : value === "monthly"
        ? monthly.current
        : weekly.current
    }hrs`;
    previousWeekHours[i].textContent = `Last Week - ${
      value === "daily"
        ? daily.previous
        : value === "monthly"
        ? monthly.previous
        : weekly.previous
    }hrs`;
  }
}

function fetchData(value) {
  return fetch(jsonData)
    .then((response) => response.json())
    .then((data) => {
      updateUI(data, value);
    })
    .catch((err) => {
      console.error("Error While Fetching Data", err);
    });
}

document.addEventListener("DOMContentLoaded", fetchData);
