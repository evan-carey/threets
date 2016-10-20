import * as THREE from 'three';
import { Renderer } from "./Renderer";

import './../res/main.scss';

window.onload = () => {
    new Renderer(window.innerWidth, window.innerHeight).render();
};