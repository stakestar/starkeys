export const readFileContent = async (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsText(file)
        reader.onload = ({ target }) => {
            resolve(target.result.toString())
        }
        reader.onerror = (error) => {
          console.error(error)
          reject(error)
        }
    })
}

export const saveFilePicker = async (name: string, content: string) => {  
    const bb = new Blob([content ], { type: 'text/plain' })
    const a = document.createElement('a');
    a.download = name
    a.href = window.URL.createObjectURL(bb)
    a.click()
}
