class Table {
    constructor(container_id, attributes_obj) {
        this.table = document.querySelector(container_id);
        this.attributes_obj = attributes_obj;
        this.create();
    }

    create() {
        const tableContent = this.attributes_obj["table_content"];
        let tableRow, td;
        for (let row = 0; row < this.attributes_obj["rows"]; row++) {
            tableRow = document.createElement("tr");
            for (let col = 0; col < this.attributes_obj["cols"]; col++) {
                td = document.createElement("td");
                td.innerText = tableContent[row][col];
                tableRow.appendChild(td);
            }
            this.table.appendChild(tableRow);
        }
    }
    editTableContent(tableData){
        const tbaleRows = this.table.querySelectorAll("tr");
        for (let i = 0; i < tbaleRows.length; i++){
            const tds = tbaleRows[i].querySelectorAll("td");
            for (let j = 0; j < tds.length; j++){
                tds[j].innerText = tableData[i][j];
            }
        }
        
    }
    generateParagraphs(textArray){
        const parrentEl = this.table.parentElement;
        const divEl = document.createElement("div");
        for (let i = 0; i < textArray.length; i++){
            let p = document.createElement("p");
            p.innerText = textArray[i];
            divEl.appendChild(p);
        }
        return divEl.innerHTML;
    }
     
    algorithmSteps(explain_obj, explain_container){
        const parrentEl = this.table.parentElement;
        const nextStepBtn =parrentEl.querySelector(".next_step");
        const prevStepBtn = parrentEl.querySelector(".prev_step");
        let algorithmStepsIndex = 0;
        const explain_container_el = document.querySelector(explain_container);
        // add functionality to next btn
        nextStepBtn.addEventListener('click', () =>{
            if (algorithmStepsIndex < 5){
                prevStepBtn.disabled = false;
                algorithmStepsIndex += 1;
                this.editTableContent(explain_obj[algorithmStepsIndex]["tableData"]);
                explain_container_el.innerHTML = this.generateParagraphs(explain_obj[algorithmStepsIndex]["expText"]);
                alert(explain_container_el.innerHTML);
            }
            else{
                nextStepBtn.disabled = true;
            }
        });
        // add functionality to prev btn
        prevStepBtn.addEventListener('click', ()=>{
            alert(algorithmStepsIndex);
            if (algorithmStepsIndex > 0){
                nextStepBtn.disabled = false;
                algorithmStepsIndex -= 1;
                this.editTableContent(explain_obj[algorithmStepsIndex]["tableData"]);
                explain_container_el.innerHTML = this.generateParagraphs(explain_obj[algorithmStepsIndex]["expText"]);
                alert(explain_container_el.innerHTML);
            }else{
                prevStepBtn.disabled = true;
            }
        });

    }
}

const modelCheckAlgorithmExp = {
    "0":{
        "tableData" : [
            ["P", "Q", "R", "KB"],
            ["F" ,"F", "F" ," "],
            ["F", "F", "T", " "],
            ["F", "T", "F", " "],
            ["F", "T", "T", " "],
            ["T", "F", "F", " "],
            ["T", "F", "T", " "],
            ["T", "T", "F", " "],
            ["T", "T", "T", " "]
        ],
        "expText": ["تمام مدل های ممکن را برمی شماریم و سپس این سوال را مطرح میکنیم که برای هر کدام از این مدل ها، آیا پایگاه دانش (KB) درست است؟"]
    },
    "1":{
        "tableData" : [
            ["P", "Q", "R", "KB"],
            ["F" ,"F", "F" ,"F"],
            ["F", "F", "T", "F"],
            ["F", "T", "F", "F"],
            ["F", "T", "T", "F"],
            ["T", "F", "F", " "],
            ["T", "F", "T", " "],
            ["T", "T", "F", " "],
            ["T", "T", "T", " "]
        ],
        "expText": ["با توجه به KB، می دانیم کهP درست است. بنابراین، می‌توان گفت که KB در همه مدل‌هایی که P درست نیست، نادرست یا همان false است."]
    },
    "2":{
        "tableData" : [
            ["P", "Q", "R", "KB"],
            ["F" ,"F", "F" ,"F"],
            ["F", "F", "T", "F"],
            ["F", "T", "F", "F"],
            ["F", "T", "T", "F"],
            ["T", "F", "F", " "],
            ["T", "F", "T", " "],
            ["T", "T", "F", "F"],
            ["T", "T", "T", "F"]
        ],
        "expText": ["مشابه مرحله قبل، می دانیم که Q درست نیست، پس می توانیم بگوییم در تمام مدلهایی که Q درست است، KB نادرست است."]
    },
    "3":{
        "tableData" : [
            ["P", "Q", "R", "KB"],
            ["F" ,"F", "F" ,"F"],
            ["F", "F", "T", "F"],
            ["F", "T", "F", "F"],
            ["F", "T", "T", "F"],
            ["T", "F", "F", "F"],
            ["T", "F", "T", "T"],
            ["T", "T", "F", "F"],
            ["T", "T", "T", "F"]
        ],
        "expText": [
            "بنابراین  (P ∧ ¬Q) R، میدانیم که اگر P درست وQ نادرست است آنگاه R باید درست باشد.",
            "بنابراین، KB نادرست است هرگاه R نادرست باشد و KB درست است هرگاه R درست باشد.",
            "در نهایت فقط یک مدل باقی می ماند که در آن پایگاه دانش یا KB درست می باشد."
        ]
    },
    "4":{
        "tableData" : [
            ["P", "Q", "R", "KB"],
            ["F" ,"F", "F" ,"F"],
            ["F", "F", "T", "F"],
            ["F", "T", "F", "F"],
            ["F", "T", "T", "F"],
            ["T", "F", "F", "F"],
            ["T", "F", "T", "T"],
            ["T", "T", "F", "F"],
            ["T", "T", "T", "F"]
        ],
        "expText": [
            "با توجه به جدول قبل، تنها یک مدل است که در آن پایگاه دانش (KB) درست است.",
            "در این مدل، مشاهده میکنیم که R نیز درست است.",
            "براساس تعریف ما از استدلال، اگر R در تمام مدلهایی که KB در آنها درست است، درست باشد؛ آنگاه، KB ⊨ R.",
            "به بیان ساده تر، پایگاه دانش مستلزم R است.",
            "و این نمونه ای بود از نحوه ی کارِ الگوریتم بررسی مدل یا Model Checking.", 
        ]
    },
    
}
const initialTableData = [
    ["P" ,"Q", "R" ,"KB"],
    ["F" ,"F", "F" ," "],
    ["F", "F", "T", " "],
    ["F", "T", "F", " "],
    ["F", "T", "T", " "],
    ["T", "F", "F", " "],
    ["T", "F", "T", " "],
    ["T", "T", "F", " "],
    ["T", "T", "T", " "]
];
const table1 = new Table("#MCtable", { "rows": 9, "cols": 4, "table_content": initialTableData });
table1.algorithmSteps(modelCheckAlgorithmExp, "#modelCheckingsteps");
const expContainer = document.querySelector("#modelCheckingsteps");

