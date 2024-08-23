import * as THREE from 'three';
import { FirstPersonControls } from './player.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { PlayerController } from './player.js';
import { Player } from './player.js';
import { ThirdPersonCamera } from './player.js';








let water;
class Main {
    static init() {
        var canvasRef = document.getElementById("canvas");
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight,
            0.1, 1000
        );


        this.renderer = new THREE.WebGLRenderer({ canvas: canvasRef, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 1.0);
        this.renderer.shadowMap.enabled = true;


        this.manualBox = new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(0.1, 0.1, 0.1));
        this.boxHelper = new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2)));
        this.scene.add(this.boxHelper);
       


       










        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            'assets/Gothamskybox/CubemapGotham_R.jpg',  // Right
            'assets/Gothamskybox/CubemapGotham_L.jpg',   // Left
            'assets/Gothamskybox/CubemapGotham_D.jpg',    // Top
            'assets/Gothamskybox/CubemapGotham_U.jpg', // Bottom
            'assets/Gothamskybox/CubemapGotham_F.jpg',  // Front
            'assets/Gothamskybox/CubemapGotham_B.jpg'    // Back
        ]);
        this.scene.background = texture;


        // Plane
        var planeTexture = new THREE.TextureLoader().load('assets/plainstone/cobble.png');
        let planeMaterial = new THREE.MeshPhongMaterial({ map: planeTexture, side: THREE.DoubleSide, });
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 18, 6), planeMaterial);
        plane.rotation.x = - Math.PI / 2;
        plane.position.set(0, 0.1, 6.4);
        plane.receiveShadow = true;
        plane.castShadow = true;
        this.scene.add(plane);
















        //=================================== TAMBAHAN PROPERTI ======================================
        //=================================== TAMBAHAN PROPERTI ======================================
        // + STREET LAMP
        // + PLANE COBBLE STONE
        // + FENCE
        // + GATE
        // + JAIL HOUSE
        // + WATCH TOWER
        // + BOX SURFACE AND BASKETBALL COURT


        //----------------------------- BASKET BALL COURT ---------------------------------------
        var basketballCourtTexture = new THREE.TextureLoader().load('assets/BasketBall/basketballcourt.jpg');
        let basketballCourtMaterial = new THREE.MeshPhongMaterial({ map: basketballCourtTexture, side: THREE.DoubleSide });
        var slimBoxGeometry = new THREE.BoxGeometry(4, 0.15, 2); // width, height (slim), depth
        var slimBox = new THREE.Mesh(slimBoxGeometry, basketballCourtMaterial);
        slimBox.position.set(1, 0.03, 5.6);
        slimBox.rotation.y = Math.PI / 2;
        slimBox.receiveShadow = true;
        slimBox.castShadow = true;
        this.scene.add(slimBox);




        var loaderObjectHoop2;
        const loaderHoop = new FBXLoader();
        loaderHoop.load('assets/BasketBall/basketballhoop.fbx', (loadedObjectHoop) => {
            loadedObjectHoop.traverse((childHoop) => {
                if (childHoop.isMesh) {
                    childHoop.castShadow = true;
                    childHoop.receiveShadow = true;
                }
            });
            loadedObjectHoop.scale.set(0.1, 0.12, 0.1);
            loadedObjectHoop.position.set(1, 0.1, 3.77);
            this.scene.add(loadedObjectHoop);


            this.player.addBox(new THREE.Box3().setFromObject(loadedObjectHoop));
            boxHelper1 = new THREE.BoxHelper(loadedObjectHoop);
            //this.scene.add(boxHelper1);






            // Clone the entire loaded object instead of childHoop
            loaderObjectHoop2 = loadedObjectHoop.clone();
            loaderObjectHoop2.traverse((childHoop) => {
                if (childHoop.isMesh) {
                    childHoop.castShadow = true;
                    childHoop.receiveShadow = true;
                }
            });
            loaderObjectHoop2.scale.set(0.1, 0.12, 0.1);
            loaderObjectHoop2.rotation.y = Math.PI;
            loaderObjectHoop2.position.set(1, 0.1, 7.41);
            this.scene.add(loaderObjectHoop2);


            this.player.addBox(new THREE.Box3().setFromObject(loaderObjectHoop2));
            boxHelper1 = new THREE.BoxHelper(loaderObjectHoop2);
            //this.scene.add(boxHelper1);
            this.boxes = this.player.boxes;


        });
        //----------------------------------------------------------------------------------------


        //---------------------------------- JOKER IN A BOX --------------------------------------
      //---------------------------------- JOKER IN A BOX --------------------------------------
       //---------------------------------- JOKER IN A BOX --------------------------------------
       var boxHelperJoker;
       var jokerTexture = new THREE.TextureLoader().load('assets/Joker/IOS_Joker_V_Diff.jpg');
       const loaderJoker = new FBXLoader();
       loaderJoker.load('assets/Joker/Joker.fbx', (loadedObjectJoker) => {
           loadedObjectJoker.traverse((childJoker) => {
               const jokerMaterial = new THREE.MeshPhongMaterial({
                   map: jokerTexture
               });
               if (childJoker.isMesh) {
                   childJoker.material = jokerMaterial;
                   childJoker.castShadow = true;
                   childJoker.receiveShadow = true;
               }
           });
           loadedObjectJoker.scale.set(0.001, 0.001, 0.001);
           loadedObjectJoker.position.set(-1.6, 0.1985, 3.9);
           loadedObjectJoker.rotation.x = -(Math.PI / 2);
           loadedObjectJoker.rotation.z = (Math.PI / 2);
           this.scene.add(loadedObjectJoker);
           
           const boxGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.5);
           const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
           const boxPlatform = new THREE.Mesh(boxGeometry, boxMaterial);
           boxPlatform.position.set(-1.6, 0.15, 3.9);
           boxPlatform.castShadow = true;
           boxPlatform.receiveShadow = true;
           this.scene.add(boxPlatform);

           const boxGeometryPrison = new THREE.BoxGeometry(0.5, 0.3, 0.5); 
           const boxMaterialPrison = new THREE.MeshStandardMaterial({
               color: 0x88ccff,
               transparent: true,
               opacity: 0.5, 
               roughness: 0.1,
               metalness: 0.1
           });
           const transparentBox = new THREE.Mesh(boxGeometryPrison, boxMaterialPrison);
           transparentBox.position.set(-1.6, 0.35, 3.9); 
           transparentBox.castShadow = true;
           transparentBox.receiveShadow = true;
           this.scene.add(transparentBox);

           this.player.addBox(new THREE.Box3().setFromObject(transparentBox));
        //    boxHelperJoker = new THREE.BoxHelper(transparentBox);
        //    this.scene.add(boxHelperJoker);
       });
       //----------------------------------------------------------------------------------------
      //----------------------------------------------------------------------------------------
        //----------------------------------------------------------------------------------------


                //------------------------------------ CLOUD ---------------------------------------------
                var geometryCLOUD = new THREE.BoxGeometry();
                var materialCLOUD = new THREE.MeshBasicMaterial({ 
                    color: 0x808080, // Grey color
                    transparent: true,
                    opacity: 0.2 // Set opacity to make it look like fog
                });
                var cubeCLOUD = new THREE.Mesh(geometryCLOUD, materialCLOUD);
                cubeCLOUD.position.set(0, 5, 4);
                cubeCLOUD.scale.set(6, 1, 14);
                this.scene.add(cubeCLOUD);
                //----------------------------------------------------------------------------------------


        //=================================== Bat Signal =========================================
        var buildingBox, boxHelper1;
        var mixer;
        var batSpotlight = new THREE.SpotLight(0xFFFFFF, 10000, 30000, 0.1, 0);
        const loaderSignal = new FBXLoader();
        loaderSignal.load('assets/bat-signal/batsignal.fbx', (loadedObjectSignal) => {
            loadedObjectSignal.traverse((childSignal) => {
                if (childSignal.isMesh) {
                    childSignal.castShadow = true;
                    childSignal.receiveShadow = true;
                }
            });
            loadedObjectSignal.scale.set(0.0005, 0.0005, 0.0005);
            loadedObjectSignal.position.set(-0.5, 7.3, 0.74);
            loadedObjectSignal.rotation.y = -(Math.PI / 2);
            this.scene.add(loadedObjectSignal);
            this.player.addBox(new THREE.Box3().setFromObject(loadedObjectSignal));
            // boxHelper1 = new THREE.BoxHelper(loadedObjectSignal);
            // this.scene.add(boxHelper1);
        });

        batSpotlight.castShadow = true;
        // var geometrySphere = new THREE.SphereGeometry(10, 10, 10);
        // var materialSphere = new THREE.MeshPhongMaterial({ color: 0x393433 });
        // var Sphere = new THREE.Mesh(geometrySphere, materialSphere);
        // Sphere.position.set(0, 8, 5);
        // Sphere.scale.set(0.1, 0.1, 0.1);
        // Sphere.receiveShadow = true;
        // this.scene.add(Sphere);

        // Set the spotlight target to the sphere
        // batSpotlight.target = Sphere;
        this.scene.add(batSpotlight.target);

        const loader2 = new FBXLoader();
        loader2.load('assets/bat-signal/batlogo.fbx', (loadedObject2) => {
            mixer = new THREE.AnimationMixer(loadedObject2);

            loadedObject2.traverse((child2) => {
                if (child2.isMesh) {
                    child2.castShadow = true;
                    child2.receiveShadow = true;
                }
            });

            loadedObject2.scale.set(0.0001, 0.0001, 0.0001);
            loadedObject2.position.set(-0.55, 7.65, 0.78);
            loadedObject2.castShadow = true;
            this.scene.add(loadedObject2);
            loadedObject2.add(batSpotlight);
            let batlogo = loadedObject2.clone();
            

            // Set properties for batlogo
            batlogo.scale.set(0.0005, 0.0005, 0.0005);
            batlogo.position.set(-0.47, 7.2, 1.07);

            // Attach batSpotlight to batlogo
            batSpotlight.target = batlogo;
            // batlogo.target.set(1, 0, 5.5);

            // Add batlogo and its target to the scene
            this.scene.add(batlogo);
            this.scene.add(batSpotlight.target);
            //   const spotlightHelper = new THREE.SpotLightHelper(batSpotlight);
            //             this.scene.add(spotlightHelper);

        });

        // Add batSpotlight to the scene
        // this.scene.add(batSpotlight);

        //=================================== Bat Signal =========================================
        //----------------------------- PLANE COBBLE STONE ---------------------------------------
        // var planeCobbleTexture = new THREE.TextureLoader().load('cobblestone/cobble.png');
        // let planeCobbleMaterial = new THREE.MeshPhongMaterial({ map: planeCobbleTexture, side: THREE.DoubleSide, });
        // var planeCobble = new THREE.Mesh(new THREE.PlaneGeometry(7, 6.6), planeCobbleMaterial);
        // planeCobble.rotation.x = - Math.PI / 2;
        // planeCobble.position.set(0, 0, 6.3);
        // planeCobble.receiveShadow = true;
        // planeCobble.castShadow = true;
        // this.scene.add(planeCobble);
        //----------------------------------------------------------------------------------------








        //------------------------------------- SEAT ---------------------------------------------
        var loadedObjectSeat2;
        const loaderSeat = new FBXLoader();
        loaderSeat.load('assets/Equipments/ShrimpleStair.fbx', (loadedObjectSeat) => {
            loadedObjectSeat.traverse((childSeat) => {
                if (childSeat.isMesh) {
                    childSeat.castShadow = true;
                    childSeat.receiveShadow = true;
                }
            });
            loadedObjectSeat.scale.set(0.003, 0.0008, 0.001);
            loadedObjectSeat.rotation.y = Math.PI / 2;
            loadedObjectSeat.position.set(2.6, 0, 4.55);
            this.scene.add(loadedObjectSeat);




            loadedObjectSeat2 = loadedObjectSeat.clone();
            loadedObjectSeat2.traverse((childSeat) => {
                if (childSeat.isMesh) {
                    childSeat.castShadow = true;
                    childSeat.receiveShadow = true;
                }
            });
            loadedObjectSeat2.scale.set(0.003, 0.0008, 0.001);
            loadedObjectSeat2.rotation.y = Math.PI / 2;
            loadedObjectSeat2.position.set(2.6, 0, 6.55);
            this.scene.add(loadedObjectSeat2);
        });
        //----------------------------------------------------------------------------------------








        //-------------------------------------- GYM ---------------------------------------------
        var gymcarpetTexture = new THREE.TextureLoader().load('assets/Equipments/carpet.jpg');
        let gymcarpetMaterial = new THREE.MeshPhongMaterial({ map: gymcarpetTexture, side: THREE.DoubleSide });
        var carpetGeometry = new THREE.BoxGeometry(1.2, 0.05, 2.2); // width, height (slim), depth
        var carpetBox = new THREE.Mesh(carpetGeometry, gymcarpetMaterial);
        carpetBox.position.set(0.65, 0.1, 8.4);
        carpetBox.rotation.y = Math.PI / 2;
        carpetBox.receiveShadow = true;
        carpetBox.castShadow = true;
        this.scene.add(carpetBox);


       




        var loadedObjectGym2;
        const loaderGym = new FBXLoader();
        this.scene.add(slimBoxGeometry);
        loaderGym.load('assets/Equipments/gym.fbx', (loadedObjectGym) => {
            loadedObjectGym.traverse((childGym) => {
                if (childGym.isMesh) {
                    childGym.castShadow = true;
                    childGym.receiveShadow = true;
                }
            });
            loadedObjectGym.scale.set(0.001, 0.001, 0.001);
            loadedObjectGym.position.set(1.4, 0.13, 8.2);
            loadedObjectGym.rotation.y = Math.PI / 2;
            this.scene.add(loadedObjectGym);




            loadedObjectGym2 = loadedObjectGym.clone();
            loadedObjectGym2.traverse((childGym) => {
                if (childGym.isMesh) {
                    childGym.castShadow = true;
                    childGym.receiveShadow = true;
                }
            });
            loadedObjectGym2.scale.set(0.0001, 0.0001, 0.001);
            loadedObjectGym2.position.set(0.4, 0.1, 8.2);
            loadedObjectGym2.rotation.y = Math.PI / 2;
            this.scene.add(loadedObjectGym2);
        });
        //----------------------------------------------------------------------------------------








        //--------------------------------- STREET LAMP ------------------------------------------
        var lamp, lamp2, spotlight1, spotlight2, spotlight3;
        var prisonLamp1, prisonLamp2, prisonLamp3;
        var spotlight4, spotlight5, spotlight6;
        new MTLLoader()
            .setPath('assets/Street lamp/')
            .load('StreetLamp.mtl', (materials2) => {
                materials2.preload();
                new OBJLoader()
                    .setMaterials(materials2)
                    .setPath('assets/Street lamp/')
                    .load('StreetLamp.obj', (object2) => {
                        object2.traverse(function (child) {
                            if (child instanceof THREE.Mesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;




                                // Mengganti material lampu dengan MeshStandardMaterial
                                child.material = new THREE.MeshStandardMaterial({
                                    color: 0xaaaaaa, // Warna dasar
                                    roughness: 0.5, // Kekasaran, lebih rendah berarti lebih mengkilap
                                    metalness: 0.7, // Faktor metalness
                                    emissive: 0x000000, // Warna emisif
                                    emissiveIntensity: 0.5, // Intensitas emisif
                                    envMapIntensity: 1 // Intensitas peta lingkungan
                                });
                            }
                        });
                        //###################### OUTSIDE #############################
                        object2.scale.set(0.04, 0.1, 0.03);
                        object2.position.set(-2, 0.08, 2);
                        this.scene.add(object2);




                        spotlight1 = new THREE.SpotLight(0xffffff, 5, 0, 0.5, 0.8);
                        spotlight1.castShadow = true;
                        spotlight1.scale.set(0.01, 0.01, 0.01);
                        spotlight1.position.set(7, 14, 0); // Posisi spotlight relatif terhadap lampu jalan
                        spotlight1.target.position.set(7, 0, 0); // Target spotlight
                        spotlight1.target.scale.set(0.1, 0.1, 0.1);
                        object2.add(spotlight1);
                        object2.add(spotlight1.target);
                        // const spotlightHelper = new THREE.SpotLightHelper(spotlight1);
                        // this.scene.add(spotlightHelper);








                        lamp = object2.clone();
                        lamp.scale.set(0.05, 0.1, 0.03);
                        lamp.position.set(-2, 0.08, 0);
                        this.scene.add(lamp);




                        spotlight2 = new THREE.SpotLight(0xffffff, 5, 0, 0.5, 0.8);
                        spotlight2.castShadow = true;
                        spotlight2.scale.set(0.01, 0.01, 0.01);
                        spotlight2.position.set(7, 14, 0); // Posisi spotlight relatif terhadap lampu jalan
                        spotlight2.target.position.set(7, 0, 0); // Target spotlight
                        spotlight2.target.scale.set(0.1, 0.1, 0.1);
                        lamp.add(spotlight2);
                        lamp.add(spotlight2.target);
                        // const spotlightHelper2 = new THREE.SpotLightHelper(spotlight2);
                        // this.scene.add(spotlightHelper2);








                        lamp2 = object2.clone();
                        lamp2.scale.set(0.05, 0.1, 0.03);
                        lamp2.position.set(-2, 0.08, -2);
                        this.scene.add(lamp2);




                        spotlight3 = new THREE.SpotLight(0xffffff, 5, 0, 0.5, 0.8);
                        spotlight3.castShadow = true;
                        spotlight3.scale.set(0.01, 0.01, 0.01);
                        spotlight3.position.set(7, 14, 0); // Posisi spotlight relatif terhadap lampu jalan
                        spotlight3.target.position.set(7, 0, 0); // Target spotlight
                        spotlight3.target.scale.set(0.1, 0.1, 0.1);
                        lamp2.add(spotlight3);
                        lamp2.add(spotlight3.target);
                        // const spotlightHelper3 = new THREE.SpotLightHelper(spotlight3);
                        // this.scene.add(spotlightHelper3);
                        //############################################################




                        //####################### INSIDE #############################
                        prisonLamp1 = object2.clone();
                        prisonLamp1.scale.set(0.05, 0.1, 0.03);
                        prisonLamp1.rotation.y = Math.PI / 2;
                        prisonLamp1.position.set(0.4, -0.01, 9.2);
                        this.scene.add(prisonLamp1);




                        spotlight4 = new THREE.SpotLight(0xffffff, 5, 0, 0.5, 0.8);
                        spotlight4.castShadow = true;
                        spotlight4.scale.set(0.01, 0.01, 0.01);
                        spotlight4.position.set(7, 14, 0); // Posisi spotlight relatif terhadap lampu jalan
                        spotlight4.target.position.set(7, 0, 0); // Target spotlight
                        spotlight4.target.scale.set(0.1, 0.1, 0.1);
                        prisonLamp1.add(spotlight4);
                        prisonLamp1.add(spotlight4.target);
                        // const spotlightHelper4 = new THREE.SpotLightHelper(spotlight4);
                        // this.scene.add(spotlightHelper4);












                        prisonLamp2 = object2.clone();
                        prisonLamp2.scale.set(0.05, 0.1, 0.03);
                        prisonLamp2.rotation.y = Math.PI;
                        prisonLamp2.position.set(2.5, -0.05, 5.6);
                        this.scene.add(prisonLamp2);




                        spotlight5 = new THREE.SpotLight(0xffffff, 5, 0, 0.5, 0.8);
                        spotlight5.castShadow = true;
                        spotlight5.scale.set(0.01, 0.01, 0.01);
                        spotlight5.position.set(7, 14, 0); // Posisi spotlight relatif terhadap lampu jalan
                        spotlight5.target.position.set(20, 0, 0); // Target spotlight
                        spotlight5.target.scale.set(0.1, 0.1, 0.1);
                        prisonLamp2.add(spotlight5);
                        prisonLamp2.add(spotlight5.target);
                        // const spotlightHelper5 = new THREE.SpotLightHelper(spotlight5);
                        // this.scene.add(spotlightHelper5);












                        prisonLamp3 = object2.clone();
                        prisonLamp3.scale.set(0.05, 0.1, 0.03);
                        prisonLamp3.position.set(-1, -0.05, 4.2);
                        this.scene.add(prisonLamp3);




                        spotlight6 = new THREE.SpotLight(0xffffff, 5, 0, 0.5, 0.8);
                        spotlight6.castShadow = true;
                        spotlight6.scale.set(0.01, 0.01, 0.01);
                        spotlight6.position.set(7, 14, 0); // Posisi spotlight relatif terhadap lampu jalan
                        spotlight6.target.position.set(7, 0, 0); // Target spotlight
                        prisonLamp3.add(spotlight6);
                        prisonLamp3.add(spotlight6.target);
                        // const spotlightHelper6 = new THREE.SpotLightHelper(spotlight6);
                        // this.scene.add(spotlightHelper6);
                        //############################################################




                        // Tambahkan pencahayaan ambient
                        const ambientLight = new THREE.AmbientLight(0x404040, 1); // Warna ambient dan intensitas
                        this.scene.add(ambientLight);
                    });
            });
        //----------------------------------------------------------------------------------------






       






        //------------------------------------------ GATE ----------------------------------------
        // Define gate object globally or in a scope accessible to both openGate function and event listener
        let loadedObjectGate;
        let gateOpen = false;
        let gateBox;
       


        const loaderGate = new FBXLoader();
        loaderGate.load('assets/gate/gate.fbx', (object) => {
            loadedObjectGate = object;


            loadedObjectGate.traverse((childGate) => {
                if (childGate.isMesh) {
                    childGate.castShadow = true;
                    childGate.receiveShadow = true;
                }
            });


            loadedObjectGate.scale.set(0.01, 0.009, 0.01);
            loadedObjectGate.position.set(0.65, 0.1, 2.61);


            this.scene.add(loadedObjectGate);
            gateBox = new THREE.Box3().setFromObject(loadedObjectGate);
            const boxHelper1 = new THREE.BoxHelper(loadedObjectGate);
            //this.scene.add(boxHelper1);


            // Add gateBox to player's collision detection when the gate is initially closed
            this.player.addBox(gateBox);
        });


       


        function animateGate(targetX) {
            let currentX = loadedObjectGate.position.x;
            const step = 0.01; // Adjust step size as needed for smoother animation


            function updatePosition() {
                if (Math.abs(targetX - currentX) <= step) {
                    // Close enough to target, stop animation
                    loadedObjectGate.position.x = targetX;
                    cancelAnimationFrame(animationFrame);
                    gateOpen = !gateOpen; // Toggle gateOpen state
                    updatePlayerCollision(); // Update player collision status after gate moves
                    return;
                }


                if (targetX > currentX) {
                    currentX += step;
                } else {
                    currentX -= step;
                }


                loadedObjectGate.position.x = currentX;
                animationFrame = requestAnimationFrame(updatePosition);
            }


            animationFrame = requestAnimationFrame(updatePosition);
        }


        // Function to toggle player collision with the gate
        function updatePlayerCollision() {
            if (gateOpen) {
                // Gate is open, remove collision box
                player.removeBox(gateBox);
            } else {
                // Gate is closed, add collision box
                player.addBox(gateBox);
            }
        }


        // Function to open or close the gate
        function openGate() {
            if (!gateOpen) {
                animateGate(loadedObjectGate.position.x + 0.75); // Move right by 0.75 units
            } else {
                closeGate();
            }
        }


        function closeGate() {
            if (gateOpen) {
                animateGate(loadedObjectGate.position.x - 0.75); // Move left by 0.75 units
            }
        }


        // Event listener for keydown event
        document.addEventListener('keydown', (event) => {
            if (event.key === 'g') {
                openGate();
                console.log('Toggled gate');
            }
        });


        //----------------------------------------------------------------------------------------


        //-------------------------------------- Gate tidak buka---------------------------------------


        var loaderGate2;
        const loaderGate3 = new FBXLoader();
        loaderGate3.load('assets/gate/gate.fbx', (object) => {
            loaderGate2 = object;
            loaderGate2.traverse((childGate) => {
                if (childGate.isMesh) {
                    childGate.castShadow = true;
                    childGate.receiveShadow = true;
                }
            });
            loaderGate2.scale.set(0.01, 0.009, 0.01);
            loaderGate2.position.set(-3.13, 0.1, 8.87);
            this.scene.add(loaderGate2);
            this.player.addBox(new THREE.Box3().setFromObject(loaderGate2));
            boxHelper1 = new THREE.BoxHelper(loaderGate2);
            //this.scene.add(boxHelper1);
        });
        //----------------------------------------------------------------------------------------






        //------------------------------------------ FENCE ---------------------------------------
        var loaderfence2, loaderfence3, loaderfence4, loaderfence5, loaderfence6, loaderfence7, loaderfence8, loaderfence9, loaderfence10, loaderfence11, loaderfence12, loaderfence13, loaderfence14, loaderfence15, loaderfence16, loaderfence17, loaderfence18, loaderfence19, loaderfence20;
        const loaderfence = new FBXLoader();
        loaderfence.load('assets/Fence/fence.fbx', (loaderfence) => {
            loaderfence.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            });
            loaderfence.scale.set(0.01, 0.009, 0.01);
            loaderfence.position.set(-0.62, 0.45, 3.1);
            loaderfence.rotation.y = Math.PI / 2;
            this.scene.add(loaderfence);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence));
            boxHelper1 = new THREE.BoxHelper(loaderfence);
            //this.scene.add(boxHelper1);


            loaderfence2 = loaderfence.clone();
            loaderfence2.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            });
            loaderfence2.scale.set(0.01, 0.009, 0.01);
            loaderfence2.position.set(-1.85, 0.45, 3.1);
            loaderfence2.rotation.y = Math.PI / 2;
            this.scene.add(loaderfence2);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence2));
            boxHelper1 = new THREE.BoxHelper(loaderfence2);
            //this.scene.add(boxHelper1);


            loaderfence3 = loaderfence.clone();
            loaderfence3.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            });
            loaderfence3.scale.set(0.01, 0.009, 0.01);
            loaderfence3.position.set(-3.08, 0.45, 3.1);
            loaderfence3.rotation.y = Math.PI / 2;
            this.scene.add(loaderfence3);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence3));
            boxHelper1 = new THREE.BoxHelper(loaderfence3);
            //this.scene.add(boxHelper1);


            loaderfence4 = loaderfence.clone();
            loaderfence4.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            });
            loaderfence4.scale.set(0.01, 0.009, 0.01);
            loaderfence4.position.set(1.5, 0.45, 3.1);
            loaderfence4.rotation.y = Math.PI / 2;
            this.scene.add(loaderfence4);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence4));
            boxHelper1 = new THREE.BoxHelper(loaderfence4);
            //this.scene.add(boxHelper1);


            loaderfence5 = loaderfence.clone();
            loaderfence5.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            });
            loaderfence5.scale.set(0.01, 0.009, 0.01);
            loaderfence5.position.set(2.72, 0.45, 3.1);
            loaderfence5.rotation.y = Math.PI / 2;
            this.scene.add(loaderfence5);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence5));
            boxHelper1 = new THREE.BoxHelper(loaderfence5);
            //this.scene.add(boxHelper1);


            loaderfence6 = loaderfence.clone();
            loaderfence6.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            });
            loaderfence6.scale.set(0.01, 0.009, 0.01);
            loaderfence6.position.set(3.371, 0.45, 3.78);
            loaderfence6.rotation.y = Math.PI;
            this.scene.add(loaderfence6);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence6));
            boxHelper1 = new THREE.BoxHelper(loaderfence6);
            //this.scene.add(boxHelper1);


            loaderfence7 = loaderfence.clone();
            loaderfence7.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            });
            loaderfence7.scale.set(0.01, 0.009, 0.01);
            loaderfence7.position.set(3.371, 0.45, 5.01);
            loaderfence7.rotation.y = Math.PI;
            this.scene.add(loaderfence7);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence7));
            boxHelper1 = new THREE.BoxHelper(loaderfence7);
            //this.scene.add(boxHelper1);


            loaderfence8 = loaderfence.clone();
            loaderfence8.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            }
            );
            loaderfence8.scale.set(0.01, 0.009, 0.01);
            loaderfence8.position.set(3.371, 0.45, 6.24);
            loaderfence8.rotation.y = Math.PI;
            this.scene.add(loaderfence8);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence8));
            boxHelper1 = new THREE.BoxHelper(loaderfence8);
            //this.scene.add(boxHelper1);


            loaderfence9 = loaderfence.clone();
            loaderfence9.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            }
            );
            loaderfence9.scale.set(0.01, 0.009, 0.01);
            loaderfence9.position.set(3.371, 0.45, 7.47);
            loaderfence9.rotation.y = Math.PI;
            this.scene.add(loaderfence9);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence9));
            boxHelper1 = new THREE.BoxHelper(loaderfence9);
            //this.scene.add(boxHelper1);


            loaderfence10 = loaderfence.clone();
            loaderfence10.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            }
            );
            loaderfence10.scale.set(0.01, 0.009, 0.01);
            loaderfence10.position.set(3.371, 0.45, 8.7);
            loaderfence10.rotation.y = Math.PI;
            this.scene.add(loaderfence10);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence10));
            boxHelper1 = new THREE.BoxHelper(loaderfence10);
            //this.scene.add(boxHelper1);
           
            loaderfence11 = loaderfence.clone();
            loaderfence11.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            }
            );
            loaderfence11.scale.set(0.01, 0.009, 0.01);
            loaderfence11.position.set(2.72, 0.45, 9.351);
            loaderfence11.rotation.y = Math.PI/2;
            this.scene.add(loaderfence11);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence11));
            boxHelper1 = new THREE.BoxHelper(loaderfence11);
            //this.scene.add(boxHelper1);
           
            loaderfence12 = loaderfence.clone();
            loaderfence12.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            }
            );
            loaderfence12.scale.set(0.01, 0.009, 0.01);
            loaderfence12.position.set(1.5, 0.45, 9.351);
            loaderfence12.rotation.y = Math.PI/2;
            this.scene.add(loaderfence12);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence12));
            boxHelper1 = new THREE.BoxHelper(loaderfence12);
            //this.scene.add(boxHelper1);


            loaderfence13 = loaderfence.clone();
            loaderfence13.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            }
            );
            loaderfence13.scale.set(0.01, 0.009, 0.01);
            loaderfence13.position.set(0.29, 0.45, 9.351);
            loaderfence13.rotation.y = Math.PI/2;
            this.scene.add(loaderfence13);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence13));
            boxHelper1 = new THREE.BoxHelper(loaderfence13);
            //this.scene.add(boxHelper1);


            loaderfence14 = loaderfence.clone();
            loaderfence14.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            }
            );
            loaderfence14.scale.set(0.01, 0.009, 0.01);
            loaderfence14.position.set(-1.02, 0.45, 9.351);
            loaderfence14.rotation.y = Math.PI/2;
            this.scene.add(loaderfence14);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence14));
            boxHelper1 = new THREE.BoxHelper(loaderfence14);
            //this.scene.add(boxHelper1);


            loaderfence15 = loaderfence.clone();
            loaderfence15.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            }
            );
            loaderfence15.scale.set(0.01, 0.009, 0.01);
            loaderfence15.position.set(-2.33, 0.45, 9.351);
            loaderfence15.rotation.y = Math.PI/2;
            this.scene.add(loaderfence15);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence15));
            boxHelper1 = new THREE.BoxHelper(loaderfence15);
            //this.scene.add(boxHelper1);


            loaderfence16 = loaderfence.clone();
            loaderfence16.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            }
            );
            loaderfence16.scale.set(0.01, 0.009, 0.01);
            loaderfence16.position.set(-3.731, 0.45, 3.78);
            loaderfence16.rotation.y = Math.PI;
            this.scene.add(loaderfence16);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence16));
            boxHelper1 = new THREE.BoxHelper(loaderfence16);
            //this.scene.add(boxHelper1);


            loaderfence17 = loaderfence.clone();
            loaderfence17.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            }
            );
            loaderfence17.scale.set(0.01, 0.009, 0.01);
            loaderfence17.position.set(-3.731, 0.45, 5.01);
            loaderfence17.rotation.y = Math.PI;
            this.scene.add(loaderfence17);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence17));
            boxHelper1 = new THREE.BoxHelper(loaderfence17);
            //this.scene.add(boxHelper1);


            loaderfence18 = loaderfence.clone();
            loaderfence18.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            }
            );
            loaderfence18.scale.set(0.01, 0.009, 0.01);
            loaderfence18.position.set(-3.731, 0.45, 6.24);
            loaderfence18.rotation.y = Math.PI;
            this.scene.add(loaderfence18);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence18));
            boxHelper1 = new THREE.BoxHelper(loaderfence18);
            //this.scene.add(boxHelper1);


            loaderfence19 = loaderfence.clone();
            loaderfence19.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            }
            );
            loaderfence19.scale.set(0.01, 0.009, 0.01);
            loaderfence19.position.set(-3.731, 0.45, 7.47);
            loaderfence19.rotation.y = Math.PI;
            this.scene.add(loaderfence19);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence19));
            boxHelper1 = new THREE.BoxHelper(loaderfence19);
            //this.scene.add(boxHelper1);


            loaderfence20 = loaderfence.clone();
            loaderfence20.traverse((childfence) => {
                if (childfence.isMesh) {
                    childfence.castShadow = true;
                    childfence.receiveShadow = true;
                }
            }
            );


            loaderfence20.scale.set(0.01, 0.009, 0.01);
            loaderfence20.position.set(-3.731, 0.45, 8.7);
            loaderfence20.rotation.y = Math.PI;
            this.scene.add(loaderfence20);
            this.player.addBox(new THREE.Box3().setFromObject(loaderfence20));
            boxHelper1 = new THREE.BoxHelper(loaderfence20);
            //this.scene.add(boxHelper1);
           
        });
        //----------------------------------------------------------------------------------------








        //--------------------------------- JAIL HOUSE -------------------------------------------
        var jail2, jail3, jail4;
        var brickTexture = new THREE.TextureLoader().load('assets/Jail/K_BuildingB_09.jpg');
        const loaderJail = new FBXLoader();
        loaderJail.load('assets/Jail/K_Building B_09.fbx', (loadedObjectJail) => {
            loadedObjectJail.traverse((childJail) => {
                const brickMaterial = new THREE.MeshPhongMaterial({
                    map: brickTexture, 
                    // gak perlu ambient = material batu
                    color: 0x7f7f7f, // warna diffuse
                    specular: 0x111111, // warna specular
                    shininess: 0.5,      // tingkat shininess
                });
                if (childJail.isMesh) {
                    childJail.material = brickMaterial;
                    childJail.castShadow = true;
                    childJail.receiveShadow = true;
                }
            });
            loadedObjectJail.scale.set(0.001, 0.001, 0.001);
            loadedObjectJail.rotation.y = - (Math.PI / 2);
            loadedObjectJail.position.set(-2, 0.1, 7.8);
            this.scene.add(loadedObjectJail);


            jail2 = loadedObjectJail.clone();
            jail2.scale.set(0.001, 0.001, 0.001);
            jail2.position.set(-2, 0.1, 7);
            this.scene.add(jail2);


            jail3 = loadedObjectJail.clone();
            jail3.scale.set(0.001, 0.001, 0.001);
            jail3.position.set(-2, 0.1, 6.2);
            this.scene.add(jail3);


            jail4 = loadedObjectJail.clone();
            jail4.scale.set(0.001, 0.001, 0.001);
            jail4.position.set(-2, 0.1, 5.4);
            this.scene.add(jail4);

            this.player.addBox(new THREE.Box3().setFromObject(loadedObjectJail));
            boxHelper1 = new THREE.BoxHelper(loadedObjectJail);
            // this.scene.add(boxHelper1);

            this.player.addBox(new THREE.Box3().setFromObject(jail2));
            boxHelper1 = new THREE.BoxHelper(jail2);
            // this.scene.add(boxHelper1);

            this.player.addBox(new THREE.Box3().setFromObject(jail3));
            boxHelper1 = new THREE.BoxHelper(jail3);
            // this.scene.add(boxHelper1);

            this.player.addBox(new THREE.Box3().setFromObject(jail4));
            boxHelper1 = new THREE.BoxHelper(jail4);
            // this.scene.add(boxHelper1);
        });
        //----------------------------------------------------------------------------------------








        //------------------------------- WATCH TOWER --------------------------------------------
        const loaderTower = new FBXLoader();
        loaderTower.load('assets/WatchTower/wooden watch tower2.fbx', (loadedObjectTower) => {
            loadedObjectTower.traverse((childTower) => {
                if (childTower.isMesh) {
                    childTower.castShadow = true;
                    childTower.receiveShadow = true;
                }
            });
            loadedObjectTower.scale.set(0.002, 0.002, 0.002);
            loadedObjectTower.position.set(2.4, 0.0, 8.4);
            this.scene.add(loadedObjectTower);


            this.player.addBox(new THREE.Box3().setFromObject(loadedObjectTower));
            boxHelper1 = new THREE.BoxHelper(loadedObjectTower);
            //this.scene.add(boxHelper1);
        });
        //----------------------------------------------------------------------------------------


        //=================================== TAMBAHAN PROPERTI ======================================
        //=================================== TAMBAHAN PROPERTI ======================================


        //=================================== Speaker Tower ======================================


        const loaderSpeaker = new FBXLoader();
        loaderSpeaker.load('assets/loudspeaker-tower/source/Tower.FBX', (loadedObjectSpeaker) => {
            loadedObjectSpeaker.traverse((childSpeaker) => {
                if (childSpeaker.isMesh) {
                    childSpeaker.castShadow = true;
                    childSpeaker.receiveShadow = true;
                }
            });
            loadedObjectSpeaker.scale.set(0.001, 0.001, 0.001);
            loadedObjectSpeaker.position.set(-1.09, 0.0, 8.5);
            this.scene.add(loadedObjectSpeaker);
            this.player.addBox(new THREE.Box3().setFromObject(loadedObjectSpeaker));
            boxHelper1 = new THREE.BoxHelper(loadedObjectSpeaker);
            //this.scene.add(boxHelper1);
        });


        //=================================== Speaker Tower ======================================


        //=================================== Picnic_table ======================================
        const loaderPicnic = new FBXLoader();
        loaderPicnic.load('assets/picnic/picnic.fbx', (loadedObjectPicnic) => {
            loadedObjectPicnic.traverse((childPicnic) => {
                if (childPicnic.isMesh) {
                    childPicnic.castShadow = true;
                    childPicnic.receiveShadow = true;
                }
            });
            loadedObjectPicnic.scale.set(0.0015, 0.0015, 0.0015);
            loadedObjectPicnic.position.set(-0.4, 0.1, 7);
            loadedObjectPicnic.rotation.y = Math.PI / 2;
            this.scene.add(loadedObjectPicnic);
           
        });


        //=================================== Picnic_table ======================================
        //=================================== Batman_statue ======================================
        const loaderStatue= new FBXLoader();
        loaderStatue.load('assets/batman_Statue/ORN_Statues_Batman.fbx', (loadedObjectStatue) => {
            loadedObjectStatue.traverse((childStatue) => {
                if (childStatue.isMesh) {
                    childStatue.castShadow = true;
                    childStatue.receiveShadow = true;
                }
            });
            loadedObjectStatue.scale.set(0.15,0.15,0.15);
            loadedObjectStatue.position.set(0.7,0,5.5);
            loadedObjectStatue.rotation.y = Math.PI;
            this.scene.add(loadedObjectStatue);
        
            const center = loadedObjectStatue.position.clone();
            const size = new THREE.Vector3(0.4,1,0.4); // Adjust the size as needed
            const statueBox = new THREE.Box3().setFromCenterAndSize(center, size);
            this.player.addBox(statueBox);
        
            const boxHelper1 = new THREE.BoxHelper(loadedObjectStatue);
            //this.scene.add(boxHelper1);
            
        });
       

         //=================================== Batman_statue ======================================
        












        // Declare loadedObject7 in a scope accessible to both functions
        let loadedObject7;


        new MTLLoader()
            .setPath('assets/gotham1/')
            .load('Gotham_Skyline_BuildingBlock03b.mtl', (materials2) => {
                materials2.preload();
                new OBJLoader()
                    .setMaterials(materials2)
                    .setPath('assets/gotham1/')
                    .load('Gotham_Skyline_BuildingBlock03b.obj', (object2) => {
                        object2.traverse(function (child) {
                            if (child instanceof THREE.Mesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                            }
                        });
                        this.scene.add(object2);
                        object2.scale.set(0.0003, 0.0003, 0.0003);
                        object2.position.set(0, 0, 0)
                        this.player.addBox(new THREE.Box3().setFromObject(object2));
                        boxHelper1 = new THREE.BoxHelper(object2);
                        //this.scene.add(boxHelper1);
                    });
            });

           




        var buildingBox, boxHelper1;
    

        const loaderGar = new FBXLoader();
        loaderGar.load('assets/gotham2/gargoyle/Gargoyle_Ram_v2.fbx', (loadedObjectGar) => {
            loadedObjectGar.traverse((childGar) => {
                if (childGar.isMesh) {
                    childGar.castShadow = true;
                    childGar.receiveShadow = true;
                }
            });
            loadedObjectGar.scale.set(0.001,0.001,0.001);
            loadedObjectGar.position.set(0, 7.5, 0.8);
            
            this.scene.add(loadedObjectGar);
            this.player.addBox(new THREE.Box3().setFromObject(loadedObjectGar));
            boxHelper1 = new THREE.BoxHelper(loadedObjectGar);
            //this.scene.add(boxHelper1);
        });


