// BMI DATA

const data = [
  {
    min: 0,
    max: 18.4,
    classification: 'Less than 18,5',
    info: 'Underweight',
    obesity: '0',
  },
  {
    min: 18.5,
    max: 24.9,
    classification: 'Between 18,5 and 24,9',
    info: 'Normal',
    obesity: '0',
  },
  {
    min: 25,
    max: 29.9,
    classification: 'Between 25,0 and 29,9',
    info: 'Overweight',
    obesity: 'I',
  },
  {
    min: 30,
    max: 39.9,
    classification: 'Between 30,0 and 39,9',
    info: 'Obesity',
    obesity: 'II',
  },
  {
    min: 40,
    max: 99,
    classification: 'Bigger than 40,0',
    info: 'Morbid Obesity',
    obesity: 'III',
  },
];

//selecting elements

const bmiTable = document.querySelector('#bmi-table');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const clearBtn = document.querySelector('#clear-btn');
const calcBtn = document.querySelector('#calc-btn');

const calcContainer = document.querySelector('#calc-container');
const resultContainer = document.querySelector('#result-container');

const bmiNumber = document.querySelector('#bmi-number span');
const bmiInfo = document.querySelector('#bmi-info span');

const returnBtn = document.querySelector('#return-btn');
console.log(bmiNumber);

// Function
/*
creates a table with general information 
on the health level according to bmi
by looping through the array of data objects 
*/
function createTable(data) {
  /* for each data fetched
  a html element will be created to compose the list
  */
  data.forEach((item) => {
    /*
    creates the element 
    and modifies its text property
    */
    const div = document.createElement('div');

    // styles the div created
    div.classList.add('table-data');

    const classification = document.createElement('p');
    classification.innerText = item.classification;

    const info = document.createElement('p');
    info.innerText = item.info;

    const obesity = document.createElement('p');
    obesity.innerText = item.obesity;

    /*
    appends the elements to the div parent element created above
    */
    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    // adds the div created to the table element
    bmiTable.appendChild(div);
  });
}

/* 
cleans the input fields and the colors added
 by classes after clicking the "clear" btn \
 or the go back btn 
 */
function cleanInput() {
  heightInput.value = '';
  weightInput.value = '';
  bmiNumber.classList = '';
  bmiInfo.classList = '';
}

/*
certifies that users 
will be only able to insert numbers in the input field
*/
function validDigits(text) {
  return text.replace(/[^0-9,]/g, '');
}

/* holds the formula to the calculation of bmi */
function calcBMI(weight, height) {
  //calculates and limits decimal spots to 1
  const bmi = (weight / (height * height)).toFixed(1);

  return bmi;
}

// displays and hides the result table
function showOrHideResults() {
  calcContainer.classList.toggle('hide');
  resultContainer.classList.toggle('hide');
}

createTable(data);

//takes the value of height and weight
//applies to each input field the form validation
[heightInput, weightInput].forEach((el) => {
  el.addEventListener('input', (e) => {
    const updatedValue = validDigits(e.target.value);

    // the result will be the validated height and weight inputed by the user
    e.target.value = updatedValue;
  });
});

// on click - calculates the BMI
calcBtn.addEventListener('click', (e) => {
  e.preventDefault();

  // makes sure that when commas are used, they will be replaced for dots
  const weight = +weightInput.value.replace(',', '.');
  const height = +heightInput.value.replace(',', '.');

  // if an input field is empty, does not send the form
  if (!weight || !height) return;

  //passes the bmi value to the function that holds the formula
  const bmi = calcBMI(weight, height);

  let info;
  /*iterates through each info property of the data obj and returns a category */
  data.forEach((item) => {
    if (bmi >= item.min && bmi <= item.max) {
      info = item.info;
    }
  });

  if (!info) return;

  //sets the html text to the value of bmi and info
  bmiNumber.innerText = bmi;
  bmiInfo.innerText = info;

  // sets which color will be shown according to the level of the bmi
  switch (info) {
    case 'Underweight':
      bmiNumber.classList.add('low');
      bmiInfo.classList.add('low');
      break;
    case 'Normal':
      bmiNumber.classList.add('good');
      bmiInfo.classList.add('good');
      break;
    case 'Overweight':
      bmiNumber.classList.add('low');
      bmiInfo.classList.add('low');
      break;
    case 'Obesity':
      bmiNumber.classList.add('medium');
      bmiInfo.classList.add('medium');
      break;
    case 'Morbid Obesity':
      bmiNumber.classList.add('high');
      bmiInfo.classList.add('high');
      break;
  }

  //assures that the previous color does not remain for the other categories
  showOrHideResults();
});

// cleans the form
clearBtn.addEventListener('click', (e) => {
  e.preventDefault;

  cleanInput();
});

// goes back to the main page
returnBtn.addEventListener('click', () => {
  cleanInput();
  showOrHideResults();
});
