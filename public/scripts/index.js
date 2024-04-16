/* This file consists of the dynamic filter drop down population, as well as the
  initialization of event listeners */
import { getStateNamesByClimate, getStateCode } from './dbFunctions.js';
import { populateDataPage } from './dataPopulation.js';

// Handle Search Bar Behavior
function initializeSearchBar() {
  $("#search-bar").on("keypress", async function(event) {
    if (event.which == 13) {
      event.preventDefault();
      $("#explore-map").hide();
      $("#data-display").show();
      $("#landmark-carousel").empty();
      if (window.tempChart) {
        window.tempChart.destroy();
      }
      let searchValue = $("#search-bar").val();
      let searchCode = getStateCode(searchValue);
      console.log(searchCode);
      await populateDataPage(searchCode);
    }
  });
}

initializeSearchBar();

// Handle State and Climate Dropdown Behaviors


// Handle Map Behavior


// Handle On Page Load Behavior
document.querySelector('.navbar-toggler-icon').addEventListener('click', function() {
  this.classList.toggle('cross');
});
