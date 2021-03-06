// UI VARS
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

// Load all Events
 loadEventLiseteners();

 function loadEventLiseteners(){
     document.getElementById('loan-form').addEventListener('submit', function(e){
        // Hide Results
        document.getElementById('results').style.display = 'none';
        // Show Loading
        document.getElementById('loading').style.display = 'block';

        setTimeout(calculateResults, 2000);

        e.preventDefault();
     });
 }

 function calculateResults(){
    console.log("calculating ....");
    const principal = parseFloat(amount.value);
    const calculateInterest = parseFloat(interest.value) / 100 /12;
    const calculatePayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1+ calculateInterest, calculatePayments);
    const monthly = (principal*x*calculateInterest)/(x-1);
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatePayments).toFixed(2);
        totalInterest.value = ((monthly*calculatePayments)- principal).toFixed(2);
        // Show results
        document.getElementById('results').style.display = 'block';
        // hide loader
        document.getElementById('loading').style.display = 'none';
    }else{
       showError("Please check your numbers");
    }
    
 }

//  Show Error
 function showError(error){
     // Hid results
     document.getElementById('results').style.display = 'none';
     // hide loader
     document.getElementById('loading').style.display = 'none';
    // Create a div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // create text node and to div
    errorDiv.appendChild(document.createTextNode(error));
 
    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 sec
    setTimeout(clearError, 3000);
 }

//  Clear Error
function clearError(){
    document.querySelector('.alert').remove();
}


