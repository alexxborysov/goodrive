'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/shared/view/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/shared/view/ui/chart';

const chartData = [
  { month: 'November', served: 214, load: 190 },
  { month: 'December', served: 209, load: 172 },
  { month: 'January', served: 186, load: 140 },
  { month: 'February', served: 245, load: 200 },
  { month: 'March', served: 237, load: 120 },
  { month: 'April', served: 188, load: 120 },
];

const chartConfig = {
  load: {
    label: 'Load',
    color: 'hsl(var(--chart-1))',
  },
  served: {
    label: 'Served',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function TransferredDataCharts() {
  return (
    <Card className="max-h-[440px] min-w-full">
      <CardHeader>
        <CardTitle>Transferred Monthly</CardTitle>
        <CardDescription>Showing I/O for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[264px] w-full overflow-hidden">
        <ChartContainer
          config={chartConfig}
          height={264}
          className="max-h-[264px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillServed" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.served.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.served.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillLoad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.load.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.load.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="load"
              type="natural"
              fill="url(#fillLoad)"
              fillOpacity={0.4}
              stroke={chartConfig.load.color}
              stackId="a"
            />
            <Area
              dataKey="served"
              type="natural"
              fill="url(#fillServed)"
              fillOpacity={0.4}
              stroke={chartConfig.served.color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              March - April 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
