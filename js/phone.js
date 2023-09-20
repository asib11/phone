const loadApiData = async ()=>{
    try{
        const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
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
    phoneData.forEach(phones=>{
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phones.brand}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        `;
        phoneContainer.appendChild(div);
    });
}


loadApiData()