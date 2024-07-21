function calculateHangoverRecovery() {
  // Get values from input fields
  const alcoholTypes = parseFloat(document.getElementById("alcoholTypes").value) || 0; 
  const totalDrinks = parseFloat(document.getElementById("totalDrinks").value) || 0;
  const abv = parseFloat(document.getElementById("abv").value) || 0;
  const yearsDrinking = parseFloat(document.getElementById("yearsDrinking").value) || 0;
  const daysDrinking = parseFloat(document.getElementById("daysDrinking").value) || 0;
  const hoursSlept = parseFloat(document.getElementById("hoursSlept").value) || 0;
  const litersWater = parseFloat(document.getElementById("litersWater").value) || 0;

  // Get values from radio buttons
  const electrolytesYes = document.getElementById("electrolytesYes").checked;
  const electrolytesNo = document.getElementById("electrolytesNo").checked;
  const electrolytes = electrolytesYes ? "yes" : electrolytesNo ? "no" : "no"; 

  const hardDrugsYes = document.getElementById("hardDrugsYes").checked;
  const hardDrugsNo = document.getElementById("hardDrugsNo").checked;
  const hardDrugs = hardDrugsYes ? "yes" : hardDrugsNo ? "no" : "no"; 

  // Error checking (added)
  if (isNaN(alcoholTypes) || isNaN(totalDrinks) || isNaN(abv) || 
      isNaN(yearsDrinking) || isNaN(daysDrinking) || isNaN(hoursSlept) ||
      isNaN(litersWater) || 
      alcoholTypes < 1 || totalDrinks < 1 || abv < 1 || yearsDrinking < 0 ||
      daysDrinking < 1 || hoursSlept < 0 || litersWater < 0) {
    document.getElementById("answer-box").textContent = "please fill out all fields with valid numbers (!!!)";
    return; 
  }

  // Calculate Total Booze Units (TBU)
  const totalOunces = totalDrinks * 1.5; 
  const TBU = (totalOunces * abv) / 100;

  // Algorithm calculations (with hoursSlept fix)
  const hangoverHours =
      2 * (alcoholTypes - 1) + 
      TBU + // Use TBU here
      (yearsDrinking < 5 ? -2 : yearsDrinking >= 10 ? 4 : 0) +
      daysDrinking +
      (hoursSlept === 0 ? 0 : 1.5 * (daysDrinking / (hoursSlept / 24))) - // Handle division by zero
      (litersWater * 0.5) + 
      (electrolytes === 'yes' ? -1 : 0) +
      (hardDrugs === 'yes' ? NaN : 0); 

  const recoveryTime = isNaN(hangoverHours) 
      ? "unknown - seek hair of the dog and try again tomorrow (!!!)" // Updated error message
      : `${hangoverHours.toFixed(2)} hours`;

  // Display the result in the answer box
  document.getElementById("answer-box").textContent = `Estimated hangover recovery time: ${recoveryTime}`;
}