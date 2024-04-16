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
      await populateDataPage(searchCode);
    }
  });
}

// Handle State and Climate Dropdown Behaviors
async function populateStateDropdown(climateType = "All") {
  const stateArray = await getStateNamesByClimate(climateType);

  $("#state-dropdown").empty();

  stateArray.forEach((state) => {
    let newDropdownItem = $(`<li><a class="dropdown-item" href="#">${state}</a></li>`);

    newDropdownItem.on("click", async function() {
      $("#explore-map").hide();
      $("#data-display").show();
      $("#landmark-carousel").empty();

      if (window.tempChart) {
        window.tempChart.destroy();
      }

      let itemValue = newDropdownItem.text();
      let itemCode = getStateCode(itemValue);
      $("#state-dropdown-default").text(itemValue);
      await populateDataPage(itemCode);
    })

    $("#state-dropdown").append(newDropdownItem);
  });
}

function addClimateFilterEvent() {
  // Change selector to climate dropdown ID when able
  $("#climate-dropdown .dropdown-item").on("click", async function() {
    const climateValue = this.text;
    $("#climate-dropdown-default").text(climateValue);
    $("#state-dropdown-default").text("Filtered");
    await populateStateDropdown(climateValue);
  });
}

// Handle Map Behavior
function initializeMap() {
  $("#data-display").hide();
  $("#explore-map").show();

  $("#svg a").on("click", async function(event) {
    const stateID = event.target.id;
    $("#explore-map").hide();
    $("#data-display").show();
    $("#landmark-carousel").empty();

    if (window.tempChart) {
      window.tempChart.destroy();
    }

    await populateDataPage(stateID);
  })
}

// Handle On Page Load Behavior
$(document).ready(async function() {
  initializeSearchBar();
  await populateStateDropdown();
  addClimateFilterEvent();
  initializeMap();

  // Change Menu Icon on Open
  document.querySelector('.navbar-toggler-icon').addEventListener('click', function() {
    this.classList.toggle('cross');
  });
})
