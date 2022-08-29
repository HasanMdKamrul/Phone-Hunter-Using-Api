// ** loader sppiner toggler

const loaderToggler = isLoading =>{
    const loader = document.getElementById('loader-section');
    isLoading ?  loader.classList.remove('d-none') :  loader.classList.add('d-none');
}

// ** Load Phones data

const loadPhonesData = async (search,dataLimit)=>{
    try {
        if (search) {
            const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
            response.ok ? console.log('Successful') : console.log('Unsuccessful');
            const data = await response.json();
            displayPhones(data,dataLimit)
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

const displayPhones = (data,dataLimit) => {
    // ** Where to display phones

    const phonesContainer = document.getElementById('phone-container');

    phonesContainer.textContent = ``;

    // ** get Data to show in ui

    let {data:phones} = data;

    // ** When no phones data found

    // where to show no data found

    const noDataContainer = document.getElementById('no-data');

    phones.length === 0 ? noDataContainer.classList.remove('d-none') : noDataContainer.classList.add('d-none')

    // ** Display phones only 10

    // ** when search is clicked tokhon ami dataLimit onujaye data chai

    const showAllContainer = document.getElementById('show-all');
    const showLessContainer = document.getElementById('show-less')

    if (phones.length > dataLimit) {
        phones = phones.slice(0,dataLimit);
        showAllContainer.classList.remove('d-none')
        showLessContainer.classList.add('d-none')

    } else{
        showAllContainer.classList.add('d-none');
        showLessContainer.classList.remove('d-none')
    }

    console.log(phones)

    phones.forEach(phone => {
        // console.log(phone)
        const {brand,image,phone_name,slug} = phone;
        
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
            <button data-bs-toggle="modal"
            data-bs-target="#phoneDetails" onclick="loadPhoneDetail('${slug}')" class="text-light btn btn-dark">View Details</button>
            </div>
        </div>
        `;

        phonesContainer.appendChild(divContent);

    });

    // ** loader stopped here
    loaderToggler(false);
};

// ** loadPhoneDetail

const loadPhoneDetail = async id => {
    try {
        const response = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
        response.ok ? console.log('Success') : console.log('Unsuccessful');
        const data = await response.json();
        displayPhoneDetail(data)
    } catch (error) {
        console.log(error)
    }
};

const displayPhoneDetail = phones => {
    const {data} = phones;
    console.log(data)
    const {name,releaseDate,mainFeatures} = data;
    
    const {sensors,chipSet} = mainFeatures;

    const title = document.getElementById('phoneDetailsLabel');
    title.innerText = name;
    const detailsContainer = document.getElementById('show-details');

    detailsContainer.innerHTML = `
    <h1>Chipset: ${mainFeatures ? chipSet : "No data found"}</h1>
    <h2>ReleaseDate: ${data ? releaseDate : "No releaseDate found"}</h2>
    <small class="text-info">Sensonrs: ${mainFeatures ? sensors.map(sensor => sensor): "No sensor found"} </small>
    
    `
}

// ** process search

const processSearch = (isSearching)=>{

    if (isSearching) {
        // ** loader starts here
        loaderToggler(true);
        const searchText = document.getElementById('search-input').value;
        loadPhonesData(searchText,10);
    } else if (isSearching === false) {
        loaderToggler(true);
        const searchText = document.getElementById('search-input').value;
        loadPhonesData(searchText);
    } else{
        loadPhonesData();
    }
     
}

// ** Search for the phones

document.getElementById('button-addon2').addEventListener('click',()=>{
    processSearch(true)
});

// ** search-input field e enter key chaple data show korbe

// ** Search input filed enter functionality

document.getElementById('search-input').addEventListener('keypress', (event)=>{
    event.key === 'Enter' && processSearch(true);
})


document.getElementById('btn-show-all').addEventListener('click',()=>{
    processSearch(false);
});

document.getElementById('btn-show-less').addEventListener('click',()=>{
    processSearch(true)
})

processSearch()
