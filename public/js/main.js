function dropHandler(ev) {
    console.log('File(s) dropped'); 
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
            var file = ev.dataTransfer.items[i].getAsFile();
            console.log('... file[' + i + '].name = ' + file.name);
        }
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        }
    }
}
function dragOverHandler(ev) {
    console.log('File(s) in drop zone');
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}
// Get access to the camera!
function takeShot() {
    var video = document.getElementById('video');
    document.getElementById('camera').classList.remove('hideMe');
    document.getElementById('canvas').classList.add('hideMe');
    document.getElementById('closeCamera').classList.remove('hideMe');
    document.getElementsByClassName('BlackLayer')[0].classList.remove('hideMe');
    document.getElementById('uploadIt').classList.add('hideMe');
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        });
    }
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function() {
        document.getElementById('camera').classList.add('hideMe');
        context.drawImage(video, 0, 0, 640, 480);
        document.getElementById('uploadIt').classList.remove('hideMe');
        document.getElementById('canvas').classList.remove('hideMe');
    });
}

function closeCamera() {
    document.getElementById('canvas').classList.add('hideMe');
    document.getElementById('camera').classList.add('hideMe');
    document.getElementById('closeCamera').classList.add('hideMe');
    document.getElementById('uploadIt').classList.add('hideMe');
    document.getElementsByClassName('BlackLayer')[0].classList.add('hideMe');
}