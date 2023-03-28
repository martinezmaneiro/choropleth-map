//databases
const educationUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
const countyUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

//once data is gathered and formated it will be located in these variables
let countyData;
let educationData;

//reference to the svg element
let canvas = d3.select('#canvas');

/*.json is d3's library own fetching data method. It returns a promise. d3 gathers
the information (json string) and returns it as a js object.*/
d3.json(countyUrl).then(
    (data, error) => {
        if(error){
            console.log(error)
        }else{
            countyData = data;

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
