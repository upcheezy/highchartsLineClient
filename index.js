function createChart(DamageCount18, DamageCount19, DamageCount20, DamageCount21) {
    console.log('DOM fully loaded and parsed');
    const chart = Highcharts.chart('chart-container', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Member Reported Damages'
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
            name: '2018',
            data: DamageCount18
        }, {
            name: '2019',
            data: DamageCount19
        }, {
            name: '2020',
            data: DamageCount20
        }, {
            name: '2021',
            data: DamageCount21
        }]
    });

    const barchart = Highcharts.chart('barchart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Member Reported Damages'
        },
        xAxis: {
            categories: ['2018', '2019', '2020', '2021']
        },
        yAxis: {
            title: {
                text: 'Damages'
            }
        },
        plotOptions: {
            series: {
                grouping: false
            }
        },
        series: [{
            name: '2018',
            data: [
                [0, 4398]
            ]
        }, {
            name: '2019',
            data: [
                [1, 4216]
            ]
        }, {
            name: '2020',
            data: [
                [2, 3117]
            ]
        }, {
            name: '2021',
            data: [
                [3, 221]
            ]
        }]
    });
    radioButtons(chart, barchart);
}

async function fetchData() {
    const [member_response18, member_response19, member_response20, member_response21] = await Promise.all([
        fetch('http://10.20.18.58:83/memberdamage?year=2018'),
        fetch('http://10.20.18.58:83/memberdamage?year=2019'),
        fetch('http://10.20.18.58:83/memberdamage?year=2020'),
        fetch('http://10.20.18.58:83/memberdamage?year=2021')
    ])

    const member18 = await member_response18.json();
    const member19 = await member_response19.json();
    const member20 = await member_response20.json();
    const member21 = await member_response21.json();

    return [member18, member19, member20, member21]
}

mDamageCount18 = []
mDamageCount19 = []
mDamageCount20 = []
mDamageCount21 = []

fetchData().then(([member18, member19, member20, member21]) => {
    // console.log('excavator')
    // console.log(excavator)
    member18.forEach(element => {
        console.log(element)
        mDamageCount18.push(element[""][0])
    });
    member19.forEach(element => {
        console.log(element)
        mDamageCount19.push(element[""][0])
    });
    member20.forEach(element => {
        console.log(element)
        mDamageCount20.push(element[""][0])
    });
    member21.forEach(element => {
        console.log(element)
        mDamageCount21.push(element[""][0])
    });
    createChart(mDamageCount18, mDamageCount19, mDamageCount20, mDamageCount21);
})

function radioButtons(chart, barchart) {
    document.getElementById('2018').addEventListener('click', e => {
        let series = chart.series[0];
        let barSeries = barchart.series[0]
        if (series.visible) {
            series.hide();
            barSeries.hide();
            e.target.innerHTML = 'Show series';
        } else {
            series.show();
            barSeries.show();
            barchart.series[0].addPoint(barSeries);
            e.target.innerHTML = 'Hide series';
        }
    })
    document.getElementById('2019').addEventListener('click', e => {
        let series = chart.series[1];
        let barSeries = barchart.series[1]
        console.log('clicked')
        if (series.visible) {
            series.hide();
            barSeries.hide();
            e.target.innerHTML = 'Show series';
        } else {
            series.show();
            barSeries.show();
            e.target.innerHTML = 'Hide series';
        }
    })
    document.getElementById('2020').addEventListener('click', e => {
        let series = chart.series[2];
        let barSeries = barchart.series[2]
        console.log('clicked')
        if (series.visible) {
            series.hide();
            barSeries.hide();
            e.target.innerHTML = 'Show series';
        } else {
            series.show();
            barSeries.show();
            e.target.innerHTML = 'Hide series';
        }
    })
    document.getElementById('2021').addEventListener('click', e => {
        let series = chart.series[3];
        let barSeries = barchart.series[3]
        console.log('clicked')
        if (series.visible) {
            series.hide();
            barSeries.hide();
            e.target.innerHTML = 'Show series';
        } else {
            series.show();
            barSeries.show();
            e.target.innerHTML = 'Hide series';
        }
    })
}