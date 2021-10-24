
function createPlots(id) {
  // read file
  d3.json("data/samples.json").then (dataLine =>  {
    console.log(dataLine)
    var dataID = dataLine.samples[0].otu_ids;
    console.log(dataID)
    var sampleValues =  dataLine.samples[0].sample_values.slice(0,10).reverse();
    console.log(sampleValues)
    var labels =  dataLine.samples[0].otu_labels.slice(0,10);
    console.log (labels)

    // get only top 10  
    var OTU_top = ( dataLine.samples[0].otu_ids.slice(0, 10)).reverse();

    // coerce otu id's
    var OTU_id = OTU_top.map(d => "OTU " + d);
    console.log(`OTU IDS: ${OTU_id}`)

    // setup the labels
    var labels =  dataLine.samples[0].otu_labels.slice(0,10);
    console.log(`OTU_labels: ${labels}`)
    var trace = {
      x: sampleValues,
      y: OTU_id,
      text: labels,
      marker: {
      color: 'blue'},
      type:"bar",
      orientation: "h",
      };

    // create layout variable to set plots layout
    var layout = {
      title: "Top 10 OTUs",
      yaxis:{
      tickmode:"linear",
      },
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 30
        }
      };
      
    // create data variable
    var data = [trace];

    // create the bar plot
    Plotly.newPlot("bar", data, layout);

  });
}

// get subject data
function getInfo(id) {
  // get data from json file
  d3.json("data/samples.json").then((data)=> {
    // info for subject panel
    var metadata = data.metadata;
    console.log(metadata)
  
    // filter data
    var result = metadata.filter(meta => meta.id.toString() === id)[0];

    // select panel
    var demographicInfo = d3.select("#sample-metadata");
          
    // clear the panel
    demographicInfo.html("");
  
    // push data to the panel
    Object.entries(result).forEach((key) => {   
        demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
      });
  });
}

// initial render
function init() {
  // select dropdown element
  var dropdown = d3.select("#selDataset");

  // read the data 
  d3.json("data/samples.json").then((data)=> {
    console.log(data)

    // get data for dropdwown
    data.names.forEach(function(name) {
      dropdown.append("option").text(name).property("value");
    });

    // display plots
    createPlots(data.names[0]);
    getInfo(data.names[0]);
  });
}

// event handler
function optionChanged(id) {
  createPlots(id);
  getInfo(id);
}


init();

