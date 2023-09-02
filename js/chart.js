let users = [];
let dataChart;

async function fetchUserData() {
    try {
        const response = await fetch('users.json');
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return [];
    }
}

async function createDataChart(users, chartType) {
    const data = {};
    for (const user of users) {
        const value = user[chartType];

        if (data[value]) {
            data[value]++;
            
        } else {
            data[value] = 1;
        }
        
    }
    

    const dataChartCanvas = document.getElementById("dataChart");
    const chartLabel = chartType.charAt(0).toUpperCase() + chartType.slice(1);

    const chart = new Chart(dataChartCanvas, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: `Users by ${chartLabel}`,
                data: Object.values(data),
                backgroundColor: ['#00aaff'],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    console.log(Object.keys(data), Object.values(data))
    return chart;
}

const chartTypeSelect = document.getElementById("chartType");
chartTypeSelect.addEventListener("change", async () => {
    const selectedChartType = chartTypeSelect.value;
    if (selectedChartType) {
        if (dataChart) {
            dataChart.destroy();
        }
        dataChart = await createDataChart(users, selectedChartType);
    }
});

async function initialize() {
    users = await fetchUserData();
    dataChart = await createDataChart(users, "age");
}

initialize();
