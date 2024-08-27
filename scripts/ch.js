const houseData = [
    { x: 0.5, y: 7800 },
    { x: 1.2, y: 7250 },
    { x: 2.0, y: 6350 },
    { x: 2.5, y: 6900 },
    { x: 3.0, y: 5300 },
    { x: 3.5, y: 7000 },
    { x: 4.0, y: 5700 },
    { x: 4.5, y: 4800 },
    { x: 5.0, y: 5550 },
    { x: 5.5, y: 3200 },
    { x: 6.5, y: 6100 },
    { x: 6.7, y: 3400 },
    { x: 7.0, y: 4000 },
    { x: 7.5, y: 2800 },
    { x: 8.0, y: 4000 },
    { x: 8.5, y: 2400 },
    { x: 9.0, y: 3800 },
    { x: 9.5, y: 1900 }, 
    { x: 10.0, y: 2400 }, 
    { x: 11.0, y: 2100 }, 
    { x: 12.0, y: 1800 },
    { x: 13.0, y: 1600 }, 
    
];


// // Grid Options: Contains all of the Data Grid configurations


// // Get Input Elements and Chart Context
// const slopeInput = document.getElementById("slope");
// const interceptInput = document.getElementById("intercept");
// const ctx = document.getElementById('scatterPlot').getContext('2d');

// // Generate Random Initial Values for Slope and Intercept
// // const initialSlope = -Math.floor(Math.random() * 10) - 10; // Range: -150 to -50
// // const initialIntercept = Math.floor(Math.random() * 4000) + 4000; // Range: 4000 to 8000

// const initialSlope = -515.41;
// const initialIntercept = 7659;

// slopeInput.value = initialSlope;
// interceptInput.value = initialIntercept;

// // Create
// // Create Initial Scatter Plot
// let scatterChart = new Chart(ctx, {
//     type: 'scatter',
//     data: {
//         datasets: [{
//           label: 'قیمت خانه ها',
//           data: houseData.map(d => ({ x: d.distance, y: d.price })), // Price not scaled
//           backgroundColor: 'rgba(0, 0, 255, 0.5)',
//           pointRadius: 5
//         }, {
//           type: 'line',
//           label: 'خط رگرسیون',
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
//               text: 'نمدار رابطه بین فاصله از مرکز شهر و قیمت اجاره آپارتمان',
//             },
//           }, 
          
//           scales: {
//             x: {
//               type: 'linear',
//               position: 'bottom',
//               title: {
//                 display: true,
//                 text: 'فاصله از مرکز شهر (km)'
//               },
//               min: 0, // Start at 0 km
//               max: 14, // Maximum distance of 10 km
//               grid: {
//                 display: false  // This hides the x-axis gridlines
//               },
//               ticks: {
//                 stepSize: 1 // Adjust this to control the spacing of the y-axis labels
//               }
//             },
//             y: {
//               title: {
//                 display: true,
//                 text: 'قیمت اجاره بها (به دلار)'
//               },
//               min: 0, // Start at 0 km
//               max: 9000, // Maximum distance of 10 km
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


Chart.defaults.font.family = 'ModamVF'; 
// Class to encapsulate chart functionality
class RegressionChart {
  constructor(chartConfigOBJ, data, default_line_values,) {
    this.chartConfigOBJ = chartConfigOBJ;
    this.ctx = document.getElementById(this.chartConfigOBJ["canvasId"]).getContext('2d');
    this.data = data;
    this.slopeInput = document.getElementById(this.chartConfigOBJ["slope"]);
    this.interceptInput = document.getElementById(this.chartConfigOBJ["intercept"]);
    this.chart = this.createChart();
    

    // Event listeners for input changes
    this.slopeInput.addEventListener("input", this.updateRegressionLine.bind(this));
    this.interceptInput.addEventListener("input", this.updateRegressionLine.bind(this));

   this.initialSlope = default_line_values["m"];
   this.initialIntercept = default_line_values["b"];
   this.firstLoad = true;
    // Initial plot with default values
    this.updateRegressionLine();
  }

