# Edit Profil - User

Date de création: 22 novembre 2023 18:11

# **Functional test for the Edit Profil page of User:**

## Test 1 : Display

1. At the top of the page, should have a picture of the **User** and ****below his/her name with his/her localisation
2. Just below the localisation of the **User,** at the left of the page should have an edit profil button and at the right a comments button
    1. Click on the Edit Profil button should transfer you in front of the inputs
    2. Click on the Comments button should transfer you in front of the comments
3. Below this buttons should have the 8 following inputs :
    1. Last name
    2. First name
    3. Sexe
    4. Birthday
    5. City
    6. Adress
    7. Email
    8. Phone
4. Below the inputs should have a register button
5. Below the button should have a list of every **User** comments
    1. For each comments the name should have the following informations :
        1. Name of the restaurant
        2. The note
        3. A delete button
6. At the boottom of the page should have a red button for delete the profil

## Test 2 : Modify Informations

To test to modify the informations of an **User** profil, we will use the following test :

In first check in database, the informations the **User** already complete

At the end of every step, click on the register button and check in database if the informations you entered is correctly registered

1. Enter a new text in the last name input
    1. Any characters should be accept
2. Enter a new text in the first name input
    1. Any characters should be accept
3. Enter a new text in the city input
    1. Any characters should be accept
4. Select a new sexe
5. Select or enter a birthdate with calendar icon
    1. Select 2009 year and verify if an error message appear
6. Enter a new text in address input 
    1. Any characters should be accept
7. Enter a new text in the email input
    1. email information is valid when it compose to 3 parts :
        1. first part we can have letter, number, maj letters and /, +, -, _, *
        2. second part is an “@”
        3. third part need to be only letter and “.” (the point have to be follow by only letter)
    2. Enter a not valid text and click on the register button. An error message should appear
8. Enter a new number in the phone number input 
    1. Enter distinctly : letters, capital letters, different special characters and click on the register button. An error message should appear
    2. Only number should be accept 
    3. Enter 9 number in the input and click on the register button. An error message should appear. Repeat this step with 11.

## Test 3 : Delete comments

1. Select a comment in database
2. Go to the edit profil page
3. Find the comment in the list and click on the delete button
4. Check in database if the comment is correctly delete

## Test 4 : Delete Profil

1. Find the owner profil in database
2. Click on the delete button
3. Check in database if the owner profil disappear