import React, { useEffect, useRef, useState } from "react";
import { Environment, CameraControls, useCursor } from "@react-three/drei";
import { Cactoro } from "./Cactoro";
import { DragonEvolved } from "./Dragon_Evolved";
import { Fish } from "./Fish";
import { MonstartState } from "./MonsterStage";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export const Experience = () => {
  const [active, setActive] = useState(null);
  const [hover, setHover] = useState(null);

  useCursor(hover);

  const controlsRef = useRef();

  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);

      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true,
      );
    } else {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, true);
    }
  }, [active]);

  return (
    <>
      <ambientLight intensitiy={0.5} />
      <Environment preset="sunset" />
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      <MonstartState
        name="Fish KING"
        color={"#38adcf"}
        texture={
          "textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"
        }
        active={active}
        handleActive={setActive}
        hover={hover}
        handleHover={setHover}
      >
        <Fish scale={0.6} position-y={-1} hovered={hover === "Fish KING"} />
      </MonstartState>
      <MonstartState
        name="DRAGON"
        color={"#df8d52"}
        texture={"textures/anime_art_style_lava_world.jpg"}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        handleActive={setActive}
        hover={hover}
        handleHover={setHover}
      >
        <DragonEvolved
          scale={0.5}
          position-y={-1}
          hovered={hover === "DRAGON"}
        />
      </MonstartState>
      <MonstartState
        name="Pocky"
        color={"#739d3c"}
        texture={"textures/anime_art_style_cactus_forest.jpg"}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        handleActive={setActive}
        hover={hover}
        handleHover={setHover}
      >
        <Cactoro scale={0.45} position-y={-1} hovered={hover === "Pocky"} />
      </MonstartState>
    </>
  );
};
