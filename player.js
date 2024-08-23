import * as THREE from 'three';
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import {
    MathUtils,
    Spherical,
    Vector3
} from 'three';


const _lookDirection = new Vector3();
const _spherical = new Spherical();
const _target = new Vector3();




class FirstPersonControls {


    constructor(object, domElement) {
        this.object = object;
        this.domElement = domElement;


        // API
        this.enabled = true;
        this.movementSpeed = 1.0;
        this.lookSpeed = 0.005;
        this.lookVertical = true;
        this.autoForward = false;
        this.activeLook = true;
        this.heightSpeed = false;
        this.heightCoef = 1.0;
        this.heightMin = 0.0;
        this.heightMax = 1.0;
        this.constrainVertical = false;
        this.verticalMin = 0;
        this.verticalMax = Math.PI;




        // internals


        this.autoSpeedFactor = 0.0;
        this.pointerX = 0;
        this.pointerY = 0;
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;
        this.lookUp = false;
        this.lookDown = false;
        this.viewHalfX = 0;
        this.viewHalfY = 0;
















        // private variable
        let lat = 0;
        let lon = 0;
        let targetLat = 0; // target latitude for smooth transition


        //
        this.handleResize = function () {
            if (this.domElement === document) {
                this.viewHalfX = window.innerWidth / 2;
                this.viewHalfY = window.innerHeight / 2;
            } else {
                this.viewHalfX = this.domElement.offsetWidth / 2;
                this.viewHalfY = this.domElement.offsetHeight / 2;


            }
        };


        this.onKeyDown = function (event) {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW': this.moveForward = true; break;
                case 'ArrowLeft':
                case 'KeyA': this.moveLeft = true; break;
                case 'ArrowDown':
                case 'KeyS': this.moveBackward = true; break;
                case 'ArrowRight':
                case 'KeyD': this.moveRight = true; break;
                case 'KeyR': this.moveUp = true; break;
                case 'KeyF': this.moveDown = true; break;
                case 'KeyQ': this.lookUp = true; break;
                case 'KeyE': this.lookDown = true; break;
            }
        };
        this.onKeyUp = function (event) {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW': this.moveForward = false; break;
                case 'ArrowLeft':
                case 'KeyA': this.moveLeft = false; break;
                case 'ArrowDown':
                case 'KeyS': this.moveBackward = false; break;
                case 'ArrowRight':
                case 'KeyD': this.moveRight = false; break;
                case 'KeyR': this.moveUp = false; break;
                case 'KeyF': this.moveDown = false; break;
                case 'KeyQ': this.lookUp = false; break;
                case 'KeyE': this.lookDown = false; break;
            }
        };
        this.lookAt = function (x, y, z) {
            if (x.isVector3) {
                _target.copy(x);
            } else {
                _target.set(x, y, z);
            }
            this.object.lookAt(_target);
            setOrientation(this);
            return this;
        };
        this.update = function () {
            const targetPosition = new Vector3();
            return function update(delta) {
                if (this.enabled === false) return;
                // Update camera orientation based on object's quaternion
                setOrientation(this);
                // Handle movement
                const actualMoveSpeed = delta * this.movementSpeed * 0.1;
                if (this.moveForward || (this.autoForward && !this.moveBackward)) this.object.translateZ(-(actualMoveSpeed + this.autoSpeedFactor));
                if (this.moveBackward) this.object.translateZ(actualMoveSpeed);
                if (this.moveLeft) this.object.translateX(-actualMoveSpeed);
                if (this.moveRight) this.object.translateX(actualMoveSpeed);
                // Handle look direction
                let actualLookSpeed = delta * this.lookSpeed;
                if (!this.activeLook) {
                    actualLookSpeed = 0;
                }
                let verticalLookRatio = 1;
                if (this.constrainVertical) {
                    verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
                }
                lon += 180;
                lon -= this.pointerX * actualLookSpeed;
                if (this.lookVertical) targetLat -= this.pointerY * actualLookSpeed * verticalLookRatio;
                // Handle Q and E keys for looking up and down
                if (this.lookUp) targetLat -= actualLookSpeed * verticalLookRatio * 5000;
                if (this.lookDown) targetLat += actualLookSpeed * verticalLookRatio * 5000;
                targetLat = Math.max(-640, Math.min(640, targetLat));
                // Smoothly transition lat towards targetLat
                const smoothFactor = 0.1; // Adjust for smoother transition
                lat += (targetLat - lat) * smoothFactor;
                let phi = MathUtils.degToRad(90 - lat);
                const theta = MathUtils.degToRad(lon);
                if (this.constrainVertical) {
                    phi = MathUtils.mapLinear(phi, 0, Math.PI, this.verticalMin, this.verticalMax);
                }
                const position = this.object.position;
                targetPosition.setFromSphericalCoords(1, phi, theta).add(position);
                this.object.lookAt(targetPosition);
            };
        }();
        this.dispose = function () {
            this.domElement.removeEventListener('contextmenu', contextmenu);
            window.removeEventListener('keydown', _onKeyDown);
            window.removeEventListener('keyup', _onKeyUp);
        };
        const _onKeyDown = this.onKeyDown.bind(this);
        const _onKeyUp = this.onKeyUp.bind(this);
        this.domElement.addEventListener('contextmenu', contextmenu);




        window.addEventListener('keydown', _onKeyDown);
        window.addEventListener('keyup', _onKeyUp);


        function setOrientation(controls) {
            const quaternion = controls.object.quaternion;
            _lookDirection.set(0, 0, -1).applyQuaternion(quaternion);
            _spherical.setFromVector3(_lookDirection);
            lat = 90 - MathUtils.radToDeg(_spherical.phi);
            lon = MathUtils.radToDeg(_spherical.theta);
        }
        this.handleResize();
        setOrientation(this);
    }


}



