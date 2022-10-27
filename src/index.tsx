import { createRoot } from 'react-dom/client'

import { App } from './components'
import { AppStateProvider } from './providers'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('app')!).render(
  <AppStateProvider requiredOperatorsCount={4}>
    <App />
  </AppStateProvider>
)
