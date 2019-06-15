import themeUltramin from 'prism-react-renderer/themes/ultramin'
import themeDracula from 'prism-react-renderer/themes/dracula'
import themeVsDark from 'prism-react-renderer/themes/vsDark'
import themeNightOwl from 'prism-react-renderer/themes/nightOwl'
import themeDuoToneLight from 'prism-react-renderer/themes/duotoneLight'
import themeDuoToneDark from 'prism-react-renderer/themes/duotoneDark'
import themeOceanicNext from 'prism-react-renderer/themes/oceanicNext'

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
    case 'duotoneDark':
      return themeDuoToneDark;
      break;
    case 'duotoneLight':
      return themeDuoToneLight;
      break;
    case 'oceanicNext':
      return themeOceanicNext
      break;
    default:
      themeUltramin
  }
}

export default getTheme;
