
//Read samples.json
d3.json("data/samples.json").then (dataLine =>  {
  console.log(dataLine)
  var dataID = dataLine.samples[0].otu_ids;
  console.log(dataID)
  var sampleValues =  dataLine.samples[0].sample_values.slice(0,10).reverse();
  console.log(sampleValues)
  var labels =  dataLine.samples[0].otu_labels.slice(0,10);
  console.log (labels)
// get top 10 otu ids for OTU. 
  var OTU_top = ( dataLine.samples[0].otu_ids.slice(0, 10)).reverse();
// cast otu id's
  var OTU_id = OTU_top.map(d => "OTU " + d);
  console.log(`OTU IDS: ${OTU_id}`)
// get the labels
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
      title: "Top 10 OTU",
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

});
  