// const logicButtons = document.querySelectorAll(".logic_btn");
// logicButtons.forEach(lgButton => {
//     let val = true;
//     lgButton.addEventListener("click", () =>{
//         if (val === true){
//             lgButton.textContent = "F"; 
//         }else{
//             lgButton.textContent = "T"; 
//         }
//         lgButton.classList.toggle("false_btn");
//         val = !val;
//     })
// });




const operands = document.querySelectorAll(".logic_btn");

operands.forEach(operand => {
    operand.addEventListener("click", toggleOperandState);
});
function toggleOperandState() {
    // change state
    const currentState = this.dataset.state === "true";
    this.dataset.state = currentState ? "false" : "true";
    this.innerText = currentState ? "F" : "T";
    this.classList.remove("true_btn", "false_btn");
    if (this.dataset.state === "true") {
        this.classList.add("true_btn");
    } else {
        this.classList.add("false_btn");
    }

    // operate
    const operation = this.parentElement.parentElement.dataset.operation;
    doOperation(operation, this.parentElement.parentElement);
    
}
function toggleResult(element, result_value){
    const result = element.querySelector(".result");
    result.classList.remove("true_btn", "false_btn");
    if (result_value === true) {
       result.classList.add("true_btn");
    } else {
       result.classList.add("false_btn");
    }

}
function doOperation(operation, parent){
    if(operation === "and"){
        const operands = parent.querySelectorAll(".logic_btn");
        let result = true;
        operands.forEach(operand => {
            if(operand.dataset.state === "false"){
                result = false;
            }
        });
        parent.querySelector(".result").innerText = result ? "T" : "F";
        toggleResult(parent, result);
    }

    if(operation === "or"){
        const operands = parent.querySelectorAll(".logic_btn");
        let result = false;
        operands.forEach(operand => {
            if(operand.dataset.state === "true"){
                result = true;
            }
        });
        parent.querySelector(".result").innerText = result ? "T" : "F";
        toggleResult(parent, result);
    }
    if(operation === "not"){
        const operand = parent.querySelector(".logic_btn");
        const result = operand.dataset.state === "true" ? "F" : "T";
        parent.querySelector(".result").innerText = result;
        parent.querySelector(".result").classList.remove("true_btn", "false_btn");
        if (result === "T") {
            parent.querySelector(".result").classList.add("true_btn");
        } else {
            parent.querySelector(".result").classList.add("false_btn");
        }
    }
    if (operation === "implication") {
        const operands = parent.querySelectorAll(".logic_btn");
        const [p, q] = operands;
        const pValue = p.dataset.state === "true";
        const qValue = q.dataset.state === "true";
        const result = (!pValue || qValue) ? "T" : "F";
        parent.querySelector(".result").innerText = result;
        toggleResult(parent, result === "T"? true : false);
    }
    if(operation === "biconditional"){
        const operands = parent.querySelectorAll(".logic_btn");
        const [p, q] = operands;
        const pValue = p.dataset.state === "true";
        const qValue = q.dataset.state === "true";
        const result = (pValue === qValue) ? "T" : "F";
        parent.querySelector(".result").innerText = result;
        toggleResult(parent, result === "T"? true : false);
    }
}



const tabs = document.querySelectorAll('.navtab');
const contents = document.querySelectorAll('.content');
const underline = document.querySelector('.underline');

function updateUnderline() {
  const activeTab = document.querySelector('.navtab.active');
  underline.style.width = `${activeTab.offsetWidth}px`;
  underline.style.left = `${activeTab.offsetLeft}px`;
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.getAttribute('data-target');
    contents.forEach(content => {
      if (content.id === target) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
    updateUnderline();
  });
});

updateUnderline();