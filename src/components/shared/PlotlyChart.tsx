'use client';

import { useEffect, useRef, useState } from 'react';
import type { Data, Layout, Config, PlotlyHTMLElement } from 'plotly.js';

interface PlotlyChartProps {
  data: Data[];
  layout?: Partial<Layout>;
  config?: Partial<Config>;
  style?: React.CSSProperties;
  className?: string;
  onPlotly?: (plotly: PlotlyHTMLElement) => void;
}

export const PlotlyChart: React.FC<PlotlyChartProps> = ({
  data,
  layout = {},
  config = { 
    responsive: true,
    displayModeBar: false,
  },
  style,
  className = 'w-full h-full',
  onPlotly,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const [plotly, setPlotly] = useState<typeof import('plotly.js-dist').default | null>(null);

  useEffect(() => {
    // Import Plotly dynamically on the client side
    import('plotly.js-dist').then((PlotlyModule) => {
      setPlotly(PlotlyModule.default);
    });
  }, []);

  useEffect(() => {
    if (!plotly || !chartRef.current) return;

    const defaultLayout: Partial<Layout> = {
      margin: { t: 30, r: 10, l: 10, b: 30 },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      font: {
        family: 'system-ui, -apple-system, sans-serif',
      },
      ...layout,
    };

    plotly.newPlot(chartRef.current, data, defaultLayout, config).then((plot: PlotlyHTMLElement) => {
      onPlotly?.(plot);
    });

    return () => {
      if (chartRef.current) {
        plotly.purge(chartRef.current);
      }
    };
  }, [data, layout, config, onPlotly, plotly]);

  return <div ref={chartRef} style={style} className={className} />;
};
