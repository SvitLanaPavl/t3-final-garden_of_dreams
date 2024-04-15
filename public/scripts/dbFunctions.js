/* This file consists of exported functions that retrieve required data from the FireStore Database */
const db = firebase.firestore();

// Function that returns state document 'name' property
export async function getStateName(code) {
  const stateData = await db.doc(`/states/${code}`).get();
  const docData = stateData.data();

  return docData.name;
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
