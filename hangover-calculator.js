function calculateHangoverRecovery() {
  // Get values from input fields
  const alcoholTypes = parseFloat(document.getElementById("alcoholTypes").value) || 0;
  const totalDrinks = parseFloat(document.getElementById("totalDrinks").value) || 0;
  const abv = parseFloat(document.getElementById("abv").value) || 0;
  const yearsDrinking = parseFloat(document.getElementById("yearsDrinking").value) || 0;
  const daysDrinking = parseFloat(document.getElementById("daysDrinking").value) || 0;
  const hoursSlept = parseFloat(document.getElementById("hoursSlept").value) || 0;
  const litersWater = parseFloat(document.getElementById("litersWater").value) || 0;
  const age = parseFloat(document.getElementById("age").value) || 0; // Get age input

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
      isNaN(litersWater) || isNaN(age) ||
      alcoholTypes < 1 || totalDrinks < 1 || abv < 1 || yearsDrinking < 0 ||
      daysDrinking < 1 || hoursSlept < 0 || litersWater < 0 || age < 1 || age > 120) {
    document.getElementById("answer-box").textContent = "please fill out all fields with valid numbers (!!!)";
    return; 
  }

    // Age Factor Calculation
    let ageFactor = 0;
    if (age > 38) {
        ageFactor = (age - 38) * 6.66; 
    } else {
        ageFactor = (age - 21) * 0.25; 
    }

  // Calculate Total Booze Units (TBU)
  const totalOunces = totalDrinks * 1.5; 
  const TBU = (totalOunces * abv) / 100;

  // Algorithm calculations (with hoursSlept fix and ageFactor)
  const hangoverHours =
      2 * (alcoholTypes - 1) + 
      TBU +
      (yearsDrinking < 5 ? -2 : yearsDrinking >= 10 ? 4 : 0) +
      daysDrinking +
      (hoursSlept === 0 ? 0 : 1.5 * (daysDrinking / (hoursSlept / 24))) -
      (litersWater * 0.5) + 
      (electrolytes === 'yes' ? -1 : 0) +
      (hardDrugs === 'yes' ? NaN : 0) +
      ageFactor; 

  const recoveryTime = isNaN(hangoverHours) 
      ? "unknown - seek hair of the dog and try again tomorrow (!!!)" 
      : `${hangoverHours.toFixed(2)} hours`;

  // Display the result in the answer box
  document.getElementById("answer-box").textContent = `Estimated hangover recovery time: ${recoveryTime}`;
}
