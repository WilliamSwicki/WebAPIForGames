Download off of git
Open the project and start the server
Once the server is open go to localhost:3000
It should send to to index.html
Then login>Make an account
create an account then login
from there you will have access to the rest of the features
if you try to go to pages with out loging in it will kick you back to index.html

the auth checks if your username existes 
if it does it will get the password tied to that username in ath DB
and compares that password and the sent password and if they match it will give you auth

To add a personal access token you will need to go to your 
account>settings>developer settings>personal access tokens>generate new token
Then you will need to name and set an expiration date  
Once you have a name and date set you pick a repo to use the token with then generate the token