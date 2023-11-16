# Functional test for the Home page :

## Test 1 : test the restaurant page display
To test the restaurant page, check the following points :

    1. Open the page of a restaurant (make sure the id exist).
    2. Check that the page displays the following informations:
        - the name 
        - the address
        - the average rating
        - the position on the map

## Test 2 : test 404 redirect 
> [!WARNING]
> Not emplemented yet.

Check that the page displays a 404 error when the restaurant doesn't exist.

    1.Try to access the page /restaurant/0
    2. Check that the page displays a 404 error.


## Test 3 : test comments display
To test the comments display, check the following points :

    1.  Scroll down to the comments section 
    2.  Check that the page displays the comments of the restaurant.
    3.  Check that the comments are sorted by date.
    4.  Check that the comments display the name of the user and his picture.

## Test 4 : test the report button
To test the report button, check the following points :

    1.  Scroll down to the comments section 
    2.  Opent the context menu of a comment.
    3.  Click on the report button.
    4.  Check that the page displays a message saying that the comment has been reported.
    5.  Check that the API has been called to report the comment.