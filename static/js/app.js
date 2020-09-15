
// function buildPlot() {

// get data from samples.json
d3.json("./data/samples.json").then((sampleData) => {
    
  // Fill select options to choose the subject ID number
  // 1) create a array(list) of the subject ID numbers

  // Populate the Subject ID selector
  let ids_arr = sampleData.names; // all of the ids in the set as an array of strings
  let fillerHTML = "";
  //for (let i=900;i<950;i++) {
  for (the_id of ids_arr) {
    //fillerHTML += `<option value=${i}>${i}\n`;
    fillerHTML += `<option value=${the_id}>${the_id}</option>\n`;
  }
  document.getElementById("selDataset").innerHTML = fillerHTML;

  // Set default Subject ID to first one (940)
  let id = parseInt(ids_arr[0]);

  // Find matching data from metadata section using filter function
  let subjectData = sampleData.metadata;
  const result = subjectData.filter(x => x.id == id);
  // Format XXXXXX
  fillerHTML = "";
  for (let key in result[0]){
    fillerHTML += `${key}: ${result[0][key]}<br>\n`;
  }
  // Place in div
  document.getElementById("sample-metadata").innerHTML = fillerHTML;




  //Consider a specific individual/person (test subject ID 940)
  //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs (microbial species) found in the test subject 940.

  // The needed data is in the "samples" key of the samples.
  // samples[0] is the first block of data, for id=940
  // Use sample_values as the values for the bar chart.
  var indiv = sampleData.samples[0]; // This is the first object id=940
  //console.log(indiv);
  var raw_values = indiv.sample_values; // desc ordered array of all integer values
  // Use <otu_id>: <genus> as the labels for the bar chart. The otu_labels are taxonomies that follow the taxonomic rank - Kingdom (or Domain in the case of Archaea); Phylum; Subphylum; Order; Family; Genus
  var raw_otu = indiv.otu_ids; // array of otu id numbers
  var raw_genus = indiv.otu_labels // array of ;-separated strings. Last word in string is the desired bar label

  // Take only the top ten items from our data
  var chart_values = raw_values.slice(0,10);
  var chart_labels = raw_otu.slice(0,10);
  var x,y;
  for (var i=0; i<10; i++) {
      x = raw_genus[i]; // Complete string to split
      y = x.split(";"); // Split string on ;
      chart_labels[i] += ': '; // Add colon and space to label to match example
      chart_labels[i] += y[y.length-1]; // Add last word from array to label
  }

  var data = [
    {
      x: chart_values,
      y: chart_labels,
      orientation: 'h',
      type: 'bar'
    }
  ];

  var layout = {
    title: 'Top 10 Bacteria - All Subjects',
    yaxis: {'autorange':'reversed','automargin':true}
    //barmode: 'stack'
  };

  Plotly.newPlot('bar1', data, layout); // Place chart in div with id bar1



}); 
///


//create 

// Use otu_labels as the hovertext for the chart.


//use object.entries to add value pair

/*
const object1 = {
    a: 'somestring',
    b: 42
  };
  
for (const [key, value] of Object.entries(object1)) {
    console.log(`${key}: ${value}`);

*/

