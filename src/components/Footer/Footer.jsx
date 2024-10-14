import React from 'react'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-8 bg-color1 border-t-4 border-color1">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-4 inline-flex items-center">
            <Logo width="200px" />
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-color2 hover:text-color3">
              Twitter
            </a>
            <a href="#" className="text-color2 hover:text-color3">
              GitHub
            </a>
            <a href="#" className="text-color2 hover:text-color3">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer;
