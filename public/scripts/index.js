/* This file consists of the dynamic filter drop down population, as well as the
  initialization of event listeners */
import { getStateNamesByClimate } from './dbFunctions.js';
import { populateDataPage } from './dataPopulation.js';

await populateDataPage("OK");

// Hamburger button toggle
document.querySelector('.navbar-toggler-icon').addEventListener('click', function() {
  this.classList.toggle('cross');
});
