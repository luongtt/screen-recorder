'use strict';

let uploadURL = window.location.origin + "/upload_file";
let data_video = [];
let recorder = null;

function startRecorder() {
    let constraints = {
        video: true,
        audio: false,
        preferCurrentTab: true
    };
    navigator.mediaDevices.getDisplayMedia(constraints).then(saveRecording).catch(streamError);
}

function stopRecorder() {
    recorder.state === "recording" && recorder.stop();
}

function streamError(error) {
    console.log(error);
}

function saveRecording(stream) {
    recorder = new MediaRecorder(stream);
    data_video = [];
    recorder.ondataavailable = handleOnDataRecording;
    recorder.onstop = handleStopRecording;
    recorder.onerror = handleErrorRecording;
    recorder.start();
    console.log("Recording is start");
}

function handleOnDataRecording(event) {
    data_video.push(event.data);
}

function handleStopRecording(_event) {
    console.log("Recording is stop");
    uploadVideo(data_video);
}

function handleErrorRecording(event) {
    console.log("Recording is error", event);
}

function uploadVideo(data_video) {
    // server take binary video from data. save to file .webm
    let recordedBlob = new Blob(data_video, {type: "video/webm"});
    let xhr = new XMLHttpRequest();
    xhr.open('POST', uploadURL, true);
    xhr.send(recordedBlob);
    console.log("Upload video successfully");
}
