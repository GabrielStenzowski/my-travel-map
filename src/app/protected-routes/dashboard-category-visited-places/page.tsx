'use client'

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { month: 'Restaurante Italiano', desktop: 186 },
  { month: 'Restaurante Japones', desktop: 305 },
  { month: 'Hamburgueria', desktop: 237 },
  { month: 'Restaurante Chines', desktop: 273 },
  { month: 'Churrascaria', desktop: 209 },
]

const chartConfig = {
  desktop: {
    label: 'Lugares Visitados',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export default function DashboardCategoryVisitedPlaces() {
  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Categorias mais Visitadas</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] w-full"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid gridType="circle" />
            <PolarAngleAxis dataKey="month" />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
