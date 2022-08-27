import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// const plugin = {
// 	id: 'donut',
// 	afterUpdate: (chart) => {
// 		let a = chart.config.data.datasets.length - 1;
// 		for (let i in chart.config.data.datasets) {
// 			for (
// 				let j = chart.config.data.datasets[i].data.length - 1;
// 				j >= 0;
// 				--j
// 			) {
// 				if (Number(j) == chart.config.data.datasets[i].data.length - 1)
// 					continue;
// 				const arc = chart.getDatasetMeta(Number(i)).data[j];
// 				arc.round = {
// 					x: (chart.chartArea.left + chart.chartArea.right) / 2,
// 					y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
// 					radius:
// 						chart.innerRadius +
// 						chart.radiusLength / 2 +
// 						a * chart.radiusLength,
// 					thickness: chart.radiusLength / 2 - 1,
// 					backgroundColor: arc._model?.backgroundColor,
// 				};
// 			}
// 			a--;
// 		}
// 	},
// 	afterDraw: function (chart) {
// 		const ctx = chart.chart.ctx;
// 		for (let i in chart.config.data.datasets) {
// 			for (
// 				let j = chart.config.data.datasets[i].data.length - 1;
// 				j >= 0;
// 				--j
// 			) {
// 				if (Number(j) == chart.config.data.datasets[i].data.length - 1)
// 					continue;
// 				const arc = chart.getDatasetMeta(i).data[j];
// 				const startAngle = Math.PI / 2 - arc._view.startAngle;
// 				const endAngle = Math.PI / 2 - arc._view.endAngle;
//
// 				ctx.save();
// 				ctx.translate(arc.round.x, arc.round.y);
// 				ctx.fillStyle = arc.round.backgroundColor;
// 				ctx.beginPath();
// 				//ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
// 				ctx.arc(
// 					arc.round.radius * Math.sin(endAngle),
// 					arc.round.radius * Math.cos(endAngle),
// 					arc.round.thickness,
// 					0,
// 					2 * Math.PI
// 				);
// 				ctx.closePath();
// 				ctx.fill();
// 				ctx.restore();
// 			}
// 		}
// 	},
// };

// const plugins = [
// 	{
// 		id: 'donut',
// 		afterUpdate: (chart) => {
// 			let a = chart.config.data.datasets.length - 1;
// 			for (let i in chart.config.data.datasets) {
// 				for (
// 					let j = chart.config.data.datasets[i].data.length - 1;
// 					j >= 0;
// 					--j
// 				) {
// 					if (+j === chart.config.data.datasets[i].data.length - 1) continue;
// 					const arc = chart.getDatasetMeta(+i).data[j];
// 					arc.options.round = {
// 						x: (chart.chartArea.left + chart.chartArea.right) / 2,
// 						y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
// 						radius:
// 							chart.innerRadius +
// 							chart.radiusLength / 2 +
// 							a * chart.radiusLength,
// 						thickness: chart.radiusLength / 2 - 1,
// 						backgroundColor: arc._model?.backgroundColor,
// 					};
// 				}
// 				a--;
// 			}
// 		},
// 		afterDraw: function (chart) {
// 			const ctx = chart.ctx;
// 			for (let i in chart.config.data.datasets) {
// 				for (
// 					let j = chart.config.data.datasets[i].data.length - 1;
// 					j >= 0;
// 					--j
// 				) {
// 					if (Number(j) == chart.config.data.datasets[i].data.length - 1)
// 						continue;
// 					const arc = chart.getDatasetMeta(+i).data[j];
// 					const startAngle = Math.PI / 2 - arc._view.startAngle;
// 					const endAngle = Math.PI / 2 - arc._view.endAngle;
//
// 					ctx.save();
// 					ctx.translate(arc.round.x, arc.round.y);
// 					ctx.fillStyle = arc.round.backgroundColor;
// 					ctx.beginPath();
// 					//ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
// 					ctx.arc(
// 						arc.round.radius * Math.sin(endAngle),
// 						arc.round.radius * Math.cos(endAngle),
// 						arc.round.thickness,
// 						0,
// 						2 * Math.PI
// 					);
// 					ctx.closePath();
// 					ctx.fill();
// 					ctx.restore();
// 				}
// 			}
// 		},
// 	},
// ];

ChartJS.register(ArcElement, Tooltip, Legend);

