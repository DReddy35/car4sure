import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraphWithCard = ({
    title,
    dataset1YearsToDate,
    dataset1LastMonth,
    dataset2YearsToDate,
    dataset2LastMonth,
    months,
}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const formatDate = (date) => format(date, 'MMM yyyy');

    // Calculate totals for each dataset
    const dataset1Total = dataset1YearsToDate.map((value, index) => value + (dataset1LastMonth[index] || 0));
    const dataset2Total = dataset2YearsToDate.map((value, index) => value + (dataset2LastMonth[index] || 0));

    const dataset1YearsToDateTotal = dataset1YearsToDate.reduce((acc, val) => acc + val, 0);
    const dataset2YearsToDateTotal = dataset2YearsToDate.reduce((acc, val) => acc + val, 0);

    const dataset1LastMonthTotal = dataset1LastMonth.reduce((acc, val) => acc + val, 0);
    const dataset2LastMonthTotal = dataset2LastMonth.reduce((acc, val) => acc + val, 0);

    console.log(dataset1YearsToDateTotal);
    console.log(dataset2YearsToDateTotal);
    console.log(dataset1LastMonthTotal);    
    console.log(dataset2LastMonthTotal);

    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Years to Date',
                // data: dataset1YearsToDate,
                backgroundColor: '#1496F0', // Blue
                borderColor: '#1496F0',
                borderWidth: 1,
                stack: 'stack1',
            },
            {
                label: 'Last Month',
                // data: dataset1LastMonth,
                backgroundColor: '#1496F0', // Light blue
                borderColor: '#1496F0',
                borderWidth: 1,
                stack: 'stack1',
            },
            {
                label: 'Total 1',
                data: dataset1Total,
                backgroundColor: '#007BFF', // Darker blue for total
                borderColor: '#007BFF',
                borderWidth: 1,
                type: 'bar',
                stack: 'stack1',
                barThickness: 14,
            },
            {
                label: 'Years to Date',
                // data: dataset2YearsToDate,
                backgroundColor: '#F3953D', // Orange
                borderColor: '#F3953D',
                borderWidth: 1,
                stack: 'stack2',
            },
            {
                label: 'Last Month',
                // data: dataset2LastMonth,
                backgroundColor: '#F3953D', // Light orange
                borderColor: '#F3953D',
                borderWidth: 1,
                stack: 'stack2',
            },
            {
                label: 'Total 2',
                data: dataset2Total,
                backgroundColor: '#E67E22', // Darker orange for total
                borderColor: '#E67E22',
                borderWidth: 1,
                type: 'bar',
                stack: 'stack2',
                barThickness: 14,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
                labels: {
                    filter: function (legendItem, chartData) {
                        // Hide the legend label for dataset 1
                        if (chartData.datasets[legendItem.datasetIndex].label === 'Total 1' || chartData.datasets[legendItem.datasetIndex].label === 'Total 2') {
                            return false; // Do not display this label
                        }
                        return true; // Display all other labels
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    },
                },
            },
            datalabels: {
                color: '#000',
                display: true,
                anchor: 'end',
                align: 'center',
                offset: 4,  // Adjust this value to position the labels
                formatter: (value, context) => {
                    // Stack labels by formatting each value to display on top of others
                    const datasetIndex = context.datasetIndex;
                    let total = 0;
                    
                    // Sum the values of all datasets for the current index
                    context.chart.data.datasets.forEach((dataset, i) => {
                        if (i === datasetIndex) return;  // Skip the current dataset
                        total += dataset.data[context.dataIndex];
                    });

                    // Return the total for the current dataset
                    return total + value;
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                beginAtZero: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value;
                    },
                },
            },
        },
    };

    return (
        <div className=''>
            <div className="flex justify-between">
                <h2 className="text-sm font-semibold">{title}</h2>
                <div className="flex items-center border border-gray-300 rounded-lg -mt-2 mb-2 mr-4">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MMM yyyy"
                        showMonthYearPicker
                        className="border-none p-2 text-xs"
                        wrapperClassName="w-24"
                    />
                    <span className="mx-2 text-xs text-gray-500">to</span>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="MMM yyyy"
                        showMonthYearPicker
                        className="border-none p-2 text-xs"
                        wrapperClassName="w-24"
                    />
                </div>
            </div>
            <div className='w-full h-full'>
                <div className="bg-gray-50  rounded-lg shadow-xl h-full pb-4 border border-gray-300">
                    <div className='flex justify-between px-16 pt-4 pb-4'>
                        <span>
                            <p>{dataset1YearsToDateTotal}</p>
                            <p className='text-xs text-sky-500 font-bold '>Years to Date</p>
                        </span>
                        <span>
                        <p>{dataset1LastMonthTotal}</p>
                        <p className='text-xs text-sky-500 font-bold '>Last Month</p>
                        </span>
                        <span>
                        <p>{dataset2YearsToDateTotal}</p>
                        <p className='text-xs text-orange-400 font-bold '>Years to Date</p>
                        </span>
                        <span>
                        <p>{dataset2LastMonthTotal}</p>
                        <p className='text-xs text-orange-400 font-bold '>Last Month</p>
                        </span>
                    </div>
                    <Bar data={chartData} options={options} className="min-h-[20%]" />
                </div>
            </div>
        </div>
    );
};

export default BarGraphWithCard;
