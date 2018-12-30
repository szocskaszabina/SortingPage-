const image = document.getElementById('mainImage');

const photos = document.querySelectorAll('.photos');

photos.forEach((element) => {
    element.addEventListener('click', (e) => {

    image.src = element.src

    })
})