let animationFrame = null; // Declare animationFrame globally
        let transparencyActive = false; // Track transparency state globally
      
       
        const loader7 = new FBXLoader();
        loader7.load('assets/batwing/Batwing_ArkhamKnight.fbx', (object) => {
            loadedObject7 = object;
            object.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material = new THREE.MeshPhongMaterial({
                        map: child.material.map,
                        color: 0x888888, // Diffuse color (gray)
                        ambient: 0x555555, // Ambient color (dark gray)
                        specular: 0x333333, // Specular color (medium gray)
                        shininess: 30, // Shininess of the material
                        transparent: true, // Make the material transparent
                        opacity: 1 // Set the opacity to 1
                    });
                }
            });
            object.scale.set(0.00085, 0.00085, 0.00085);
            object.position.set(2, 7.3, 1);
            object.rotation.y = -90;
            this.scene.add(object);
            this.player.addBox(new THREE.Box3().setFromObject(object));
            // const boxHelper2 = new THREE.BoxHelper(object);
            // this.scene.add(boxHelper2);
        });
       
        function toggleTransparency() {
            if (loadedObject7) {
                const targetOpacity = transparencyActive ? 1.0 : 0.2; // Target opacity based on current state
                transparencyActive = !transparencyActive; // Toggle transparency state
                animateOpacity(targetOpacity); // Start the animation
            }
        }
       
        // Function to smoothly animate opacity
        function animateOpacity(targetOpacity) {
            const speed = 0.05; // Adjust speed for smoother animation
       
            function updateOpacity() {
                let allUpdated = true; // Track if all materials are updated
       
                loadedObject7.traverse((child) => {
                    if (child.isMesh) {
                        const material = child.material;
                        const deltaOpacity = targetOpacity > material.opacity ? speed : -speed;
                       
                        if (Math.abs(targetOpacity - material.opacity) < Math.abs(deltaOpacity)) {
                            material.opacity = targetOpacity; // Set directly if within a single step
                        } else {
                            material.opacity += deltaOpacity; // Incrementally adjust opacity
                        }
       
                        material.needsUpdate = true; // Ensure material updates in Three.js
       
                        if (material.opacity !== targetOpacity) {
                            allUpdated = false; // Not all materials have reached the target opacity
                        }
                    }
                });
       
                if (!allUpdated) {
                    animationFrame = requestAnimationFrame(updateOpacity); // Continue animation if needed
                }
            }
       
            // Start the animation
            cancelAnimationFrame(animationFrame); // Cancel any previous animation frame
            animationFrame = requestAnimationFrame(updateOpacity);
        }
       
        document.addEventListener('keydown', (event) => {
            if (event.key === 'r') {
                toggleTransparency();
                console.log('Toggled transparency');
            }
        });







        new MTLLoader()
            .setPath('assets/city/')
            .load('GothamCity_LP1.mtl', (materials5) => {
                materials5.preload();
                new OBJLoader()
                    .setMaterials(materials5)
                    .setPath('assets/city/')
                    .load('GothamCity_LP1.obj', (object5) => {
                        object5.traverse((child) => {
                            if (child instanceof THREE.Mesh) {
                                // Example of setting custom properties
                                child.material = new THREE.MeshPhongMaterial({
                                    color: 0x888888,
                                    specular: 0x111111,
                                    shininess: 30,
                                    ambient: 0x888888, // Ambient color
                                    emissive: 0x000000, // Emissive color (glow)
                                    map: child.material.map // Keep existing map
                                });
                                child.castShadow = true;
                                child.receiveShadow = true;
                            }
                        });
                        object5.scale.set(2.5, 2.5, 2.5);
                        // object5.rotation.y = 3;
                        object5.position.set(0, 0, 10);
                        this.scene.add(object5);
                    });
            });








        // Directional Light
       // Direktional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Tingkatkan intensitas ke 0.5 atau sesuaikan sesuai kebutuhan
