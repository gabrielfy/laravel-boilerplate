import React from 'react'
import { render } from 'react-dom'
import { InertiaApp } from '@inertiajs/inertia-react'
import './bootstrap'

const app = document.getElementById('app')

render(
  <InertiaApp
    initialPage={JSON.parse(app!.dataset.page || '{}')}
    resolveComponent={(name: any) =>
      import(`./pages/${name}`).then((module) => module.default)
    }
  />,
  app
)