  createChart() {
    return new Chart(this.ctx, {
      type: 'scatter',
      data: {
        datasets: [
          this.createScatterDataset(),
          this.createLineDataset(),
          this.createCroosXDataset(),
          this.createCroosYDataset(),

        ]
      },
      options: {
        aspectRatio: 1.2,
        plugins: {
          title: {
            display: true,
            text: this.chartConfigOBJ['chartTitle'],
          },
        },

        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: this.chartConfigOBJ['xAxisText'],
            },
            min: 0, // Start at 0 km
            max: this.chartConfigOBJ["xMax"], // Maximum distance of 10 km
            grid: {
              display: false  // This hides the x-axis gridlines
            },
            ticks: {
              stepSize: this.chartConfigOBJ['xStepSize'] // Adjust this to control the spacing of the y-axis labels
            }
          },
          y: {
            title: {
              display: true,
              text: this.chartConfigOBJ['yAxisText'],
            },
            min: 0, // Start at 0 km
            max: this.chartConfigOBJ["yMax"], // Maximum distance of 10 km
            grid: {
              display: false  // This hides the y-axis gridlines
            },
            ticks: {
              stepSize: this.chartConfigOBJ['yStepSize'] // Adjust this to control the spacing of the y-axis labels
            }
          }
        },
        onHover: (event) => {
          this.chart.options.scales.x.grid.display = true; // Show X grid lines on hover
          this.chart.options.scales.y.grid.display = true; // Show Y grid lines on hover
          this.chart.update(); // Update the chart to reflect the changes
        },
      },
    });
  }

  createScatterDataset() {
    return {
      label: this.chartConfigOBJ['yLabel'],
      data: this.data.map(d => ({ x: d.x, y: d.y })),
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
      pointRadius: 5
    };
  }

  createLineDataset() {
    return {
      type: 'line',
      label: this.chartConfigOBJ['regressionLabel'],
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      tension: 0,
      pointRadius: 0
    };
  }
  createCroosXDataset(){
    return {
      type: 'line',
      label: 'میانگین x',
      data: [],
      borderColor: 'rgb(255, 99, 132, 0.4)',
      borderWidth: 2,
      fill: false,
      tension: 0,
      pointRadius: 0
    };
  }
  createCroosYDataset(){
    return {
      type: 'line',
      label: 'میانگین y',
      data: [],
      borderColor: 'rgb(255, 99, 132, 0.4)',
      borderWidth: 2,
      fill: false,
      tension: 0,
      pointRadius: 0
    };
  }

  updateRegressionLine() {
    let m,b;
    if (this.firstLoad){
      m = this.initialSlope;
      b = this.initialIntercept;
      this.firstLoad = false;
      
    }else{
      m = parseFloat(this.slopeInput.value);
      b = parseFloat(this.interceptInput.value);
    }
    this.chart.data.datasets[1].data = [
      { x: 0, y: b },
      { x: 26, y: 26 * m + b }
    ];
    this.chart.update();
  }

  



  drawMeanCrsossLine(){
    this.chart.data.datasets[2].data = [
      { x: 1229, y: 0 },
      { x: 1229, y: 7000 }
    ];
    this.chart.data.datasets[3].data = [
      { x: 2500, y: 3431 },
      { x: 0, y: 3431 }
    ];
    this.chart.update();
  }
}

const firstChartElementSelectors = {
  "canvasId": "scatterPlot",
  "slope": "slope",
  "intercept": "intercept",
  "xMax": 14,
  "yMax": 9000,
  "xStepSize": 1,
  "yStepSize": 500,
  "xAxisText": 'فاصله از مرکز شهر(km)',
  "yAxisText": 'قیمت اجاره بها(به دلار)',
  "regressionLabel": 'خط رگرسیون',
  "yLabel": 'قیمت اجاره بها',
  "chartTitle": 'نمودار رابطه بین فاصله از مرکز شهر و قیمت اجاره آپارتمان'

}


const firstChartElementSelectors2 = {
  "canvasId": "scatterPlot2",
  "slope": "slope2",
  "intercept": "intercept2",
  "xMax": 14,
  "yMax": 9000,
  "xStepSize": 1,
  "yStepSize": 500,
  "xAxisText": 'فاصله از مرکز شهر(km)',
  "yAxisText": 'قیمت اجاره بها(به دلار)',
  "regressionLabel": 'خط رگرسیون',
  "yLabel": 'قیمت اجاره بها',
  "chartTitle": 'نمودار رابطه بین فاصله از مرکز شهر و قیمت اجاره آپارتمان'

}
// const initialIntercept = 7659;
const regressionChart = new RegressionChart(firstChartElementSelectors, houseData, {"m":-515.41, "b":7659});
const regressionChart2 = new RegressionChart(firstChartElementSelectors2, houseData, {"m":-515.41, "b":7659});




