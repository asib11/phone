const loadApiData = async (searchValue, dataLimit)=>{
    try{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
        const res = await fetch(url);
        const data = await res.json();
        displayLoad(data.data, dataLimit);
    }
    catch(error){
        console.log('find error');
        console.log(error);
    }
};

//display
const displayLoad = (phoneData, dataLimit) =>{
    console.log(phoneData);
    //show all data button
    const showAll = document.getElementById('show-all');
    if(dataLimit && phoneData.length > 10){
        phoneData = phoneData.slice(0,9);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }

    //display not found
    const notFound = document.getElementById("no-found");
    if(phoneData.length === 0){
        notFound.classList.remove('d-none');
    }else{
        notFound.classList.add('d-none')
    }

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    phoneData.forEach(phone=>{
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top p-5" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand}</h5>
                    <p class="card-text">Model: ${phone.phone_name}</p>

                    <button onclick="modalLoad('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">
                    Phone Details
                </button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(div);
    });
    toggleloader(false);
};

//search process
const processSearch = dataLimit=>{
    toggleloader(true);
    const serchField = document.getElementById('search-text');
    const searchValue = serchField.value ;
    loadApiData(searchValue,dataLimit);
};

//search button
document.getElementById("search-btn").addEventListener('click', ()=>{
    processSearch(10);
    // toggleloader(true);
    // const serchField = document.getElementById('search-text');
    // const searchValue = serchField.value ;
    // loadApiData(searchValue);
});

//show all btn work

document.getElementById('btn-show-all').addEventListener('click', ()=>{
    processSearch();
});

//load button
const toggleloader = isloading =>{
    const loader = document.getElementById('loader');
    if (isloading){
        loader.classList.remove("d-none");
    }else{
        loader.classList.add('d-none');
    }
};

//modal details
const modalLoad = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    modalDisplay(data.data);
};

const modalDisplay = data =>{
    document.getElementById('phoneDetailsModalLabel').innerText = data.name;
    document.getElementById('modalBody').innerHTML =`
        <p>chipset: ${data.mainFeatures.chipSet}</p>
    `;
}

//loadApiData('iphone')