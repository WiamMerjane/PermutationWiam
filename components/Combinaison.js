// import React, { useEffect, useRef } from 'react';
// import { View, Dimensions } from 'react-native';
// import { Svg, Path, Circle } from 'react-native-svg';
// import * as d3 from 'd3-fetch';

// const Combinaison = () => {
//   const svgRef = useRef(null);
//   const { width, height } = Dimensions.get('window');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [worldData, circleData] = await Promise.all([
//           d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'),
//           d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_gpsLocSurfer.csv'),
//         ]);
//         drawMap(worldData, circleData);
//       } catch (error) {
//         console.log('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const drawMap = (dataGeo, data) => {
//     const svg = d3.select(svgRef.current);
//     const projection = d3.geoMercator()
//       .center([0, 20])
//       .scale(99)
//       .translate([width / 2, height / 2]);

//     const allContinent = d3.map(data, (d) => d.homecontinent).keys();
//     const color = d3.scaleOrdinal()
//       .domain(allContinent)
//       .range(d3.schemePaired);

//     const valueExtent = d3.extent(data, (d) => +d.n);
//     const size = d3.scaleSqrt()
//       .domain(valueExtent)
//       .range([1, 50]);

//     const path = d3.geoPath(projection);

//     svg.selectAll("path")
//       .data(dataGeo.features)
//       .enter()
//       .append("Path")
//       .attr("d", (d) => path(d))
//       .attr("fill", "#b8b8b8")
//       .style("stroke", "none")
//       .style("opacity", 0.3);

//     svg.selectAll("circle")
//       .data(data.sort((a, b) => +b.n - +a.n).filter((d, i) => i < 1000))
//       .enter()
//       .append("Circle")
//       .attr("cx", (d) => projection([+d.homelon, +d.homelat])[0])
//       .attr("cy", (d) => projection([+d.homelon, +d.homelat])[1])
//       .attr("r", (d) => size(+d.n))
//       .style("fill", (d) => color(d.homecontinent))
//       .attr("stroke", (d) => (d.n > 2000 ? "black" : "none"))
//       .attr("stroke-width", 1)
//       .attr("fill-opacity", 0.4);
//   };

//   return (
//     <View>
//       <Svg ref={svgRef} width={width} height={height} />
//     </View>
//   );
// };

// export default Combinaison;