// preprocesing unit table
// Raw data
const data = `# قیراط برش رنگ شفافیت عمق سطح قیمت X Y Z
1 0.30 Good J SI1 64.0 55 339 4.25 4.28 2.73
2 0.41 Ideal I si1 61.7 55 561 4.77 4.80 2.95
3 0.75 VeryGood D SI1 63.2 56 2,760 5.80 5.75 3.65
4 0.91 - H SI2 - 60 2,763 6.03 5.99 3.95
5 1.20 Fair F I1 64.6 56 2,809 6.73 6.66 4.33
6 1.21 Good E I1 57.2 62 3,144 7.01 6.96 3.99
7 1.31 Premium J SI2 59.7 59 3,697 7.06 7.01 4.20
8 1.50 Premium H I1 62.9 60 4,022 7.31 7.22 4.57
9 1.74 VeryGood H i1 63.2 55 4,677 7.62 7.59 4.80
10 1.83 fair J I1 70.0 58 5,083 7.34 7.28 5.12
11 1.96 Fair I I1 66.8 55 6,147 7.62 7.60 5.08
12 - Premium H i1 62.2 - 6,535 8.31 - 5.16 `;


class TableGenerator {
  constructor(data, tableId = "diamond-table-remove", tableClass = "table rtl small-table-text diamond-table-remove") {
    this.data = data;
    this.tableId = tableId;
    this.tableClass = tableClass;
  }

  generateTable() {
    const rows = this.data.split('\n');
    const headers = rows[0].split(' ');

    const table = document.createElement('table');
    table.className = this.tableClass;
    table.id = this.tableId;

    // Create header row
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    // Create data rows
    const tbody = table.createTBody();
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i].split(' ');
      const row = tbody.insertRow();
      values.forEach(value => {
        const cell = row.insertCell();
        cell.textContent = value;
      });
    }

    return table;
  }
}

class RowRemover {
  constructor(tableId, rowsToRemove = [4, 12]) {
    this.tableId = tableId;
    this.rowsToRemove = rowsToRemove;
  }

  removeRowsWithAnimation(event) {
    const table = document.getElementById(this.tableId);
    const tbody = table.querySelector("tbody");
    if (tbody.querySelectorAll("tr").length >= 11) {
      this.rowsToRemove.forEach(rowNumber => {
        const row = table.querySelector(`tr:nth-child(${rowNumber})`);
        if (row) {
          row.style.transition = 'opacity 0.7s ease-out';
          row.style.opacity = 0;
          setTimeout(() => row.remove(), 700);
        }
      });
      table.classList.remove("diamond-table-remove"); // Remove bg red
      event.target.disabled = true; // Disable button
    }
  }
}


class FieldCapitalizer {
  constructor(tableId, colsToCapitalize = {2:[4],9:[4],10:[2],12:[4]}) {
    this.tableId = tableId;
    this.colsToCapitalize = colsToCapitalize;
  }

  fieldCapitalizeWithAnimation(event) {
    const table = document.getElementById(this.tableId);
    const tbody = table.querySelector("tbody");
    let col;
    for (const row in this.colsToCapitalize) {
      for(const fieldIdex of this.colsToCapitalize[row]){
        col = tbody.querySelector(`tr:nth-child(${parseInt(row)}) td:nth-child(${fieldIdex+1})`);
        console.log(col.innerHTML)
        const text = col.textContent;
        // console.log(row,fieldIndex);
        const capitalized = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        col.textContent = capitalized;
        col.style.transition = 'opacity 0.7s ease-out';
        col.style.backgroundColor = "green";
        col.style.border = "2px solid var(--dark)";
      }
      
    }
    event.target.disabled = true;
    }
    
  
}



// Usage
const tableGenerator = new TableGenerator(data);
const table = tableGenerator.generateTable();

const tableContainer = document.getElementById('tableContainer');
tableContainer.insertBefore(table, tableContainer.querySelector("div"));

