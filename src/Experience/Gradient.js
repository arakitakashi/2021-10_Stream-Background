import * as THREE from 'three'
import Experience from './Experience'
import vertexShader from './shaders/gradient/vertex.glsl'
import fragmentShader from './shaders/gradient/fragment.glsl'

export default class Gradient
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
        title: 'gradient'
      })
    }

    this.setGeometry()
    this.setColors()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry()
  {
    this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
  }

  setColors()
  {
    this.colors = {}

    this.colors.end = {}
    this.colors.end.value = '#1a2036'
    this.colors.end.instance = new THREE.Color(this.colors.end.value)

    this.colors.start = {}
    this.colors.start.saturation = 32
    this.colors.start.lightness = 32
    this.colors.start.value = `hsl(0, ${this.colors.start.saturation}%, ${this.colors.start.lightness}%)`
    this.colors.start.instance = new THREE.Color(this.colors.start.value)

    if(this.debug) {
      this.debugFolder
      .addInput(
        this.colors.end,
        'value',
        {
          view: 'color'
        }
      )
      .on('change', () =>
      {
        this.colors.end.instance.set(this.colors.end.value)
      })

      this.debugFolder
      .addInput(
        this.colors.start,
        'value',
        {
          view: 'color'
        }
      )
      .on('change', () =>
      {
        this.colors.start.instance.set(this.colors.start.value)
      })
      this.debugFolder
      .addInput(
        this.colors.start,
        'saturation',
        { label: 'uSaturation', min: 0, max: 100, step: 1 }
      )
      this.debugFolder
      .addInput(
        this.colors.start,
        'lightness',
        { label: 'uLightness', min: 0, max: 100, step: 1 }
      )
    }
  }

  setMaterial()
  {
    this.material = new THREE.ShaderMaterial({
      depthWrite: false,
      transparent: true,
      uniforms:
      {
        uTime: { value: 0 },
        uEndColor: { value: this.colors.end.instance },
        uStartColor: { value: this.colors.start.instance },
        // uSaturation: { value: 0.32 },
        // uLightness: { value: 0.38 }
      },
      vertexShader,
      fragmentShader
    })

    if(this.debug)
    {
    }
  }

  setMesh()
  {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  update()
  {
    this.colors.start.value = `hsl(${this.time.elapsed * 0.01}, ${this.colors.start.saturation}%, ${this.colors.start.lightness}%)`
    this.colors.start.instance.set(this.colors.start.value)
    this.material.uniforms.uTime.value = this.time.elapsed
  }
}