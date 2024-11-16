import React, { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Box } from "@mui/material";
import * as THREE from "three";
import { CornersOut, CornersIn } from "phosphor-react";

export default function PanoramaBox({
  panoramicImage,
  onExpandImage,
  isExpanded,
}) {
  const imageContainerRef = useRef(null);
  const sphereRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const fovRef = useRef(75);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Cleanup any existing WebGL resources
    if (rendererRef.current) {
      controlsRef.current?.dispose();
      rendererRef.current.dispose();
      if (sphereRef.current) {
        sphereRef.current.geometry.dispose();
        sphereRef.current.material.dispose();
      }
      imageContainerRef.current?.removeChild(rendererRef.current.domElement);
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      fovRef.current,
      imageContainerRef.current.clientWidth /
        imageContainerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      imageContainerRef.current.clientWidth,
      imageContainerRef.current.clientHeight
    );
    rendererRef.current = renderer;
    imageContainerRef.current.appendChild(renderer.domElement);

    // Sphere geometry
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    // Texture loader
    const textureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
      map: textureLoader.load(panoramicImage),
    });

    // Mesh
    const sphere = new THREE.Mesh(geometry, material);
    sphereRef.current = sphere;
    scene.add(sphere);

    // Camera position
    camera.position.set(0, 0, 0.1);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.zoomSpeed = 0.5;
    controls.minDistance = 100;
    controls.maxDistance = 250;
    controls.enablePan = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.3;
    controls.panSpeed = 0.4;
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Smoothly interpolate FOV changes
      camera.fov += (fovRef.current - camera.fov) * 0.1;
      camera.updateProjectionMatrix();

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const onWindowResize = () => {
      const width = isExpanded
        ? window.innerWidth
        : imageContainerRef.current.clientWidth;
      const height = isExpanded
        ? window.innerHeight
        : imageContainerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onWindowResize);

    // Custom zoom handling within the image container
    const handleZoom = (event) => {
      if (imageContainerRef.current.contains(event.target)) {
        event.preventDefault();

        // Smooth zoom effect
        fovRef.current += event.deltaY * 0.05;
        fovRef.current = THREE.MathUtils.clamp(fovRef.current, 10, 75);
      }
    };
    imageContainerRef.current.addEventListener("wheel", handleZoom, {
      passive: false,
    });

    // Pause auto-rotation on click and resume after 5 seconds
    const handleClick = () => {
      controls.autoRotate = false;
      clearTimeout(controlsRef.current.autoRotateTimeout);
      controlsRef.current.autoRotateTimeout = setTimeout(() => {
        controls.autoRotate = true;
      }, 5000);
    };
    imageContainerRef.current.addEventListener("click", handleClick);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      imageContainerRef.current?.removeEventListener("wheel", handleZoom);
      imageContainerRef.current?.removeEventListener("click", handleClick);

      controls.dispose();
      renderer.dispose();
      scene.clear();

      if (sphereRef.current) {
        sphereRef.current.geometry.dispose();
        sphereRef.current.material.dispose();
        sphereRef.current = null;
      }

      if (rendererRef.current) {
        imageContainerRef.current?.removeChild(rendererRef.current.domElement);
        rendererRef.current = null;
      }
    };
  }, [panoramicImage, isExpanded]);

  // Update texture on image change
  useEffect(() => {
    if (sphereRef.current) {
      const textureLoader = new THREE.TextureLoader();
      const newTexture = textureLoader.load(panoramicImage);
      sphereRef.current.material.map = newTexture;
      sphereRef.current.material.needsUpdate = true;
    }
  }, [panoramicImage]);

  // Trigger resize when `isExpanded` changes
  useEffect(() => {
    if (rendererRef.current && imageContainerRef.current) {
      const width = isExpanded
        ? window.innerWidth
        : imageContainerRef.current.clientWidth;
      const height = isExpanded
        ? window.innerHeight
        : imageContainerRef.current.clientHeight;

      const camera = controlsRef.current.object;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    }
  }, [isExpanded]);

  const onExpandImageHandler = () => {
    onExpandImage((prev) => !prev);
  };

  return (
    <Box
      ref={imageContainerRef}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: isExpanded ? "100vw" : "100%",
        height: isExpanded ? "100vh" : "350px",
        position: "relative",
      }}
    >
      {/* Expand/Compress Button */}
      <Box
        onClick={onExpandImageHandler}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 2,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          color: "#555",
          borderRadius: "50%",
          padding: "0.45rem",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.09)",
          },
        }}
      >
        {isExpanded ? <CornersIn size={25} /> : <CornersOut size={25} />}
      </Box>
    </Box>
  );
}
