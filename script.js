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
var income = document.querySelector("#income");
var transportCost = document.querySelector("#transportCost");
var foodCost = document.querySelector("#foodCost");
var housingCost = document.querySelector("#housingCost");
var debt = document.querySelector("#debt");
var submit = document.querySelector("#submit");

var time = function () {
  var date = moment().format("MMMM Do YYYY, h:mm:ss a");
  clock.textContent = date;
};
setInterval(time, 1000);

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "us-real-estate.p.rapidapi.com",
    "X-RapidAPI-Key": "",
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
        (prices3.textContent = response.data.home_search.results[2].list_price)(
          // description of the house
          (desc.textContent =
            "Beds " +
            response.data.home_search.results[0].description.beds +
            " Bath " +
            response.data.home_search.results[0].description.baths)
        ),
        (desc2.textContent =
          "Beds " +
          response.data.home_search.results[1].description.beds +
          " Bath " +
          response.data.home_search.results[0].description.baths),
        (desc3.textContent =
          "Beds " +
          response.data.home_search.results[2].description.beds +
          " Bath " +
          response.data.home_search.results[0].description.baths)
      )
    )

    .catch((err) => console.error(err));
}

grabApi();

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
      "X-RapidAPI-Key": "f67cb71206mshc366dc7a6bc7cc6p1e7a9djsn309d42298c5c",
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
