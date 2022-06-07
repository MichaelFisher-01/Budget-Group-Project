//Global Variabls
  // Clock Variables
    var clock = document.querySelector("#timer");
    var time = function () {
      var date = moment().format("MMMM Do YYYY, h:mm:ss a");
      clock.textContent = date;
    };
    setInterval(time, 1000);
  //RealEstate Variables
    var pictures = document.querySelector("#photo");
    var pictures2 = document.querySelector("#photo-2");
    var pictures3 = document.querySelector("#photo-3");
    var prices = document.querySelector("#price");
    var prices2 = document.querySelector("#price-2");
    var prices3 = document.querySelector("#price-3");
    var desc = document.querySelector("#desc");
    var desc2 = document.querySelector("#desc-2");
    var desc3 = document.querySelector("#desc-3");

    var estateApi = prompt("Please Enter Estate Api Key");

  //Budget Form Variabls
    var incomeInput = document.getElementById("income");
    var transportCostInput = document.getElementById("transportCost");
    var foodCostInput = document.getElementById("foodCost");
    var housingCostInput = document.getElementById("housingCost");
    var debtInput = document.getElementById("debt");
    var submitBudget = document.getElementById("submitBudget");
    var output = document.getElementById("results")
  //Calc Variabls
    var submitEl = document.getElementById("submitMortgageForm")
    var monthlyPayments = document.getElementById("monthlyPayments")
    var termsBox = document.getElementById("time");
    var loan;
    var totalLoan;
    var interest30year = 6.146;
    var interest15year = 4.817;
    var terms;




function budgetCalc(event) {
  event.preventDefault();
  //Grabs income from Monthly Income Box
  var income = Number(incomeInput.value);
  console.log(income);
  //Grabs value from Monthly Transport Box
  var transportCost = Number(transportCostInput.value);
  console.log(transportCost);
  //Grabs value from the Monthly Food Box
  var foodCost = Number(foodCostInput.value);
  console.log(foodCost);
  //Grabs vallue from the Monthyl Housing Cost
  var housingCost = Number(housingCostInput.value);
  console.log(housingCost);
  //Grabs value from the Outstanding Debts box
  var debt = Number(debtInput.value);
  console.log(debt);
  //Creates an income array to store all the grabbed values.
  var myArray = { income, transportCost, foodCost, housingCost, debt };
  //Stores income array to localStorage
  localStorage.setItem("myObj", JSON.stringify(myArray));
  // var budget = income + housingCost
  var cost = transportCost + foodCost + debt;
  var budgetAmount = income - cost;
  var textEl = document.createElement('p');
  textEl.innerText = "Budget Amount: " + budgetAmount;
  output.appendChild(textEl);
  localStorage.setItem("budgetAmount", budgetAmount);
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "us-real-estate.p.rapidapi.com",
    "X-RapidAPI-Key": "c5b7953215mshccf595d59612252p1e61c9jsnde0627c08536",
    "X-RapidAPI-Key": estateApi,
  },
};

function grabHomeOptions(loanAmount) {
  fetch(
    `https://us-real-estate.p.rapidapi.com/v2/for-sale?offset=0&limit=5&state_code=CO&city=Denver&sort=newest&price_max=${loanAmount}`,
    options
  )
    .then((response) => response.json())
    .then(
      (response) => (
        console.log(response.data)
        //taking the Json data and displaying the picture of the house
        (pictures.src =
          response.data.home_search.results[0].primary_photo.href),
        (pictures2.src =
          response.data.home_search.results[1].primary_photo.href),
        (pictures3.src =
          response.data.home_search.results[2].primary_photo.href),
        //taking the Json data and displaying the median
        (prices.textContent = response.data.home_search.results[0].list_price),
        (prices2.textContent = response.data.home_search.results[1].list_price),
        (prices3.textContent = response.data.home_search.results[2].list_price),
        // description of the house
        (desc.textContent =
          "Beds " +
          response.data.home_search.results[0].description.beds +
          " Bath " +
          response.data.home_search.results[0].description.baths),
        (desc2.textContent =
          "Beds " +
          response.data.home_search.results[1].description.beds +
          " Bath " +
          response.data.home_search.results[1].description.baths),
        (desc3.textContent =
          "Beds " +
          response.data.home_search.results[2].description.beds +
          " Bath " +
          response.data.home_search.results[0].description.baths)
      )
    )
}

//Calculator
/*var submitEl = document.getElementById("submitMortgageForm")
var monthlyPayments = document.getElementById("monthlyPayments")
var termsBox = document.getElementById("time");
var loan;
var totalLoan;
var interest30year = 6.146;
var interest15year = 4.817;
var terms; */


//Mortgage Calculator Functions
function grabValues (event) {
    event.preventDefault();
    //obtains the value of the monthly payments
        loan = monthlyPayments.value;
    //obtains the length of the loan from a drop down selection.
        terms = termsBox.value;
        //translate the length into the interest rate and gets the number of months.
        if (terms === "30-Year"){
            terms = 360;
            interest = interest30year;
        }
        else if (terms === "15-Year"){
            terms = 180;
            interest=interest15year;
        }
        else 
        console.log("Something Broke");

getLoan()
}
function getLoan () {
  //Required info for the mortgage calculations
  const apiKey = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Host': 'yawin-calculator.p.rapidapi.com',
      'X-RapidAPI-Key': 'f67cb71206mshc366dc7a6bc7cc6p1e7a9djsn309d42298c5c'
    },
    body: `{"interest":${interest},"duration":${terms},"emi":${loan},"firstMonth":"2021-Jan","paginationPageNumber":"1","paginationPageSize":"12","ignoreSchedule":false}`
  };
  //send off the required info and retrieving the mortgage information
  fetch('https://yawin-calculator.p.rapidapi.com/loanamountcalculator', apiKey)
      .then(function(response) {
        //converting into a JSON so we can pull info
          return response.json(); 
      })
      .then(function (data){
          //Grabbing a location to output the loan amount.
          var textEl = document.createElement('p');
          var totalLoan = data.amount;
          textEl.innerText= "Estimated Loan Amount: " + totalLoan;
          //pasting the loan amount to the webpage.
          output.appendChild(textEl);
          //grabHomeOptions(totalLoan); Commented out so we dont use to many APIgrabs.
      }) 
  
  }

  //Event Listeners
  
  //Submits the Budget Form
  submitBudget.addEventListener("click", budgetCalc);
  //Used to submit Mortgage Calculator Form
  submitEl.addEventListener("click", grabValues);
  //Used to Enable drop down menus on the website
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, options);
  });

