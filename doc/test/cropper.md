# Functional Tests for Image Cropper Component

## Test 1: Initial Display

1. Clicking on the profil Picture should show the modal dialog.
2. The modal should contain a header with the text "Crop the image."
3. The modal should display an image container with the uploaded image.

## Test 2: Cropping Functionality

1. The cropper should be initialized when the modal opens.
2. Verify that the cropper aspect ratio is set to 1.
3. Verify that the cropper view mode is set to 1.
4. Verify that zooming is disabled on the cropper.

## Test 3: Cancel Button

1. Clicking the "Cancel" button should close the modal.
2. Verify that the cropper is destroyed when the modal is closed.

## Test 4: Crop Button

1. After cropping the image, clicking the "Crop" button should trigger the `handleCrop` function.
2. Verify that the cropped image is sent to the server using a PATCH request.
3. Verify that the server responds appropriately to the image update.

## Test 5: Image Input

1. Uploading a new image using the file input should trigger the `onOpenModal` function.
2. Verify that the cropper is initialized with the newly uploaded image.

## Test 6: Modal Closing

1. Closing the modal should trigger the `closeModal` function.
2. Verify that the `showModalPP` variable is set to false.
3. Verify that the body overflow style is set back to 'scroll' when the modal is closed.

## Test 7: Styling

1. Verify that the modal has the correct dimensions, border radius, and background color.
2. Verify that the image inside the cropper has a maximum width and height.
3. Verify that the modal components (header, body, footer) have the correct styling.
4. Verify that the "Cancel" and "Crop" buttons have the correct styling.

