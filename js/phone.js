    const loadPhone = async (searchText=13, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}



const displayPhones = (phones, isShowAll) =>{
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all', isShowAll)
    
  if(!isShowAll){
    phones = phones.slice(0,12);
  }

    phones.forEach(phone => {
        //  console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        phoneCard.innerHTML = `
        <figure>
                      <img
                        src="${phone.image}"
                        alt="Shoes" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetail('${phone.slug}');show_details_modal.showModal()"
                         class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    ToggleLoadingSpine(false);
}

const handleShowDetail = async(id) =>{
    // console.log('clicked show details',id);
    // load single data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
     phoneName.innerText = phone.name;

     const showDetailContainer = document.getElementById('show-detail-container');
     showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" />
        <p><span>Storage : </span>${phone?.mainFeatures?.storage}<p>
        <p><span>GPS : </span>${phone?.others?.GPS || 'No GPS'}</p>


     `


    // show the modal
    show_details_modal.showModal()
}


// handle search button
const handleSearch = (isShowAll)=>{
    ToggleLoadingSpine();
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}
// const handleSearch2 = ()=>{
//     ToggleLoadingSpine(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }

const ToggleLoadingSpine = (isLoading) =>{
    const loadingSpine = document.getElementById('loading-spine');
    if(isLoading){
        loadingSpine.classList.remove('hidden');
    }
    else{
        loadingSpine.classList.add('hidden');
    }

}
// handle show all
const handleShowAll = () =>{
    handleSearch(true);

}

loadPhone();
