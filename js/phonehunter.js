// ** loader sppiner toggler

const loaderToggler = isLoading =>{
    const loader = document.getElementById('loader-section');
    isLoading ?  loader.classList.remove('d-none') :  loader.classList.add('d-none');
}

// ** Load Phones data

const loadPhonesData = async (search)=>{
    try {
        if (search) {
            const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
            response.ok ? console.log('Successful') : console.log('Unsuccessful');
            const data = await response.json();
            displayPhones(data)
        } else {
            loaderToggler(true)
            const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=iPhone`);
            response.ok ? console.log('Successful') : console.log('Unsuccessful');
            const data = await response.json();
            displayPhones(data)
        }
        
    } catch (error) {
        console.log(error);
    }
};


// ** Display phones as card components

const displayPhones = data => {
    // ** Where to display phones

    const phonesContainer = document.getElementById('phone-container');

    phonesContainer.textContent = ``;

    // ** get Data to show in ui

    const {data:phones} = data;

    // ** When no phones data found

    // where to show no data found

    const noDataContainer = document.getElementById('no-data');

    phones.length === 0 ? noDataContainer.classList.remove('d-none') : noDataContainer.classList.add('d-none')

    // ** Display phones only 10

    phones.slice(0,10).forEach(phone => {
        // console.log(phone)
        const {brand,image,phone_name} = phone;
        const divContent = document.createElement('div');
        divContent.classList.add('col');
        divContent.classList.add('rounded-lg');
        divContent.innerHTML = `
        <div class="card shadow-lg">
        <img src="${image}" class="card-img-top p-3 rounded" alt="..." />
            <div class="card-body">
            <h5 class="card-title text-warning">${brand}</h5>
            <p class="card-text">
                ${phone_name}
            </p>
            </div>
        </div>
        `;

        phonesContainer.appendChild(divContent);

    });

    // ** loader stopped here
    loaderToggler(false);
};


// ** Search for the phones

document.getElementById('button-addon2').addEventListener('click',()=>{
    // ** loader starts here
    loaderToggler(true);
    const searchText = document.getElementById('search-input').value;
    loadPhonesData(searchText);
    document.getElementById('search-input').value = '';
});

loadPhonesData();

