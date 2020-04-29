document.getElementById('save').addEventListener('click', performAction);
document.getElementById('delete').addEventListener('click', performDelete);



function performAction(event) {
    let input = document.getElementById('title1').value; 
    const url = 'http://api.tvmaze.com/search/people?q=';

    getData(url, input)
    .then( (data) => {
        const name = data[0].person.name;
        if (data[0].person.birthday === null) {
            var birthday = 'No birthday found';
        }else {
            birthday = data[0].person.birthday;
        };
        if (data[0].person.country === null) {
            var country = 'No country found';
        }else {
            country = data[0].person.country.name;
        };
        if (data[0].person.image === null) {
            var image = 'No photo found';
        }else {
            image = '<img src =' + data[0].person.image.medium + '>';
        };


        postData('http://localhost:8080/save', {
            name,
            birthday,
            country, 
            image
        });
    }).then( () => {
        updateUI('http://localhost:8080/all');
    });
};

//Get tvmaze data
const getData = async (url, input) => {
    const response = await fetch(url+input);
    try {
      const data = await response.json();
      console.log(data);
      return data;
    } catch(error) {
        console.log('error', error);
      }
  }

const postData = async (url='', data={}) => {
    console.log(data);
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    try {
      console.log(response);
    } catch(error) {
        console.log('error', error);
      }
  }

  const updateUI = async () => {
    const request = await fetch('http://localhost:8080/all');
    try {
      const allData = await request.json();
      console.log(allData);
      document.getElementById('actor').innerHTML = '';
      document.getElementById('birthday').innerHTML = '';
      document.getElementById('country').innerHTML = '';
      document.getElementById('image').innerHTML = '';
      document.getElementById('actor').innerHTML += '<div>' + allData.nameOne + '</div>';
      document.getElementById('birthday').innerHTML += '<div>' + allData.birthdayOne + '</div>';
      document.getElementById('country').innerHTML += '<div>' + allData.countryOne + '</div>';
      document.getElementById('image').innerHTML += allData.imageOne;

    } catch(error) {
        console.log('error', error);
      }
  }
  
  
function performDelete (event) {
    document.getElementById('actor').innerHTML = '';
    document.getElementById('birthday').innerHTML = '';
    document.getElementById('country').innerHTML = '';
    document.getElementById('image').innerHTML = '';
};