/* This file consists of the function that will pull all necessary database info
  and use it to build elements of the data page and add them to the DOM */
import { getStateName, getClimate, getStateTree, getStateFlower, getLandmarks } from './dbFunctions.js';
import { buildChart } from './chartConfig.js';

export async function populateDataPage(code) {
  // Retrieve Database Info
  const stateName = await getStateName(code);
  const stateClimate = await getClimate(code);
  const stateTree = await getStateTree(code);
  const stateFlower = await getStateFlower(code);
  const stateLandmarks = await getLandmarks(code);

  // Create Chart
  await buildChart(code);

  // Select Name, Climate, Tree, and Flower and replace with dynamic values
  $("#state-name").text(stateName);
  $("#climate").text(stateClimate);
  $("#state-tree").text(stateTree);
  $("#state-flower").text(stateFlower);

  // Use Landmark data to build dynamic carousel items
  const landmarkOne = stateLandmarks[0].landmark_1;
  const landmarkOneURL = stateLandmarks[0].landmark_1_url;
  const landmarkTwo = stateLandmarks[1].landmark_2;
  const landmarkTwoURL = stateLandmarks[1].landmark_2_url

  const imgCarouselOne = $( 
    `<div class="carousel-item active">
      <img src="${landmarkOneURL}" class="d-block w-100" alt="...">
      <div class="carousel-caption p-0">
        <p class="place-caption d-none d-md-block p-0 mb-0">${landmarkOne}</p>
      </div>
    </div>`
  );

  const imgCarouselTwo = $( 
    `<div class="carousel-item">
      <img src="${landmarkTwoURL}" class="d-block w-100" alt="...">
      <div class="carousel-caption p-0">
        <p class="place-caption d-none d-md-block p-0 mb-0">${landmarkTwo}</p>
      </div>
    </div>`
  );

  $("#landmark-carousel").append(imgCarouselOne);
  $("#landmark-carousel").append(imgCarouselTwo);
}
