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
    ownerAddress: string,
    ownerNonce: number,
    currentStep: number
  }
  actions: {
    setKeystoreFile: Dispatch<SetStateAction<RcFile>>
    setKeystorePassword: Dispatch<SetStateAction<string>>
    setPrivateKey: Dispatch<SetStateAction<string>>
    setOperators: Dispatch<SetStateAction<Operator[]>>
    setOwnerAddress: Dispatch<SetStateAction<string>>
    setOwnerNonce: Dispatch<SetStateAction<number>>
    setKeystoreFileError: Dispatch<SetStateAction<boolean>>
    setKeystorePasswordError: Dispatch<SetStateAction<boolean>>
    setOperatorsError: Dispatch<SetStateAction<OperatorError[]>>
    setOwnerAddressError: Dispatch<SetStateAction<string|null>>,
    setOwnerNonceError: Dispatch<SetStateAction<string|null>>,
    setCurrentStep: Dispatch<SetStateAction<number>>
    reset: Dispatch<void>
  }
  errors: {
    keystoreFile: boolean
    keystorePassword: boolean
    operators: OperatorError[]
    ownerAddress: string|null
    ownerNonce: string|null
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
  const [ownerAddress, setOwnerAddress] = useState('')
  const [ownerNonce, setOwnerNonce] = useState(null)

  const [operators, setOperators] = useState<Operator[]>(
    Array.from({ length: requiredOperatorsCount }, () => ({ id: '', publicKey: '' }))
  )

  const [keystoreFileError, setKeystoreFileError] = useState(false)
  const [keystorePasswordError, setKeystorePasswordError] = useState(false)
  const [ownerAddressError, setOwnerAddressError] = useState(null)
  const [ownerNonceError, setOwnerNonceError] = useState(null)
  const [operatorsError, setOperatorsError] = useState<OperatorError[]>(
    Array.from({ length: requiredOperatorsCount }, () => ({ id: false, publicKey: false }))
  )

  const [currentStep, setCurrentStep] = useState(0)

  const reset = () => {
    setKeystoreFile(null)
    setKeystorePassword('')
    setPrivateKey('')
    setOwnerAddress('')
    setOwnerNonce(null)
    setOperators([])

    setKeystoreFileError(false)
    setKeystorePasswordError(false)
    setOwnerAddressError(null)
    setOwnerNonceError(null)
    setOperatorsError([])
  }

  const actions = useMemo(
    () => ({
      setKeystoreFile,
      setKeystorePassword,
      setPrivateKey,
      setOperators,
      setOwnerAddress,
      setOwnerNonce,
      setKeystoreFileError,
      setKeystorePasswordError,
      setOwnerAddressError,
      setOwnerNonceError,
      setOperatorsError,
      setCurrentStep,
      reset
    }),
    []
  )

  const values = { keystoreFile, keystorePassword, operators, ownerAddress, ownerNonce, privateKey, currentStep }

  const errors = useMemo(
    () => ({
      keystoreFile: keystoreFileError,
      keystorePassword: keystorePasswordError,
      operators: operatorsError,
      ownerAddress: ownerAddressError,
      ownerNonce: ownerNonceError,
    }),
    [keystoreFileError, keystorePasswordError, operatorsError, ownerAddressError, ownerNonceError]
  )

  return (
    <AppStateProviderContext.Provider value={{ actions, values, errors }}>
      {children}
    </AppStateProviderContext.Provider>
  )
}
