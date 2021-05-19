function createChart(alldamage) {
    console.log('DOM fully loaded and parsed');
    console.log(alldamage)
    let chartTicker = 0

    if (chartTicker > 0) {
        var seriesLength = chart.series.length;
        for(var i = seriesLength -1; i > -1; i--) {
            chart.series[i].remove();
        }
    }
    const chart = Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        yAxis: {
            title: {
                text: 'Damages'
            }
        },
        plotOptions: {
            series: {
                lineWidth: 5
            }
        },
        series: [{
            data: alldamage,
            name: 'Damage totals'
        }, {
            type: 'spline',
            name: 'Average',
            data: [310, 279, 317, 277, 230, 196, 248, 258, 220, 231, 121, 85],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }]
    });
    console.log(chartTicker)
    chartTicker += 1
    console.log(chartTicker)


    // const barchart = Highcharts.chart('barchart', {
    //     chart: {
    //         type: 'column'
    //     },
    //     title: {
    //         text: ''
    //     },
    //     xAxis: {
    //         categories: ['2018', '2019', '2020', '2021']
    //     },
    //     yAxis: {
    //         title: {
    //             text: 'Damages'
    //         }
    //     },
    //     plotOptions: {
    //         series: {
    //             grouping: false
    //         }
    //     },
    //     series: [{
    //         name: '2018',
    //         data: [
    //             [0, 4398]
    //         ]
    //     }, {
    //         name: '2019',
    //         data: [
    //             [1, 4216]
    //         ]
    //     }, {
    //         name: '2020',
    //         data: [
    //             [2, 3117]
    //         ]
    //     }, {
    //         name: '2021',
    //         data: [
    //             [3, 221]
    //         ]
    //     }]
    // });
    // radioButtons(chart, barchart);
}

$('.year16').click(() => {
    fetchNewData('2016')
})

$('.year17').click(() => {
    fetchNewData('2017')
})

$('.year18').click(() => {
    fetchNewData('2018')
})

$('.year19').click(() => {
    fetchNewData('2019')
})

$('.year20').click(() => {
    fetchNewData('2020')
})

$('.year21').click(() => {
    fetchNewData('2021')
})

function fetchNewData(year) {
    let alldamagecount = []
    console.log('http://localhost:8000/memberdamage?year=' + year)
    fetch('http://localhost:8000/memberdamage?year=' + year)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(element => {
                console.log(element[""][0])
                alldamagecount.push(element[""][0])
            })
            
            createChart(alldamagecount);
        })
}

async function fetchData() {
    const [alldamages] = await Promise.all([
        // fetch('http://10.20.18.58:83/memberdamage?year=2016'),
        // fetch('http://10.20.18.58:83/memberdamage?year=2017'),
        // fetch('http://10.20.18.58:83/memberdamage?year=2018'),
        // fetch('http://10.20.18.58:83/memberdamage?year=2019'),
        // fetch('http://10.20.18.58:83/memberdamage?year=2020'),
        // fetch('http://10.20.18.58:83/memberdamage?year=2021'),
        fetch('http://localhost:8000/memberdamage?year=2020')
    ])

    // const member16 = await member_response16.json();
    // const member17 = await member_response17.json();
    // const member18 = await member_response18.json();
    // const member19 = await member_response19.json();
    // const member20 = await member_response20.json();
    // const member21 = await member_response21.json();
    const alldamage = await alldamages.json();

    console.log(alldamage)

    return [alldamage]
}

// mDamageCount16 = []
// mDamageCount17 = []
// mDamageCount18 = []
// mDamageCount19 = []
// mDamageCount20 = []
// mDamageCount21 = []
let alldamagecount = []

fetchData().then(([alldamage]) => {
    // console.log('excavator')
    // console.log(excavator)
    // member16.forEach(element => {
    //     // console.log(element)
    //     mDamageCount16.push(element[""][0])
    // });
    // member17.forEach(element => {
    //     // console.log(element)
    //     mDamageCount17.push(element[""][0])
    // });
    // member18.forEach(element => {
    //     // console.log(element)
    //     mDamageCount18.push(element[""][0])
    // });
    // member19.forEach(element => {
    //     // console.log(element)
    //     mDamageCount19.push(element[""][0])
    // });
    // member20.forEach(element => {
    //     // console.log(element)
    //     mDamageCount20.push(element[""][0])
    // });
    // member21.forEach(element => {
    //     // console.log(element)
    //     mDamageCount21.push(element[""][0])
    // });
    alldamage.forEach(element => {
        console.log(element[""][0])
        alldamagecount.push(element[""][0])
    })
    createChart(alldamagecount);
})

// function radioButtons(chart, barchart) {
//     document.getElementById('2018').addEventListener('click', e => {
//         let series = chart.series[0];
//         let barSeries = barchart.series[0]
//         if (series.visible) {
//             series.hide();
//             barSeries.hide();
//             e.target.innerHTML = 'Show series';
//         } else {
//             series.show();
//             barSeries.show();
//             barchart.series[0].addPoint(barSeries);
//             e.target.innerHTML = 'Hide series';
//         }
//     })
//     document.getElementById('2019').addEventListener('click', e => {
//         let series = chart.series[1];
//         let barSeries = barchart.series[1]
//         console.log('clicked')
//         if (series.visible) {
//             series.hide();
//             barSeries.hide();
//             e.target.innerHTML = 'Show series';
//         } else {
//             series.show();
//             barSeries.show();
//             e.target.innerHTML = 'Hide series';
//         }
//     })
//     document.getElementById('2020').addEventListener('click', e => {
//         let series = chart.series[2];
//         let barSeries = barchart.series[2]
//         console.log('clicked')
//         if (series.visible) {
//             series.hide();
//             barSeries.hide();
//             e.target.innerHTML = 'Show series';
//         } else {
//             series.show();
//             barSeries.show();
//             e.target.innerHTML = 'Hide series';
//         }
//     })
//     document.getElementById('2021').addEventListener('click', e => {
//         let series = chart.series[3];
//         let barSeries = barchart.series[3]
//         console.log('clicked')
//         if (series.visible) {
//             series.hide();
//             barSeries.hide();
//             e.target.innerHTML = 'Show series';
//         } else {
//             series.show();
//             barSeries.show();
//             e.target.innerHTML = 'Hide series';
//         }
//     })
// }