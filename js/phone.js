const loadApiData = async searchValue=>{
    try{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
        const res = await fetch(url);
        const data = await res.json();
        displayLoad(data.data);
    }
    catch(error){
        console.log('find error');
        console.log(error);
    }
}
const displayLoad = phoneData =>{
    console.log(phoneData);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    phoneData.forEach(phone=>{
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top p-4" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand}</h5>
                    <p class="card-text">Model: ${phone.phone_name}</p>
                </div>
            </div>
        `;
        phoneContainer.appendChild(div);
    });
};

document.getElementById("search-btn").addEventListener('click', ()=>{
    loadApiData(document.getElementById('search-text').value);
})


loadApiData('iphone')