/////Selectors
const billRecieved = document.querySelector("#bill_input");
const numOfPeople = document.querySelector("#party_count");
const tipSelectors = document.querySelector(".tip_selectors");
const tipInput = document.querySelector("#tip_input");
const resetBtn = document.querySelector("#reset_btn");
const errorMsg = document.querySelector(".error_msg");
const billInputError = document.querySelector(".billInputError");
const peopleInputError = document.querySelector(".peopleInputError");
//button selectors
const fivePerc = document.querySelector("#five");
const tenPerc = document.querySelector("#ten");
const fifteenPerc = document.querySelector("#fifteen");
const twentyfivePerc = document.querySelector("#twentyfive");
const fiftyPerc = document.querySelector("#fifty");
const percBtns = document.querySelectorAll(".percBtn");
const percBtnsArr = Array.from(percBtns);
const percValue = document.querySelectorAll("percVal");

let bill;
let tip;
let partySize;

/////Functions

billRecieved.addEventListener("change", () => {
  bill = Number(billRecieved.value);
  //Error Message if billRecieved.value == 0
  if (billRecieved.value <= 0) {
    billRecieved.value = "0";
    billInputError.textContent = "Can't be Zero";
    billRecieved.style.border = "2px solid rgba(219, 101, 4, 0.877)";
  } else {
    billInputError.textContent = "";
    billRecieved.style.border = "none";
  }
});

numOfPeople.addEventListener("change", () => {
  partySize = Number(numOfPeople.value);
  //Error Message if NumofPeople == 0
  if (partySize <= 0) {
    numOfPeople.value = "0";
    peopleInputError.textContent = "Can't be Zero";
    numOfPeople.style.border = "2px solid rgba(219, 101, 4, 0.877)";
  } else {
    peopleInputError.textContent = "";
    numOfPeople.style.border = "none";
  }
});
//Updates text-align right in Tip Input when active
tipInput.addEventListener("change", () => {
  if (tipInput.value !== "") {
    tipInput.style.textAlign = "right";
  } else {
    tipInput.style.textAlign = "center";
  }
});

/////Calc button functionallity
// functions to toggle button color upon click
function btnColorToggleOn(button) {
  if (button.style.color !== "var(--verydarkCyan)") {
    button.style.color = "var(--verydarkCyan)";
    button.style.backgroundColor = "var(--activeCyan)";
  }
}
//and function to change button color back to default if not selected
function btnColorToggleOff(button) {
  if (button.style.color == "var(--verydarkCyan)") {
    button.style.color = "var(--verylightgrayishCyan)";
    button.style.backgroundColor = "var(--verydarkCyan)";
  }
}
//Function that updates the tip value to reflect button clicked as a %
for (i of percBtnsArr) {
  (function (i) {
    i.addEventListener("click", () => {
      btnNumContent = Number(i.lastElementChild.textContent);
      btnNumToPerc = btnNumContent / 100;
      btnColorToggleOn(i);
      tip = btnNumToPerc;
      console.log(tip);
      //The below resets tip input field
      tipInput.value = "";
      tipInput.style.textAlign = "center";
      //The below deselects buttons that aren't active
      for (y = 0; y < percBtnsArr.length; y++) {
        if (
          Number(percBtnsArr[y].lastElementChild.textContent) !== btnNumContent
        )
          btnColorToggleOff(percBtnsArr[y]);
      }
    });
  })(i);
}

/////Updates results on change
//function declarations
function updateTipPerPerson(value) {
  document.querySelector(".result1").textContent = value;
}
function updateTotalPerPerson(value) {
  document.querySelector(".result2").textContent = value;
}
function updateAll() {
  //Activate reset button
  if (billRecieved > 0 || tipInput > 0 || numOfPeople > 0) {
    resetBtn.style.color = "var(--verydarkCyan)";
    resetBtn.style.backgroundColor = "var(--strongCyan)";
    resetBtn.disabled = false;
    resetBtn.onmouseover = function () {
      this.style.backgroundColor = "var(--activeCyan)";
    };
    resetBtn.onmouseout = function () {
      this.style.backgroundColor = "var(--strongCyan)";
    };
  }
  //De-activate reset button
  if (bill <= 0 || tip <= 0 || partySize <= 0) {
    resetBtn.style.color = "var(--verydarkCyan)";
    resetBtn.style.backgroundColor = "hsla(182, 43%, 30%, 0.644)";
    resetBtn.disabled = true;
  }
  //calculate results
  if (bill > 0 && tip > 0 && partySize > 0) {
    let tipTotal = bill * tip;
    let tipAmount = tipTotal / partySize;
    updateTipPerPerson(tipAmount.toFixed(2));
    let totalPerPerson = bill / partySize + tipAmount;
    updateTotalPerPerson(totalPerPerson.toFixed(2));
  }
  //Reset Function
  const reset = resetBtn.addEventListener("click", () => {
    billRecieved.value = "";
    bill = 0;
    tip = "";
    tipInput.value = "";
    numOfPeople.value = "";
    partySize = 0;
    tipAmount = 0;
    totalPerPerson = 0;
    tipInput.style.textAlign = "center";
    // resetBtn.style.color =
    updateTipPerPerson(tipAmount.toFixed(2));
    updateTotalPerPerson(totalPerPerson.toFixed(2));
  });
  reset();
}
//Listeners
document.addEventListener("change", () => {
  updateAll();
});
document.addEventListener("click", () => {
  updateAll();
});
