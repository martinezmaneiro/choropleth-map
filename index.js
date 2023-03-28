//databases
const educationUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
const countyUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

//once data is gathered and formated it will be located in these variables
let countyData;
let educationData;

//reference to the svg element
let canvas = d3.select('#canvas');

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
                    }
                }
            )
        }
    }
);
