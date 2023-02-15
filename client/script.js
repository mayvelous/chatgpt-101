import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element) {
  console.log(element)
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if(element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if(index < text.length) {
      element.innerHtml += text.charAt(index);
      index++;
    } else {
      clearInterval(interval)
    }
    
  }, 20);
};

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexStr = randomNumber.toString(16);

  return `id-${timestamp}-${hexStr}`;
}

function chatStripe (isAi, value, uniqueId) {
  return (
    `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
          <div class="profile">
          <img
            src="${isAi ? bot : user}"
            alt="${isAi ? 'bot' : 'user'}"
          />
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const uniqId = generateUniqueId();

  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'), `u${uniqId}`);
  form.reset();

  // bot's chatstripe  
  chatContainer.innerHTML += chatStripe(true, ' ', `b${uniqId}`);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(`b${uniqId}`);

  loader(messageDiv);
}

form.addEventListener('submit', handleSubmit);
// to submit form by pressing enter key
form.addEventListener('keyup', (e => {
  if(e.keyCode === 13) {
    handleSubmit(e)
  }
}))