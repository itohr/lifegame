import "./style.css";
import * as THREE from 'three';
import * as dat from 'dat.gui';
import * as Stats from 'stats.js';
import Lifegame from './lifegame';

window.addEventListener('DOMContentLoaded', () => {
    const stats = initStats();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
        window.innerWidth / -12,
        window.innerWidth / 12,
        window.innerHeight / 12,
        window.innerHeight / -12,
        1, 1000);
    camera.position.set(0, 0, 100);

    let column = 50;
    let row = 50;
    const lifegame = new Lifegame(column, row);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({color: 0xff0000});
    for (let i = 0; i < column; i++) {
        for (let j = 0; j < row; j++) {
            const box = new THREE.Mesh(geometry, material);
            box.position.set(
                3 * i - 3 * column / 2 + 1.5,
                3 * j - 3 * row / 2 + 1.5,
                0);
            box.name = 'box_' + i + '_' + j;
            scene.add(box);
        }
    }
    //var controls = new function () {
    //    this.draw = function () {
    //        const geometry = new THREE.BoxGeometry(4, 4, 4);
    //        const material = new THREE.MeshPhongMaterial({color: 0xff0000});
    //        for (let i = 0; i < column; i++) {
    //            for (let j = 0; j < row; j++) {
    //                const box = new THREE.Mesh(geometry, material);
    //                box.position.set(
    //                    5 * i - 5 * column / 2 + 2,
    //                    5 * j - 5 * row / 2 + 2,
    //                    0);
    //                box.name = 'box_' + i + '_' + j;
    //                scene.add(box);
    //            }
    //        }
    //    }
    //}
    //controls.draw();

    //var gui = new dat.GUI();

    //gui.add(controls, 'row', 1, 200);
    //gui.add(controls, 'column', 1, 200);

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    var count = 0;
    const tick = () => {
        stats.update();

        if (count % 10 == 0) {
            scene.traverse(function(obj) {
                if (obj instanceof THREE.Mesh && obj.name.match(/box/)) {
                    const res = obj.name.split('_');
                    let i = res[1];
                    let j = res[2];
                    var material: THREE.MeshPhongMaterial;
                    if (lifegame.environment[i][j]) {
                        material = new THREE.MeshPhongMaterial({color: 0x00ff00});
                    } else {
                        material = new THREE.MeshPhongMaterial({color: 0x777777});
                        material.transparent = true;
                        material.opacity = 0.5;
                    }
                    obj.material = material;
                }
            })
            lifegame.update();
        }

        requestAnimationFrame(tick);
        renderer.render(scene, camera);
        count++;
    };
    tick();

    function initStats() {
        const stats = new Stats();
        stats.showPanel(0);
        document.body.appendChild(stats.dom);
        return stats;
    }
});