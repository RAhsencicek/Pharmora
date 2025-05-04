import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';

export default function LinkedParticles() {
  const containerRef = useRef();

  useEffect(() => {
    let camera, scene, renderer, controls;
    const objects = [];
    const nbParticles = Math.pow(2, 10);
    let frameId;
    const currentContainer = containerRef.current;

    const init = () => {
      // Scene setup
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x14171a);

      // Camera setup
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
      camera.position.set(0, 0, 30);
      camera.lookAt(0, 0, 0);

      // Renderer setup
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      currentContainer.appendChild(renderer.domElement);

      // Controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;

      // Particles setup
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(nbParticles * 3);
      const velocities = new Float32Array(nbParticles * 3);
      const colors = new Float32Array(nbParticles * 3);

      for (let i = 0; i < nbParticles; i++) {
        // Random positions in a sphere
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = Math.random() * 10;

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        // Random velocities
        velocities[i * 3] = (Math.random() - 0.5) * 0.2;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;

        // Colors (green to blue gradient)
        colors[i * 3] = 0;
        colors[i * 3 + 1] = Math.random() * 0.5 + 0.5; // Green
        colors[i * 3 + 2] = Math.random() * 0.5 + 0.5; // Blue
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Lines setup
      const linksGeometry = new THREE.BufferGeometry();
      const linksPositions = new Float32Array(nbParticles * nbParticles * 6);
      const linksColors = new Float32Array(nbParticles * nbParticles * 6);
      
      linksGeometry.setAttribute('position', new THREE.BufferAttribute(linksPositions, 3));
      linksGeometry.setAttribute('color', new THREE.BufferAttribute(linksColors, 3));

      const linksMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.2
      });

      const links = new THREE.LineSegments(linksGeometry, linksMaterial);
      scene.add(links);

      // Store references for animation
      objects.push({
        particles,
        links,
        positions,
        velocities,
        linksPositions,
        linksColors
      });
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Update particles
      const obj = objects[0];
      const positions = obj.particles.geometry.attributes.position.array;
      const velocities = obj.velocities;

      for (let i = 0; i < nbParticles; i++) {
        const i3 = i * 3;

        // Update position based on velocity
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // Add some turbulence
        velocities[i3] += (Math.random() - 0.5) * 0.01;
        velocities[i3 + 1] += (Math.random() - 0.5) * 0.01;
        velocities[i3 + 2] += (Math.random() - 0.5) * 0.01;

        // Damping
        velocities[i3] *= 0.99;
        velocities[i3 + 1] *= 0.99;
        velocities[i3 + 2] *= 0.99;

        // Boundary check
        const radius = Math.sqrt(
          positions[i3] * positions[i3] +
          positions[i3 + 1] * positions[i3 + 1] +
          positions[i3 + 2] * positions[i3 + 2]
        );

        if (radius > 15) {
          const scale = 15 / radius;
          positions[i3] *= scale;
          positions[i3 + 1] *= scale;
          positions[i3 + 2] *= scale;
        }
      }

      // Update links
      let linkIndex = 0;
      const linksPositions = obj.links.geometry.attributes.position.array;
      const linksColors = obj.links.geometry.attributes.color.array;

      for (let i = 0; i < nbParticles; i++) {
        const i3 = i * 3;
        const pos1 = new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]);

        for (let j = i + 1; j < nbParticles; j++) {
          const j3 = j * 3;
          const pos2 = new THREE.Vector3(positions[j3], positions[j3 + 1], positions[j3 + 2]);

          const distance = pos1.distanceTo(pos2);

          if (distance < 2) {
            // Add line positions
            linksPositions[linkIndex * 6] = pos1.x;
            linksPositions[linkIndex * 6 + 1] = pos1.y;
            linksPositions[linkIndex * 6 + 2] = pos1.z;
            linksPositions[linkIndex * 6 + 3] = pos2.x;
            linksPositions[linkIndex * 6 + 4] = pos2.y;
            linksPositions[linkIndex * 6 + 5] = pos2.z;

            // Add line colors with opacity based on distance
            const opacity = 1 - distance / 2;
            linksColors[linkIndex * 6] = 0;
            linksColors[linkIndex * 6 + 1] = opacity;
            linksColors[linkIndex * 6 + 2] = opacity;
            linksColors[linkIndex * 6 + 3] = 0;
            linksColors[linkIndex * 6 + 4] = opacity;
            linksColors[linkIndex * 6 + 5] = opacity;

            linkIndex++;
          }
        }
      }

      // Update geometries
      obj.particles.geometry.attributes.position.needsUpdate = true;
      obj.links.geometry.attributes.position.needsUpdate = true;
      obj.links.geometry.attributes.color.needsUpdate = true;

      // Update controls
      controls.update();

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
      if (currentContainer && renderer?.domElement) {
        currentContainer.removeChild(renderer.domElement);
      }
      controls?.dispose();
      renderer?.dispose();
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
        opacity: 0.8,
        background: '#000',
      }}
    />
  );
}
