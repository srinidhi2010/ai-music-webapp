music1 = "";
music2 = "";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
scoreLeftWrist = 0;
scoreRightWrist =0;
songRightStatus="";
songLeftStatus="";

function preload(){
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}
function modelLoaded(){
    console.log('PoseNet is initialized');
} 
function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    songLeftStatus = music1.isPlaying();
    songRightStatus =music2.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        music2.stop();
        if(songLeftStatus=="false"){
            music1.play();
            document.getElementById('name').innerHTML="Song 1";
        }
    }
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        music1.stop();
        if(songRightStatus=="false"){
            music2.play();
            document.getElementById('name').innerHTML="Song 2";
        }
    }
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist= results[0].pose.keypoints[10].score;

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX +" leftWristY = "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);
    }}