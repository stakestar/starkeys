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

export type OperatorError = {
  id: boolean
  publicKey: boolean
}

export type AppStateProviderValue = {
  values: {
    keystoreFile: RcFile
    keystorePassword: string
    privateKey: string
    operators: Operator[]
    ssvAmount: string,
    currentStep: number
  }
  actions: {
    setKeystoreFile: Dispatch<SetStateAction<RcFile>>
    setKeystorePassword: Dispatch<SetStateAction<string>>
    setPrivateKey: Dispatch<SetStateAction<string>>
    setOperators: Dispatch<SetStateAction<Operator[]>>
    setSsvAmount: Dispatch<SetStateAction<string>>
    setKeystoreFileError: Dispatch<SetStateAction<boolean>>
    setKeystorePasswordError: Dispatch<SetStateAction<boolean>>
    setOperatorsError: Dispatch<SetStateAction<OperatorError[]>>
    setSsvAmountError: Dispatch<SetStateAction<string|null>>,
    setCurrentStep: Dispatch<SetStateAction<number>>
    reset: Dispatch<void>
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
  const [privateKey, setPrivateKey] = useState('')
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

  const reset = () => {
    setKeystoreFile(null)
    setKeystorePassword('')
    setPrivateKey('')
    setSsvAmount('')
    setOperators([])

    setKeystoreFileError(false)
    setKeystorePasswordError(false)
    setSsvAmountError(false)
    setOperatorsError([])
  }

  const actions = useMemo(
    () => ({
      setKeystoreFile,
      setKeystorePassword,
      setPrivateKey,
      setOperators,
      setSsvAmount,
      setKeystoreFileError,
      setKeystorePasswordError,
      setSsvAmountError,
      setOperatorsError,
      setCurrentStep,
      reset
    }),
    []
  )

  const values = { keystoreFile, keystorePassword, operators, ssvAmount, privateKey, currentStep }

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
