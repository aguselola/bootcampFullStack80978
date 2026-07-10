import { useState } from 'react'
import { Link } from 'react-router'

import './App.css'

import { Navbar } from './componentes/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router'

import { Index as Inicio } from './componentes/Inicio/Index'
import { Index as Alta } from './componentes/Alta/Index'
import { Index as Carrito } from './componentes/Carrito/Index'
import { Index as Contacto } from './componentes/Contacto/Index'
import { Index as Nosotros } from './componentes/Nosotros/Index'
import { Index as Otra } from './componentes/Otra/Index'

function App() {

  return (
    <>

      <BrowserRouter>
      
        <header>
          <Navbar />
          <div>
              <div id="logo"><img src="/img/logo arcana.PNG" alt="logo" /></div>
              <div id="barra-busqueda">
                  <form action="#">
                      <label htmlFor="buscar"><img src="/img/lupita.png" alt="lupa para buscar" /></label>
                      <input type="text" id="buscar" />
                      <input type="submit" value="Buscar" />
                  </form>
              </div>
              <Link to="/carrito" id="boton-carrito"><img src="/img/carritochagpt.png" alt="boton carrito" />   </Link>  
          </div>
        </header>
        <main>
          <Routes>
            <Route index element={<Inicio />} />  {/* ruta raiz */}

            <Route path='inicio' element={<Inicio />} />
            <Route path='alta' element={<Alta />} />
            <Route path='carrito' element={<Carrito />} />
            <Route path='contacto' element={<Contacto />} />
            <Route path='nosotros' element={<Nosotros />} />
            <Route path='otra' element={<Otra />} />

            <Route path='*' element={<Inicio />} />  {/* ruta default */}
          </Routes>
        </main>
      
      </BrowserRouter>


        <footer>
          <h3>✦Confía en tu intuición, el universo conspira a tu favor✦</h3>
        </footer>
    </>
  )
}

export default App