const rowRemover = new RowRemover("diamond-table-remove"); // Use the correct table ID
const removeRowsButton = document.getElementById('removeRowsButton');
removeRowsButton.addEventListener('click', rowRemover.removeRowsWithAnimation.bind(rowRemover)); 


const tableGenerator2 = new TableGenerator(data, "diamond-table-mean");
const table2 = tableGenerator2.generateTable();

const tableContainer2 = document.getElementById('tableContainer2');
tableContainer2.append(table2);


const tableGenerator3 = new TableGenerator(data, "diamond-table-median");
const table3 = tableGenerator3.generateTable();

const tableContainer3 = document.getElementById('tableContainer3');
tableContainer3.append(table3);



const tableGenerator4 = new TableGenerator(data, "diamond-table-mode");
const table4 = tableGenerator4.generateTable();

const tableContainer4 = document.getElementById('tableContainer4');
tableContainer4.append(table4);


const tableGenerator5 = new TableGenerator(data, "diamond-table-knn");
const table5 = tableGenerator5.generateTable();

const tableContainer5 = document.getElementById('tableContainer5');
tableContainer5.append(table5);




// FieldCapitalizer

const tableGenerator6 = new TableGenerator(data, "diamond-table-cap");
const table6 = tableGenerator6.generateTable();

const tableContainer6 = document.getElementById('tableContainer6');
tableContainer6.insertBefore(table6, tableContainer6.querySelector("div"));
const fielCapitalizer = new FieldCapitalizer("diamond-table-cap"); // Use the correct table ID
const capitalizeFieldsButton = document.getElementById('capitizeColsButton');
capitalizeFieldsButton.addEventListener('click', fielCapitalizer.fieldCapitalizeWithAnimation.bind(fielCapitalizer)); 






// diamond data
const diamondData = [
  {
      "x": "0.30",
      "y": 339
  },
  {
      "x": "0.41",
      "y": 561
  },
  {
      "x": "0.75",
      "y": 2760
  },
  {
      "x": "0.91",
      "y": 2763
  },
  {
      "x": "1.20",
      "y": 2809
  },
  {
      "x": "1.31",
      "y": 3697
  },
  {
      "x": "1.50",
      "y": 4022
  },
  {
      "x": "1.74",
      "y": 4677
  },
  {
      "x": "1.96",
      "y": 6147
  },
  {
    "x": "2.21",
    "y": 6535
}
]


const diamondChartConfig1 = {
  "canvasId": "diamondPricePlot1",
  "slope": "diamondPricePlot1Slope",
  "intercept": "diamondPricePlot1Intercept",
  "xMax": 2.5,
  "yMax": 7000,
  "xStepSize": 0.25,
  "yStepSize": 1000,
  "xAxisText": 'قیراط',
  "yAxisText": 'قیمت',
  "regressionLabel": 'خط رگرسیون',
  "yLabel": 'قیمت ',
  "chartTitle": 'نمودار پراکندگی قیراط و داده های قیمت'

}
// const initialIntercept = 7659;
const diamondRegressionChart1 = new RegressionChart(diamondChartConfig1, diamondData, {"m":0, "b":0});




// scaled x diamond data
const diamondScaledData = [
  {
      "x": "300",
      "y": 339
  },
  {
      "x": "410",
      "y": 561
  },
  {
      "x": "750",
      "y": 2760
  },
  {
      "x": "910",
      "y": 2763
  },
  {
      "x": "1200",
      "y": 2809
  },
  {
      "x": "1310",
      "y": 3697
  },
  {
      "x": "1500",
      "y": 4022
  },
  {
      "x": "1740",
      "y": 4677
  },
  {
      "x": "1960",
      "y": 6147
  },
  {
    "x": "2210",
    "y": 6535
}
]
const diamondChartConfig2 = {
  "canvasId": "diamondPricePlot2",
  "slope": "diamondPricePlot2Slope",
  "intercept": "diamondPricePlot2Intercept",
  "xMax": 2500,
  "yMax": 7000,
  "xStepSize": 250,
  "yStepSize": 1000,
  "xAxisText": 'قیراط',
  "yAxisText": 'قیمت',
  "regressionLabel": 'خط رگرسیون',
  "yLabel": 'قیمت ',
  "chartTitle": 'نمودار پراکندگی قیراط و داده های قیمت'

}

