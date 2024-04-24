import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { months } from '../constants/months';
import LoadingSpinner from '../components/LoadingSpinner';
import { useQuery } from 'react-query';

const EggCounter = () => {
	const { isLoading: isLoadingEggCount, data: eggCountValue } = useQuery(
		'egg-count-data',
		() => {
			return axios.get('http://localhost:5001/api/egg-counter');
		},
		{ staleTime: 10 * 60 * 1000 } // refetch ONLY after 10 minutes
	);

	//* Returns an object with `Date` as key and `Sum Data` as value
	const transformEggObject = (data) => {
		const groupedData = {};
		const values = [];
		const formattedDates = [];

		// Group data by date
		data.forEach((item) => {
			const date = item.createdAt.split(' ')[0];
			if (!groupedData[date]) {
				groupedData[date] = [];
			}
			groupedData[date].push(item.value);
		});

		// Calculate sum for each date
		for (let date in groupedData) {
			const sum = groupedData[date].reduce((a, b) => a + b, 0);
			groupedData[date] = sum.toFixed(2);

			values.push(groupedData[date]);
			const [year, month, day] = date.split('-');
			formattedDates.push(`${day}, ${months[parseInt(month) - 1]}`);
		}

		return { values, formattedDates };
	};

	//* ========== CHART 1
	const chartRef = useRef(null);
	const myChartRef = useRef(null);

	useEffect(() => {
		if (!isLoadingEggCount) {
			const ctx = chartRef.current.getContext('2d');
			const eggCountData = transformEggObject(eggCountValue?.data);

			myChartRef.current = new Chart(ctx, {
				type: 'line',
				data: {
					labels: eggCountData.formattedDates,
					datasets: [
						{
							label: 'Egg Counter',
							data: eggCountData.values,
							backgroundColor: 'rgba(255,99,132,0.4)',
							borderColor: 'rgba(255,99,132,0.9)',
							borderWidth: 1,
							fill: true
						}
					]
				},
				//* ========== CHART 1 OPTIONS
				options: {
					maintainAspectRatio: false,
					layout: {
						padding: {
							top: 10,
							bottom: 10
						}
					},
					scales: {
						y: {
							beginAtZero: true,
							ticks: {
								display: false
							},
							grid: {
								drawTicks: false,
								drawBorder: false
							}
						}
					}
				}
			});

			return () => myChartRef.current.destroy();
		}
	}, [eggCountValue?.data]);

	//* ========== CHART 2
	const chartRef2 = useRef(null);

	useEffect(() => {
		if (!isLoadingEggCount) {
			const ctx2 = chartRef2.current.getContext('2d');
			const eggCountData = transformEggObject(eggCountValue?.data);

			const myChart2 = new Chart(ctx2, {
				type: 'bar',
				data: {
					labels: [],
					datasets: [
						{
							label: '',
							data: eggCountData.values
						}
					]
				},
				//* ========== CHART 2 OPTIONS
				options: {
					maintainAspectRatio: false,
					layout: {
						padding: {
							bottom: 56,
							top: 42
						}
					},
					scales: {
						x: {
							ticks: {
								display: false
							},
							grid: {
								drawTicks: false
							}
						},
						y: {
							beginAtZero: true,
							afterFit: (ctx) => {
								ctx.width = 40;
							}
						}
					},
					plugins: {
						legend: {
							display: false
						}
					}
				}
			});

			return () => myChart2.destroy();
		}
	}, [eggCountValue?.data]);

	//* Adjust the width of the chart box based on the number of bars
	const boxRef = useRef(null);
	const [barLength, setBarLength] = useState(0);

	useEffect(() => {
		if (myChartRef.current) {
			setBarLength(myChartRef.current.data.labels.length);
		}
	}, [myChartRef.current]);

	useEffect(() => {
		if (barLength > 7) {
			const chartWidth = 928 + (barLength - 7) * 30;
			boxRef.current.style.width = `${chartWidth}px`;
		}
	}, [barLength]);

	return (
		<>
			<div className='chartCard'>
				{!isLoadingEggCount ? (
					<>
						<div className='chartBox'>
							<div className='colSmall'>
								<canvas ref={chartRef2} />
							</div>
							<div className='colLarge'>
								<div className='box' ref={boxRef}>
									<canvas ref={chartRef} />
								</div>
							</div>
						</div>
					</>
				) : (
					<LoadingSpinner />
				)}
			</div>
		</>
	);
};

export default EggCounter;
