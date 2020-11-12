import React, { useEffect } from 'react'
import { ResponsiveRadar } from '@nivo/radar'
import { color, useToken } from '@chakra-ui/core'

const RadarChart = ({ data }: { data: any[] }) => {
    const [colors]: [Record<number, string>] = useToken('colors', ['graph'])

    const allPlaylistNames = data.map(d => {
        const { analysisFeature, ...rest } = d
        return Object.keys(rest)
    })
    const chartKeys = Array.from(new Set(...allPlaylistNames))

    return (
        <ResponsiveRadar
            data={data}
            keys={chartKeys}
            indexBy='analysisFeature'
            maxValue={1}
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            curve="linearClosed"
            borderWidth={3}
            borderColor={{ from: 'color', modifiers: [] }}
            gridLevels={10}
            gridShape="linear"
            gridLabelOffset={40}
            enableDots={true}
            dotSize={15}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={3}
            dotBorderColor={{ from: 'color', modifiers: [] }}
            enableDotLabel={true}
            dotLabel="value"
            dotLabelYOffset={-12}
            colors={(datum) => colors[datum.index]}
            fillOpacity={0.45}
            blendMode="normal"
            animate={true}
            isInteractive={true}
            legends={[
                {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default RadarChart;