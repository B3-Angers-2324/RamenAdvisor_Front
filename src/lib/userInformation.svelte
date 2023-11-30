<script>
    import CustomInput from "./customInput.svelte";
    import SHA256 from 'crypto-js/sha256';
    import { API_URL } from "../main";
    import CustomSelect from "./customSelect.svelte";

    let name = "";
    let surname = "";
    let date = "";
    let city = "";
    let address = "";
    let email = "";
    let phone = "";
    let password = "";
    let sexe = "";
    let confirmPassword = "";

    let error = "";

    const areStringValide = (...str) => {
        return str.every(str => str && str.trim() !== "");
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if(!areStringValide(name, surname, date, city, address, email, password, confirmPassword, sexe, phone)){
            error = "Please fill all the fields";
            return;
        }
        if(!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
            error = "Invalid email address";
            return;
        }
        if(password != confirmPassword){
            error = "Passwords don't match";
            return;
        }
        if(new Date(date) > new Date()){
            error = "Invalid date";
            return;
        }
        let passwordHash = SHA256(password).toString();
        const data = {
            firstName: name,
            lastName: surname,
            birthDay: date,
            email: email,
            phone: phone,
            sexe: sexe,
            ville: city,
            address: address,
            password: passwordHash
        }

        const apiRequest = API_URL + new URL(e.target.action).pathname;

        fetch(apiRequest, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    error = "";
                    localStorage.setItem("token", data.token);
                    window.location.href = "/";
                } else {
                    error = data.message;
                }
            })
    }
    let genderOptions = {
        'Cis': ['Cisgender', 'Cis female', 'Cis male', 'Cis man', 'Cis woman'],
        'Trans': ['Trans', 'Trans*', 'Trans female', 'Trans male', 'Trans man', 'Trans person', 'Trans woman'],
        'Transgender': ['Transgender', 'Transgender female', 'Transgender male', 'Transgender man', 'Transgender person', 'Transgender woman'],
        'Transsexual': ['Transsexual', 'Transsexual female', 'Transsexual male', 'Transsexual man', 'Transsexual person', 'Transsexual woman'],
        'Female': ['Cis female', 'Trans female', 'Transgender female', 'Transsexual female'],
        'Male': ['Cis male', 'Trans male', 'Transgender male', 'Transsexual male'],
        'Other Genders': [
        'Abinary', 'Agender', 'Ambigender', 'Androgyne', 'Androgynous', 'Aporagender', 'Autigender', 'Bakla', 'Bigender',
        'Binary', 'Bissu', 'Butch', 'Calabai', 'Calalai', 'Demi-boy', 'Demi-flux', 'Demi-gender', 'Demi-girl', 'Demi-guy',
        'Demi-man', 'Demi-woman', 'Dual gender', 'Faʻafafine', 'Femme', 'FTM', 'Gender bender', 'Gender diverse', 'Gender gifted',
        'Genderfae', 'Genderfluid', 'Genderflux', 'Genderfuck', 'Genderless', 'Gender nonconforming', 'Genderqueer', 'Gender questioning',
        'Gender variant', 'Graygender', 'Hijra', 'Intergender', 'Intersex', 'Kathoey', 'Māhū', 'Male to female', 'Man of trans experience',
        'Maverique', 'Meta-gender', 'MTF', 'Multigender', 'Muxe', 'Neither', 'Neurogender', 'Neutrois', 'Non-binary', 'Non-binary transgender',
        'Omnigender', 'Other', 'Pangender', 'Person of transgendered experience', 'Polygender', 'Sekhet', 'Third gender', 'Travest',
        'Trigender', 'Tumtum', 'Two spirit', 'Vakasalewalewa', 'Waria', 'Winkte', 'Woman', 'Woman of trans experience', 'X-gender',
        'X-jendā', 'Xenogender'
        ]
    };
</script>

<userInformation>
    <form action="/user/register" on:submit|preventDefault={handleRegisterSubmit}>
        <CustomInput type="text" required text="Nom" bind:value={name}/>
        <CustomInput type="text" required text="Prénom" bind:value={surname}/>
        <CustomSelect text="Sexe" bind:value={sexe} required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            {#each Object.entries(genderOptions) as [group, options]}
              <optgroup label={group}>
                {#each options as option}
                  <option value={option}>{option}</option>
                {/each}
              </optgroup>
            {/each}
          </CustomSelect>
        <div class="inline">
            <CustomInput type="date" required text="Date" showValid bind:value={date}/>
            <CustomInput type="phone" required text="Téléphone" bind:value={phone}/>
        </div>
        <CustomInput type="text" text="Ville"  bind:value={city}/>
        <CustomInput type="text" required text="Adresse" bind:value={address}/>
        <CustomInput type="email" required text="Email" bind:value={email}/>
        <CustomInput type="password" required text="Mot de passe" bind:value={password}/>
        <CustomInput type="password" required text="Confirmer mot de passe" bind:value={confirmPassword}/>
        <p class="error">{error}</p>
        <button type="submit">Valider</button>
    </form>
</userInformation>

<style lang="scss">
    .error{
        color: var(--error);
    }
    userInformation{
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;

        form{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            flex-direction: column;
            gap: calc(var(--spacing) / 1.25);

            .inline{
                display: flex;
                flex-direction: row;
                gap: calc(var(--spacing) / 2);
                width: 100%;
            }

            button[type="submit"]{
                background-color: var(--brunswick-green);
                color: var(--bone);
                border: none;
                height: 2.5em;
                width: 50%;
                font-size: 1.2em;
                padding: 10px 0;
                border-radius: var(--radius);
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>