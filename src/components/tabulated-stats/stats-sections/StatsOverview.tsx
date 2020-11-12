import { Text, useToken } from '@chakra-ui/core'
import React, { useEffect, useState } from 'react'
import { useGlobal } from '../../../hooks/use-global-context'
import RadarChart from './charts/RadarChart'
import lodash from 'lodash'

const StatsOverview = () => {
    const { radarChartDataMap } = useGlobal()

    const temp = Array.from(radarChartDataMap.values()).reduce((prev, curr) => prev.concat(curr), [])
    const tempMap = lodash.groupBy(temp, _ => _.analysisFeature)

    const map: any = {}
    Object.keys(tempMap).forEach(featureName => {
        tempMap[featureName].forEach(data => {
            const { analysisFeature, ...rest } = data
            map[featureName] = { ...map[featureName], analysisFeature: featureName, ...rest }
        })
    })

    return (
        <>
            {Object.keys(map).length ? <RadarChart data={Object.values(map)} /> : <Text>No data</Text>}
        </>
    )
}

export default StatsOverview