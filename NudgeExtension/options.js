// Saves personality options options to chrome storage
const saveOptions = () => {
  const color = document.getElementById('color').value;

  chrome.storage.sync.set(
    { favoriteColor: color},//, likesColor: likesColor },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
};

// Restores preferences stored in chrome's storaeg
const restoreOptions = () => {
  chrome.storage.sync.get(
    { favoriteColor: 'red'},
    (items) => {
      document.getElementById('color').value = items.favoriteColor;
    }
  );
};


// this section communicates with the Heroku server each time text is written and process is clicked
const form = document.getElementById('data_block');

form.addEventListener('submit', async (event) => {

  event.preventDefault();
  const input = document.getElementById('the_data').value;

  const selectData = document.getElementById('color');

  //check if there is Data in input box
  if (input=="") {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = "No Text Available";
  } else {

    try {
  
      const response = await fetch('https://flask-project-online-d114d91f2d99.herokuapp.com/predict', {
      // const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: input}),
      });

      if (response.ok) {
        const prediction = (await response.json()).prediction;
        const resultDiv = document.getElementById('result');
        resultDiv.innerText = "Congratulations your personality type is " + prediction;
        selectData.value = prediction;
      } else {
        console.error('Request failed:', response.status);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  }
});


document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);