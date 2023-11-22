# Sign In

Date de création: 21 novembre 2023 11:00

# **Functional test for the Sign In page of User :**

## Test 1 : Display

1. The page Sign In for owner should display an email input and a password input
2. The page should display a sign in button
3. The page should also display a link to create an account

## Test 2 : Sign in

To test to sign in, we will use the following test :

1. Enter an email in the email input
    1. Click on sign in button without filled the password input : a pop up should show up to ask to fill in the password input
2. Enter a password in the password input
    1. Click on sign in button without filled the email input : a pop up should show up to ask to fill in the email input
3. Make sur the email is valid :
    1. email information is valid when it compose to 3 parts :
        1. first part we can have letter, number, capital letters and this characters : /, +, -, _, *
        2. second part is an “@”
        3. third part need to be only letter and “.” (the point have to be follow by only letter)
    2. Enter different not valid email and check if an error message appear
        1. Enter a special character in the first part and click on the sign in button.
        2. Enter a text without @ and click on the sign in button.
        3. Enter a special character in the third part and click on the sign in button.
    3. Enter an unknown email and click on the sign in button. An error message should appear
4. Make sur the password is valid
    1. Any characters should be accpet
    2. Enter an unknown email and click on the sign in button. An error message should appear
5. Click on sign in button should redirect you to the owner home page