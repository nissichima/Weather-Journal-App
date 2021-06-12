/* Global Variables */
const openApiKey = "5a0865ce03882a4a7636e7b8ce1a696c";
const base = "http://api.openweathermap.org/data/2.5/weather?";
const apiKey = `&appid=${openApiKey}`;

//function to get data
// get method
const getWeatherJournal = async(baseURL, zipCode, apiKey) => {
    console.log('baseandAPIkey_getWeatherJournal', base+zipCode+apiKey);
    const request = await fetch(baseURL+zipCode+apiKey);
    try{
        const weatherJournalData = await request.json();
        console.log('weatherJournalData_getWeatherJournal', weatherJournalData);
        console.log('temperature_getWeatherJournal', weatherJournalData.main['temp']);
        return weatherJournalData;
    }catch (e) {
        console.log('error', e);
    }
};


/* Function to POST data */
const postWeatherJournal = async(url = '', data = {}) => {
    console.log('postData_postWeatherJournal', data);
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      // console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}
postData('/add', {answer:42});
// TODO-Call Function

 
//event listener
document.getElementById('generate').addEventListener('click', performAction);

async function performAction(e) {
    // get zip code that user entered
    let enterZip = document.querySelector('#zip').value;
    let newZipCode = `zip=${enterZip},us`;
    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    // get user response of "How are you feeling today?"
    const userResponse = document.getElementById("feelings").value;

    // chain the promises
    getWeatherJournal(baseURL, newZipCode, apiKey)
        .then(function (weatherJournalData) {
            postWeatherJournal('/addData', {
                temperature: kelvinToFahrenheit(weatherJournalData.main['temp']),
                date: newDate,
                userResponse: userResponse
            });
        })
        .then(
            updateUI
        )
}