import { extendTheme } from '@chakra-ui/core'

import colors from './colors'
import styles from './styles'

import { Box, Tabs } from './components'

const overrides = {
    styles,
    colors,
    components: {
        Box: {
            baseStyle: {
                bgColor: 'brand.primary'
            }
        },
        Tabs,
    }
}

export default extendTheme(overrides)