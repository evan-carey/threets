import * as THREE from 'three';
import { Renderer } from "./Renderer";

window.onload = () => {
    new Renderer(window.innerWidth, window.innerHeight).render();
};