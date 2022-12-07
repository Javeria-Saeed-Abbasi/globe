let scene;
let camera;
let renderer;

function main()
{
    const canvas = document.querySelector('#c');
 

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
   
    camera.position.z = 2;
    scene.add(camera);  

    renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true,});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
renderer.set
    renderer.autoClear = false;
    renderer.setClearColor(0x00000, 0.0);


    // create earthgeometry

    const earthgeometry = new THREE.SphereGeometry(0.6,32,32);

    const eatrhmaterial = new THREE.MeshPhongMaterial({
        roughness : 1,
        metalness:0,
        map: THREE.ImageUtils.loadTexture('assets/images/world-map.gif'),
        bumpMap: THREE.ImageUtils.loadTexture('assets/images/earthbump.jpg'),
        bumpScale: 0.3,
        
    });

    const earthmesh = new THREE.Mesh(earthgeometry,eatrhmaterial);
    scene.add(earthmesh);

    // set ambientlight

    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
    
    scene.add(ambientlight);
   

    // set point light

    const pointerlight =  new THREE.PointLight(0xffffff,0.9);

    // set light position

    pointerlight.position.set(5,3,5);

    scene.add(pointerlight);

    // cloud
    const cloudgeometry =  new THREE.SphereGeometry(0.63,32,32);

    const cloudmaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('assets/images/earthCloud.png'),
        transparent: true
    });

    const cloudmesh = new THREE.Mesh(cloudgeometry,cloudmaterial);
    
    scene.add(cloudmesh);


    // star

    const stargeometry =  new THREE.SphereGeometry(80,64,64);

    const starmaterial = new THREE.MeshBasicMaterial({

        map: THREE.ImageUtils.loadTexture('assets/images/galaxy.png'),
        side: THREE.BackSide
    });

    const starmesh = new THREE.Mesh(stargeometry,starmaterial);

    scene.add(starmesh);
    
    //letters 

//     const loader = new THREE.FontLoader();

//     loader.load( './assets/helvetiker_regular.typeface.json', function ( font ) {

// 	const geometry = new THREE.TextGeometry( 'Hello three.js!', {
// 		font: font,
// 		size: 80,
// 		height: 5,
// 		curveSegments: 12,
// 		bevelEnabled: true,
// 		bevelThickness: 10,
// 		bevelSize: 8,
// 		bevelOffset: 0,
// 		bevelSegments: 5
// 	} );
//     const textMesh = new THREE.Mesh(geometry, [
//         new THREE.MeshPhongMaterial({ color: 'blue'}),
//         new THREE.MeshPhongMaterial({ color: 'golden'})
    
//     ])
//     scene.add(textMesh)
// } );

// const lettersTilt = new THREE.Object3D();

// scene.add(lettersTilt);
// lettersTilt.rotation.set(
//    THREE.Math.degToRad(-15),0,
//    THREE.Math.degToRad(-15)
//    );
// const lettersBase = new THREE.Object3D();

// lettersTilt.add(lettersBase);
// {
//   const letterMaterial = new THREE.MeshPhongMaterial({
//     color: '#2E8B57',
//   });  
//   const loader = new THREE.FontLoader();
//   loader.load('./assets/gentilis_regular.typeface (1).json', (font) => {
//     const spaceSize = 0;
//     let totalWidth = 0.1;
//     let maxHeight = 0.1;
//     const letterGeometries = {
//       ' ': { width: spaceSize, height: 0 }, // prepopulate space ' '
//     };
//     const size = new THREE.Vector3();
//     const str = 'the planet';
//     const letterInfos = str.split('').map((letter, ndx) => {
//       if (!letterGeometries[letter]) {
//         const geometry = new THREE.TextBufferGeometry(letter, {
//           font: font,
//           size: 1,
//           height:0,
//         //curveSegments:10,
//           bevelEnabled: true,
//           bevelThickness: 0.1,
//           bevelSize: 0.1,
//           bevelSegments: 1,
//         });
//         geometry.computeBoundingBox();
//         geometry.boundingBox.getSize(size);
//         letterGeometries[letter] = {
//           geometry,
//           width: size.x / 2, 
//           height: size.y,
//         };
//       }
//       const {geometry, width, height} = letterGeometries[letter];
//       const mesh = geometry
//           ? new THREE.Mesh(geometry, letterMaterial)
//           : null;
//       totalWidth += width ;
//       maxHeight = Math.max(maxHeight, height);
//       return {
//         mesh,
//         width,
//       };
//     });
//     let t = 0;
//     const radius = totalWidth / Math.PI;
//     for (const {mesh, width} of letterInfos) {
//       if (mesh) {
//         const offset = new THREE.Object3D();
//         lettersBase.add(offset);
//         offset.add(mesh);
//         offset.rotation.y = t / totalWidth * Math.PI * 2;
//         mesh.position.z = radius;
      
//         mesh.position.y = -maxHeight / 2;
//       }
//       t += width;
//     }
//     camera.position.z = radius * 3;
//   });
// }



    const animate = (time) =>{
       
        requestAnimationFrame(animate);
        earthmesh.rotation.y -= 0.0015;
        cloudmesh.rotation.y += 0.0015;
        starmesh.rotation.y += 0.0005;
        // circle.rotation.y += 0.0015;
        // circle.rotation.x += 0.0015;
        // lettersBase.rotation.y = time * -0.0005;
        render();
    }

    const render = () => {
        renderer.render(scene,camera);
    }

    animate();
   
      
   
}

window.onload = main;
