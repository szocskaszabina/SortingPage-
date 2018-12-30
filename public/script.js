
var results = [];
 
function fetchState ()  {
    return fetch('/list')
    .then(res => res.json())
     .then((res) => {results = res;
                    return results;
                    })
     .then((res) => render(res))
};





window.addEventListener('load', function () {
    fetchState();

});

function render (arr) {
arr.map((item) => {
    if(item.available == 'true') {
        item.available = 'Yes'
    }
    if(item.available == 'false') { 
        item.available = 'No'
    }
    return item.available
});

console.log(arr);


    document.getElementById('list').innerHTML = arr
                                                .map((item) => `<div class="card">
                                                                <img src="${item.image}" class="card-img-top img-thumbnail img-fluid">
                                                                <div class="card-body">
                                                                <h2 class="card-title">${item.name}</h2>
                                                                <ul>
                                                                <li>${item.type}</li>
                                                                <li>${item.gender}</li>
                                                                <li>${item.color}</li>
                                                                <li>${item.size}</li>
                                                                <li>${item.price}</li>
                                                                <li>Can be ordered?  ${item.available}</li>
                                                                </ul>
                                                                <a href="/${item.id}" target="_blank"><button class="btn btn-primary">More details</button></a>
                                                                </div>
                                                                </div>
                                                                `
                                                    )
                                                .reduce((accumulator, current) => accumulator + current, []);
    if(arr.length == 0) {
        document.getElementById('list').innerHTML ='No items found!'
    }
    
    return arr;
};
document.getElementById("form").addEventListener("submit", function(e){
    e.preventDefault();
    var values = getValues(e.target.elements);
    console.log(values)

    var arrayToSort = results.slice();
    if(Boolean(values.type)) {
        arrayToSort = arrayToSort.filter((item) => item.type === values.type)
    }
    if (values.available) {
        arrayToSort = arrayToSort.slice().filter((item) => item.available === "Yes")
    }
    if(Boolean(values.gender)) {
        arrayToSort = arrayToSort.filter((item) => item.gender === values.gender)
    }
    if (values.orderby === 'asc') {
        arrayToSort = arrayToSort.slice().sort((a, b) => {return a.price - b.price} )
            } else {
            arrayToSort = arrayToSort.slice().sort((a, b) => {return b.price - a.price})
            }
    
    
    render(arrayToSort);
});

function getValues (fieldelements) {
    var fields = {};
    for (field of fieldelements) {
        
        if (field.type === 'checkbox') {
            fields[field.name] = field.checked;
        }
        if (field.type === 'select-one') {
            fields[field.name] = field.value;
        }
        if (field.type === 'radio' && field.checked === true) {
            fields[field.name] = field.value;
        }
        if (field.type === 'text') {
            fields[field.name] = field.value;
        }
        
    } return fields;
    };







