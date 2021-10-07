import * as THREE from 'three'
import Experience from './Experience'
import vertexShader from './shaders/vignette/vertex.glsl'
import fragmentShader from './shaders/vignette/fragment.glsl'

export default class Vignette
{
  constructor()
  {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.time = this.experience.time
    this.debug = this.experience.debug
    this.world = this.experience.world

    if(this.debug)
    {
      this.debugFolder = this.debug.addFolder({
        title: 'vignette'
      })
    }

    this.setGeometry()
    this.setColor()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry()
  {
    this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
  }

  setColor()
  {
    this.color = {}

    this.color.value = '#303548'
    this.color.instance = new THREE.Color(this.color.value)

    if(this.debug) {
      this.debugFolder
      .addInput(
        this.color,
        'value',
        {
          view: 'color'
        }
      )
      .on('change', () =>
      {
        this.color.instance.set(this.color.value)
      })
    }
  }

  setMaterial()
  {
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthText: false,
      uniforms:
      {
        uColor: { value: this.color.instance },
        uOffset: { value: 0 },
        uMultiplier: { value: 1 }
      },
      vertexShader,
      fragmentShader
    })

    if(this.debug)
    {
      this.debugFolder.addInput(
        this.material.uniforms.uOffset,
        'value',
        {
          label: 'uOffset', min: -1, max: 1, step: 0.001
        }
      )
      this.debugFolder.addInput(
        this.material.uniforms.uMultiplier,
        'value',
        {
          label: 'uMultiplier', min: 0, max: 2, step: 0.001
        }
      )
    }
  }

  setMesh()
  {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  update()
  {
    const color = this.world.gradient.colors.start.instance.clone()
    this.colors.start.value
  }
}