import { App } from '@inertiajs/inertia-react'
import React from 'react'
import { render } from 'react-dom'
import './bootstrap'

const app = document.getElementById('app')

render(
  <App
    initialPage={JSON.parse(app.dataset.page)}
    resolveComponent={(name) => require(`./pages/${name}`).default}
  />,
  app
)
