import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Typography from '@material-ui/core/Typography';



export default function Graph(props) {
  const { heading,yAxisLabel,data,xAxisDataKey,yAxisDataKey } = props;
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography variant="h4">{heading}</Typography>
                <ResponsiveContainer>
                <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 35,
            left: 16,
          }}
        >
          <XAxis dataKey={xAxisDataKey}  stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
            {yAxisLabel}
            </Label>
          </YAxis>
          <Line type="monotone" dataKey={yAxisDataKey} stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
                </ResponsiveContainer>
      
    </React.Fragment>
  );
}