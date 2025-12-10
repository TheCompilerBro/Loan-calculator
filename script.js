document.addEventListener('DOMContentLoaded',()=>{
  const calculateBtn = document.getElementById("calculateBtn");
const amountInput = document.getElementById("amount");
const interestInput = document.getElementById("interest");
const yearsInput =document.getElementById("years");

// loan Summary
const monthlyPayment = document.getElementById("monthly");
const totalPayment = document.getElementById("total");
const totalInterestPayment = document.getElementById("totalInterest");


// Function to Calc the loan 

function calculateLoan(){
     const principle = parseFloat(amountInput.value);
     const interest = parseFloat(interestInput.value)/100/12;
     const payments = parseFloat(yearsInput.value)* 12;

     if(isNaN(principle || isNaN(interest) || isNaN(payments))){
        alert("Please Enter Valid Numbers!!");
        return;
     }
       const x = Math.pow(1+interest,payments);
       const monthly = (principle * x * interest) / (x-1);

       if(isFinite(monthly)){
        const total = monthly * payments;
        const totalInterest = total -principle;

        animateValue(monthlyPayment, 0, monthly,1000);
        animateValue(totalPayment, 0, total,1000);
        animateValue(totalInterestPayment, 0, totalInterest,1000);
       }
       else {
      alert("Please check your numbers");
    }
}

// animation
function animateValue( element , start, end, duration){
    const startTime = performance.now();

    function update(currentTime){
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = start + (end-start)* progress;
        element.textContent = current.toFixed(2);
    
    if (progress < 1){
        requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}


calculateBtn.addEventListener("click", calculateLoan);

});


