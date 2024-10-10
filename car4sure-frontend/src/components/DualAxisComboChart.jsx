import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

const DualAxisComboChart = ({
    title,
    claimCountData, // Array of numbers for claim count
    serviceLevelData, // Array of numbers or null for service level
    days, // Days of the month (1-31)
}) => {
    const chartData = {
        labels: days, // Days 1-31 as labels on X-axis
        datasets: [
            {
                label: 'Claim Count',
                data: claimCountData, // Bars for claim count
                backgroundColor: '#1496F0',
                borderColor: '#1496F0',
                borderWidth: 1,
                type: 'bar',
                yAxisID: 'y', // Left axis
                barThickness: 20,
            },
            {
                label: 'Service Level Achievement',
                data: serviceLevelData, // Line for service level
                backgroundColor: '#F3953D',
                borderColor: '#F3953D',
                borderWidth: 2,
                type: 'line',
                yAxisID: 'y1', // Right axis
                tension: 0, // This will make the line straight (no curves)
                fill: false,
                pointRadius: 5,
                spanGaps: true, // Connects points even if there are null values
            },
        ],
    };
    

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Day of the Month',
                },
            },
            y: {
                beginAtZero: true,
                type: 'linear',
                position: 'left',
                ticks: {
                    stepSize: 20,
                    max: 140,
                },
            },
            y1: {
                beginAtZero: true,
                type: 'linear',
                position: 'right',
                ticks: {
                    stepSize: 20,
                    max: 140,
                    callback: function (value) {
                        return value + '%';
                    },
                },
                grid: {
                    drawOnChartArea: false, // Prevent overlap of grid lines
                },
            },
        },
        elements: {
            line: {
                spanGaps: true, // This ensures the line connects over null values
            },
        },
    };
    

    return (
        <div className=''>
            <div className="flex justify-center mb-4 w-full">
                <h2 className="text-sm font-semibold text-center">{title}</h2>
                {/* You can add date pickers here if you want to filter by date */}
            </div>
            <div className='w-full h-full'>
                <div className="bg-gray-50  rounded-lg shadow-xl h-full border border-gray-300">
                    <Bar data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};
 export default DualAxisComboChart;