function contextmenu(event) {
    event.preventDefault();
}


export { FirstPersonControls };


export class Player {
    constructor(camera, controller, scene, speed, startPosition) {
        this.camera = camera;
        this.controller = controller;
        this.scene = scene;
        this.speed = speed;
        this.rotationVector = new THREE.Vector3();
        this.animations = {};
        this.state = 'idle';
        this.startPosition = startPosition;
        this.camera.setup(new THREE.Vector3(0, 0, 0), this.rotationVector);
        this.loadModel();
        this.mainBox = new THREE.Box3();
        this.boxes = []; // Array untuk menyimpan kotak-kotak yang perlu dideteksi tabrakannya
        // Gravity settings
        this.gravity = 0.0005;
        this.fallSpeed = 0;
        this.onGround = false;
        this.cutsceneActive = false; // Menandakan apakah cutscene sedang aktif
        this.cutsceneTime = 0; // Waktu cutscene berjalan
        this.turn = 0;
        // Buat camera controller untuk cutscene
    }
    playCutscene() {

        this.cutsceneActive = true;
        this.cutsceneTime = 0;
        // this.camera.positionOffset.set(0, 1, -5); // Reset posisi offset
    }


    loadModel() {
        const loader = new FBXLoader();
        loader.setPath("assets/batman/animations/");
        loader.load("stand.fbx", (fbx) => {
            fbx.scale.setScalar(0.1);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            this.mesh = fbx;
            this.mesh.position.set(this.startPosition.x, this.startPosition.y, this.startPosition.z);
            this.scene.add(this.mesh);
            // Create bounding box for the player
            this.mainBox.setFromObject(this.mesh);
            this.mixer = new THREE.AnimationMixer(this.mesh);
            const onLoad = (animName, anim) => {
                const clip = anim.animations[0];
                const action = this.mixer.clipAction(clip);


                this.animations[animName] = {
                    clip: clip,
                    action: action
                };


                if (animName === 'idle') {
                    this.setInit('idle');
                }
            };
            loader.load('stand.fbx', (fbx) => { onLoad('idle', fbx) });
            loader.load('walk.fbx', (fbx) => { onLoad('walk', fbx) });
            loader.load('run.fbx', (fbx) => { onLoad('run', fbx) });
            loader.load('punch.fbx', (fbx) => { onLoad('punch', fbx) });
            loader.load('jumpUp.fbx', (fbx) => { onLoad('jumpUp', fbx) });
            loader.load('jumpDown.fbx', (fbx) => { onLoad('jumpDown', fbx) });
        });
    }

    addBox(box) {
        this.boxes.push(box);
    }



