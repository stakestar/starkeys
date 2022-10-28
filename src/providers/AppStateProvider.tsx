import { RcFile } from 'antd/es/upload'
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useMemo,
  useState
} from 'react'

type Operator = {
  id: string
  publicKey: string
}

export type AppStateProviderValue = {
  keystoreFile: RcFile
  keystorePassword: string
  operators: Operator[]
  ssvAmount: string
  actions: {
    setKeystoreFile: Dispatch<SetStateAction<RcFile>>
    setKeystorePassword: Dispatch<SetStateAction<string>>
    setOperators: Dispatch<SetStateAction<Operator[]>>
    setSsvAmount: Dispatch<SetStateAction<string>>
  }
}

export const AppStateProviderContext = createContext<AppStateProviderValue>(
  {} as AppStateProviderValue
)

interface AppStateProvider extends PropsWithChildren {
  requiredOperatorsCount: number
}

export function AppStateProvider({
  requiredOperatorsCount,
  children
}: AppStateProvider): JSX.Element {
  const [keystoreFile, setKeystoreFile] = useState<RcFile>(null)
  const [keystorePassword, setKeystorePassword] = useState('')
  const [ssvAmount, setSsvAmount] = useState('')
  const [operators, setOperators] = useState<Operator[]>(
    Array.from({ length: requiredOperatorsCount }, () => ({ id: '', publicKey: '' }))
  )

  const actions = useMemo(
    () => ({ setKeystoreFile, setKeystorePassword, setOperators, setSsvAmount }),
    []
  )

  return (
    <AppStateProviderContext.Provider
      value={{ actions, keystoreFile, keystorePassword, operators, ssvAmount }}
    >
      {children}
    </AppStateProviderContext.Provider>
  )
}
