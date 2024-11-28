import React from 'react';
import { View } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

export const Heatmap = ({ data }) => {
  const width = 300;
  const height = 300;

  return (
    <View>
      <Svg width={width} height={height}>
        {data.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={point.value}
            fill="rgba(255, 0, 0, 0.5)"
          />
        ))}
      </Svg>
    </View>
  );
};