    update(dt, mode) {
        if (!this.mesh) {
            return;
        }
        if (this.cutsceneActive && this.turn === 0) {
            this.updateCutscene(dt);
            return;
        }
        if (this.mesh.position.z > 0.8 && !this.cutsceneActive && this.turn ===0) {
            this.playCutscene();
        }


        const direction = new THREE.Vector3(0, 0, 0);
        if (mode === 'thirdPerson' || mode === 'firstPerson') {
            if (this.controller.keys['forward']) {
                direction.z = this.controller.keys['sprint'] ? -0.1 : -0.05;
            }
            if (this.controller.keys['backward']) {
                direction.z = this.controller.keys['sprint'] ? 0.1 : 0.05;
            }

            // Rotate without moving
            if (this.controller.keys['left']) {
                this.rotationVector.y += dt * 2; // Adjust the rotation speed as needed
            }
            if (this.controller.keys['right']) {
                this.rotationVector.y -= dt * 2; // Adjust the rotation speed as needed
            }


            this.mesh.rotation.y = this.rotationVector.y;


            if(!this.onGround){
                if(this.state !== 'jumpDown'){
                    this.crossFadeToAction(this.state, 'jumpDown', 0.5);
                    this.state = 'jumpDown';
                }
            }
            // Handle movement and state transitions
            if (this.controller.keys['punch']) {
                if (this.state !== 'punch') {
                    this.crossFadeToAction(this.state, 'punch', 0.2);
                    this.state = 'punch';
                }
            } else if (direction.length() === 0) {
                if (this.state !== 'idle') {
                    this.crossFadeToAction(this.state, 'idle', 0.5);
                    this.state = 'idle';
                }
            } else {
                const newState = this.controller.keys['sprint'] ? 'run' : 'walk';
                if (this.state !== newState) {
                    this.crossFadeToAction(this.state, newState, 0.5);
                    this.state = newState;
                }
            }
        }

        if (this.state !== 'punch') {
            const forwardVector = new THREE.Vector3(0, 0, -1);
            forwardVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotationVector.y);
            this.mesh.position.add(forwardVector.multiplyScalar(dt * this.speed * direction.z));


            if (mode === 'thirdPerson') {
                if (this.controller.mouseDown) {
                    this.camera.setup(this.mesh.position, this.controller.rotationVector);
                } else {
                    this.camera.setup(this.mesh.position, new THREE.Vector3(0, this.rotationVector.y, 0));
                    this.controller.defaultRotationVector.copy(this.rotationVector); // Simpan sudut rotasi default
                }
            }
        }
        // Gravity and falling logic
        if (!this.onGround) {
            this.fallSpeed += this.gravity;
            this.mesh.position.y -= this.fallSpeed;
            this.checkCollisions();
            if (this.onGround && this.state !== 'idle' && this.state !== 'walk' && this.state !== 'run') {
                this.crossFadeToAction(this.state, 'idle', 0.5);
            }
        } else {
            this.fallSpeed = 0;
        }


        // Update bounding box to match the current position of the player
        this.mainBox.setFromObject(this.mesh);
        // Check for collisions with boxes
        this.checkCollisions();


