import { alpha } from '@mui/material/styles';
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
// 	beforeDraw: function (chart) {
// 		if (chart.config.options.elements.center) {
// 			//Get ctx from string
// 			var ctx = chart.chart.ctx;
//
// 			//Get options from the center object in options
// 			var centerConfig = chart.config.options.elements.center;
// 			var fontStyle = centerConfig.fontStyle || 'Arial';
// 			var txt = centerConfig.text;
// 			var color = centerConfig.color || '#000';
// 			var sidePadding = centerConfig.sidePadding || 20;
// 			var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
// 			//Start with a base font of 30px
// 			ctx.font = "30px " + fontStyle;
//
// 			//Get the width of the string and also the width of the element minus 10 to give it 5px side padding
// 			var stringWidth = ctx.measureText(txt).width;
// 			var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
//
// 			// Find out how much the font can grow in width.
// 			var widthRatio = elementWidth / stringWidth;
// 			var newFontSize = Math.floor(30 * widthRatio);
// 			var elementHeight = (chart.innerRadius * 2);
//
// 			// Pick a new font size so it will not be larger than the height of label.
// 			var fontSizeToUse = Math.min(newFontSize, elementHeight);
//
// 			//Set font settings to draw it correctly.
// 			ctx.textAlign = 'center';
// 			ctx.textBaseline = 'middle';
// 			var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
// 			var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
// 			ctx.font = fontSizeToUse+"px " + fontStyle;
// 			ctx.fillStyle = color;
//
// 			//Draw text in center
// 			ctx.fillText(txt, centerX, centerY);
// 		}
// 	}
// });

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

const plugins = [
	{
		id: 'donut',
		beforeDraw: (chart) => {
			if (chart.config.options.elements.center) {
				//Get ctx from string
				const ctx = chart.ctx;

				//Get options from the center object in options
				const centerConfig = chart.config.options.elements.center;
				const fontStyle = centerConfig.fontStyle || 'CircularStd';
				const txt = centerConfig.text;
				const color = centerConfig.color || '#000';
				const sidePadding = centerConfig.sidePadding || 20;
				const sidePaddingCalculated =
					(sidePadding / 100) * (chart.innerRadius * 2);
				//Start with a base font of 30px
				ctx.font = '75px ' + fontStyle;

				//Get the width of the string and also the width of the element minus 10 to give it 5px side padding
				const stringWidth = ctx.measureText(txt).width;
				const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

				// Find out how much the font can grow in width.
				const widthRatio = elementWidth / stringWidth;
				const newFontSize = Math.floor(30 * widthRatio);
				const elementHeight = chart.innerRadius * 2;

				// Pick a new font size, so it will not be larger than the height of label.
				const fontSizeToUse = Math.min(newFontSize, elementHeight);

				//Set font settings to draw it correctly.
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
				const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
				ctx.font = fontSizeToUse + 'px ' + fontStyle;
				ctx.fillStyle = color;

				//Draw text in center
				ctx.fillText(txt, centerX, centerY);
			}
		},
	},
	// {
	// 	// round corners
	// 	id: 'donut',
	// 	afterUpdate: (chart) => {
	// 		if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
	// 			const arc =
	// 				chart.getDatasetMeta(0).data[
	// 					chart.config.options.elements.arc.roundedCornersFor
	// 				];
	// 			arc.round = {
	// 				x: (chart.chartArea.left + chart.chartArea.right) / 2,
	// 				y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
	// 				radius: (chart.outerRadius + chart.innerRadius) / 2,
	// 				thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
	// 				backgroundColor: arc._model.backgroundColor,
	// 			};
	// 		}
	// 	},
	//
	// 	afterDraw: (chart) => {
	// 		if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
	// 			const ctx = chart.chart.ctx;
	// 			const arc =
	// 				chart.getDatasetMeta(0).data[
	// 					chart.config.options.elements.arc.roundedCornersFor
	// 				];
	// 			const startAngle = Math.PI / 2 - arc._view.startAngle;
	// 			const endAngle = Math.PI / 2 - arc._view.endAngle;
	//
	// 			ctx.save();
	// 			ctx.translate(arc.round.x, arc.round.y);
	// 			ctx.fillStyle = arc.round.backgroundColor;
	// 			ctx.beginPath();
	// 			ctx.arc(
	// 				arc.round.radius * Math.sin(startAngle),
	// 				arc.round.radius * Math.cos(startAngle),
	// 				arc.round.thickness,
	// 				0,
	// 				2 * Math.PI
	// 			);
	// 			ctx.arc(
	// 				arc.round.radius * Math.sin(endAngle),
	// 				arc.round.radius * Math.cos(endAngle),
	// 				arc.round.thickness,
	// 				0,
	// 				2 * Math.PI
	// 			);
	// 			ctx.closePath();
	// 			ctx.fill();
	// 			ctx.restore();
	// 		}
	// 	},
	// },
	// {
	// 	id: 'donut',
	// 	afterUpdate: (chart) => {
	// 		let fontSize;
	// 		if (chart.config.options.elements.center) {
	// 			const helpers = ChartJS.helpers;
	// 			const centerConfig = chart.config.options.elements.center;
	// 			const globalConfig = ChartJS.defaults.global;
	// 			const ctx = chart.chart.ctx;
	//
	// 			const fontStyle = helpers.getValueOrDefault(
	// 				centerConfig.fontStyle,
	// 				globalConfig.defaultFontStyle
	// 			);
	// 			const fontFamily = helpers.getValueOrDefault(
	// 				centerConfig.fontFamily,
	// 				globalConfig.defaultFontFamily
	// 			);
	//
	// 			if (centerConfig.fontSize) {
	// 				fontSize = centerConfig.fontSize;
	// 			}
	// 			// figure out the best font size, if one is not specified
	// 			else {
	// 				ctx.save();
	// 				fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
	// 				const maxFontSize = helpers.getValueOrDefault(
	// 					centerConfig.maxFontSize,
	// 					256
	// 				);
	// 				const maxText = helpers.getValueOrDefault(
	// 					centerConfig.maxText,
	// 					centerConfig.text
	// 				);
	//
	// 				do {
	// 					ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
	// 					const textWidth = ctx.measureText(maxText).width;
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
	// 	afterDraw: (chart) => {
	// 		if (chart.center) {
	// 			const centerConfig = chart.config.options.elements.center;
	// 			const ctx = chart.chart.ctx;
	//
	// 			ctx.save();
	// 			ctx.font = chart.center.font;
	// 			ctx.fillStyle = chart.center.fillStyle;
	// 			ctx.textAlign = 'center';
	// 			ctx.textBaseline = 'middle';
	// 			const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
	// 			const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
	// 			ctx.fillText(centerConfig.text, centerX, centerY);
	// 			ctx.restore();
	// 		}
	// 	},
	// },
];

