import React from 'react';
import * as d3 from 'd3';
import './App.scss';

interface IProps {
  
}

interface IState {
  
}

class App extends React.Component<IProps, IState> {
  ref!: SVGSVGElement;  
  
  private buildGraph(data: node[]) {
    const svgWidth = 1500;
    const svgHeight = 1200;
    const titleHeight = 20;
    const scaleFactor = 30;
    const startScale = 20;
    const bondingScale = 325;

    const graph = d3.select(this.ref)
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const stage = graph.selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d, i) {
        let start = 0;
        for(let index=0; index<i; index++){
          start +=data[index].width +scaleFactor+startScale;
        }
        console.log("start="+start)
        //const c = (i*d.width) +scaleFactor*i+startScale;
        return "translate(" + start  + ",0)";
      });

    // title rect
    stage.append("rect")
      .attr("width", function(d) { return d.width; })
      .attr("height", titleHeight)
      .attr("class", "title")

    // title text
    stage.append("text")
      .attr("x", function(d) { return d.width/2; })
      .attr("y", function(d) { return titleHeight /2 })
      .attr("dy", ".45em")
      .text(function(d) { return d.stage; });
    
    // part rect
    stage.append("rect")
      .attr("width", function(d) {
        if(d.bondPartFlag === "Y"){
          return d.width-bondingScale;
        }
        return d.width; })
      .attr("height", function(d) { return d.height; })
      .attr("class", "part")
      .attr("transform",function(d) { 
        if(d.bondPartFlag === "Y"){
          return "translate("+bondingScale+",50)";
        }
        return "translate(0,50)"; });

    // partID
    stage.append("text")
      .attr("x", function(d) { 
        if(d.bondPartFlag === "Y"){
          return (d.width-bondingScale)/2;
        }
        return d.width/2;
      })
      .attr("y", function(d) { return d.height/2 +50 })
      .attr("dy", ".45em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.partId; })
      .attr("transform",function(d) { 
        if(d.bondPartFlag === "Y"){
          return "translate("+bondingScale+",0)";
        }
        return "translate(0,0)"; });
    
    // bonding part attr
    stage.filter(function(d){ return d.bondPartFlag==="Y"; })
    .append("rect")
    .attr("width", function(d) {
      if(d.bondPartFlag === "Y"){
        return d.width-(d.width-bondingScale)-scaleFactor;
      }
      return d.width; })
    .attr("height", function(d) { return d.height; })
    .attr("class",function(d) { return  "bonding-part"+" bonding-part-"+d.stage; })
    .attr("transform", "translate(0,50)");
    
   

    const bonding = stage.selectAll('g')
      .data(data)
      .selectAll("bonding-part")
      .data(function(d) { return d.bondPartInfo; }) // d is matrix[i]
      .enter()
      .append("rect")
      .attr("width", function(d) {
        console.log("d="+d)
        return 10; })
      .attr("height", function(d) { return 10; })
      .attr("class", "part")
      .attr("transform", function(d, i) {
        return "translate(0"+10*i+")";
      });

    
    
    //iconmonstr-arrow-12.svg http://www.clker.com/cliparts/1/4/5/a/1331068897296558865Sitting%20Racoon.svg >_<
    stage.append("svg:image")
      .attr("xlink:href", "iconmonstr-arrow-12.svg")
      .attr("class","arrow-icon")
      .attr("width",30)
      .attr("height",30)
      .attr("x", function(d) { return d.width+10 })
      .attr("y", function(d) { return d.height/2 +35 })

      .style("display",function(d) { 
        if(d.end === "Y")
        return "none";  return ""
       });
    
    // bonding part attr
    stage.filter(function(d){ return d.bondPartFlag==="Y"; })
    .append("svg:image")
      .attr("xlink:href", "add_icon.svg")
      .attr("class","add-icon")
      .attr("width",20)
      .attr("height",20)
      .attr("x", function(d) { return d.width-( d.width-bondingScale)-scaleFactor+5 })
      .attr("y", function(d) { return d.height/2 +40 })



  }
  
  componentDidMount() {
    // height: ref how many bondPartInfo
    // width: fix 150 ??
    var countriesData: node[] = [
      { stage:"WF", width:150, height: 300, partId:"TM4610A-001C1L1ZN" },
      { stage:"BP", width:450, height: 300, partId:"TM4610A-001C1L1BP", bondPartFlag:"Y",
      bondPartInfo:[
        {partId:"bond TM4610A-001C1L1ZN", binGrade:"NA", qty:"1",side:"FS",layer:"1",area:"1"},
        {partId:"bond TM4610A-001C1L1ZN", binGrade:"NA", qty:"1",side:"FS",layer:"1",area:"1"},
        {partId:"bond TM4610A-001C1L1ZN", binGrade:"NA", qty:"1",side:"FS",layer:"1",area:"1"},
      ]
    },
      { stage:"CP", width:150, height: 300, partId:"TM4610A-001C1L1CP" },
      { stage:"AS", width:150, height: 300, partId:"TM4610A-001C1L1AN" },
      { stage:"FT", width:150, height: 300, partId:"TM4610A-001C1L1PN" }
   ];
   countriesData[countriesData.length-1].end = "Y";
   this.buildGraph(countriesData);
    //this.buildGraph([50, 10, 12]);
  }

  render() {
    return (<div className="svg">
      <svg className="container" ref={(ref: SVGSVGElement) => this.ref = ref} width='100' height='100'></svg>
    </div>);
  }
}

interface node {
  stage:string;
  width:number;
  height:number;
  partId:string;
  bondPartFlag?:string;
  bondPartInfo?:any;
  end?:string;
}

export default App;