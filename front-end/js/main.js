/* Module Level Variables, Constants */
const btnSelectImage = $("#btn-select-image");
const fileChooser = $("#file-chooser");
const imageElm = $("#image");
const fileNameElm = $("#file-name");
const fileSizeElm = $("#file-size");
const btnUpload = $("#btn-upload");
const pgbElm = $("#pgb");
const progressElm = $("#progress");

/* Initialization Logic */
btnUpload.attr('disabled', 'true');

/* Event Handlers, Timers */
btnSelectImage.on('click', ()=> fileChooser.trigger('click'));
fileChooser.on('change', ()=> setImagePreview());
btnUpload.on('click', ()=> uploadImage());

/* Functions */
function uploadImage(){
    pgbElm.css('width', '0%');
    progressElm.text('0%');
    const fileList = fileChooser[0].files;
    if (!fileList.length) return;

    const xhr = new XMLHttpRequest();
    const xhrUpload = xhr.upload;

    xhrUpload.addEventListener('progress', (eventData)=> {
        const uploadedSize = eventData.loaded;
        const totalSize = eventData.total;
        const progress = (uploadedSize / totalSize * 100).toFixed(2) + "%";
        pgbElm.css('width', progress);
        progressElm.text(progress);
    });

    xhr.addEventListener('readystatechange', ()=> {
        if (xhr.readyState === xhr.DONE){
            if (xhr.status === 201){
                progressElm.text("Successfully Uploaded!");
                pgbElm.css('width', '100%');
            }else{
                progressElm.text("Failed to upload, try again!");
                pgbElm.css('width', '5%');
            }
        }
    });
    xhr.open('POST', 'http://localhost:8080/gallery/uploads', true);
    const formData = new FormData();
    formData.append('image', fileList[0]);
    xhr.send(formData);
}

function setImagePreview(){
    const fileList = fileChooser[0].files;
    if (!fileList.length) return;
    const imageFile = fileList[0];
    fileNameElm.text(imageFile.name);
    fileSizeElm.text(`${(imageFile.size / 1024).toFixed(2)} KBs`);
    btnUpload.removeAttr('disabled');

    const fileReader = new FileReader();
    fileReader.addEventListener('load', (eventData)=> {
        imageElm.css('background-image', `url(${fileReader.result})`);
        btnUpload.removeAttr('disabled');
    });
    fileReader.readAsDataURL(imageFile);
}