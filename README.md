HI HELLO AND WELCOME TO WEATHER


In the index.html there is an input form with a submit button. There are also empty cards from bootstrap, and a lot of empty divs. Without local storage the opened html is very empty with a header.

In the javascript:

The first thing done is the coding for getting the city name that is stored in local storage. 

I also created two empty string variables for latitude and longitude.

Then that city name is used to generated two urls for weather apis:
    - One that gets the forecast of the next five days
    - One that gets the current weather

First I use the api for the forecast. Using the response data, I fill in all of the text for date, temperature, humidity, and icons. For most of them, it was simply assigning text to a class.

For the icon I had to create a new url and image tags so that the image could be displayed

For the current api, I did mostly the same coding, and added the wind text.

Then I put the longitutde and latitude results in corresponding variables. I put that data into the UV api URL parameters.

Then I used the UV api to get the UV response. I added if statements using the data numbers to create conditions to add background-colors.

Next is the code for clicking on the save button. The first thing it does is define var city, which will be used for the apis.

Then it creates a new button using the text that you input. I added a class and a value of the city so that this could be used later.

Then the coding is exactly the same as above, except for the api urls using city instead of last city.

Then then next big chunk is when I click on the newly created buttons. I use this value so the buttons know which one they are. Then I put that value in a new variable nextCity

Then the coding is exactly the same as above, except for the api urls using nextCity instead of last city or city.