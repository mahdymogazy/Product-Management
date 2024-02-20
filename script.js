let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood ='create';
let tmp;

// get total
function gettotal() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040'; // Fix: Use 'backgroundColor' instead of 'background'
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = '#a00d02'; // Fix: Use 'backgroundColor' instead of 'background'
    }
}

// create product
let datapro;
if (localStorage.product !== undefined) { // Check if it's defined
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}

submit.onclick = function() {
    let newpro = {
        title: title.value.tolowercase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.tolowercase(),
    };

    if(mood === 'create'){
        if(newpro.count > 1){
                for(let i= 0; i <newpro.count; i++){
                 datapro.push(newpro);
               }
             }else{
                datapro.push(newpro);
             }
    }else{
        datapro[tmp]=newpro;
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block'; 
    }



    datapro.push(newpro);
    // save local storage
    localStorage.setItem('product', JSON.stringify(datapro));
    cleardata();
    showdata();
};

// clear inputs
function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// show data
function showdata() {
    gettotal();
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title ? datapro[i].title : ''}</td>
                <td>${datapro[i].price ? datapro[i].price : ''}</td>
                <td>${datapro[i].taxes ? datapro[i].taxes : ''}</td>
                <td>${datapro[i].ads ? datapro[i].ads : ''}</td>
                <td>${datapro[i].discount ? datapro[i].discount : ''}</td>
                <td>${datapro[i].total ? datapro[i].total : ''}</td>
                <td>${datapro[i].count ? datapro[i].count : ''}</td>
                <td>${datapro[i].category ? datapro[i].category : ''}</td>
                <td><button onclick="updatedata(${i})" id="update">update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btndelete = document.getElementById('deleteall');
    if (datapro.length > 0) {
        btndelete.innerHTML = `
            <button onclick="deleteall()">delete all (${datapro.length})</button>
        `;
    } else {
        btndelete.innerHTML = '';
    }
}
showdata();

// delete data
function deletedata(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showdata();
}

// delete all
function deleteall() {
    localStorage.clear();
    datapro = [];
    showdata();
}

//update
function updatedata(i){
//   console.log(i)
title.value=datapro[i].title;
price.value=datapro[i].price;
taxes.value=datapro[i].taxes;
ads.value=datapro[i].ads;
discount.value=datapro[i].discount;
gettotal()
count.style.display ='none';
category.value=datapro[i].category;
submit.innerHTML = 'Update';
mood = 'update';
tmp=i;
scroll({
    top:0,
    behavior:'smooth',
})
} 
// search
let serchmood = 'title';

function getsearchmood(id) {
    let search = document.getElementById('search');
    if (id === 'searchtitle') {
        serchmood = 'title';
        search.Placeholder = 'search by title'
    } else {
        serchmood = 'catogery';
        search.Placeholder = 'search by catogery '

    }
    search.focus()
    search.value = '';
    showdata()
    // console.log(serchmood);
}
function searchdata(value)
{
    let table = '';
    if(serchmood == 'title')
    {
      for(let i=0 ; i < datapro.length; i++){
        if(datapro[i].title.includes(value.tolowercase())){
            table += `
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title ? datapro[i].title : ''}</td>
                <td>${datapro[i].price ? datapro[i].price : ''}</td>
                <td>${datapro[i].taxes ? datapro[i].taxes : ''}</td>
                <td>${datapro[i].ads ? datapro[i].ads : ''}</td>
                <td>${datapro[i].discount ? datapro[i].discount : ''}</td>
                <td>${datapro[i].total ? datapro[i].total : ''}</td>
                <td>${datapro[i].count ? datapro[i].count : ''}</td>
                <td>${datapro[i].category ? datapro[i].category : ''}</td>
                <td><button onclick="updatedata(${i})" id="update">update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
            </tr>
        `;
        }
      }
    }else{
        {
            for(let i=0 ; i < datapro.length; i++){
              if(datapro[i].catogery.includes(value.tolowercase())){
                  table += `
                  <tr>
                      <td>${i}</td>
                      <td>${datapro[i].title ? datapro[i].title : ''}</td>
                      <td>${datapro[i].price ? datapro[i].price : ''}</td>
                      <td>${datapro[i].taxes ? datapro[i].taxes : ''}</td>
                      <td>${datapro[i].ads ? datapro[i].ads : ''}</td>
                      <td>${datapro[i].discount ? datapro[i].discount : ''}</td>
                      <td>${datapro[i].total ? datapro[i].total : ''}</td>
                      <td>${datapro[i].count ? datapro[i].count : ''}</td>
                      <td>${datapro[i].category ? datapro[i].category : ''}</td>
                      <td><button onclick="updatedata(${i})" id="update">update</button></td>
                      <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                  </tr>
              `;
              }
            }
    }
    //  console.log(value);
    document.getElementById('tbody').innerHTML = table;

}