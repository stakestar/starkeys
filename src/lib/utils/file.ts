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
    const handle = await window.showSaveFilePicker({
        suggestedName: name,
    });

    const writable = await handle.createWritable()

    await writable.write(content);
    await writable.close();
}