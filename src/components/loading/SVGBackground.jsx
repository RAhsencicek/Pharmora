import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import TWEEN from '@tweenjs/tween.js';

export default function SVGBackground() {
  const containerRef = useRef();

  useEffect(() => {
    let camera, scene, renderer, controls;
    const objects = [];
    let current = 0;
    const particlesTotal = 512;
    const positions = [];
    let frameId;
    const currentContainer = containerRef.current;

    const init = () => {
      // Camera setup
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
      camera.position.set(600, 400, 1500);
      camera.lookAt(0, 0, 0);

      // Scene setup
      scene = new THREE.Scene();

      // Create particle element
      const particle = document.createElement('div');
      particle.style.width = '8px';
      particle.style.height = '8px';
      particle.style.background = '#4CAF50';
      particle.style.borderRadius = '50%';
      particle.style.boxShadow = '0 0 8px #4CAF50';

      // Add particles
      for (let i = 0; i < particlesTotal; i++) {
        const object = new CSS3DSprite(particle.cloneNode());
        object.position.x = Math.random() * 4000 - 2000;
        object.position.y = Math.random() * 4000 - 2000;
        object.position.z = Math.random() * 4000 - 2000;
        scene.add(object);
        objects.push(object);
      }

      // Create positions for different formations
      // Plane
      const amountX = 16;
      const amountZ = 32;
      const separationPlane = 150;
      const offsetX = ((amountX - 1) * separationPlane) / 2;
      const offsetZ = ((amountZ - 1) * separationPlane) / 2;

      for (let i = 0; i < particlesTotal; i++) {
        const x = (i % amountX) * separationPlane;
        const z = Math.floor(i / amountX) * separationPlane;
        const y = (Math.sin(x * 0.5) + Math.sin(z * 0.5)) * 200;
        positions.push(x - offsetX, y, z - offsetZ);
      }

      // Sphere
      const radius = 750;
      for (let i = 0; i < particlesTotal; i++) {
        const phi = Math.acos(-1 + (2 * i) / particlesTotal);
        const theta = Math.sqrt(particlesTotal * Math.PI) * phi;
        positions.push(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        );
      }

      // Helix
      const vectorRadius = 900;
      for (let i = 0; i < particlesTotal; i++) {
        const theta = i * 0.175 + Math.PI;
        const y = -(i * 8) + 450;
        positions.push(
          vectorRadius * Math.sin(theta),
          y,
          vectorRadius * Math.cos(theta)
        );
      }

      // Random
      for (let i = 0; i < particlesTotal; i++) {
        positions.push(
          Math.random() * 4000 - 2000,
          Math.random() * 4000 - 2000,
          Math.random() * 4000 - 2000
        );
      }

      // Renderer setup
      renderer = new CSS3DRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      currentContainer.appendChild(renderer.domElement);

      // Controls setup
      controls = new TrackballControls(camera, renderer.domElement);
      controls.noZoom = true;
      controls.noPan = true;
      controls.rotateSpeed = 0.5;

      transition();
    };

    const transition = () => {
      const offset = current * particlesTotal * 3;
      const duration = 3000; 
      const delay = 500; 

      for (let i = 0, j = offset; i < particlesTotal; i++, j += 3) {
        const object = objects[i];
        new TWEEN.Tween(object.position)
          .to({
            x: positions[j],
            y: positions[j + 1],
            z: positions[j + 2]
          }, Math.random() * duration + duration)
          .easing(TWEEN.Easing.Quintic.InOut) 
          .delay(i * delay / particlesTotal) 
          .start();

        new TWEEN.Tween(object.scale)
          .to({ x: 1.5, y: 1.5, z: 1.5 }, duration / 2)
          .easing(TWEEN.Easing.Quadratic.Out)
          .delay(i * delay / particlesTotal)
          .yoyo(true) 
          .repeat(1)
          .start();
      }

      new TWEEN.Tween({})
        .to({}, duration * 2 + delay) 
        .onComplete(transition)
        .start();

      current = (current + 1) % 4;
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      TWEEN.update();
      controls.update();

      const time = performance.now();
      objects.forEach(object => {
        const scale = Math.sin((Math.floor(object.position.x) + time) * 0.002) * 0.3 + 1;
        object.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      if (currentContainer && renderer) {
        currentContainer.removeChild(renderer.domElement);
      }
      controls.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        filter: 'blur(1px)',
        opacity: 0.6,
        background: '#000',
      }}
    />
  );
}
