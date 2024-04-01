// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) { 
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

// ---------- CHARTS ----------

// Retrieve data from local storage
const storedDynamicDataArea = localStorage.getItem('dynamicDataArea');
const storedDynamicDataBar = localStorage.getItem('dynamicDataBar');

// Parse the stored data
const dynamicDataArea = JSON.parse(storedDynamicDataArea);
const dynamicDataBar = JSON.parse(storedDynamicDataBar);


const categories = ['Laptop', 'Phone', 'Monitor', 'Headphones', 'Camera', 'Mouse', "Keyboard", "Speakers"];

// Create a mapping object to associate values with keys
const mappingObject = {};
categories.forEach((category, index) => {
    mappingObject[category] = dynamicDataBar[0].data[index];
});

console.log("mapping obj", mappingObject)
dynamicDataBar[0].data.sort((a, b) => b - a);

// Keep only the top 5 values
dynamicDataBar[0].data = dynamicDataBar[0].data.slice(0, 5);

// Map each value to a product name with its original index
const mappedData = dynamicDataBar[0].data.map((value, index) => ({

  value,
  name: Object.keys(mappingObject).find(key => mappingObject[key] === value),
  originalIndex: index,
}));

console.log("mapped data", mappedData)

// Sort the mapped data in descending order based on value
mappedData.sort((a, b) => b.value - a.value);

// Update the categories array based on the sorted data
const updatedCategories = mappedData.map(item => item.name);

// Use the mapping object to get the values for the finalDynamicDataBar
const finalDynamicDataBar = [{
  data: mappedData.map(item => item.value),
  name: 'Products',
  categories: updatedCategories,
  values: mappedData.reduce((acc, item) => {
    acc[item.value] = item.name;
    return acc;
  }, {}),
}];

console.log("data", finalDynamicDataBar[0].categories);
console.log("values", finalDynamicDataBar[0].values);

// BAR CHART
const barChartOptions = {
  series: finalDynamicDataBar,
  chart: {
    type: 'bar',
    background: 'transparent',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ['#2962ff', '#d50000', '#2e7d32', '#ff6d00', '#583cb3'],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  grid: {
    borderColor: '#55596e',
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: '#f5f7ff',
    },
    show: true,
    position: 'top',
  },
  stroke: {
    colors: ['transparent'],
    show: true,
    width: 2,
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
  },
  xaxis: {
    categories: finalDynamicDataBar[0].categories,
    title: {
      style: {
        color: '#f5f7ff',
      },
    },
    axisBorder: {
      show: true,
      color: '#55596e',
    },
    axisTicks: {
      show: true,
      color: '#55596e',
    },
    labels: {
      style: {
        colors: '#f5f7ff',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Count',
      style: {
        color: '#f5f7ff',
      },
    },
    axisBorder: {
      color: '#55596e',
      show: true,
    },
    axisTicks: {
      color: '#55596e',
      show: true,
    },
    labels: {
      style: {
        colors: '#f5f7ff',
      },
    },
  },
};

const barChart = new ApexCharts(
  document.querySelector('#bar-chart'),
  barChartOptions
);
barChart.render();

// AREA CHART
const areaChartOptions = {
  series: dynamicDataArea,
  chart: {
    type: 'area',
    background: 'transparent',
    height: 350,
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  colors: ['#00ab57', '#d50000'],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.1,
      shadeIntensity: 1,
      stops: [0, 100],
      type: 'vertical',
    },
    type: 'gradient',
  },
  grid: {
    borderColor: '#55596e',
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: '#f5f7ff',
    },
    show: true,
    position: 'top',
  },
  markers: {
    size: 6,
    strokeColors: '#1b2635',
    strokeWidth: 3,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    axisBorder: {
      color: '#55596e',
      show: true,
    },
    axisTicks: {
      color: '#55596e',
      show: true,
    },
    labels: {
      offsetY: 5,
      style: {
        colors: '#f5f7ff',
      },
    },
  },
  yaxis: [
    {
      title: {
        text: 'Purchase Orders',
        style: {
          color: '#f5f7ff',
        },
      },
      labels: {
        style: {
          colors: ['#f5f7ff'],
        },
      },
    },
    {
      opposite: true,
      title: {
        text: 'Sales Orders',
        style: {
          color: '#f5f7ff',
        },
      },
      labels: {
        style: {
          colors: ['#f5f7ff'],
        },
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
  },
};

const areaChart = new ApexCharts(
  document.querySelector('#area-chart'),
  areaChartOptions
);
areaChart.render();



