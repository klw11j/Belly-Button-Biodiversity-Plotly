function buildData(sample) {
    d3.json("samples.json").then((data) => {
        console.log(data)
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var CHART = d3.select("#sample-metadata");

        CHART.html("");

        Object.entries(result).forEach(([key, value]) => {
            CHART.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

function buildCharts(sample){
    d3.json('samples.json').then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        //Bubble Chart
        var bubble_layout = {
            margin: { t: 0},
            xaxis: { title: "OTU ID"},
            margin: {t: 40}

        };

        var bubble_data = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: 'Earth'

                }
            }
        ];

        Plotly.newPlot("bubble", bubble_data, bubble_layout);

        var y_axis = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var bar_data = [
            {
                x: sample_values.slice(0,10).reverse(),
                y: y_axis,
                type: "bar",
                orientation: "h",
            }
        ];

        var bar_layout = {
            margin: { t:40, 1:200}
        };

        Plotly.newPlot("bar", bar_data, bar_layout);

    });
}

function getInfo() {
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;

        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        var firstvalue = sampleNames[0];
        buildCharts(firstvalue);
        buildData(firstvalue);

    });
}


function optionChanged(othersample) {
    buildCharts(othersample);
    buildData(othersample);
}

getInfo();