const diamondRegressionChart2 = new RegressionChart(diamondChartConfig2, diamondScaledData, {"m":0, "b":0});



const diamondChartConfig3 = {
  "canvasId": "diamondPricePlot3",
  "slope": "diamondPricePlot3Slope",
  "intercept": "diamondPricePlot3Intercept",
  "xMax": 2500,
  "yMax": 7000,
  "xStepSize": 250,
  "yStepSize": 1000,
  "xAxisText": 'قیراط',
  "yAxisText": 'قیمت',
  "regressionLabel": 'خط رگرسیون',
  "yLabel": 'قیمت ',
  "chartTitle": 'نمودار پراکندگی قیراط و داده های قیمت'

}
const diamondRegressionChart3 = new RegressionChart(diamondChartConfig3, diamondScaledData, {"m":0, "b":0});

diamondRegressionChart3.drawMeanCrsossLine();



const diamondChartConfig4 = {
  "canvasId": "diamondPricePlot4",
  "slope": "diamondPricePlot4Slope",
  "intercept": "diamondPricePlot4Intercept",
  "xMax": 2500,
  "yMax": 7000,
  "xStepSize": 250,
  "yStepSize": 1000,
  "xAxisText": 'قیراط',
  "yAxisText": 'قیمت',
  "regressionLabel": 'خط رگرسیون',
  "yLabel": 'قیمت ',
  "chartTitle": 'نمودار پراکندگی قیراط و داده های قیمت'

}

const diamondRegressionChart4 = new RegressionChart(diamondChartConfig4, diamondScaledData, {"m":0, "b":0});


const diamondChartConfig6 = {
  "canvasId": "diamondPricePlot6",
  "slope": "diamondPricePlot6Slope",
  "intercept": "diamondPricePlot6Intercept",
  "xMax": 2500,
  "yMax": 7000,
  "xStepSize": 250,
  "yStepSize": 1000,
  "xAxisText": 'قیراط',
  "yAxisText": 'قیمت',
  "regressionLabel": 'خط رگرسیون',
  "yLabel": 'قیمت ',
  "chartTitle": 'نمودار پراکندگی قیراط و داده های قیمت'

}

const diamondRegressionChart6 = new RegressionChart(diamondChartConfig6, diamondScaledData, {"m":3186, "b":3039.4406});

// const diamondChartConfig4 = {
//   "canvasId": "diamondPricePlot4",
//   "slope": "diamondPricePlot4Slope",
//   "intercept": "diamondPricePlot4Intercept",
//   "xMax": 2500,
//   "yMax": 7000,
//   "xStepSize": 250,
//   "yStepSize": 1000,
//   "xAxisText": 'قیراط',
//   "yAxisText": 'قیمت',
//   "regressionLabel": 'خط رگرسیون',
//   "yLabel": 'قیمت ',
//   "chartTitle": 'خطوط رگرسیون احتمالی'

// }
// const diamondRegressionChart4 = new RegressionChart(diamondChartConfig4, diamondScaledData, {"m":3.25, "b":-775.55});
// diamondRegressionChart4.setRegressionLine();

function resetTextInputs(elList){
  elList.forEach(element => {
    element.value = "";
  });
}


const meanCarratInput = document.querySelector("#mean-carrat-ex");
const meanPriceInput = document.querySelector("#mean-price-ex");
const meanSumbitBtn = document.querySelector("#meanSubmitBtn");
resetTextInputs([meanCarratInput, meanPriceInput]);
meanSumbitBtn.addEventListener('click', (e)=> {
  e.target.disabled = true;
  if (parseInt(meanCarratInput.value) === 1229) {
    meanCarratInput.classList.add("input-bg-true");
  }else{
    meanCarratInput.classList.add("input-bg-false");
    meanCarratInput.value = `مقدار درست: 1229`;
  }
  if(parseInt(meanPriceInput.value) === 3431){
    meanPriceInput.classList.add("input-bg-true");
  }else{
    meanPriceInput.classList.add("input-bg-false");
    meanPriceInput.value = `مقدار درست: 3431`
  }
  meanCarratInput.disabled = true;
  meanPriceInput.disabled = true;
});
