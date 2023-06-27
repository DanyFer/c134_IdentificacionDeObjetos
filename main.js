objectDetector= "";
img = "";
objects = [];
statu = "";

function preload()
{
   img = loadImage("Tofu_Miet.png");
    
}
function setup()
{
    canvas = createCanvas(380, 380);
	canvas.center();
    
    video = createCapture(VIDEO);
    video.size(380, 380)
    video.hide();

    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML ="Estatus: detectando objetos"
}
function modelLoaded()
{
    console.log("cargando...");
    statu = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;

}

function draw()
{
    image(video, 0, 0, 380, 380);


    if(statu !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Estatus: objeto detectado"; 
            document.getElementById("number_of_objects").innerHTML = "El número de objetos detectados es:" + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y , objects[i].width, objects[i].height)
        }
        
    } 

    
    
}   