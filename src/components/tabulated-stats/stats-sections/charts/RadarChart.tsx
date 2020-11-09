import React from 'react'
import { ResponsiveRadar } from '@nivo/radar'

const RadarChart = ({ data, playlistName }: { data: any[], playlistName: string }) => {
    return (
        <ResponsiveRadar
            data={data}
            keys={[playlistName]}
            indexBy='analysisFeature'
            maxValue={1}
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            curve="linearClosed"
            borderWidth={3}
            borderColor={{ from: 'color', modifiers: [] }}
            gridLevels={5}
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
            colors={{ scheme: 'nivo' }}
            fillOpacity={0.75}
            blendMode="multiply"
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