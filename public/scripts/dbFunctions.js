/* This file consists of exported functions that retrieve required data from the FireStore Database */

// State object for determining state code with state name
const stateByID = {
  AK: "Alaska",
  AL: "Alabama",
  AR: "Arkansas",
  AZ: "Arizona",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  IA: "Iowa",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  MA: "Massachusetts",
  MD: "Maryland",
  ME: "Maine",
  MI: "Michigan",
  MN: "Minnesota",
  MO: "Missouri",
  MS: "Mississippi",
  MT: "Montana",
  NC: "North Carolina",
  ND: "North Dakota",
  NE: "Nebraska",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NV: "Nevada",
  NY: "New York",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VA: "Virginia",
  VT: "Vermont",
  WA: "Washington",
  WI: "Wisconsin",
  WV: "West Virginia",
  WY: "Wyoming"
}

// Function to get state code by its full name
export function getStateCode(stateName) {
  for (let code in stateByID) {
    if (stateByID[code] === stateName) {
      return code;
    }
  }
}

// Initiate Database Access Point
const db = firebase.firestore();

// Function that returns state document 'name' property
export async function getStateName(code) {
  const stateData = await db.doc(`/states/${code}`).get();
  const docData = stateData.data();

  return docData.name;
}

// Function that returns state document 'climate' property
export async function getClimate(code) {
  const stateData = await db.doc(`/states/${code}`).get();
  const docData = stateData.data();

  return docData.climate;
}

// Function that returns state document 'state_tree' property
export async function getStateTree(code) {
  const stateData = await db.doc(`/states/${code}`).get();
  const docData = stateData.data();

  return docData.state_tree;
}

// Function that returns state document 'state_flower' property
export async function getStateFlower(code) {
  const stateData = await db.doc(`/states/${code}`).get();
  const docData = stateData.data();

  return docData.state_flower;
}

// Function that returns state document 'landmarks' property
export async function getLandmarks(code) {
  const stateData = await db.doc(`/states/${code}`).get();
  const docData = stateData.data();

  return docData.landmarks;
}

// Function that returns state document 'temps' property
export async function getTemps(code) {
  const stateData = await db.doc(`/states/${code}`).get();
  const docData = stateData.data();
  const tempsArray = docData.temps;

  // Convert temps array strings into integers for chart building
  const parsedData = tempsArray.map(function(str) {
    return parseInt(str);
  });

  return parsedData;
}

// Function that returns an array of state names that match a certain climate type
export async function getStateNamesByClimate(climateType) {
  const stateArray = [];

  const querySnapshot = await db.collection("states").get();

  querySnapshot.forEach((doc) => {
    let docData = doc.data();
    let docClimate = docData.climate;

    if (docClimate.includes(climateType) || climateType === "All") {
      stateArray.push(docData.name);
    }
  });

  return stateArray;
}
