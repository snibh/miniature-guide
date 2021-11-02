Song = "";
leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
rem_decimal = 0;
volume = 0;
lscore = 0;

function preload() {

Song = loadSound("music.mp3")

}

function setup() {

Canvas = createCanvas(600,500);
Canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video,modelloaded);
poseNet.on('pose',gotposes);

}
function modelloaded() {

console.log("success posenet");

}
function gotposes(results) {

if( results.length > 0) 
{
  console.log(results);
  leftwristx = results[0].pose.leftWrist.x;
  leftwristy = results[0].pose.leftWrist.y;
  rightwristx = results[0].pose.rightWrist.x;
  rightwristy = results[0].pose.rightWrist.y;
  lscore = results[0].pose.keypoints[9].score;
  
} 



}
function draw() {

image(video,0,0,600,500);
fill('red');
stroke('red');

if (lscore > 0.2) {
  circle(leftwristx-60,leftwristy,20)
  leftwristy = Number(leftwristy)
  rem_decimal = floor(leftwristy)
  volume = leftwristy/500;
  document.getElementById("the").innerHTML = "Volume" + volume;
  Song.setVolume(volume)  
}



}
function play() {
Song.play();


}
