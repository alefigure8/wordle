const messageModal = document.getElementById('message');

export function messageAlert(message){
    messageModal.classList.remove('hide');
    messageModal.classList.add('msg-animation');
    messageModal.innerHTML= `<p>${message}</p>`;

    setTimeout(() => {
    messageModal.classList.add('hide');
    messageModal.classList.remove('msg-animation');
    }, 3000);
}