// ChartJS.defaults.controllers.RoundedDoughnut = ChartJS.controllers.doughnut.extend({
// 	draw(ease) {
// 		const { ctx } = this.chart;
// 		const easingDecimal = ease || 1;
// 		const arcs = this.getMeta().data;
// 		Chart.helpers.each(arcs, (arc, i) => {
// 			arc.transition(easingDecimal).draw();
// 			const pArc = arcs[i === 0 ? arcs.length - 1 : i - 1];
// 			const pColor = pArc._view.backgroundColor;
// 			const vm = arc._view;
// 			const radius = (vm.outerRadius + vm.innerRadius) / 2;
// 			const thickness = (vm.outerRadius - vm.innerRadius) / 2;
// 			const startAngle = Math.PI - vm.startAngle - Math.PI / 2;
// 			const angle = Math.PI - vm.endAngle - Math.PI / 2;
// 			ctx.save();
// 			ctx.translate(vm.x, vm.y);
// 			ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
// 			ctx.beginPath();
// 			ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
// 			ctx.fill();
// 			ctx.fillStyle = vm.backgroundColor;
// 			ctx.beginPath();
// 			ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
// 			ctx.fill();
// 			ctx.restore();
// 		});
// 	},
// });

// round corners
// Chart.pluginService.register({
// 	afterUpdate: function (chart) {
// 		if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
// 			var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
// 			arc.round = {
// 				x: (chart.chartArea.left + chart.chartArea.right) / 2,
// 				y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
// 				radius: (chart.outerRadius + chart.innerRadius) / 2,
// 				thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
// 				backgroundColor: arc._model.backgroundColor
// 			}
// 		}
// 	},
//
// 	afterDraw: function (chart) {
// 		if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
// 			var ctx = chart.chart.ctx;
// 			var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
// 			var startAngle = Math.PI / 2 - arc._view.startAngle;
// 			var endAngle = Math.PI / 2 - arc._view.endAngle;
//
// 			ctx.save();
// 			ctx.translate(arc.round.x, arc.round.y);
// 			console.log(arc.round.startAngle)
// 			ctx.fillStyle = arc.round.backgroundColor;
// 			ctx.beginPath();
// 			ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
// 			ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
// 			ctx.closePath();
// 			ctx.fill();
// 			ctx.restore();
// 		}
// 	},
// });

// write text plugin
// ChartJS.pluginService.register({
// 	afterUpdate: function (chart) {
// 		if (chart.config.options.elements.center) {
// 			var helpers = Chart.helpers;
// 			var centerConfig = chart.config.options.elements.center;
// 			var globalConfig = Chart.defaults.global;
// 			var ctx = chart.chart.ctx;
//
// 			var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
// 			var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);
//
// 			if (centerConfig.fontSize)
// 				var fontSize = centerConfig.fontSize;
// 			// figure out the best font size, if one is not specified
// 			else {
// 				ctx.save();
// 				var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
// 				var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
// 				var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);
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
// 				} while (true)
// 				ctx.restore();
// 			}
//
// 			// save properties
// 			chart.center = {
// 				font: helpers.fontString(fontSize, fontStyle, fontFamily),
// 				fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
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
// })

const DonutDisplay = ({ waterLevel = 69 }) => {
	const options = {
		responsive: true,
		cutout: 150,
		legend: {
			display: false,
		},
		tooltips: {
			enabled: false,
		},
		elements: {
			center: {
				text: waterLevel,
				// sidePadding: 60,
				// maxText: '100%',
				// fontColor: '#FF6684',
				// fontFamily: "CircularStd', 'Helvetica', 'Arial', 'sans-serif'",
				// fontStyle: 'normal',
				// // fontSize: 12,
				// // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
				// // if these are not specified either, we default to 1 and 256
				// minFontSize: 1,
				// maxFontSize: 256,
			},
			arc: {
				// roundedCornersFor: 0,
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
				backgroundColor: [
					alpha('rgb(124, 181, 236)', 0.3),
					'rgb(124, 181, 236)',
				],
				borderWidth: 1,
			},
		],
	};
	return <Doughnut data={data} options={options} plugins={plugins} />;
};

export default DonutDisplay;
