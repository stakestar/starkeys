import { useContext } from 'react'

import { AppStateProviderContext, AppStateProviderValue } from '../providers'

export function useAppState(): AppStateProviderValue {
  return useContext(AppStateProviderContext)
}
