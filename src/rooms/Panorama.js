import * as THREE from 'three';

import { ParentObject3D, Position, Text } from '../components/index.js';

var pano = null, context, material;

const videoThemes = [
  'assets/mp4/BuddhaPark.mp4',
  'assets/mp4/Bastei.mp4',
  'assets/mp4/Germany.mp4',
  'assets/mp4/pano.mp4',
  'assets/mp4/SpecialMoments.mp4',
];


export function setup(ctx) {
  const video = document.getElementById( 'video' )
  const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  const texture = new THREE.VideoTexture( video );
  material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.BackSide })
  pano = new THREE.Mesh(geometry, material);

  ctx.raycontrol.addState('panorama', {
    raycaster: false,
    onSelectEnd: onSelectEnd
  });
}

export function enter(ctx) {
  ctx.renderer.setClearColor(0x000000);
  ctx.scene.add(pano);
  ctx.raycontrol.activateState('panorama');
  context = ctx;
}

export function exit(ctx) {
  ctx.scene.remove(pano);
  ctx.raycontrol.deactivateState('panorama');
}

export function execute(ctx, delta, time) {
}

export function onSelectEnd(evt) {
  context.goto = 0;
  stopVideo()
}


function stopVideo() {
  const video = document.getElementById( 'video' )
  if (!video.paused) {
    video.pause();
    video.currentTime = 0;
    video.src = null;
  }
}
