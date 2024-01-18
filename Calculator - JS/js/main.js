const userInput = document.querySelector('.userInput');
const buttons = document.querySelectorAll('.container button');
const deleteButton = document.querySelector('.delete');

function initApp() {
  userInput.value = localStorage.getItem('calculation')|| userInput.value;
  buttons.forEach(button => {
    button.addEventListener('click', buttonClicked);
  });
}

initApp();

//event listener that awaits for any clicks on the keyboard
window.addEventListener('keydown', (e) => {
  let keyPressed = e.key;
  class createKey {
    textContent = keyPressed;
    target = this;
  }
  
  keyPressed = new createKey();

  if (keyPressed.textContent === '1'||
      keyPressed.textContent === '2'||
      keyPressed.textContent === '3'||
      keyPressed.textContent === '4'||
      keyPressed.textContent === '5'||
      keyPressed.textContent === '6'||
      keyPressed.textContent === '7'||
      keyPressed.textContent === '8'||
      keyPressed.textContent === '9'||
      keyPressed.textContent === '0'||
      keyPressed.textContent === '-'||
      keyPressed.textContent === '+'||
      keyPressed.textContent === '*'||
      keyPressed.textContent === '/'||
      keyPressed.textContent === 'Enter'){
        e.preventDefault();
        keyPressed.textContent = (keyPressed.textContent === 'Enter')?
          '=':
          keyPressed.textContent === 'Backspace'?
          'DE':
          keyPressed.textContent;

        buttonClicked(keyPressed);
      } else if ( keyPressed.textContent === 'Backspace') {
        userInput.value = userInput.value.trim().slice(0, -1);
      }
});

//callback function to be triggered when the user clicks on a button or a key stroke on the keyboard
function buttonClicked (e) {
  let button = e.target;

  if (!isNaN(button.textContent)) {
    updateUserInput(button);
    saveCalc();
  } else if (button.textContent === '+' ||button.textContent === '-'||button.textContent === '*'||button.textContent === '/'||button.textContent === '.' ) {
    updateUserInput(button);
    saveCalc();   
  } else if (button.textContent === 'AC') {
    userInput.value = '';
  } else if (button.textContent === '(' || button.textContent === ')') {
    updateUserInput(button);
    saveCalc();
  } else if (button.textContent === '=') {
    try {
      userInput.value = eval(userInput.value);
      if (userInput.value === 'Infinity') {
        throw new Error('Cannot divide a number by 0');
      }
      saveCalc();//save the calculation if the calculation does not evaluate to an error
    } catch (err) {
      userInput.value = 'Invalid Input';
    }
  }
}

//delete last character
deleteButton.addEventListener('click', (e) => {
  userInput.value = userInput.value.trim().slice(0, -1);
});

//save state in the local storage
function saveCalc() {
  localStorage.setItem('calculation', userInput.value.trim());
}

function updateUserInput(button) {
  if (userInput.value === 'Invalid Input') {
    userInput.value = '';
    userInput.value += button.textContent;
  } else {
    userInput.value += button.textContent;
  }
}