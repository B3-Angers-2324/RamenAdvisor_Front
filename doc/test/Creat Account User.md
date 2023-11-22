## Test 1 : Display 
	1. The page Create a account should display an name, a family name, a sexe, a date of birth, a phone number, a city, an adress, a email, a password, 
	2.The page should display a "validate" a account button
	3.The page should also display a link to sign in page, owner create a account page


## Test 2 : Create an account
To test to create a account, we will use the following test :
	- Enter an Name in the Name input
		Click on Validate button without filled the Name input : a pop up should show up to ask to fill in the name input
	- Enter an Family name in the family name input
		Click on Validate button without filled the family name input : a pop up should show up to ask to fill in the family name input
	- Choose a option in the sexe categorie, if not, a pop up should show up to ask to fill in the sexe choosing categories
	- Put a correct date of birth,if not,  a pop up should show up to ask to fill in the date of birth input
	- Put a correct phone number, if not,  a pop up should show up to ask to fill in the phone number input
 	- Enter an City in the City input and an adress
		Click on Validate button without filled the password input : a pop up should show up to ask to fill in the City input or the adress input
	- Enter an email in the email input
		Click on sign in button without filled the password input : a pop up should show up to ask to fill in the password input
	- Enter a password in the password input
		Click on sign in button without filled the email input : a pop up should show up to ask to fill in the email input
	- And confirm the Password, if not,  a pop up should show up to ask to fill in the password confirmation input

Make sur the date of birth is valid :
	Need to be a real date of birth
	Use the calendar to choose a correct date of birth

Make sur the sexe is valid :
	Choose between 3 choose : Male / Female / Other

Make sur the Phone number is valid :
	You must put a real phone number 

Make sur the email is valid :
	email information is valid when it compose to 3 parts :
	first part we can have letter, number, capital letters and this characters : /, +, -, _, *
	second part is an “@”
	third part need to be only letter and “.” (the point have to be follow by only letter)
	Enter different not valid email and check if an error message appear
	Enter a special character in the first part and click on the validate button.
	Enter a text without @ and click on the Validate button.
	Enter a special character in the third part and click on the validate button.
	Enter an unknown email and click on the Validate button. An error message should appea
 
Make sur the password is valid
	Any characters should be accpet
	Enter an unknown email and click on the Validate button. An error message should appear

Click on Validate button should redirect you to the home page