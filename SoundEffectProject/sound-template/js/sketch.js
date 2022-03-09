let picture;
let imgState = 'wait';
let synth = new Tone.Synth().toDestination();
let startTime;

// let chords = new Tone.Sequence((time, note)=>{
//   synth.triggerAttackRelease(note, '8n', time);
// }, ['G4','A4','B4','C5,F4'])

function preload() {
  picture = loadImage("js/beach.gif")
}

function setup() {
  createCanvas(400, 400);
}

// function draw() {
//   background(200,15,50);
//   textSize(30);
//   text('Press mouse to start', 150, 300);
// }
function draw() {
  background(255, 255, 255);  
  if (imgState == 'wait') {
    textSize(20);
    text('Press mouse to start', 150, 200);
    if (mouseIsPressed) {
      startTime = millis();
      imgState = 'playing';
      Tone.Transport.start();

    }
  }
  else if (imgState == 'playing') {
    let time = timer();
    let totalTime = 5;
    text("Time: " + (totalTime - time), 10, 30);
    if (time >= totalTime) {
      imgState = 'end';
      Tone.Transport.stop();
    }
    image(picture, 0, 0);


  }
    else if (imgState == 'end') {
      text("Press mouse to restart", 150, 200);
      if (mouseIsPressed) {
        startTime = millis();
        imgState = 'playing';
      }
    }
    }
     function timer() {
      return int((millis() - startTime)/1000);
      
    
    }

function mousePressed() {
  let pattern = new Tone.Sequence((time, note)=>{
    synth.triggerAttackRelease(note, '4n', time);
  }, ['E4','G#4','B5','D4', 'G#4']).start();
}