<script>
    import Cropper from 'cropperjs';
    import { API_URL } from "../../main";

	export let showModalPP; // boolean
    export let imageInput;
    let imageElement;
	let dialog; // HTMLDialogElement
    let cropper;

	$: if (dialog && showModalPP) dialog.showModal();

    const handleUpdateImage = () => {
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
        

        canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('image', blob);

            // test if the image is under 15Mo
            if (blob.size > 15000000) {
                alert("The image must be under 15Mo");
                return;
            }

            fetch(`${API_URL}/user/pp`, {
                method: "PATCH",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: formData,
            }).then((res) => res.json())
            .then((data) => {
                // refresh the page
                window.location.reload();
            })
        });

        // //convert canvas to jpeg
        // const dataURL = canvas.toDataURL('image/jpeg', 0.8);

        // // convert canvas to webp
        // // let dataURL = canvas.toDataURL('image/webp');

        // fetch(`${API_URL}/user/pp`, {
        //         method: "PATCH",
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + localStorage.getItem('token')
        //         },
        //         body: JSON.stringify({
        //             image: dataURL,
        //         }),
        //     }).then((res) => res.json())
        //     .then((data) => {
        //     })
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
    }

    // detect when the modal is open and call onOpenModal()
    $:{showModalPP && onOpenModal()}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => {
        showModalPP = false
        document.body.style.overflow = 'scroll';
}}
	
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->

    <div class="modal fade">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Crop the image</h5>
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
    @import "./cropper.css";

    dialog{
        width: 75%;
        height: 75%;
        max-width: 75%;
        max-height: 75%;
        border: none;
        position: relative;
        border-radius: var(--radius);
        background-color: var(--bone);
        padding: var(--spacing);
    }
    
    #image{
        max-width: 40%;
        max-height: 40%;
    }
    
    .modal{
        width: 100%;
        height: 100%;
    }

    
    .modal-dialog,
    .modal-content{
        height: 100%;
    }
    
    .modal-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header,
    .modal-footer{
        height: 3em;
        width: 100%;
    }
    .modal-body{
        width: 100%;
        flex: 1;
    }
    .modal-header{
        margin-bottom: 1em;
    }
    .modal-header h5{
        color: var(--black);
        font-size: 1.5em;
        font-weight: 600;
    }

    .modal-footer{
        margin-top: 1em;
        display: flex;
        align-items: center;
        gap: 1em;
        width: 75%;
    }

    .modal-footer button{
        background-color: var(--brunswick-green);
        color: var(--bone);
        border: none;
        height: 2.5em;
        width: 50%;
        font-size: 1em;
        padding: 10px 0;
        border-radius: var(--radius);
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-footer button:hover{
        cursor: pointer;
    }

    .img-container{
        height: 100%;
    }
</style>