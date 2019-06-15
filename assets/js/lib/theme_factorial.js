import themeUltramin from 'prism-react-renderer/themes/ultramin'
import themeDracula from 'prism-react-renderer/themes/dracula'
import themeVsDark from 'prism-react-renderer/themes/vsDark'
import themeVsDarkPlus from 'prism-react-renderer/themes/vsDarkPlus'
import themeNightOwl from 'prism-react-renderer/themes/nightOwl'
import themeDuoToneLight from 'prism-react-renderer/themes/duotoneLight'
import themeDuoToneDark from 'prism-react-renderer/themes/duotoneDark'
import themeOceanicNext from 'prism-react-renderer/themes/oceanicNext'
import themeShadesOfPurple from 'prism-react-renderer/themes/shadesOfPurple';

const getTheme = (theme) => {
  switch (theme) {
    case 'ultramin':
      return themeUltramin;
      break;
    case 'shadesOfPurple':
      return themeShadesOfPurple;
      break;
    case 'dracula':
      return themeDracula
      break;
    case 'vsDark':
      return themeVsDark
      break;
    case 'vsDarkPlus':
      return themeVsDarkPlus;
      break;
    case 'nighOwl':
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
