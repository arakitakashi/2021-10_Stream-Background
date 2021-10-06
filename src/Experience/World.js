import * as THREE from 'three'
import Experience from './Experience.js'
import Gradient from './Gradient.js'
import Particles from './Particles.js'
import Smoke from './Smoke.js'


export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setGradient()
                this.setSmoke()
                this.setParticles()
            }
        })
    }

    setGradient()
    {
      this.gradient = new Gradient()
    }

    setParticles()
    {
      this.particles = new Particles()
    }

    setSmoke()
    {
      this.smoke = new Smoke()
    }


    resize()
    {
      if(this.smoke)
      {
        this.smoke.resize()
      }
    }

    update()
    {
      if(this.gradient)
      {
        this.gradient.update()
      }
      if(this.particles)
      {
        this.particles.update()
      }
      if(this.smoke)
      {
        this.smoke.update()
      }
    }

    destroy()
    {
    }
}