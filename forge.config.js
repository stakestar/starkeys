module.exports = {
  config: {
    forge: {
      packagerConfig: {
        icon: './src/assets/icon'
      },
      makers: [
        {
          name: '@electron-forge/maker-squirrel',
          config: {
            // An URL to an ICO file to use as the application icon (displayed in Control Panel > Programs and Features).
            // iconUrl: 'https://url/to/icon.ico',
            // The ICO file to use as the icon for the generated Setup.exe
            setupIcon: './src/assets/icon.ico'
          }
        },
        {
          // Path to a single image that will act as icon for the application
          name: '@electron-forge/maker-deb',
          config: {
            options: {
              icon: './src/assets/icon.png'
            }
          }
        },
        {
          // Path to the icon to use for the app in the DMG window
          name: '@electron-forge/maker-dmg',
          config: {
            icon: './src/assets/icon.icns'
          }
        },
        {
          name: '@electron-forge/maker-wix',
          config: {
            icon: './src/assets/icon.ico'
          }
        }
      ]
    }
  }
}
