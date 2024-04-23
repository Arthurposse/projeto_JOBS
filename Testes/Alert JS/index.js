// https://sweetalert2.github.io/#download

const button = document.querySelector('button');

button.addEventListener('click', function () {
    Swal.fire({
        title: "Sucesso!!",
        text: "Sem problemas!",
        icon: "success"
    });
})