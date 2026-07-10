import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './OceanBackground.css';

const OceanBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03202f, 0.028);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 1.5, 14);

    // ---------- Lights ----------
    scene.add(new THREE.AmbientLight(0x14425c, 0.9));
    const sun = new THREE.DirectionalLight(0xbfe9ff, 1.1);
    sun.position.set(2, 12, 6);
    scene.add(sun);
    const bioLight = new THREE.PointLight(0x5cf3d0, 1.4, 14);
    bioLight.position.set(-2, 0, 2);
    scene.add(bioLight);

    // ---------- Helper: soft circular sprite texture ----------
    function makeSoftCircleTexture(color) {
      const size = 128;
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
      g.addColorStop(0, color);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(c);
    }

    // ---------- Sea floor with fake caustic shader ----------
    const causticUniforms = { uTime: { value: 0 } };
    const floorGeo = new THREE.PlaneGeometry(80, 80, 1, 1);
    const floorMat = new THREE.ShaderMaterial({
      uniforms: causticUniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        void main() {
          vec2 uv = vUv * 10.0;
          float t = uTime * 0.6;
          float c = sin(uv.x + t) + sin(uv.y * 1.3 - t * 1.1) + sin((uv.x + uv.y) * 0.8 + t * 0.7);
          c = pow(clamp(c * 0.33 + 0.5, 0.0, 1.0), 3.0);
          vec3 base = vec3(0.01, 0.09, 0.13);
          vec3 glow = vec3(0.15, 0.55, 0.6) * c;
          float edge = 1.0 - smoothstep(0.25, 0.5, distance(vUv, vec2(0.5)));
          gl_FragColor = vec4(base + glow, edge * 0.85);
        }
      `
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -6.2;
    scene.add(floor);

    // ---------- God rays (light shafts) ----------
    const rayTex = makeSoftCircleTexture('rgba(200,240,255,0.9)');
    function makeGodRay(x, z, height, tilt) {
      const geo = new THREE.PlaneGeometry(1.6, height);
      // custom vertical gradient texture, opaque top -> transparent bottom
      const c = document.createElement('canvas');
      c.width = 16; c.height = 256;
      const cctx = c.getContext('2d');
      const g = cctx.createLinearGradient(0, 0, 0, 256);
      g.addColorStop(0, 'rgba(190,235,255,0.55)');
      g.addColorStop(1, 'rgba(190,235,255,0)');
      cctx.fillStyle = g;
      cctx.fillRect(0, 0, 16, 256);
      const tex = new THREE.CanvasTexture(c);
      const mat = new THREE.MeshBasicMaterial({
        map: tex, transparent: true, blending: THREE.AdditiveBlending,
        depthWrite: false, side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, height / 2 - 5, z);
      mesh.rotation.z = tilt;
      return mesh;
    }
    const godRays = [];
    for (let i = 0; i < 6; i++) {
      const ray = makeGodRay((Math.random() - 0.5) * 26, -8 - Math.random() * 10, 22 + Math.random() * 6, (Math.random() - 0.5) * 0.3);
      godRays.push(ray);
      scene.add(ray);
    }

    // ---------- Bubbles / bioluminescent particles ----------
    // TWEAK HERE: Reduce 320 to a lower number if performance is slow
    const particleCount = window.innerWidth < 640 ? 120 : 320;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      positions[i*3]   = (Math.random() - 0.5) * 30;
      positions[i*3+1] = (Math.random() - 0.5) * 20 - 2;
      positions[i*3+2] = (Math.random() - 0.5) * 20 - 4;
      speeds[i] = 0.3 + Math.random() * 0.6;
      phases[i] = Math.random() * Math.PI * 2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.14, map: makeSoftCircleTexture('rgba(150,255,235,0.9)'),
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ---------- SHARK ----------
    function buildShark() {
      const group = new THREE.Group();
      const skin = new THREE.MeshStandardMaterial({ color: 0x51707f, roughness: 0.55, metalness: 0.15 });
      const belly = new THREE.MeshStandardMaterial({ color: 0xcfe6e6, roughness: 0.6 });

      const body = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 16), skin);
      body.scale.set(0.62, 0.62, 1.9);
      group.add(body);

      const bellyMesh = new THREE.Mesh(new THREE.SphereGeometry(0.75, 16, 12), belly);
      bellyMesh.scale.set(0.5, 0.4, 1.5);
      bellyMesh.position.set(0, -0.28, 0.05);
      group.add(bellyMesh);

      const nose = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.9, 16), skin);
      nose.rotation.x = Math.PI / 2;
      nose.position.set(0, 0.02, -1.9);
      group.add(nose);

      const dorsal = new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.1, 4), skin);
      dorsal.rotation.y = Math.PI / 4;
      dorsal.position.set(0, 0.85, -0.1);
      group.add(dorsal);

      function pectoral(sign) {
        const fin = new THREE.Mesh(new THREE.ConeGeometry(0.28, 1.1, 4), skin);
        fin.rotation.z = sign * Math.PI / 2.6;
        fin.rotation.y = Math.PI / 4;
        fin.position.set(sign * 0.55, -0.15, 0.2);
        return fin;
      }
      group.add(pectoral(1));
      group.add(pectoral(-1));

      const tailPivot = new THREE.Group();
      tailPivot.position.set(0, 0, 1.75);
      group.add(tailPivot);
      const tailFin = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.5, 4), skin);
      tailFin.rotation.z = Math.PI / 2;
      tailFin.rotation.y = Math.PI / 4;
      tailFin.position.set(0, 0.15, 0.55);
      tailPivot.add(tailFin);

      function eye() {
        const e = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshStandardMaterial({ color: 0x000000 }));
        return e;
      }
      const eyeL = eye(); eyeL.position.set(0.24, 0.1, -1.35);
      const eyeR = eye(); eyeR.position.set(-0.24, 0.1, -1.35);
      group.add(eyeL, eyeR);

      group.scale.setScalar(1.15);
      scene.add(group);

      return {
        group,
        update(t) {
          const radius = 9;
          // TWEAK HERE: Adjust shark speed
          const speed = 0.18;
          const angle = t * speed;
          group.position.x = Math.cos(angle) * radius;
          group.position.z = Math.sin(angle) * radius - 3;
          group.position.y = Math.sin(t * 0.6) * 0.6 - 0.5;
          const nextAngle = angle + 0.01;
          const nx = Math.cos(nextAngle) * radius;
          const nz = Math.sin(nextAngle) * radius - 3;
          group.lookAt(nx, group.position.y, nz);
          tailPivot.rotation.y = Math.sin(t * 6) * 0.4;
        }
      };
    }
    const shark = buildShark();

    // ---------- OCTOPUS ----------
    function buildOctopus() {
      const group = new THREE.Group();
      // TWEAK HERE: Octopus skin color
      const skin = new THREE.MeshStandardMaterial({
        color: 0x8a3fa0, roughness: 0.5, metalness: 0.1,
        emissive: 0x2a1140, emissiveIntensity: 0.4
      });

      const mantle = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 16), skin);
      mantle.scale.set(1, 1.25, 1);
      mantle.position.y = 1.4;
      group.add(mantle);

      // bioluminescent spots
      const spotMat = new THREE.MeshStandardMaterial({ color: 0x9dffe8, emissive: 0x6cf5d6, emissiveIntensity: 1.2 });
      for (let i = 0; i < 10; i++) {
        const spot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 6), spotMat);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 0.6 + 0.2;
        spot.position.set(
          Math.sin(phi) * Math.cos(theta) * 1.0,
          1.4 + Math.cos(phi) * 1.1,
          Math.sin(phi) * Math.sin(theta) * 1.0
        );
        group.add(spot);
      }

      function eye(sign) {
        const g = new THREE.Group();
        const white = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), new THREE.MeshStandardMaterial({ color: 0xffffff }));
        const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshStandardMaterial({ color: 0x110022 }));
        pupil.position.z = 0.12;
        g.add(white, pupil);
        g.position.set(sign * 0.42, 1.55, 0.85);
        return g;
      }
      group.add(eye(1), eye(-1));

      // tentacles: chained segments for wave motion
      const tentacles = [];
      const tentacleCount = 8;
      const segMat = skin;
      for (let i = 0; i < tentacleCount; i++) {
        const baseAngle = (i / tentacleCount) * Math.PI * 2;
        const root = new THREE.Group();
        root.position.set(Math.cos(baseAngle) * 0.55, 0.7, Math.sin(baseAngle) * 0.55);
        root.rotation.y = -baseAngle;
        root.rotation.x = Math.PI / 2.4; // splay outward/down
        group.add(root);

        const segCount = 6;
        let parent = root;
        const pivots = [];
        let radius = 0.16;
        for (let s = 0; s < segCount; s++) {
          const segLen = 0.5;
          const pivot = new THREE.Group();
          parent.add(pivot);
          const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 0.75, segLen, 8), segMat);
          mesh.position.y = -segLen / 2;
          pivot.add(mesh);
          const nextPivot = new THREE.Group();
          nextPivot.position.y = -segLen;
          pivot.add(nextPivot);
          pivots.push(pivot);
          parent = nextPivot;
          radius *= 0.78;
        }
        tentacles.push({ pivots, phase: baseAngle });
      }

      group.position.set(-2.5, -1.5, 1);
      scene.add(group);

      return {
        group,
        update(t) {
          group.position.x = -2.5 + Math.sin(t * 0.15) * 2.5;
          group.position.z = 1 + Math.cos(t * 0.12) * 2;
          group.position.y = -1.5 + Math.sin(t * 0.5) * 0.4;
          group.rotation.y = Math.sin(t * 0.15) * 0.6;
          mantle.scale.set(
            1 + Math.sin(t * 1.4) * 0.03,
            1.25 + Math.sin(t * 1.4 + 1) * 0.05,
            1 + Math.sin(t * 1.4) * 0.03
          );
          tentacles.forEach((tent, ti) => {
            tent.pivots.forEach((pivot, si) => {
              const wave = Math.sin(t * 2.2 + tent.phase * 2 + si * 0.8) * 0.35;
              const wave2 = Math.cos(t * 1.7 + tent.phase * 1.3 + si * 0.6) * 0.25;
              pivot.rotation.x = 0.15 + wave * (si / tent.pivots.length + 0.3);
              pivot.rotation.z = wave2 * (si / tent.pivots.length + 0.2);
            });
          });
        }
      };
    }
    const octopus = buildOctopus();

    // ---------- JELLYFISH ----------
    function buildJellyfish(xBase, zBase, yBase, scale, phase, hue) {
      const group = new THREE.Group();
      // TWEAK HERE: Jellyfish colors via hue
      const bellMat = new THREE.MeshStandardMaterial({
        color: hue, transparent: true, opacity: 0.45, roughness: 0.25,
        emissive: hue, emissiveIntensity: 0.55, side: THREE.DoubleSide
      });
      const bell = new THREE.Mesh(new THREE.SphereGeometry(0.9, 20, 14, 0, Math.PI * 2, 0, Math.PI / 1.7), bellMat);
      group.add(bell);

      const coreMat = new THREE.MeshStandardMaterial({ color: hue, emissive: hue, emissiveIntensity: 1.4, transparent: true, opacity: 0.6 });
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 10), coreMat);
      core.position.y = 0.1;
      group.add(core);

      const tentacleMat = new THREE.MeshStandardMaterial({ color: hue, transparent: true, opacity: 0.5, emissive: hue, emissiveIntensity: 0.4 });
      const tentacles = [];
      const tCount = 10;
      for (let i = 0; i < tCount; i++) {
        const angle = (i / tCount) * Math.PI * 2;
        const pivot = new THREE.Group();
        pivot.position.set(Math.cos(angle) * 0.55, -0.15, Math.sin(angle) * 0.55);
        group.add(pivot);
        const len = 1.1 + Math.random() * 0.6;
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.008, len, 5), tentacleMat);
        mesh.position.y = -len / 2;
        pivot.add(mesh);
        tentacles.push({ pivot, phase: angle + Math.random() });
      }

      group.position.set(xBase, yBase, zBase);
      group.scale.setScalar(scale);
      scene.add(group);

      return {
        group,
        update(t) {
          const pulse = Math.sin(t * 1.6 + phase);
          bell.scale.set(1 - pulse * 0.08, 0.62 + pulse * 0.12, 1 - pulse * 0.08);
          group.position.y = yBase + Math.sin(t * 0.3 + phase) * 0.8;
          group.position.x = xBase + Math.sin(t * 0.12 + phase) * 1.8;
          group.position.z = zBase + Math.cos(t * 0.1 + phase) * 1.8;
          tentacles.forEach((tent) => {
            tent.pivot.rotation.x = Math.sin(t * 1.3 + tent.phase) * 0.2;
            tent.pivot.rotation.z = Math.cos(t * 1.1 + tent.phase) * 0.2;
          });
        }
      };
    }
    const jellyfish = [
      buildJellyfish(5, -6, 3, 0.9, 0, 0xd88ce0),
      buildJellyfish(-6, -9, 5, 0.7, 2.1, 0x8ce0d8),
      buildJellyfish(3, -3, -1, 0.6, 4.2, 0xe0a3d8)
    ];

    // ---------- SEA TURTLE ----------
    function buildTurtle() {
      const group = new THREE.Group();
      const shellMat = new THREE.MeshStandardMaterial({ color: 0x3d6b45, roughness: 0.6 });
      const skinMat = new THREE.MeshStandardMaterial({ color: 0x6b9c6f, roughness: 0.6 });

      const shell = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), shellMat);
      shell.scale.set(1.1, 0.42, 1.5);
      group.add(shell);

      const belly = new THREE.Mesh(new THREE.SphereGeometry(0.95, 16, 12), skinMat);
      belly.scale.set(0.95, 0.3, 1.35);
      belly.position.y = -0.18;
      group.add(belly);

      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.5, 10), skinMat);
      neck.rotation.x = Math.PI / 2.6;
      neck.position.set(0, 0.05, -1.55);
      group.add(neck);

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 10), skinMat);
      head.position.set(0, 0.28, -1.85);
      group.add(head);

      function flipper(sign, front) {
        const pivot = new THREE.Group();
        pivot.position.set(sign * 0.85, -0.05, front ? -0.55 : 0.75);
        group.add(pivot);
        const fin = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), skinMat);
        fin.scale.set(0.9, 0.18, front ? 1.5 : 1.1);
        fin.position.set(sign * 0.55, 0, 0);
        pivot.add(fin);
        return pivot;
      }
      const flFront = flipper(1, true);
      const flFrontR = flipper(-1, true);
      const flBack = flipper(1, false);
      const flBackR = flipper(-1, false);

      group.scale.setScalar(1.1);
      scene.add(group);

      return {
        group,
        update(t) {
          const radius = 7;
          const speed = 0.09;
          const angle = t * speed + Math.PI;
          group.position.x = Math.cos(angle) * radius + 2;
          group.position.z = Math.sin(angle) * radius - 6;
          group.position.y = 2.5 + Math.sin(t * 0.4) * 0.5;
          const nextAngle = angle + 0.01;
          group.lookAt(Math.cos(nextAngle) * radius + 2, group.position.y, Math.sin(nextAngle) * radius - 6);
          flFront.rotation.z = Math.sin(t * 2.2) * 0.5;
          flFrontR.rotation.z = -Math.sin(t * 2.2) * 0.5;
          flBack.rotation.z = -Math.sin(t * 2.2 + 0.6) * 0.35;
          flBackR.rotation.z = Math.sin(t * 2.2 + 0.6) * 0.35;
        }
      };
    }
    const turtle = buildTurtle();

    // ---------- Small fish school ----------
    const fishGroup = new THREE.Group();
    // TWEAK HERE: Reduce fish count if performance is low
    const fishCount = 18;
    const fishMat = new THREE.MeshStandardMaterial({ color: 0x9fd8e0, roughness: 0.5, emissive: 0x0d2b33, emissiveIntensity: 0.3 });
    const fishGeo = new THREE.ConeGeometry(0.12, 0.4, 6);
    const fishData = [];
    for (let i = 0; i < fishCount; i++) {
      const mesh = new THREE.Mesh(fishGeo, fishMat);
      fishGroup.add(mesh);
      const gatherAngle = (i / fishCount) * Math.PI * 2;
      const gatherRadius = 0.35 + Math.random() * 0.9;
      fishData.push({
        mesh,
        radius: 4 + Math.random() * 2,
        speed: 0.3 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
        height: (Math.random() - 0.5) * 3 + 2,
        yOff: Math.random() * Math.PI * 2,
        gatherAngle,
        gatherRadius,
        gatherBob: Math.random() * Math.PI * 2
      });
    }
    scene.add(fishGroup);

    // ---------- INTRO SEQUENCE: hero fish swims to the avatar, then it glows in ----------
    const heroFishMat = new THREE.MeshStandardMaterial({
      color: 0xffcf5c, emissive: 0x8a5a00, emissiveIntensity: 0.5, roughness: 0.4
    });
    const heroFish = new THREE.Mesh(fishGeo, heroFishMat);
    heroFish.visible = !prefersReduced;
    heroFish.scale.setScalar(2); // Make the hero fish a bit larger
    scene.add(heroFish);

    const introPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -3); // world z = -3, mid-ground
    const introRaycaster = new THREE.Raycaster();
    const introTarget = new THREE.Vector3();
    const introStart = new THREE.Vector3();

    function computeAvatarWorldTarget() {
      const avatarEl = document.getElementById('avatarWrap');
      if (!avatarEl) return;
      const rect = avatarEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const ndc = new THREE.Vector2((cx / window.innerWidth) * 2 - 1, -(cy / window.innerHeight) * 2 + 1);
      introRaycaster.setFromCamera(ndc, camera);
      introRaycaster.ray.intersectPlane(introPlane, introTarget);
    }

    let introDone = false;
    const introDelay = 0.5;   // settle time before the fish starts swimming, seconds
    const introDuration = 2.4; // swim duration, seconds
    const introFadeOut = 1.0;  // fish fade-out duration after arrival

    if (prefersReduced) {
      introDone = true;
    } else {
      // Small timeout to ensure the DOM is fully painted so getBoundingClientRect is accurate
      setTimeout(() => {
        computeAvatarWorldTarget();
        introStart.set(-22, introTarget.y + 0.5, introTarget.z + 1.5);
        heroFish.position.copy(introStart);
      }, 50);
    }

    function updateIntro(t) {
      const avatarEl = document.getElementById('avatarWrap');
      if (introDone) {
        // Fallback: If user navigates away and back, make sure it stays revealed instantly
        if (avatarEl && !avatarEl.classList.contains('revealed')) {
          avatarEl.classList.add('revealed');
        }
        return;
      }
      if (!avatarEl) return;

      const elapsed = t - introDelay;
      if (elapsed < 0) return;

      const progress = Math.min(elapsed / introDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const prevPos = heroFish.position.clone();

      heroFish.position.lerpVectors(introStart, introTarget, eased);
      heroFish.position.y += Math.sin(progress * Math.PI * 4) * 0.25 * (1 - progress * 0.6);

      const dir = heroFish.position.clone().sub(prevPos);
      if (dir.lengthSq() > 0.000001) {
        heroFish.lookAt(heroFish.position.clone().add(dir));
        heroFish.rotateX(Math.PI / 2);
      }

      if (progress >= 0.92 && !avatarEl.classList.contains('revealed')) {
        avatarEl.classList.add('revealed');
      }

      if (progress >= 1) {
        const fadeElapsed = elapsed - introDuration;
        const fadeT = Math.min(fadeElapsed / introFadeOut, 1);
        heroFish.position.x += 0.06; // keep drifting off to the right
        heroFish.scale.setScalar(2 * (1 - fadeT));
        if (fadeT >= 1) {
          heroFish.visible = false;
          introDone = true;
        }
      }
    }

    // ---------- Animation loop ----------
    const clock = new THREE.Clock();
    const mouseTarget = { x: 0, y: 0 };
    let mouseCurrent = { x: 0, y: 0 };

    const raycaster = new THREE.Raycaster();
    const raycastMouse = new THREE.Vector2();
    const gatherPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 2); // z = -2 plane, where fish roam
    const mouseWorldTarget = new THREE.Vector3(0, 2, -2);
    let mouseActive = false;
    let mouseIdleTimer = null;
    let mouseActiveAmount = 0;
    
    let animationFrameId;

    const onMouseMove = (e) => {
      mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.y = (e.clientY / window.innerHeight - 0.5) * 2;

      raycastMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      raycastMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(raycastMouse, camera);
      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(gatherPlane, hit)) {
        mouseWorldTarget.copy(hit);
      }
      mouseActive = true;
      clearTimeout(mouseIdleTimer);
      mouseIdleTimer = setTimeout(() => { mouseActive = false; }, 1800);
    };

    const onMouseLeave = () => { mouseActive = false; };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    function animate() {
      const t = clock.getElapsedTime();
      causticUniforms.uTime.value = t;

      // bubbles rising and looping
      const posAttr = particleGeo.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        let y = posAttr.array[i*3+1] + speeds[i] * 0.01;
        posAttr.array[i*3] += Math.sin(t * 0.5 + phases[i]) * 0.0015;
        if (y > 11) y = -11;
        posAttr.array[i*3+1] = y;
      }
      posAttr.needsUpdate = true;

      // god ray shimmer
      godRays.forEach((ray, i) => {
        ray.material.opacity = 0.5 + Math.sin(t * 0.4 + i) * 0.15;
        ray.rotation.z += Math.sin(t * 0.2 + i) * 0.0006;
      });

      shark.update(t);
      octopus.update(t);
      turtle.update(t);
      jellyfish.forEach((j) => j.update(t));
      updateIntro(t);

      mouseActiveAmount += ((mouseActive ? 1 : 0) - mouseActiveAmount) * 0.04;

      fishData.forEach((f) => {
        const angle = t * f.speed + f.offset;
        const swirlPos = new THREE.Vector3(
          Math.cos(angle) * f.radius,
          f.height + Math.sin(t * 1.2 + f.yOff) * 0.3,
          Math.sin(angle) * f.radius - 2
        );

        const gatherPos = new THREE.Vector3(
          mouseWorldTarget.x + Math.cos(f.gatherAngle + t * 0.8) * f.gatherRadius,
          mouseWorldTarget.y + Math.sin(t * 1.5 + f.gatherBob) * 0.25,
          mouseWorldTarget.z + Math.sin(f.gatherAngle + t * 0.8) * f.gatherRadius
        );

        const targetPos = swirlPos.clone().lerp(gatherPos, mouseActiveAmount);
        const oldPos = f.mesh.position.clone();
        f.mesh.position.lerp(targetPos, 0.06 + mouseActiveAmount * 0.05);

        const dir = f.mesh.position.clone().sub(oldPos);
        if (dir.lengthSq() > 0.000001) {
          f.mesh.lookAt(f.mesh.position.clone().add(dir));
          f.mesh.rotateX(Math.PI / 2);
        }
      });

      // camera parallax + slow autonomous drift
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.03;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.03;
      camera.position.x = mouseCurrent.x * 2.2 + Math.sin(t * 0.05) * 1.5;
      camera.position.y = 1.5 - mouseCurrent.y * 1.2;
      camera.lookAt(0, -0.5, -2);

      renderer.render(scene, camera);
      
      if (!prefersReduced) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }

    function resize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (!introDone) computeAvatarWorldTarget();
    }
    
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (mouseIdleTimer) {
        clearTimeout(mouseIdleTimer);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div id="scene-wrap">
        <canvas id="gl" ref={canvasRef}></canvas>
      </div>
      <div className="caustic-overlay"></div>
    </>
  );
};

export default OceanBackground;
