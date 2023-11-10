import React, { useState, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { useCartContext } from '../../ctx/cartContext';
import classes from './productItem.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bag3DModel from '../../assets/objects/bag.gltf';
import * as THREE from 'three';
import myLogo from '../../assets/img/logoOnObject.png'

const Model = ({ color, rotation, image }) => {
    const model = useLoader(GLTFLoader, bag3DModel);
    const texture = useTexture(image); // Încarcă textura imaginii
    model.scene.traverse(child => {
        if (child.isMesh) { 
        child.material.needsUpdate = true;
        child.material.metalness = 0.1; // Ajustează după necesitate
        child.material.roughness = 0.5; // Ajustează după necesitate
      }
      if (child.isMesh && child.name === "bag") { 
        child.material.needsUpdate = true; // Asigură actualizarea materialului
        child.material.color.set(color);
      }
      if (child.isMesh && child.name === "imageBagFront") {
        child.material.needsUpdate = true; // Asigură actualizarea materialului
        child.material.map = texture;
       }
       if (child.isMesh && child.name === "imageBagBack") {
        child.material.needsUpdate = true; // Asigură actualizarea materialului
        child.material.map = texture;
       }
    });
    return <primitive object={model.scene} scale={1} rotation={rotation} />;
  };

  const CustomOrbitControls = () => {
    const controls = useRef();
    const { camera } = useThree();
  
    useEffect(() => {
      if (controls.current) {
        // Setează limitele pentru zoom
        controls.current.minDistance = 6;
        controls.current.maxDistance = 7;
  
        // Dezactivează pan (mutarea în stânga/dreapta)
        controls.current.enablePan = false;
      }
    }, []);
  
    return <OrbitControls ref={controls} args={[camera]} />;
  };




const Products = () => {
  const { addProduct } = useCartContext();
  const [color, setColor] = useState('white'); // culoarea inițială
  const [rotation, setRotation] = useState([0, -Math.PI / 6, 0]); // Rotație spre stânga
  const [image, setImage] = useState(myLogo); // Stare pentru imagine

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
  };

  const changeColor = (newColor) => {
    setColor(newColor);
  };

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className={`${classes.cardProduct} row`}>
              <div className={`${classes.object3DContainer} col-8`}>
              <Canvas>
            <ambientLight intensity={2} />
            <pointLight position={[10, 0, 0]} />
            <Suspense fallback={null}>
              <Model color={color} rotation={rotation} image={image} />
              <CustomOrbitControls /> {/* Folosește controlul personalizat */}
            </Suspense>
          </Canvas>
              </div>
              <div className={`${classes.objectProprieties} col-4`}>
                <button onClick={() => changeColor('rgb(215, 174, 85)')}>Brown</button>
                <button onClick={() => changeColor('white')}>White</button>
                <input type="file" onChange={handleImageChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
