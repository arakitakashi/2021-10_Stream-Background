import * as THREE from 'three'
import Experience from './Experience'
import vertexShader from './shaders/smoke/vertex.glsl'
import fragmentShader from './shaders/smoke/fragment.glsl'

export default class Smoke
{
  constructor()
  {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.time = this.experience.time
    this.debug = this.experience.debug

    if(this.debug)
    {
      this.debugFolder = this.debug.addFolder({
        title: 'smoke'
      })
    }

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry()
  {
    this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
  }

  setMaterial()
  {
    this.material = new THREE.ShaderMaterial({
      depthWrite: false,
      uniforms:
      {
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader
    })
  }

  setMesh()
  {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  update()
  {
    this.material.uniforms.uTime.value = this.time.elapsed
  }
}