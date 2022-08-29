// ** Load Phones data

const loadPhonesData = async ()=>{
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`);
        response.ok ? console.log('Successful') : console.log('Unsuccessful');
        const data = await response.json();
        displayPhones(data)
    } catch (error) {
        console.log(error);
    }
};


// ** Display phones as card components

const displayPhones = data => {
    const {data:phones} = data;

    phones.forEach(phone => console.log(phone))
}

loadPhonesData();