directionalLight.position.set(3, 10, 15); // Tinggikan posisi agar mencakup lebih banyak area
directionalLight.castShadow = true;

// Atur ukuran shadow map untuk kualitas yang lebih baik
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;

directionalLight.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 74.85);

// Tambahkan light ke scene
this.scene.add(directionalLight);

// Helper untuk visualisasi directional light
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
// this.scene.add(directionalLightHelper);

        

        // ThirdPersonCamera
        var thirdPersonCamera = new ThirdPersonCamera(
            this.camera, new THREE.Vector3(0, 0.2, -3.3), new THREE.Vector3(0, 0.18, 0));
        thirdPersonCamera.zoomOut(3);


        var controller = new PlayerController();


        this.player = new Player(
            thirdPersonCamera,
            controller,
            this.scene,
            10,
            new THREE.Vector3(0, 10, 0)
        );
        this.player.addBox(new THREE.Box3().setFromObject(plane));
        boxHelper1 = new THREE.BoxHelper(plane);
        //this.scene.add(boxHelper1);


        this.player.addBox(new THREE.Box3().setFromObject(carpetBox));
        boxHelper1 = new THREE.BoxHelper(carpetBox);
        //this.scene.add(boxHelper1);




        // Set initial camera mode
        this.cameraMode = 'thirdPerson';


        this.controller = controller;
        this.cameraModeSwitch = false; // untuk deteksi toggle
        this.firstPersonControls = new FirstPersonControls(this.camera, this.renderer.domElement);
        this.firstPersonControls.lookSpeed = 0.1;
        this.firstPersonControls.movementSpeed = 5;
        this.firstPersonControls.activeLook = false; // Supaya tidak aktif saat ThirdPerson
     
    }


   


    static updateManualBox() {
        // Set the position of the manualBox based on the camera position
        const center = this.camera.position.clone();
        const size = new THREE.Vector3(0.1, 0.1, 0.1); // Adjust the size as needed
        this.manualBox.setFromCenterAndSize(center, size);




        // Update the boxHelper to reflect changes in manualBox
        this.boxHelper.setFromObject(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))); // Adjust the size to match manualBox
        this.boxHelper.position.copy(center);
        console.log(this.manualBox.max.x);
        console.log(this.manualBox.min.x);
    }






    static render(dt) {
        this.player.update(dt, this.cameraMode);
        switch (this.cameraMode) {
            case 'roam':
                this.updateFreeRoamCamera(dt);
                break;
            case 'firstPerson':
                this.updateFirstPersonCamera(this.controller.keys.sprint, this.controller.keys.punch);
                this.firstPersonControls.update(dt);
                break;
        }


        this.updateManualBox();


        this.renderer.render(this.scene, this.camera);
        if (this.controller.keys.switchCameraRoam) {
            this.toggleCameraModeRoam();
            this.controller.keys.switchCameraRoam = false; // Reset flag switchCamera
        } else if (this.controller.keys.switchCameraFirst) {
            this.toggleCameraModeFirst();
            this.controller.keys.switchCameraFirst = false; // Reset flag switchCamera
        }
    }
    static toggleCameraModeRoam() {
        switch (this.cameraMode) {
            case 'roam':
                this.player.camera.setup(this.player.mesh.position, this.player.rotationVector);
                this.cameraMode = 'thirdPerson';
                this.firstPersonControls.activeLook = false; // Nonaktifkan firstPerson controls
                break;
            case 'thirdPerson':
                // Set starting position for free roam mode from behind the character
                const positionOffset = this.player.camera.positionOffset;
                const tempPosition = new THREE.Vector3(0, 0, 0);
                tempPosition.copy(positionOffset);
                tempPosition.applyAxisAngle(new THREE.Vector3(1, 0, 0), this.player.rotationVector.x);
                tempPosition.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.rotationVector.y);
                tempPosition.applyAxisAngle(new THREE.Vector3(0, 0, 1), this.player.rotationVector.z);
                tempPosition.add(this.player.mesh.position);
                this.camera.position.copy(tempPosition);
                this.camera.lookAt(positionOffset);
                this.cameraMode = 'roam';
                this.firstPersonControls.activeLook = false; // Nonaktifkan firstPerson controls
                this.controller.rotationVector.set(0, 0, 0); // Reset rotation
                break;
        }
    }


    static toggleCameraModeFirst() {
        switch (this.cameraMode) {
            case 'firstPerson':
                this.player.camera.setup(this.player.mesh.position, this.player.rotationVector);
                this.cameraMode = 'thirdPerson';
                this.firstPersonControls.activeLook = false;
                break;
            case 'thirdPerson':




                this.cameraMode = 'firstPerson';
                this.firstPersonControls.activeLook = true;
                break;
        }
    }




    static updateFirstPersonCamera(cameraModeSprint, cameraModePunch) {
        var headPosition = new THREE.Vector3(0, 0.17, 0.25);
        if (cameraModeSprint && !cameraModePunch) {
            headPosition = new THREE.Vector3(0, 0.17, 0.5);
        }


        const tempPosition = new THREE.Vector3();
        tempPosition.copy(headPosition);
        tempPosition.applyAxisAngle(new THREE.Vector3(1, 0, 0), this.player.rotationVector.x);
        tempPosition.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.rotationVector.y);
        tempPosition.add(this.player.mesh.position);


        this.camera.position.copy(tempPosition);
        this.camera.lookAt(this.player.mesh.position.clone().add(new THREE.Vector3(0, 0.17, 0)));
    }


   


    static updateFreeRoamCamera(dt) {
        const moveSpeed = 5 * dt;
        const rotateSpeed = 3 * dt;
        const rollSpeed = 1 * dt; // Added roll speed
        const forward = new THREE.Vector3();
        const right = new THREE.Vector3();
   
        this.camera.getWorldDirection(forward);
        right.crossVectors(this.camera.up, forward);
   
        const tempPosition = this.camera.position.clone();
   
        if (this.controller.keys.forward) {
            tempPosition.add(forward.clone().multiplyScalar(moveSpeed));
        }
        if (this.controller.keys.backward) {
            tempPosition.add(forward.clone().multiplyScalar(-moveSpeed));
        }
        if (this.controller.keys.left) {
            tempPosition.add(right.clone().multiplyScalar(moveSpeed));
        }
        if (this.controller.keys.right) {
            tempPosition.add(right.clone().multiplyScalar(-moveSpeed));
        }
   
        // Update manualBox to the new temp position
        const center = tempPosition.clone();
        const size = new THREE.Vector3(0.1, 0.1, 0.1); // Adjust the size as needed
        this.manualBox.setFromCenterAndSize(center, size);
   
        // Check for collision
        const collisionDetected = this.boxes.some(box => box.intersectsBox(this.manualBox));
   
        // If no collision, update the camera position
        if (!collisionDetected) {
            this.camera.position.copy(tempPosition);
        } else {
            console.log('Collision detected! Camera movement restricted.');
        }
   
        const euler = new THREE.Euler(this.controller.rotationVector.x, this.controller.rotationVector.y, this.controller.rotationVector.z, 'YXZ');
        this.camera.quaternion.setFromEuler(euler);
   
        if (this.controller.keys.ArrowUp || this.controller.keys.ArrowDown) {
            const pitchAmount = (this.controller.keys.ArrowUp ? 1 : -1) * rotateSpeed;
            this.controller.rotationVector.x += pitchAmount;
            this.controller.rotationVector.x = THREE.MathUtils.clamp(this.controller.rotationVector.x, -Math.PI / 2, Math.PI / 2);
        }
   
        if (!this.controller.keys.sprint) {
            if (this.controller.keys.ArrowLeft || this.controller.keys.ArrowRight) {
                const yawAmount = (this.controller.keys.ArrowLeft ? 1 : -1) * rotateSpeed;
                this.controller.rotationVector.y += yawAmount;
            }
        }
   
        if (this.controller.keys.sprint) {
            const rollAmount = (this.controller.keys.ArrowLeft ? 1 : (this.controller.keys.ArrowRight ? -1 : 0)) * rollSpeed;
            this.controller.rotationVector.z += rollAmount;
        } else {
            // Reset roll when not sprinting
            this.controller.rotationVector.z = 0;
        }
   
        const eulerWithRoll = new THREE.Euler(
            this.controller.rotationVector.x - 0.15,
            this.controller.rotationVector.y + Math.PI + this.player.rotationVector.y,
            this.controller.rotationVector.z,
            'YXZ'
        );
        this.camera.quaternion.setFromEuler(eulerWithRoll);
    }
}


var clock = new THREE.Clock();
Main.init();
function animate() {
    Main.render(clock.getDelta());
    requestAnimationFrame(animate);
}


requestAnimationFrame(animate);




