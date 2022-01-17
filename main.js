song_1 = "";
song_2 = "";
song1_status= "";
song2_status="";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftwrist = 0;
scoreRightwrist = 0;

function preload(){
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('poseNet is initialized');
}

function draw(){
    image(video, 0, 0, 600, 500);

     song1_status = song_1.isPlaying();
     song2_status = song_2.isPlaying();

    fill("#ff0000");
    stroke("ff0000");

    if(scoreLeftwrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song_1.stop();
        if(song2_status == false){
            song_2.play();
        document.getElementById("song").innerHTML = "playing Peter pan ";
        }
    }
        if(scoreRightwrist > 0.2){
            circle(rightWristX, rightWristY, 20);
            song_2.stop();
            if(song1_status == false){
                song_1.play();
            document.getElementById("song").innerHTML = "playing Harry potter ";
            }
        }
}

function play(){
    song.play();
  //  song_2.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = "+ scoreLeftwrist);
        scoreRightwrist = results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist = "+ scoreRightwrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX + ", leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX + ", rightWristY = "+ rightWristY);
    }
}