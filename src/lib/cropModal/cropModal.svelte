<script>
    import { onMount } from "svelte";
    import Cropper from 'cropperjs';

	export let showModalPP; // boolean
    export let imageInput;
    let imageElement;
	let dialog; // HTMLDialogElement
    let cropper;

	$: if (dialog && showModalPP) dialog.showModal();

    const handleUpdateImage = () => {
        console.log("update image");
    }

    const resetCropper = () => {
        if(cropper !== undefined){
            cropper.destroy();
            cropper = null;
        }
    }

    const closeModal = () => {
        // resetCropper();
        dialog.close();
    }

    const handleCrop = () => {
        const canvas = cropper.getCroppedCanvas({
            width: 640,
            height: 640,
        });
        // avatar.src = canvas.toDataURL();
        canvas.toBlob((blob) => {
            const formData = new FormData();

            formData.append('croppedImage', blob);

            console.log(formData.get('croppedImage'));

            // TODO : send the cropped image to the server
        });
    }

    const onOpenModal = () => {
        resetCropper();

        // imageInput is the input[type=file] element
        var files = imageInput.files;
        var done = function (url) {
            imageInput.value = '';
            imageElement.src = url;
        };
        var reader;
        var file;
        var url;

        if (files && files.length > 0) {
            file = files[0];

            if (URL) {
                done(URL.createObjectURL(file));
            } else if (FileReader) {
                reader = new FileReader();
                reader.onload = function (e) {
                    done(reader.result);
                };
                reader.readAsDataURL(file);
            }

            cropper = new Cropper(imageElement, {
                aspectRatio: 1,
                viewMode: 1, // Ajuste automatiquement la taille du rectangle de recadrage
                zoomable: false, // Désactive le zoom
            });
        }

        // cropper = new Cropper(imageElement, {
        //     aspectRatio: 1,
        //     viewMode: 3,
        //     preview: '.preview'
        // });
    }

    $:{showModalPP && onOpenModal()}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModalPP = false)}
	
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->

    <div class="modal fade">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Crop the image</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" on:click={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="img-container">
                <img id="image" src="https://avatars0.githubusercontent.com/u/3456749" alt="" bind:this={imageElement}>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" on:click={closeModal}>Cancel</button>
              <button type="button" class="btn btn-primary" on:click={handleCrop}>Crop</button>
            </div>
          </div>
        </div>
      </div>
</dialog>

<style>
    @import "cropperjs/dist/cropper.css";

    /* .img-container{
        display: flex;
        justify-content: center;
        align-items: center;
    } */

    #image{
        max-width: 60%;
        max-height: 60%;
    }
</style>