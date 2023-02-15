import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element) {
  element.textContent = ''

  loadInterval = setInterval(() => {
      // Update the text content of the loading indicator
      element.textContent += '.';

      // If the loading indicator has reached three dots, reset it
      if (element.textContent === '....') {
          element.textContent = '';
      }
  }, 300);
}

function typeText(element, text) {
  let index = 0

  let interval = setInterval(() => {
      if (index < text.length) {
          element.innerHTML += text.charAt(index)
          index++
      } else {
          clearInterval(interval)
      }
  }, 20)
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexStr = randomNumber.toString(16);

  return `id-${timestamp}-${hexStr}`;
}

function chatStripe(isAi, value, uniqueId) {
  return (
      `
      <div class="wrapper ${isAi && 'ai'}">
          <div class="chat">
              <div class="profile">
                  <img 
                    src=${isAi ? bot : user} 
                    alt="${isAi ? 'bot' : 'user'}" 
                  />
              </div>
              <div class="message" id=${uniqueId}>${value}</div>
          </div>
      </div>
  `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const uniqId = generateUniqueId();
  const prompt = data.get('prompt');

  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, prompt, `u${uniqId}`);
  form.reset();

  // bot's chatstripe  
  chatContainer.innerHTML += chatStripe(true, ' ', `b${uniqId}`);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(`b${uniqId}`);

  loader(messageDiv);
  // fetch data from server -> bot's response

  const response = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if(response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();
    console.log(parsedData);

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();
    messageDiv.innerHTML = 'Something went wrong';
    alert(err);
  }
}

form.addEventListener('submit', handleSubmit);
// to submit form by pressing enter key
form.addEventListener('keyup', (e => {
  if(e.keyCode === 13) {
    handleSubmit(e)
  }
}))