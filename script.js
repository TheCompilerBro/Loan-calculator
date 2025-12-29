document.addEventListener('DOMContentLoaded',()=>{
  const calculateBtn = document.getElementById("calculateBtn");
const amountInput = document.getElementById("amount");
const interestInput = document.getElementById("interest");
const yearsInput =document.getElementById("years");

// resetBtn
const resetBtn =document.getElementById("resetBtn");
const resetBtnFd =document.getElementById("resetBtnFd");

// Toggle sections
document.getElementById("showLoan").onclick = () => {
  loanSection.classList.remove("hidden");
  fdSection.classList.add("hidden");
};

document.getElementById("showFD").onclick = () => {
  fdSection.classList.remove("hidden");
  loanSection.classList.add("hidden");
};


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
 // RESET BUTTON FUNCTION
document.getElementById("resetBtn").addEventListener("click", function () {
    // Clear all inputs
    document.getElementById("amount").value = "";
    document.getElementById("interest").value = "";
    document.getElementById("years").value = "";

    // Reset result values
    document.getElementById("monthly").textContent = "₹ 0.00";
    document.getElementById("total").textContent = "₹ 0.00";
    document.getElementById("totalInterest").textContent = "₹ 0.00";
    

     
    
});
document.getElementById("resetBtnFd").addEventListener("click", function () {
    // Clear all inputs

    document.getElementById("fdAmount").value = "";
    document.getElementById("fdRate").value = "";
    document.getElementById("fdYears").value = "";
    // document.getElementById("fdFrequency").value = "Yearly";

    // Reset result value
    document.getElementById("fdMaturity").textContent = "₹ 0.00";
  document.getElementById("fdInterest").textContent = "₹ 0.00";
    

     
    
});

// fd
function calculateFD() {
  const P = parseFloat(document.getElementById("fdAmount").value);
  const R = parseFloat(document.getElementById("fdRate").value) / 100;
  const T = parseFloat(document.getElementById("fdYears").value);
  const N = parseInt(document.getElementById("fdFrequency").value);

  if (isNaN(P) || isNaN(R) || isNaN(T)) {
    alert("Please enter valid values");
    return;
  }

  const maturity = P * Math.pow(1 + R / N, N * T);
  const interest = maturity - P;

  document.getElementById("fdMaturity").textContent = `₹ ${maturity.toFixed(2)}`;
  document.getElementById("fdInterest").textContent = `₹ ${interest.toFixed(2)}`;


  animateValue(fdMaturity, 0, maturity,1000);
  animateValue(fdInterest, 0, interest,1000);

}
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
fdCalculateBtn.addEventListener("click", calculateFD);



});


