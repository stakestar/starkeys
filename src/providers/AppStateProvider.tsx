import { RcFile } from 'antd/es/upload'
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useMemo,
  useState
} from 'react'

export type Operator = {
  id: string
  publicKey: string
}

type OperatorError = {
  id: boolean
  publicKey: boolean
}

export type AppStateProviderValue = {
  values: {
    keystoreFile: RcFile
    keystorePassword: string
    operators: Operator[]
    ssvAmount: string,
    currentStep: number
  }
  actions: {
    setKeystoreFile: Dispatch<SetStateAction<RcFile>>
    setKeystorePassword: Dispatch<SetStateAction<string>>
    setOperators: Dispatch<SetStateAction<Operator[]>>
    setSsvAmount: Dispatch<SetStateAction<string>>
    setKeystoreFileError: Dispatch<SetStateAction<boolean>>
    setKeystorePasswordError: Dispatch<SetStateAction<boolean>>
    setOperatorsError: Dispatch<SetStateAction<OperatorError[]>>
    setSsvAmountError: Dispatch<SetStateAction<string|null>>,
    setCurrentStep: Dispatch<SetStateAction<number>>
  }
  errors: {
    keystoreFile: boolean
    keystorePassword: boolean
    operators: OperatorError[]
    ssvAmount: string|null
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

  const [keystoreFileError, setKeystoreFileError] = useState(false)
  const [keystorePasswordError, setKeystorePasswordError] = useState(false)
  const [ssvAmountError, setSsvAmountError] = useState(null)
  const [operatorsError, setOperatorsError] = useState<OperatorError[]>(
    Array.from({ length: requiredOperatorsCount }, () => ({ id: false, publicKey: false }))
  )

  const [currentStep, setCurrentStep] = useState(0)

  const actions = useMemo(
    () => ({
      setKeystoreFile,
      setKeystorePassword,
      setOperators,
      setSsvAmount,
      setKeystoreFileError,
      setKeystorePasswordError,
      setSsvAmountError,
      setOperatorsError,
      setCurrentStep
    }),
    []
  )

  const values = { keystoreFile, keystorePassword, operators, ssvAmount, currentStep }

  const errors = useMemo(
    () => ({
      keystoreFile: keystoreFileError,
      keystorePassword: keystorePasswordError,
      operators: operatorsError,
      ssvAmount: ssvAmountError
    }),
    [keystoreFileError, keystorePasswordError, operatorsError, ssvAmountError]
  )

  return (
    <AppStateProviderContext.Provider value={{ actions, values, errors }}>
      {children}
    </AppStateProviderContext.Provider>
  )
}