        this.mixer.update(dt);
    }


    checkCollisions() {
        this.onGround = false;
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.mainBox.intersectsBox(this.boxes[i])) {
                const playerMinX = this.mainBox.min.x;
                const playerMaxX = this.mainBox.max.x;
                const playerMinY = this.mainBox.min.y;
                const playerMaxY = this.mainBox.max.y;
                const playerMinZ = this.mainBox.min.z;
                const playerMaxZ = this.mainBox.max.z;
                const boxMinX = this.boxes[i].min.x;
                const boxMaxX = this.boxes[i].max.x;
                const boxMinY = this.boxes[i].min.y;
                const boxMaxY = this.boxes[i].max.y;
                const boxMinZ = this.boxes[i].min.z;
                const boxMaxZ = this.boxes[i].max.z;
   
                // Check for vertical collisions separately
                if (playerMaxY > boxMinY && playerMinY < boxMaxY &&
                    playerMinX < boxMaxX && playerMaxX > boxMinX &&
                    playerMinZ < boxMaxZ && playerMaxZ > boxMinZ) {
                   
                    if (playerMinY <= boxMaxY && playerMaxY > boxMaxY) {
                        this.mesh.position.y = boxMaxY;
                        this.onGround = true;
                    }
                }
   
                // Horizontal collision handling
                if (playerMinX < boxMaxX && playerMaxX > boxMinX &&
                    playerMinZ < boxMaxZ && playerMaxZ > boxMinZ) {
                   
                    if (playerMinX < boxMaxX && playerMaxX > boxMinX &&
                        playerMinY < boxMaxY && playerMaxY > boxMinY) {
                       
                        if (playerMinX <= boxMinX) {
                            this.mesh.position.x = boxMinX - (playerMaxX - playerMinX) / 2;
                        }
                        if (playerMaxX >= boxMaxX) {
                            this.mesh.position.x = boxMaxX + (playerMaxX - playerMinX) / 2;
                        }
                        if (playerMinZ <= boxMinZ) {
                            this.mesh.position.z = boxMinZ - (playerMaxZ - playerMinZ) / 2;
                        }
                        if (playerMaxZ >= boxMaxZ) {
                            this.mesh.position.z = boxMaxZ + (playerMaxZ - playerMinZ) / 2;
                        }
                    }
                }
            }
        }
    }
   
    updateCutscene(dt) {
        const cutsceneDuration = 10; // Durasi cutscene dalam detik
        this.cutsceneTime += dt;
   
        const progress = this.cutsceneTime / cutsceneDuration;
        const angle = progress * Math.PI * 2; // 360 derajat
   
        // Atur rotasi kamera
        this.camera.setup(this.mesh.position, new THREE.Vector3(0, angle, 0));
   
        // Zoom in pada 50% pertama dari cutscene, dan zoom out pada 50% terakhir
        if (progress < 0.5) {
            const zoomDistance = 0.000989; // Jarak zoom
            this.camera.zoomOut(zoomDistance); // Zoom in secara perlahan
        } else {
            const zoomDistance = 0.000989; // Jarak zoom
            this.camera.zoomIn(zoomDistance); // Zoom out secara perlahan
        }
   
        // Akhiri cutscene setelah durasi selesai
        if (progress >= 1) {
            this.turn = 1;
            this.cutsceneActive = false;
            // Reset zoom kembali ke posisi awal setelah cutscene selesai
            // this.camera.setup(new THREE.Vector3(0, 0, 0), this.rotationVector); // Atur kembali posisi kamera ke posisi awal
        }
    }

    crossFadeToAction(startAction, endAction, duration) {
        if (this.state === endAction || !this.animations[startAction] || !this.animations[endAction]) return;
        this.state = endAction;
        this.setWeight(endAction, 1);
        this.animations[endAction].action.time = 0;
        this.animations[startAction].action.crossFadeTo(this.animations[endAction].action, duration, true).play();
    }

    setWeight(actionName, weight) {
        const action = this.animations[actionName].action;
        action.enabled = true;
        action.setEffectiveTimeScale(1);
        action.setEffectiveWeight(weight);
    }

    setInit(state) {
        if (this.animations[state] !== undefined) {
            this.state = state;
            this.setWeight(state, 1);
            this.animations[state].action.play();
        } else {
            setTimeout(() => { this.setInit(state) }, 250);
        }
    }
}



export class PlayerController {
    constructor() {
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            sprint: false,
            punch: false,
            switchCameraRoam: false,
            switchCameraFirst: false,
            ArrowLeft: false,
            ArrowRight: false,
            ArrowUp: false,
            ArrowDown: false,
        };
        this.mousePos = new THREE.Vector2();
        this.firstArrowPress = true;

        this.mouseDown = false;
        this.deltaMousePos = new THREE.Vector2();
        this.rotationVector = new THREE.Vector2(); // Menyimpan rotasi kamera
        this.defaultRotationVector = new THREE.Vector2(); // Menyimpan rotasi kamera default


