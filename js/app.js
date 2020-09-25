const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
];

const startbtnRef = document.querySelector('button[data-action="start"]');
const stopbtnRef = document.querySelector('button[data-action="stop"]');
const bodyRef = document.body;

startbtnRef.addEventListener('click', startbtnHandler);
stopbtnRef.addEventListener('click', stopbtnHandler);

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let intervalId = null;

function startbtnHandler() {
  if (!intervalId) {
    intervalId = setInterval(changeBodyColor,1000);
  }

}

function changeBodyColor() {
  const randomNumber = randomIntegerFromInterval(0, colors.length-1);
  const colorNow = getHexRGBColor(bodyRef.style.backgroundColor);

  if (colorNow === colors[randomNumber]) {
    changeBodyColor();
    return;
  }

  bodyRef.style.backgroundColor = colors[randomNumber];
}

function stopbtnHandler() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function getHexRGBColor(color)
{
  color = color.replace(/\s/g,"");
  const aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);

  if(aRGB)
  {
    color = '';
    for (var i=1;  i<=3; i++) color += Math.round((aRGB[i][aRGB[i].length-1]=="%"?2.55:1)*parseInt(aRGB[i])).toString(16).replace(/^(.)$/,'0$1');
  }
  else color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
  
  return '#'+color.toUpperCase();
}
