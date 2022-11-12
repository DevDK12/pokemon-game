const canvas = document.querySelector('canvas');

//* Context API to draw all kinds of things in container
const c = canvas.getContext('2d'); //! c = context
console.log(c)


canvas.width = 1024;
canvas.height = 576;

c.fillStyle = 'white';
// c.fillRect(x coords, y coords, width, height)
c.fillRect(0, 0, canvas.width, canvas.height); //* Black fill default



//? Import and Render Map

//* native js to create image element
const image = new Image();
image.src = './img/Pellet Town.png';


// c.drawImage('./img/Pellet Town.png') //! cant reference string 
// c.drawImage(image, x coord, y coord); //! image loading takes time


image.addEventListener('load', (e)=>{
    
    //* Use negative values for providing offset
    c.drawImage(image, -740, -600);
})

//? Player Creation
const playerImage = new Image();
playerImage.src = './img/playerDown.png';

playerImage.addEventListener('load', (e)=>{
    
    //* This places image's (top,top) to center of body but not image's center to center
    // c.drawImage(playerImage, canvas.width/2, canvas.height/2 );

    //* This is perfect center (without cropping)
    // c.drawImage(playerImage, 
    //     canvas.width/2 - playerImage.width/2,
    //     canvas.height/2 - playerImage.height/2, 
    // );

    //* imported game using spreadsheet so we need to crop image also 
    c.drawImage(playerImage, 
        //- Cropping image 
        0,// (x coordinate , default left:0)
        0,// (y coordinate , default top:0)
        playerImage.width/4,// crop width
        playerImage.height, // crop height
        
        //- positioning image
        canvas.width/2 - playerImage.width/8, // coord of rendered image
        canvas.height/2 - playerImage.height/2, 
        playerImage.width/4,// widht to render cropped image
        playerImage.height, // height to render cropped image
    );
});




//? Moving player thorugh map on keydown


//- Getting kwys pressed

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    },
}

//* Tracking last key
let lastKey = '';

window.addEventListener('keydown', (e)=>{

    if(e.key === 'w' || e.key==='W' || e.key==='ArrowUp'){
        keys.w.pressed = true;
        lastKey = 'w';
    }
    else if(e.key === 'a' || e.key==='A' || e.key==='ArrowLeft'){
        keys.a.pressed = true;
        lastKey = 'a';
    }
    else if(e.key === 's' || e.key==='S' || e.key==='ArrowDown'){
        keys.s.pressed = true;
        lastKey = 's';
    }
    else if(e.key === 'd' || e.key==='D' || e.key==='ArrowRight'){
        keys.d.pressed = true;
        lastKey = 'd';
    }
    // console.log(keys);
})

//* make sure to set keys to false those are already released by 'keyup' event
window.addEventListener('keyup', (e)=>{

    if(e.key === 'w' || e.key==='W' || e.key==='ArrowUp'){
        keys.w.pressed = false;
    }
    else if(e.key === 'a' || e.key==='A' || e.key==='ArrowLeft'){
        keys.a.pressed = false;
    }
    else if(e.key === 's' || e.key==='S' || e.key==='ArrowDown'){
        keys.s.pressed = false;
    }
    else if(e.key === 'd' || e.key==='D' || e.key==='ArrowRight'){
        keys.d.pressed = false;
    }
    // console.log(keys);
})



//- Animating background 

//* requestAnimationFrame is like setInterval i.e. calls call-back at definite interval
//* Interval is such that it matches browser and device speed and performance
//* But its more optimised as requestAnimationFrame is paused when tab is switched
//* and many more optimisations 

//* We can use it like recursively to call animation again and again
//* This will repaint animation (kind of re render)

function animate1(){
    // window.requestAnimationFrame(animate1);

    c.drawImage(image, -740, -600);
    c.drawImage(playerImage, 
        0,
        0,
        playerImage.width/4,
        playerImage.height, 
        
        canvas.width/2 - playerImage.width/8,
        canvas.height/2 - playerImage.height/2, 
        playerImage.width/4,
        playerImage.height,
    );

    console.log('animate');
}
// animate1()



//- Convert this all to class and its methods

class Sprite {
    constructor({position, velocity, image}){
        this.position = position
        this.image = image
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

const background = new Sprite({
    position:{
        x:-740,
        y:-600,
    },
    image:image
})



function animate(){
    window.requestAnimationFrame(animate);

    background.draw();
    c.drawImage(playerImage, 
        0,
        0,
        playerImage.width/4,
        playerImage.height, 
        
        canvas.width/2 - playerImage.width/8,
        canvas.height/2 - playerImage.height/2, 
        playerImage.width/4,
        playerImage.height,
    );
    console.log('animate');

    //* Using last key to prevent diagonal movement with multiple keys
    //* and overriding previous keys pressed when we press multiple keys
    
    if(keys.w.pressed && lastKey === 'w')
        background.position.y += 3;
    if(keys.s.pressed && lastKey === 's')
        background.position.y -= 3;
    if(keys.a.pressed && lastKey === 'a')
        background.position.x += 3;
    if(keys.d.pressed && lastKey === 'd')
        background.position.x -= 3;
}
animate()