// ChartJS.register({
// 	afterUpdate: function (chart) {
// 		var a = chart.config.data.datasets.length - 1;
// 		for (let i in chart.config.data.datasets) {
// 			for (
// 				var j = chart.config.data.datasets[i].data.length - 1;
// 				j >= 0;
// 				--j
// 			) {
// 				if (Number(j) == chart.config.data.datasets[i].data.length - 1)
// 					continue;
// 				var arc = chart.getDatasetMeta(i).data[j];
// 				arc.round = {
// 					x: (chart.chartArea.left + chart.chartArea.right) / 2,
// 					y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
// 					radius:
// 						chart.innerRadius +
// 						chart.radiusLength / 2 +
// 						a * chart.radiusLength,
// 					thickness: chart.radiusLength / 2 - 1,
// 					backgroundColor: arc._model.backgroundColor,
// 				};
// 			}
// 			a--;
// 		}
// 	},
//
// 	afterDraw: function (chart) {
// 		var ctx = chart.chart.ctx;
// 		for (let i in chart.config.data.datasets) {
// 			for (
// 				var j = chart.config.data.datasets[i].data.length - 1;
// 				j >= 0;
// 				--j
// 			) {
// 				if (Number(j) == chart.config.data.datasets[i].data.length - 1)
// 					continue;
// 				var arc = chart.getDatasetMeta(i).data[j];
// 				var startAngle = Math.PI / 2 - arc._view.startAngle;
// 				var endAngle = Math.PI / 2 - arc._view.endAngle;
//
// 				ctx.save();
// 				ctx.translate(arc.round.x, arc.round.y);
// 				console.log(arc.round.startAngle);
// 				ctx.fillStyle = arc.round.backgroundColor;
// 				ctx.beginPath();
// 				//ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
// 				ctx.arc(
// 					arc.round.radius * Math.sin(endAngle),
// 					arc.round.radius * Math.cos(endAngle),
// 					arc.round.thickness,
// 					0,
// 					2 * Math.PI
// 				);
// 				ctx.closePath();
// 				ctx.fill();
// 				ctx.restore();
// 			}
// 		}
// 	},
// });
//
// ChartJS.register({
// 	afterUpdate: function (chart) {
// 		if (chart.config.options.elements.center) {
// 			var helpers = Chart.helpers;
// 			var centerConfig = chart.config.options.elements.center;
// 			var globalConfig = Chart.defaults.global;
// 			var ctx = chart.chart.ctx;
//
// 			var fontStyle = helpers.getValueOrDefault(
// 				centerConfig.fontStyle,
// 				globalConfig.defaultFontStyle
// 			);
// 			var fontFamily = helpers.getValueOrDefault(
// 				centerConfig.fontFamily,
// 				globalConfig.defaultFontFamily
// 			);
//
// 			if (centerConfig.fontSize) var fontSize = centerConfig.fontSize;
// 			// figure out the best font size, if one is not specified
// 			else {
// 				ctx.save();
// 				var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
// 				var maxFontSize = helpers.getValueOrDefault(
// 					centerConfig.maxFontSize,
// 					256
// 				);
// 				var maxText = helpers.getValueOrDefault(
// 					centerConfig.maxText,
// 					centerConfig.text
// 				);
//
// 				do {
// 					ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
// 					var textWidth = ctx.measureText(maxText).width;
//
// 					// check if it fits, is within configured limits and that we are not simply toggling back and forth
// 					if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
// 						fontSize += 1;
// 					else {
// 						// reverse last step
// 						fontSize -= 1;
// 						break;
// 					}
// 				} while (true);
// 				ctx.restore();
// 			}
//
// 			// save properties
// 			chart.center = {
// 				font: helpers.fontString(fontSize, fontStyle, fontFamily),
// 				fillStyle: helpers.getValueOrDefault(
// 					centerConfig.fontColor,
// 					globalConfig.defaultFontColor
// 				),
// 			};
// 		}
// 	},
// 	afterDraw: function (chart) {
// 		if (chart.center) {
// 			var centerConfig = chart.config.options.elements.center;
// 			var ctx = chart.chart.ctx;
//
// 			ctx.save();
// 			ctx.font = chart.center.font;
// 			ctx.fillStyle = chart.center.fillStyle;
// 			ctx.textAlign = 'center';
// 			ctx.textBaseline = 'middle';
// 			var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
// 			var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
// 			ctx.fillText(centerConfig.text, centerX, centerY);
// 			ctx.restore();
// 		}
// 	},
// });

// const chart1 = new ChartJS(ctx, {
//
// })

const DonutDisplay = ({ waterLevel = 69 }) => {
	const options = {
		cutout: 100,
		elements: {
			arc: {
				// borderWidth: 1,
				// borderRadius: 50,
			},
		},
	};

	const data = {
		labels: [],
		datasets: [
			{
				data: [100 - waterLevel, waterLevel],
				backgroundColor: ['rgba(124, 181, 236, 0.3)', 'rgb(124, 181, 236)'],
				borderWidth: 1,
			},
		],
	};
	return <Doughnut data={data} options={options} />;
};

export default DonutDisplay;
