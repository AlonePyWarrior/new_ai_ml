// const houseData = [
//     { distance: 0.5, price: 7800 },
//     { distance: 1.2, price: 7250 },
//     { distance: 2.0, price: 6800 },
//     { distance: 2.5, price: 6400 },
//     { distance: 3.0, price: 6100 },
//     { distance: 3.5, price: 5800 },
//     { distance: 4.0, price: 5500 },
//     { distance: 4.5, price: 5200 },
//     { distance: 5.0, price: 4900 },
//     { distance: 5.5, price: 4600 },
//     { distance: 6.0, price: 4300 },
//     { distance: 6.5, price: 4000 },
//     { distance: 7.0, price: 3700 },
//     { distance: 7.5, price: 3400 },
//     { distance: 8.0, price: 3100 },
//     { distance: 8.5, price: 2800 },
//     { distance: 9.0, price: 2500 },
//     { distance: 9.5, price: 2300 }, 
//     { distance: 10.0, price: 2200 }, 
//     { distance: 11.0, price: 2100 }, 
//     { distance: 12.0, price: 2000 }, 
//     { distance: 13.0, price: 1900 },
//     { distance: 14.0, price: 1800 },
//     { distance: 15.0, price: 1700 }, 
//     { distance: 16.0, price: 1600 },
//     { distance: 17.0, price: 1500 },
//     { distance: 18.0, price: 1400 },
//     { distance: 19.0, price: 1300 },
//     { distance: 20.0, price: 1200 },
//     { distance: 21.0, price: 1100 },
//     { distance: 22.0, price: 1000 }, 
//     { distance: 23.0, price: 900 },
//   ];


// // Grid Options: Contains all of the Data Grid configurations


// // Get Input Elements and Chart Context
// const slopeInput = document.getElementById("slope");
// const interceptInput = document.getElementById("intercept");
// const ctx = document.getElementById('scatterPlot').getContext('2d');

// // Generate Random Initial Values for Slope and Intercept
// const initialSlope = -Math.floor(Math.random() * 10) - 10; // Range: -150 to -50
// const initialIntercept = Math.floor(Math.random() * 4000) + 4000; // Range: 4000 to 8000

// slopeInput.value = initialSlope;
// interceptInput.value = initialIntercept;

// // Create
// // Create Initial Scatter Plot
// let scatterChart = new Chart(ctx, {
//     type: 'scatter',
//     data: {
//         datasets: [{
//           label: 'House Prices',
//           data: houseData.map(d => ({ x: d.distance, y: d.price })), // Price not scaled
//           backgroundColor: 'rgba(0, 0, 255, 0.5)',
//           pointRadius: 5
//         }, {
//           type: 'line',
//           label: 'Regression Line',
//           data: [], 
//           borderColor: 'rgb(255, 99, 132)',
//           borderWidth: 2,
//           fill: false,
//           tension: 0,
//           pointRadius: 0
//         }]
//       },
//     options: {
//         plugins: {
//             title: {
//               display: true,
//               text: 'Relationship between Distance from City Center and House Price',
//             },
//           }, 
          
//           scales: {
//             x: {
//               type: 'linear',
//               position: 'bottom',
//               title: {
//                 display: true,
//                 text: 'Distance from City Center (km)'
//               },
//               min: 0, // Start at 0 km
//               max: 26, // Maximum distance of 10 km
//               grid: {
//                 display: false  // This hides the x-axis gridlines
//               },
//               ticks: {
//                 stepSize: 7 // Adjust this to control the spacing of the y-axis labels
//               }
//             },
//             y: {
//               title: {
//                 display: true,
//                 text: 'Price (in thousands)'
//               },
//               min: 0, // Start at 0 km
//               max: 8000, // Maximum distance of 10 km
//               grid: {
//                 display: false  // This hides the y-axis gridlines
//               },
//               ticks: {
//                 stepSize: 500 // Adjust this to control the spacing of the y-axis labels
//               }
//             }
//           }
        
        
//     },
    
    
// });

// // Update Chart on Input Change
// function updateRegressionLine() {
//     const m = parseFloat(slopeInput.value);
//     const b = parseFloat(interceptInput.value);
    
//     scatterChart.data.datasets[1].data = [
//       { x: 0, y: b },
//       { x: 26, y: 26 * m + b }
//     ];
//     scatterChart.update();
//   }
  
//   slopeInput.addEventListener("input", updateRegressionLine);
//   interceptInput.addEventListener("input", updateRegressionLine);
  
//   // Initial Plot (Call updateRegressionLine to use random values)
//   updateRegressionLine();



function guessPrice() {
  const location = document.getElementById('location').value;
  const bedrooms = parseInt(document.getElementById('bedrooms').value);
  const garage = document.getElementById('garage').checked;

  let price = 0;

  if (location === 'city') {
    price += 5;
    if (bedrooms === 2) {
      price += 2;
    }
    if (garage) {
      price += 1;
    }
  } else {
    price += 3;
    if (bedrooms === 2) {
      price += 1.5;
    }
    if (garage) {
      price += 0.8;
    }
  }

  document.getElementById('appResult').innerText = price;

}




// code for playing pronounce help voices
const voices = document.querySelectorAll(".voice");

for (let index = 0; index < voices.length; index++) {
  voices[index].addEventListener("click", ()=>{
    const voiceName = voices[index].dataset.pronons;
    const audio = new Audio(`../sounds/${voiceName}.mp3`);
    audio.play();
  });
  
}

// code for multi step dialog box explanations
const container = document.querySelector('.multi-step-text');
const children = Array.from(document.querySelectorAll('.text-step'));
let currentDivIndex = 0;

function showDiv(index) {
    children[currentDivIndex].classList.remove('active');
    currentDivIndex = index;
    children[currentDivIndex].classList.add('active');
}

document.getElementById('prevBtn').addEventListener('click', () => {
  if(currentDivIndex !== 0){
    showDiv((currentDivIndex - 1 + children.length) % children.length);
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  if(currentDivIndex !== children.length-1){
    showDiv((currentDivIndex + 1) % children.length);
  }  
});

// Initially show the first div
showDiv(currentDivIndex);




