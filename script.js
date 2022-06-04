var clock = document.querySelector("#timer");
var pictures = document.querySelector("#photo");
var pictures2 = document.querySelector("#photo-2");
var pictures3 = document.querySelector("#photo-3");
var prices = document.querySelector("#price");
var prices2 = document.querySelector("#price-2");
var prices3 = document.querySelector("#price-3");
var desc = document.querySelector("#desc");
var desc2 = document.querySelector("#desc-2");
var desc3 = document.querySelector("#desc-3");
var incomeInput = document.querySelector("#income");
var transportCostInput = document.querySelector("#transportCost");
var foodCostInput = document.querySelector("#foodCost");
var housingCostInput = document.querySelector("#housingCost");
var debtInput = document.querySelector("#debt");
var submitTest = document.getElementById("submit1");
var time = function () {
  var date = moment().format("MMMM Do YYYY, h:mm:ss a");
  clock.textContent = date;
};
setInterval(time, 1000);
var estateApi = prompt("Please Enter Estate Api Key");

// submitTest.addEventListener('click', function(event) {
//   event.preventDefault()
//   localStorage.setItem(
//     "income", income.value
//   )
//   localStorage.setItem(
//     "transportCost", transportCost.value
//   )
//   localStorage.setItem(
//     "foodCost", foodCost.value
//   )
//   localStorage.setItem(
//     "housingCost", housingCost.value
//   )
//   localStorage.setItem(
//     "debt", debt.value
//   )
// })

submitTest.addEventListener("click", function (event) {
  event.preventDefault();
  var income = Number(incomeInput.value);
  var transportCost = Number(transportCostInput.value);
  var foodCost = Number(foodCostInput.value);
  var housingCost = Number(housingCostInput.value);
  var debt = Number(debtInput.value);
  var myArray = { income, transportCost, foodCost, housingCost, debt };
  localStorage.setItem("myObj", JSON.stringify(myArray));
  // var budget = income + housingCost
  var cost = transportCost + foodCost + debt;

  var calc = income - cost;
  localStorage.setItem("calc", calc);

  var mortgage = localStorage.getItem(calc);
  grabApi();
});

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "us-real-estate.p.rapidapi.com",
    "X-RapidAPI-Key": estateApi,
  },
};

function grabApi() {
  fetch(
    "https://us-real-estate.p.rapidapi.com/v2/for-sale?offset=0&limit=5&state_code=CO&city=Denver&sort=newest&price_max=500000",
    options
  )
    .then((response) => response.json())
    .then(
      (response) => (
        // console.log(response.data)
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

    .catch((err) => console.error(err));
}

// Calculator
var submitEl = document.getElementById("submit");
var loanBox = document.getElementById("loanAmount");
var interestBox = document.getElementById("interestRate");
var termsBox = document.getElementById("time");
var loan;
var interest30year = 6.146;
var interest15year = 4.817;
var terms;

function grabValues(event) {
  event.preventDefault();
  loan = loanBox.value;
  //interest = interestBox.value;
  //interest = interest/100;
  terms = termsBox.value;
  if (terms === "30-Year") {
    terms = 360;
    interest = interest30year / 100;
  } else if (terms === "15-Year") {
    terms = 180;
    interest = interest15year / 100;
  } else console.log("Something Broke");

  getPayments();
}
function getPayments() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "mortgage-monthly-payment-calculator.p.rapidapi.com",
      "X-RapidAPI-Key": "",
    },
  };

  fetch(
    `https://mortgage-monthly-payment-calculator.p.rapidapi.com/revotek-finance/mortgage/monthly-payment?loanAmount=${loan}&interestRate=${interest}&terms=${terms}`,
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var output = document.getElementById("mortgagePayments");
      var monthlyPayment = data.monthlyPayment;
      monthlyPayment = monthlyPayment.toFixed(2);
      console.log(monthlyPayment);
      output.innermonthlyPayment = "Monthly Payments: " + monthlyPayment;
    });
}
