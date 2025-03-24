'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Mesh, Group, Vector2 } from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

interface ModelProps {
  isAnimating: boolean;
  spinSpeed: number;
}

interface LoaderProgress {
  loaded: number;
  total: number;
}

type ObjectWithRotation = {
  rotation: {
    x: number;
    y: number;
  };
};

export function Model({ isAnimating, spinSpeed = 20 }: ModelProps) {
  const groupRef = useRef<Group>(null);
  const [model, setModel] = useState<Group | null>(null);
  const texture = useTexture('/textures/Muchkin2_BaseColor.png');
  const mousePosition = useRef(new Vector2());
  const { size } = useThree();
  const headBone = useRef<ObjectWithRotation | null>(null);

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / size.width) * 2 - 1;
      mousePosition.current.y = -(event.clientY / size.height) * 2 + 1;
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [size]);

  useEffect(() => {
    const loader = new FBXLoader();
    loader.load(
      '/source/OiiaioooooiaiFin.fbx',
      (fbxModel: Group) => {
        fbxModel.scale.set(0.03, 0.03, 0.03);
        fbxModel.traverse((object) => {
          if (object instanceof Mesh) {
            object.material.map = texture;
          }
          if (object.name.toLowerCase().includes('head') || 
              object.name.toLowerCase().includes('neck') ||
              object.name.toLowerCase().includes('skull')) {
            console.log('Found head bone:', object.name);
            headBone.current = object;
          }
        });
        setModel(fbxModel);
      },
      (progress: LoaderProgress) => {
        console.log((progress.loaded / progress.total) * 100 + '% loaded');
      },
      (err: unknown) => {
        console.error('Error loading model:', err);
      }
    );
  }, [texture]);

  useFrame((_, delta) => {
    if (!model) return;

    if (isAnimating) {
      model.rotation.y += delta * spinSpeed;
      
      if (headBone.current) {
        headBone.current.rotation.x = 0;
        headBone.current.rotation.y = 0;
      }
    } else if (headBone.current) {
      const mouseX = mousePosition.current.x;
      const mouseY = mousePosition.current.y;

      const targetRotationY = Math.min(Math.max(mouseX * Math.PI * 0.25, -Math.PI * 0.25), Math.PI * 0.25);
      const targetRotationX = Math.min(Math.max(mouseY * Math.PI * 0.15, -Math.PI * 0.15), Math.PI * 0.15);

      headBone.current.rotation.y = headBone.current.rotation.y + (targetRotationY - headBone.current.rotation.y) * 0.05;
      headBone.current.rotation.x = headBone.current.rotation.x + (targetRotationX - headBone.current.rotation.x) * 0.05;
    }
  });

  if (!model) return null;

  return (
    <primitive 
      ref={groupRef}
      object={model} 
      position={[0, -1, 0]}
    />
  );
}