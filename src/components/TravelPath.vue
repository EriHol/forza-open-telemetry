<template>
  <ScatterChart :chart-data="data" :options="options" class="square-chart" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { ScatterChart } from 'vue-chart-3';
import { ITelemetryLap } from '../lib/types';

const lapColors = [
  'red',
  'blue',
  'green',
  'yellow',
];

export default defineComponent({
  components: { ScatterChart },
  props: {
    laps: {
      type: Object as PropType<ITelemetryLap[]>,
      required: true,
    },
  },
  setup(props) {
    const data = computed<ChartData<'scatter'>>(() => {
      const datasets = props.laps.map<ChartDataset<'scatter'>>((lap) => ({
        data: lap.telemetry.map((row) => ({
          x: row.positionX,
          y: row.positionZ,

        })),
        showLine: true,
        label: `Lap ${lap.lap + 1}`,
        borderColor: lapColors[lap.lap],
        backgroundColor: lapColors[lap.lap],
      }));

      datasets.unshift({
        data: [{ ...(datasets[0].data as { x: number, y: number }[])[0] }],
        label: 'Start Point',
        pointBackgroundColor: 'black',
        pointRadius: 10,
        pointBorderColor: 'black',
      });

      return {
        datasets
      };
    });

    const options: ChartOptions = {
      elements: {
        line: {
          borderWidth: 2,
          borderCapStyle: 'round',
          tension: 0.05,

        },
        point: {
          backgroundColor: 'none',
          borderColor: 'none',
          radius: 0,
        }
      },

    }

    return {
      data,
      options,
    }
  },
})
</script>

<style>
.square-chart {
  height: 1000px;
  width: 1000px;
}
</style>
