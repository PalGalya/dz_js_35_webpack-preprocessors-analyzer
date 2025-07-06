import '@css/style.css'
import '@less/style.less'
import '@sass/style.scss'
import '@sass/style.sass'
import Post from '@model/post'
import json from '@assets/data.json'
import logo from '@assets/icon-square-big.png'
import '@model/lodash'

import React from 'react'
import { createRoot } from 'react-dom/client'

const post = new Post('Webpack Post Title', logo)

const container = document.getElementById('root')
const root = createRoot(container)

const App = () => (
  <div className="container">
    <h1>Webpack training</h1>
    <div className="logo" />
    <pre />
    <div className="less-demo">
      <h1>Less demo</h1>
    </div>
    <div className="sass-demo">
      <h1>Sass demo</h1>
    </div>
    <div className="scss-demo">
      <h1>Scss demo</h1>
    </div>
  </div>
)

root.render(<App />)

// import $ from 'jquery'
// $('pre').addClass('code').html(post.toString())
// console.log('JSON:', json)

// async function start() {
//   return await new Promise((resolve) => setTimeout(() => resolve('Async done'), 2000))
// }
// start().then((data) => console.log('Data:', data))

// class Util {
//   static id = Date.now();
// }

// console.log('Util ID:', Util.id);
