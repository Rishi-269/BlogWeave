import React from 'react'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-8 bg-color5 border-t-4 border-color4">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-4 inline-flex items-center">
            <Logo width="200px" />
          </div>

          <div className="flex space-x-6">
            <a href="https://github.com/Rishi-269/BlogWeave" target='_blank' className="text-color2 hover:text-color1">
              Source Code
            </a>
            <a href="https://github.com/Rishi-269" target='_blank' className="text-color2 hover:text-color1">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/rishi269/" target='_blank' className="text-color2 hover:text-color1">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer;
