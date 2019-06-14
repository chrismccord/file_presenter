import themeUltramin from 'prism-react-renderer/themes/ultramin'
import themeDracula from 'prism-react-renderer/themes/dracula'
import themeVsDark from 'prism-react-renderer/themes/vsDark'
import themeNightOwl from 'prism-react-renderer/themes/nightOwl'

const getTheme = (theme) => {
  switch (theme) {
    case 'dracula':
      return themeDracula
      break;
    case 'vsDark':
      return themeVsDark
      break;
    case 'nightOwl':
      return themeNightOwl
      break;
    default:
      themeUltramin
  }
}

export default getTheme;