        document.addEventListener("keydown", (e) => this.onKeyDown(e), false);
        document.addEventListener("keyup", (e) => this.onKeyUp(e), false);
        document.addEventListener("mousemove", (e) => this.onMouseMove(e), false);
        document.addEventListener("mouseup", (e) => this.onMouseUp(e), false);
        document.addEventListener("mousedown", (e) => this.onMouseDown(e), false);
    }




    onMouseDown(e) {
        this.mouseDown = true;
        this.rotationVector.copy(this.defaultRotationVector); // Reset rotationVector ke default
        this.mousePos.set(
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1
        );
    }
 


    onMouseMove(e) {
        if (this.mouseDown) {
            const currentMousePos = new THREE.Vector2(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            );
            this.deltaMousePos.subVectors(currentMousePos, this.mousePos);




            // Menghitung rotasi berdasarkan delta mouse
            const sensitivityx = 3;
            const sensitivity = 1;
            this.rotationVector.x -= this.deltaMousePos.y * sensitivity;
            this.rotationVector.y -= this.deltaMousePos.x * sensitivityx;






            // Batasi rotasi vertikal agar kamera tidak terbalik
            const maxRotationY = Math.PI / 4;
            this.rotationVector.x = THREE.MathUtils.clamp(this.rotationVector.x, -maxRotationY, maxRotationY);






            this.mousePos.copy(currentMousePos);
        }
    }


    onMouseUp(e) {
        this.mouseDown = false;
        this.lerpTime = 0; // Reset waktu lerp saat mouse dilepas
    }






    onKeyDown(e) {
        switch (e.keyCode) {
            case 87: // w
                this.keys.forward = true;
                break;
            case 83: // s
                this.keys.backward = true;
                break;
            case 65: // a
                this.keys.left = true;
                break;
            case 68: // d
                this.keys.right = true;
                break;
            case 32: // space
                this.keys.jump = true;
                break;
            case 70: // f
                this.keys.punch = true;
                break;
            case 16: // shift
                this.keys.sprint = true;
                break;
            case 88:
                this.keys.switchCameraRoam = true;
                break;
            case 90:
                this.keys.switchCameraFirst = true;
                break;
            case 38:
                this.keys.ArrowUp = true;
                break;
            case 40:
                this.keys.ArrowDown = true;
                break;
            case 37:
                this.keys.ArrowLeft = true;
                break;
            case 39:
                this.keys.ArrowRight = true;
                break;
        }
    }



    onKeyUp(e) {
        switch (e.keyCode) {
            case 87: // w
                this.keys.forward = false;
                break;
            case 83: // s
                this.keys.backward = false;
                break;
            case 65: // a
                this.keys.left = false;
                break;
            case 68: // d
                this.keys.right = false;
                break;
            case 32: // space
                this.keys.jump = false;
                break;
            case 70: // f
                this.keys.punch = false;
                break;
            case 16: // shift
                this.keys.sprint = false;
                break;
            case 88:
                this.keys.switchCameraRoam = false;
                break;
            case 90:
                this.keys.switchCameraFirst = false;
                break;
            case 38:
                this.keys.ArrowUp = false;
                break;
            case 40:
                this.keys.ArrowDown = false;
                break;
            case 37:
                this.keys.ArrowLeft = false;
                break;
            case 39:
                this.keys.ArrowRight = false;
                break;
        }
    }
}


export class ThirdPersonCamera {
    constructor(camera, positionOffset, targetOffset) {
        this.camera = camera;
        this.positionOffset = positionOffset;
        this.targetOffset = targetOffset;
        this.currentPosition = new THREE.Vector3();
        this.currentLookAt = new THREE.Vector3();
        this.setupListeners();
    }

    setupListeners() {
        document.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 187: // Key +
                    this.zoomIn(0.1); // Adjust zoom distance as needed
                    break;
                case 189: // Key -
                    this.zoomOut(0.1); // Adjust zoom distance as needed
                    break;
            }
        });
    }

    setup(target, angle) {
        const tempPosition = new THREE.Vector3(0, 0, 0);
        tempPosition.copy(this.positionOffset);
        tempPosition.applyAxisAngle(new THREE.Vector3(1, 0, 0), angle.x);
        tempPosition.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle.y);
        tempPosition.add(target);

        const lookAtPos = new THREE.Vector3(0, 0, 0);
        lookAtPos.addVectors(target, this.targetOffset);
        this.currentPosition.lerp(tempPosition, 0.1); // Adjust 0.1 to control smoothness
        this.currentLookAt.lerp(lookAtPos, 0.1); // Adjust 0.1 to control smoothness
        this.camera.position.copy(this.currentPosition);
        this.camera.lookAt(this.currentLookAt);
    }

    zoomIn(distance) {
        this.positionOffset.z -= distance; // Decrease camera position offset to zoom in
    }

    zoomOut(distance) {
        this.positionOffset.z += distance; // Increase camera position offset to zoom out
    }
}



