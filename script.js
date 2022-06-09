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
    var stateCodeEl = document.getElementById("stateCode");
    var cityNameEl = document.getElementById("cityName");
//Generating the last search from localStorage or creating the localStorage for recentSearch
    var recentSearch = localStorage.getItem("recentSearch") || []; 
    var house1Link = document.getElementById("house1Link");
    console.log(house1Link);
    var house2Link = document.getElementById("house2Link");
    var house3Link = document.getElementById("house3Link");
    var estateApi = prompt("Please Enter Estate Api Key");

//Budget Form Variabls
    var incomeInput = document.getElementById("income");
    var transportCostInput = document.getElementById("transportCost");
    var foodCostInput = document.getElementById("foodCost");
    var housingCostInput = document.getElementById("housingCost");
    var debtInput = document.getElementById("debt");
    var submitBudget = document.getElementById("submitBudget");
    var output = document.getElementById("results")
    var budgetCounter = 0;
  
//Loan Calc Variabls
    var submitEl = document.getElementById("submitMortgageForm")
    var monthlyPayments = document.getElementById("monthlyPayments")
    var termsBox = document.getElementById("time");
    var loan;
    var totalLoan;
    var interest30year = 6.146;
    var interest15year = 4.817;
    var terms;
    var loanCounter = 0;
    var btnEl = document.createElement('button');
    btnEl.setAttribute('id', "getHousingBtn")
    btnEl.setAttribute('type', "button")
    btnEl.innerText = "Search For Homes" ;

// Page Setup
  loadSearch();
    

//Function for Budget
function budgetCalc(event) {
  event.preventDefault();
//Grabs income from Monthly Income Box
  var income = Number(incomeInput.value);
//Grabs value from Monthly Transport Box
  var transportCost = Number(transportCostInput.value);
//Grabs value from the Monthly Food Box
  var foodCost = Number(foodCostInput.value);
//Grabs vallue from the Monthyl Housing Cost
  var housingCost = Number(housingCostInput.value);
//Grabs value from the Outstanding Debts box
  var debt = Number(debtInput.value);
//Creates an income array to store all the grabbed values.
  var myArray = { income, transportCost, foodCost, housingCost, debt };
//Stores income array to localStorage
  localStorage.setItem("myObj", JSON.stringify(myArray));
// var budget = income + housingCost
  var cost = transportCost + foodCost + debt;
  var budgetAmount = income - cost;
  budgetAmount = budgetAmount.toLocaleString("en-US");
  var textEl = document.createElement('p');
  textEl.setAttribute('id', "budgetAmount");
  if (budgetCounter === 0){
    textEl.innerText = "Budget Amount: $" + budgetAmount;
    output.appendChild(textEl);
    localStorage.setItem("budgetAmount", budgetAmount);
    budgetCounter++;
  }
  else {
    var updater = document.getElementById("budgetAmount");
    updater.innerText = "Budget Amount: $" + budgetAmount;
  }
};


// Function for get House Data
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "us-real-estate.p.rapidapi.com",
    "X-RapidAPI-Key": estateApi,
  },
};

function grabHomeOptions() {
  console.log("https://us-real-estate.p.rapidapi.com/v2/for-sale?offset=0&limit=5&state_code="+stateCode+"&city="+cityName+"&sort=newest&price_max="+totalLoan)
  fetch(
    "https://us-real-estate.p.rapidapi.com/v2/for-sale?offset=0&limit=5&state_code="+stateCode+"&city="+cityName+"&sort=newest&price_max="+totalLoan,
    options
  )
    .then((response) => response.json())
    .then((response) => (
        (localStorage.setItem('recentSearch', JSON.stringify(response))),
        (
          //taking the Json data and displaying the picture of the house
          pictures.src =
            response.data.home_search.results[0].primary_photo.href
        ),
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
          response.data.home_search.results[2].description.baths)
      )
    );
}

//function to load the most recent search.
function loadSearch () {
  console.log("Running loadSearch");
  var data = JSON.parse(localStorage.getItem("recentSearch"));
  if (recentSearch.length === 0){
    console.log("No previous search data");
  }
  else {
    var priceData1;
    var priceData2;
    var priceData3;
    pictures.src = data.data.home_search.results[0].primary_photo.href;
    pictures2.src = data.data.home_search.results[1].primary_photo.href;
    pictures3.src = data.data.home_search.results[2].primary_photo.href;
    priceData1 = data.data.home_search.results[0].list_price;
    priceData1 = priceData1.toLocaleString("en-US");
    prices.textContent = "$" + priceData1;
    priceData2 = data.data.home_search.results[1].list_price;
    priceData2 = priceData2.toLocaleString("en-US");
    prices2.textContent = "$"+ priceData2;
    priceData3 = data.data.home_search.results[2].list_price;
    priceData3 = priceData3.toLocaleString("en-US");
    prices3.textContent = "$" + priceData3;
    desc.textContent =
      "Beds " + data.data.home_search.results[0].description.beds +
      " Bath " + data.data.home_search.results[0].description.baths;
    desc2.textContent =
      "Beds " +
      data.data.home_search.results[1].description.beds +
      " Bath " +
      data.data.home_search.results[1].description.baths;
    desc3.textContent =
      "Beds " +
      data.data.home_search.results[2].description.beds +
      " Bath " +
      data.data.home_search.results[2].description.baths;

      var link1 = data.data.home_search.results[0].property_id;
      var link2 = data.data.home_search.results[1].property_id;
      var link3 = data.data.home_search.results[2].property_id;
    
      house1Link.href = "https://www.realtor.com/realestateandhomes-detail/M"+link1;
      console.log("https://www.realtor.com/realestateandhomes-detail/M"+link1);
      house2Link.href =`https://www.realtor.com/realestateandhomes-detail/M"+${link2}`;
      house3Link.href = `https://www.realtor.com/realestateandhomes-detail/M"+${link3}`;
  }
}

//Function for Mortgage Calculator
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
      stateCode = stateCodeEl.value;
      cityName = cityNameEl.value;
      
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
          textEl.setAttribute("id", "loanAmount")
          totalLoan = data.amount;
          //totalLoan = totalLoan.toLocaleString("en-US");
          textEl.innerText = "Estimated Loan Amount: $" + totalLoan;
          
          
          //pasting the loan amount to the webpage.
          if (loanCounter === 0){
            textEl.innerText = "Estimated Loan Amount: $" + totalLoan;
            output.appendChild(textEl);
            output.appendChild(btnEl);
            loanCounter++;
          }
          else {
            var updater = document.getElementById("loanAmount");
            updater.innerText = "Estimated Loan Amount: $" + totalLoan;
          }
      }) 
  
  }


  //Event Listeners
    
  //Submits the Budget Form
  submitBudget.addEventListener("click", budgetCalc);
  //Used to submit Mortgage Calculator Form
  submitEl.addEventListener("click", grabValues);
  //Pulls housing data based on the Esitmated Loan Amount
  btnEl.addEventListener("click",grabHomeOptions);
  //Used to Enable drop down menus on the website
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, options);
  });

