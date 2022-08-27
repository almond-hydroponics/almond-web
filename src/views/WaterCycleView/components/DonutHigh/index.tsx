import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more.js';
import * as Highcharts from 'highcharts/highcharts.js';
import HighchartsExporting from 'highcharts/modules/exporting';
import solidGauge from 'highcharts/modules/solid-gauge.js';

if (typeof Highcharts === 'object') {
	HighchartsExporting(Highcharts);
	highchartsMore(Highcharts);
	solidGauge(Highcharts);
}

interface Props {
	data?: number;
	color?: string;
	width?: number | string;
	height?: number | string;
}

const DonutHigh = ({
	data = 69,
	color,
	width = 410,
	height = 410,
}: Props): JSX.Element => {
	const options: Highcharts.Options = {
		chart: {
			width,
			height,
			type: 'solidgauge',
			style: {
				fontFamily: 'Google Sans, Roboto, Helvetica Neue, sans-serif',
			},
		},
		title: undefined,
		tooltip: {
			enabled: false,
		},
		pane: {
			startAngle: 0,
			endAngle: 360,
			background: [
				{
					outerRadius: '100%',
					innerRadius: '60%',
					backgroundColor: Highcharts.color(
						// @ts-expect-error
						color ?? Highcharts?.getOptions().colors[0]
					)
						.setOpacity(0.3)
						.get(),
					borderWidth: 0,
				},
			],
		},
		yAxis: {
			min: 0,
			max: 100,
			lineWidth: 0,
			tickPositions: [],
		},
		plotOptions: {
			solidgauge: {
				dataLabels: {
					enabled: false,
				},
				linecap: 'round',
				stickyTracking: false,
				rounded: true,
			},
		},
		series: [
			{
				name: '',
				type: 'solidgauge',
				data: [
					{
						// @ts-expect-error
						color: color ?? Highcharts?.getOptions().colors[0],
						radius: '100%',
						innerRadius: '60%',
						y: data,
					},
				],
			},
		],
		credits: {
			enabled: false,
		},
		exporting: {
			enabled: false,
		},
	};

	return (
		<>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</>
	);
};

export default DonutHigh;
