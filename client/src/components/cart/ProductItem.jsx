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
import * as THREE from 'three';
import myLogo from '../../assets/img/logoOnObject.png'
import { products } from '../../data/data';

const GroundPlane = () => {
    return (
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial attach="material" opacity={0.5} />
      </mesh>
    );
  };

const Model = ({ color, rotation, image, modelImport, sacType }) => {
    const model = useLoader(GLTFLoader, modelImport);
    const texture = useTexture(image); // Încarcă textura imaginii
    model.scene.traverse(child => {
        if (child.isMesh) { 
        child.material.needsUpdate = true;
        child.material.metalness = 0.1; // Ajustează după necesitate
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.roughness = 0.5; // Ajustează după necesitate
      }
      if (child.isMesh && child.name === sacType + "bag") { 
        child.material.needsUpdate = true; // Asigură actualizarea materialului
        child.material.color.set(color);
      }
      if (child.isMesh && child.name === sacType + "logoFront") {
        child.material.needsUpdate = true; // Asigură actualizarea materialului
        child.material.map = texture;
       }
       if (child.isMesh && child.name === sacType + "logoBack") {
        child.material.needsUpdate = true; // Asigură actualizarea materialului
        child.material.map = texture;
       }
    });
    return <primitive object={model.scene} scale={1} rotation={rotation} modelImport={modelImport} />;
  };



  const CustomOrbitControls = () => {
    const controls = useRef();
    const { camera } = useThree();
  
    useEffect(() => {
      if (controls.current) {
        // Setează limitele pentru zoom
        controls.current.minDistance = 5.5;
        controls.current.maxDistance = 7;
  
        // Limitarea rotației pe verticală (sus-jos)
        controls.current.minPolarAngle = Math.PI / 2; // Limită la orizontală
        controls.current.maxPolarAngle = Math.PI / 2; // Limită la orizontală
  
        // Dezactivează pan (mutarea în stânga/dreapta)
        controls.current.enablePan = false;
      }
    }, []);
  
    return <OrbitControls ref={controls} args={[camera]} />;
  };



const Products = () => {
  const { addProduct } = useCartContext();
//   const [modelImport, setModelImport] = useState(bag3DModel) 
  const [rotation, setRotation] = useState([0, -Math.PI / 6, 0]); // Rotație spre stânga



  const ProductItem = ({ product }) => {
    const [color, setColor] = useState(''); // Stare individuală pentru culoare
    const [localImage, setLocalImage] = useState(myLogo);

    const handleImageChange = (e) => {
        if (e.target.files.length) {
          const url = URL.createObjectURL(e.target.files[0]);
          setLocalImage(url);
        }
      };

    const handleColorChange = (colorData) => {
      setColor(colorData);
    };
  
    return (
      <div className={`${classes.cardProduct} row`}>
        <div className={`${classes.object3DContainer} col-8`}>
          <Canvas>
          <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} castShadow />
            <Suspense fallback={null}>
                
              <Model color={color} rotation={rotation} image={localImage} modelImport={product.objet} sacType={product.type}/>
              <GroundPlane></GroundPlane>
              <CustomOrbitControls />
            </Suspense>
          </Canvas>
        </div>
        <div className={`${classes.objectProprieties} col-4`}>
          <h1>{product.name}</h1>
          {product.colorSac.map(colorOption => (
            <button key={colorOption.colorName} onClick={() => handleColorChange(colorOption.colorData)}>
              {colorOption.colorName}
            </button>
          ))}
          <button onClick={() => handleColorChange(color)}>CustomColor</button>
          <input type="file" onChange={handleImageChange} />
        </div>
      </div>
    );
  };


  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
          {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}

          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
