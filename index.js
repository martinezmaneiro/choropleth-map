//databases
const educationUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
const countyUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

//once data is gathered and formated it will be located in these variables
let countyData;
let educationData;

//reference to the svg element
let canvas = d3.select('#canvas');

//use the gathered data to draw the path
let drawMap =()=> {
    canvas.selectAll('path')
            .data(countyData)
            .enter()
            .append('path')
            .attr('d', d3.geoPath())
            .attr('class', 'county')
            // set 4 different fill colors for the counties
            .attr('fill', (countyDataItem) => {
                let id = countyDataItem['id'];
                let county = educationData.find((item) => {
                    return item['fips'] === id;
                })
                let percentage = county['bachelorsOrHigher'];
                if (percentage <=15){
                    return 'red'
                }else if(percentage <= 30){
                    return 'orange'
                }else if (percentage <=45){
                    return 'lightgreen'
                }else{
                    return 'green'
                };
            })
            .attr('data-fips', (countyDataItem) => {
                return countyDataItem['id'];
            })
            .attr('data-education', (countyDataItem) => {
                let id = countyDataItem['id']
                let county = educationData.find((item) => {
                    return item['fips'] === id;
                })
                let percentage = county['bachelorsOrHigher'];
                return percentage;
            })
};

/*.json is d3's library own fetching data method. It returns a promise. d3 gathers
the information (JSON string) and returns it as a JS object.*/
d3.json(countyUrl).then(
    (data, error) => {
        if(error){
            console.log(error)
        }else{
            //this method formats the data into GeoJSON format
            countyData = topojson.feature(data, data.objects.counties).features;

            d3.json(educationUrl).then(
                (data, error) => {
                    if(error){
                        console.log(error)
                    }else{
                        educationData = data;
                        drawMap();
                    }
                }
            )
        }
    }
);
