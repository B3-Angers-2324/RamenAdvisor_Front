<script>
	export let showModal; // boolean
    export let validate = () => {}
	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
        <div class="line">
            <button on:click={() => dialog.close()}>Cancel</button>
            <button on:click={validate}>Valider</button>
        </div>
	</div>
</dialog>

<style>
	dialog {
		max-width: 40em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        background: var(--cambridge-blue);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
        padding: 0.5em 3em;
        border-radius: 1em;
        border: none;
        background: var(--brunswick-green);
        color: var(--bone);
        cursor: pointer;
	}
    .line{
        margin-top: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2em;
    }
</style>