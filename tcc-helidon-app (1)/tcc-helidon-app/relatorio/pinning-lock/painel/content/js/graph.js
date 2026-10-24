/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 100.0, "minX": 0.0, "maxY": 233.0, "series": [{"data": [[0.0, 100.0], [0.1, 100.0], [0.2, 100.0], [0.3, 100.0], [0.4, 100.0], [0.5, 100.0], [0.6, 100.0], [0.7, 100.0], [0.8, 100.0], [0.9, 100.0], [1.0, 100.0], [1.1, 100.0], [1.2, 100.0], [1.3, 100.0], [1.4, 100.0], [1.5, 100.0], [1.6, 100.0], [1.7, 100.0], [1.8, 100.0], [1.9, 100.0], [2.0, 100.0], [2.1, 100.0], [2.2, 100.0], [2.3, 100.0], [2.4, 100.0], [2.5, 100.0], [2.6, 100.0], [2.7, 100.0], [2.8, 100.0], [2.9, 100.0], [3.0, 100.0], [3.1, 100.0], [3.2, 100.0], [3.3, 100.0], [3.4, 100.0], [3.5, 100.0], [3.6, 100.0], [3.7, 100.0], [3.8, 100.0], [3.9, 100.0], [4.0, 100.0], [4.1, 100.0], [4.2, 100.0], [4.3, 100.0], [4.4, 100.0], [4.5, 100.0], [4.6, 100.0], [4.7, 100.0], [4.8, 100.0], [4.9, 100.0], [5.0, 100.0], [5.1, 100.0], [5.2, 100.0], [5.3, 100.0], [5.4, 100.0], [5.5, 100.0], [5.6, 100.0], [5.7, 100.0], [5.8, 100.0], [5.9, 100.0], [6.0, 100.0], [6.1, 100.0], [6.2, 100.0], [6.3, 100.0], [6.4, 100.0], [6.5, 100.0], [6.6, 100.0], [6.7, 100.0], [6.8, 100.0], [6.9, 100.0], [7.0, 100.0], [7.1, 100.0], [7.2, 100.0], [7.3, 100.0], [7.4, 100.0], [7.5, 100.0], [7.6, 100.0], [7.7, 100.0], [7.8, 100.0], [7.9, 100.0], [8.0, 100.0], [8.1, 100.0], [8.2, 100.0], [8.3, 100.0], [8.4, 100.0], [8.5, 100.0], [8.6, 100.0], [8.7, 100.0], [8.8, 100.0], [8.9, 100.0], [9.0, 100.0], [9.1, 100.0], [9.2, 100.0], [9.3, 100.0], [9.4, 100.0], [9.5, 100.0], [9.6, 100.0], [9.7, 100.0], [9.8, 100.0], [9.9, 100.0], [10.0, 100.0], [10.1, 100.0], [10.2, 100.0], [10.3, 100.0], [10.4, 100.0], [10.5, 100.0], [10.6, 100.0], [10.7, 100.0], [10.8, 100.0], [10.9, 100.0], [11.0, 100.0], [11.1, 100.0], [11.2, 100.0], [11.3, 100.0], [11.4, 100.0], [11.5, 100.0], [11.6, 100.0], [11.7, 101.0], [11.8, 101.0], [11.9, 101.0], [12.0, 101.0], [12.1, 101.0], [12.2, 101.0], [12.3, 101.0], [12.4, 101.0], [12.5, 101.0], [12.6, 101.0], [12.7, 101.0], [12.8, 101.0], [12.9, 101.0], [13.0, 101.0], [13.1, 101.0], [13.2, 101.0], [13.3, 101.0], [13.4, 101.0], [13.5, 101.0], [13.6, 101.0], [13.7, 101.0], [13.8, 101.0], [13.9, 101.0], [14.0, 101.0], [14.1, 101.0], [14.2, 101.0], [14.3, 101.0], [14.4, 101.0], [14.5, 101.0], [14.6, 101.0], [14.7, 101.0], [14.8, 101.0], [14.9, 101.0], [15.0, 101.0], [15.1, 101.0], [15.2, 101.0], [15.3, 101.0], [15.4, 101.0], [15.5, 101.0], [15.6, 101.0], [15.7, 101.0], [15.8, 101.0], [15.9, 101.0], [16.0, 101.0], [16.1, 101.0], [16.2, 101.0], [16.3, 101.0], [16.4, 101.0], [16.5, 101.0], [16.6, 101.0], [16.7, 101.0], [16.8, 101.0], [16.9, 101.0], [17.0, 101.0], [17.1, 101.0], [17.2, 101.0], [17.3, 101.0], [17.4, 101.0], [17.5, 101.0], [17.6, 101.0], [17.7, 101.0], [17.8, 101.0], [17.9, 101.0], [18.0, 101.0], [18.1, 101.0], [18.2, 101.0], [18.3, 101.0], [18.4, 101.0], [18.5, 101.0], [18.6, 101.0], [18.7, 101.0], [18.8, 101.0], [18.9, 101.0], [19.0, 101.0], [19.1, 101.0], [19.2, 101.0], [19.3, 101.0], [19.4, 101.0], [19.5, 101.0], [19.6, 101.0], [19.7, 101.0], [19.8, 101.0], [19.9, 101.0], [20.0, 101.0], [20.1, 101.0], [20.2, 101.0], [20.3, 101.0], [20.4, 101.0], [20.5, 101.0], [20.6, 101.0], [20.7, 101.0], [20.8, 101.0], [20.9, 101.0], [21.0, 101.0], [21.1, 101.0], [21.2, 101.0], [21.3, 101.0], [21.4, 101.0], [21.5, 101.0], [21.6, 101.0], [21.7, 101.0], [21.8, 101.0], [21.9, 101.0], [22.0, 101.0], [22.1, 101.0], [22.2, 101.0], [22.3, 101.0], [22.4, 101.0], [22.5, 101.0], [22.6, 101.0], [22.7, 101.0], [22.8, 101.0], [22.9, 101.0], [23.0, 101.0], [23.1, 101.0], [23.2, 101.0], [23.3, 101.0], [23.4, 101.0], [23.5, 101.0], [23.6, 101.0], [23.7, 101.0], [23.8, 101.0], [23.9, 101.0], [24.0, 101.0], [24.1, 101.0], [24.2, 101.0], [24.3, 101.0], [24.4, 101.0], [24.5, 101.0], [24.6, 101.0], [24.7, 101.0], [24.8, 101.0], [24.9, 101.0], [25.0, 101.0], [25.1, 101.0], [25.2, 101.0], [25.3, 101.0], [25.4, 101.0], [25.5, 101.0], [25.6, 101.0], [25.7, 101.0], [25.8, 101.0], [25.9, 101.0], [26.0, 101.0], [26.1, 101.0], [26.2, 101.0], [26.3, 101.0], [26.4, 101.0], [26.5, 101.0], [26.6, 101.0], [26.7, 101.0], [26.8, 101.0], [26.9, 101.0], [27.0, 101.0], [27.1, 101.0], [27.2, 101.0], [27.3, 101.0], [27.4, 101.0], [27.5, 101.0], [27.6, 101.0], [27.7, 101.0], [27.8, 101.0], [27.9, 101.0], [28.0, 101.0], [28.1, 101.0], [28.2, 101.0], [28.3, 101.0], [28.4, 101.0], [28.5, 101.0], [28.6, 101.0], [28.7, 101.0], [28.8, 101.0], [28.9, 101.0], [29.0, 101.0], [29.1, 101.0], [29.2, 101.0], [29.3, 101.0], [29.4, 101.0], [29.5, 101.0], [29.6, 101.0], [29.7, 101.0], [29.8, 101.0], [29.9, 101.0], [30.0, 101.0], [30.1, 101.0], [30.2, 101.0], [30.3, 101.0], [30.4, 101.0], [30.5, 101.0], [30.6, 101.0], [30.7, 101.0], [30.8, 101.0], [30.9, 101.0], [31.0, 101.0], [31.1, 101.0], [31.2, 101.0], [31.3, 101.0], [31.4, 101.0], [31.5, 101.0], [31.6, 101.0], [31.7, 101.0], [31.8, 101.0], [31.9, 101.0], [32.0, 101.0], [32.1, 101.0], [32.2, 101.0], [32.3, 101.0], [32.4, 101.0], [32.5, 101.0], [32.6, 101.0], [32.7, 101.0], [32.8, 101.0], [32.9, 101.0], [33.0, 101.0], [33.1, 101.0], [33.2, 101.0], [33.3, 101.0], [33.4, 101.0], [33.5, 101.0], [33.6, 101.0], [33.7, 101.0], [33.8, 101.0], [33.9, 101.0], [34.0, 101.0], [34.1, 101.0], [34.2, 101.0], [34.3, 101.0], [34.4, 101.0], [34.5, 101.0], [34.6, 101.0], [34.7, 101.0], [34.8, 101.0], [34.9, 101.0], [35.0, 101.0], [35.1, 101.0], [35.2, 101.0], [35.3, 101.0], [35.4, 101.0], [35.5, 101.0], [35.6, 101.0], [35.7, 101.0], [35.8, 101.0], [35.9, 101.0], [36.0, 101.0], [36.1, 101.0], [36.2, 101.0], [36.3, 101.0], [36.4, 101.0], [36.5, 101.0], [36.6, 101.0], [36.7, 101.0], [36.8, 101.0], [36.9, 101.0], [37.0, 101.0], [37.1, 101.0], [37.2, 101.0], [37.3, 101.0], [37.4, 101.0], [37.5, 101.0], [37.6, 101.0], [37.7, 101.0], [37.8, 101.0], [37.9, 101.0], [38.0, 101.0], [38.1, 101.0], [38.2, 101.0], [38.3, 101.0], [38.4, 101.0], [38.5, 101.0], [38.6, 101.0], [38.7, 101.0], [38.8, 101.0], [38.9, 101.0], [39.0, 101.0], [39.1, 101.0], [39.2, 101.0], [39.3, 101.0], [39.4, 101.0], [39.5, 101.0], [39.6, 101.0], [39.7, 101.0], [39.8, 101.0], [39.9, 101.0], [40.0, 101.0], [40.1, 101.0], [40.2, 101.0], [40.3, 101.0], [40.4, 101.0], [40.5, 101.0], [40.6, 101.0], [40.7, 101.0], [40.8, 101.0], [40.9, 101.0], [41.0, 101.0], [41.1, 101.0], [41.2, 101.0], [41.3, 101.0], [41.4, 101.0], [41.5, 101.0], [41.6, 101.0], [41.7, 101.0], [41.8, 101.0], [41.9, 101.0], [42.0, 101.0], [42.1, 101.0], [42.2, 101.0], [42.3, 101.0], [42.4, 101.0], [42.5, 101.0], [42.6, 101.0], [42.7, 101.0], [42.8, 101.0], [42.9, 101.0], [43.0, 101.0], [43.1, 101.0], [43.2, 101.0], [43.3, 101.0], [43.4, 101.0], [43.5, 101.0], [43.6, 101.0], [43.7, 101.0], [43.8, 101.0], [43.9, 101.0], [44.0, 101.0], [44.1, 101.0], [44.2, 101.0], [44.3, 101.0], [44.4, 101.0], [44.5, 101.0], [44.6, 101.0], [44.7, 101.0], [44.8, 101.0], [44.9, 101.0], [45.0, 101.0], [45.1, 101.0], [45.2, 101.0], [45.3, 101.0], [45.4, 101.0], [45.5, 101.0], [45.6, 101.0], [45.7, 101.0], [45.8, 101.0], [45.9, 101.0], [46.0, 101.0], [46.1, 101.0], [46.2, 101.0], [46.3, 101.0], [46.4, 101.0], [46.5, 101.0], [46.6, 101.0], [46.7, 101.0], [46.8, 101.0], [46.9, 101.0], [47.0, 101.0], [47.1, 101.0], [47.2, 101.0], [47.3, 101.0], [47.4, 101.0], [47.5, 101.0], [47.6, 101.0], [47.7, 101.0], [47.8, 101.0], [47.9, 101.0], [48.0, 101.0], [48.1, 101.0], [48.2, 101.0], [48.3, 101.0], [48.4, 101.0], [48.5, 101.0], [48.6, 101.0], [48.7, 101.0], [48.8, 101.0], [48.9, 101.0], [49.0, 101.0], [49.1, 101.0], [49.2, 101.0], [49.3, 101.0], [49.4, 101.0], [49.5, 101.0], [49.6, 101.0], [49.7, 101.0], [49.8, 101.0], [49.9, 101.0], [50.0, 101.0], [50.1, 101.0], [50.2, 101.0], [50.3, 101.0], [50.4, 101.0], [50.5, 101.0], [50.6, 101.0], [50.7, 101.0], [50.8, 101.0], [50.9, 101.0], [51.0, 101.0], [51.1, 101.0], [51.2, 101.0], [51.3, 101.0], [51.4, 101.0], [51.5, 101.0], [51.6, 101.0], [51.7, 101.0], [51.8, 101.0], [51.9, 101.0], [52.0, 101.0], [52.1, 101.0], [52.2, 101.0], [52.3, 101.0], [52.4, 101.0], [52.5, 101.0], [52.6, 101.0], [52.7, 101.0], [52.8, 101.0], [52.9, 101.0], [53.0, 101.0], [53.1, 101.0], [53.2, 101.0], [53.3, 101.0], [53.4, 101.0], [53.5, 101.0], [53.6, 101.0], [53.7, 101.0], [53.8, 101.0], [53.9, 101.0], [54.0, 101.0], [54.1, 101.0], [54.2, 101.0], [54.3, 101.0], [54.4, 101.0], [54.5, 101.0], [54.6, 101.0], [54.7, 101.0], [54.8, 101.0], [54.9, 101.0], [55.0, 101.0], [55.1, 101.0], [55.2, 101.0], [55.3, 101.0], [55.4, 101.0], [55.5, 101.0], [55.6, 101.0], [55.7, 101.0], [55.8, 102.0], [55.9, 102.0], [56.0, 102.0], [56.1, 102.0], [56.2, 102.0], [56.3, 102.0], [56.4, 102.0], [56.5, 102.0], [56.6, 102.0], [56.7, 102.0], [56.8, 102.0], [56.9, 102.0], [57.0, 102.0], [57.1, 102.0], [57.2, 102.0], [57.3, 102.0], [57.4, 102.0], [57.5, 102.0], [57.6, 102.0], [57.7, 102.0], [57.8, 102.0], [57.9, 102.0], [58.0, 102.0], [58.1, 102.0], [58.2, 102.0], [58.3, 102.0], [58.4, 102.0], [58.5, 102.0], [58.6, 102.0], [58.7, 102.0], [58.8, 102.0], [58.9, 102.0], [59.0, 102.0], [59.1, 102.0], [59.2, 102.0], [59.3, 102.0], [59.4, 102.0], [59.5, 102.0], [59.6, 102.0], [59.7, 102.0], [59.8, 102.0], [59.9, 102.0], [60.0, 102.0], [60.1, 102.0], [60.2, 102.0], [60.3, 102.0], [60.4, 102.0], [60.5, 102.0], [60.6, 102.0], [60.7, 102.0], [60.8, 102.0], [60.9, 102.0], [61.0, 102.0], [61.1, 102.0], [61.2, 102.0], [61.3, 102.0], [61.4, 102.0], [61.5, 102.0], [61.6, 102.0], [61.7, 102.0], [61.8, 102.0], [61.9, 102.0], [62.0, 102.0], [62.1, 102.0], [62.2, 102.0], [62.3, 102.0], [62.4, 102.0], [62.5, 102.0], [62.6, 102.0], [62.7, 102.0], [62.8, 102.0], [62.9, 102.0], [63.0, 102.0], [63.1, 102.0], [63.2, 102.0], [63.3, 102.0], [63.4, 102.0], [63.5, 102.0], [63.6, 102.0], [63.7, 102.0], [63.8, 102.0], [63.9, 102.0], [64.0, 102.0], [64.1, 102.0], [64.2, 102.0], [64.3, 102.0], [64.4, 102.0], [64.5, 102.0], [64.6, 102.0], [64.7, 102.0], [64.8, 102.0], [64.9, 102.0], [65.0, 102.0], [65.1, 102.0], [65.2, 102.0], [65.3, 102.0], [65.4, 102.0], [65.5, 102.0], [65.6, 102.0], [65.7, 102.0], [65.8, 102.0], [65.9, 102.0], [66.0, 102.0], [66.1, 102.0], [66.2, 102.0], [66.3, 102.0], [66.4, 102.0], [66.5, 102.0], [66.6, 102.0], [66.7, 102.0], [66.8, 102.0], [66.9, 102.0], [67.0, 102.0], [67.1, 102.0], [67.2, 102.0], [67.3, 102.0], [67.4, 102.0], [67.5, 102.0], [67.6, 102.0], [67.7, 102.0], [67.8, 102.0], [67.9, 102.0], [68.0, 102.0], [68.1, 102.0], [68.2, 102.0], [68.3, 102.0], [68.4, 102.0], [68.5, 102.0], [68.6, 102.0], [68.7, 102.0], [68.8, 102.0], [68.9, 102.0], [69.0, 102.0], [69.1, 102.0], [69.2, 102.0], [69.3, 102.0], [69.4, 102.0], [69.5, 102.0], [69.6, 102.0], [69.7, 102.0], [69.8, 102.0], [69.9, 102.0], [70.0, 102.0], [70.1, 102.0], [70.2, 102.0], [70.3, 102.0], [70.4, 102.0], [70.5, 102.0], [70.6, 102.0], [70.7, 102.0], [70.8, 102.0], [70.9, 102.0], [71.0, 102.0], [71.1, 102.0], [71.2, 102.0], [71.3, 102.0], [71.4, 102.0], [71.5, 102.0], [71.6, 102.0], [71.7, 102.0], [71.8, 102.0], [71.9, 102.0], [72.0, 102.0], [72.1, 102.0], [72.2, 102.0], [72.3, 102.0], [72.4, 102.0], [72.5, 102.0], [72.6, 102.0], [72.7, 102.0], [72.8, 102.0], [72.9, 102.0], [73.0, 102.0], [73.1, 102.0], [73.2, 102.0], [73.3, 102.0], [73.4, 102.0], [73.5, 102.0], [73.6, 102.0], [73.7, 102.0], [73.8, 102.0], [73.9, 102.0], [74.0, 102.0], [74.1, 102.0], [74.2, 102.0], [74.3, 102.0], [74.4, 102.0], [74.5, 102.0], [74.6, 102.0], [74.7, 102.0], [74.8, 102.0], [74.9, 102.0], [75.0, 102.0], [75.1, 102.0], [75.2, 102.0], [75.3, 102.0], [75.4, 102.0], [75.5, 102.0], [75.6, 102.0], [75.7, 102.0], [75.8, 102.0], [75.9, 102.0], [76.0, 102.0], [76.1, 102.0], [76.2, 102.0], [76.3, 102.0], [76.4, 102.0], [76.5, 102.0], [76.6, 102.0], [76.7, 102.0], [76.8, 102.0], [76.9, 102.0], [77.0, 102.0], [77.1, 102.0], [77.2, 102.0], [77.3, 102.0], [77.4, 102.0], [77.5, 102.0], [77.6, 102.0], [77.7, 102.0], [77.8, 102.0], [77.9, 102.0], [78.0, 102.0], [78.1, 102.0], [78.2, 102.0], [78.3, 103.0], [78.4, 103.0], [78.5, 103.0], [78.6, 103.0], [78.7, 103.0], [78.8, 103.0], [78.9, 103.0], [79.0, 103.0], [79.1, 103.0], [79.2, 103.0], [79.3, 103.0], [79.4, 103.0], [79.5, 103.0], [79.6, 103.0], [79.7, 103.0], [79.8, 103.0], [79.9, 103.0], [80.0, 103.0], [80.1, 103.0], [80.2, 103.0], [80.3, 103.0], [80.4, 103.0], [80.5, 103.0], [80.6, 103.0], [80.7, 103.0], [80.8, 103.0], [80.9, 103.0], [81.0, 103.0], [81.1, 103.0], [81.2, 103.0], [81.3, 103.0], [81.4, 103.0], [81.5, 103.0], [81.6, 103.0], [81.7, 103.0], [81.8, 103.0], [81.9, 103.0], [82.0, 103.0], [82.1, 103.0], [82.2, 103.0], [82.3, 103.0], [82.4, 103.0], [82.5, 103.0], [82.6, 103.0], [82.7, 103.0], [82.8, 103.0], [82.9, 103.0], [83.0, 103.0], [83.1, 103.0], [83.2, 103.0], [83.3, 103.0], [83.4, 103.0], [83.5, 103.0], [83.6, 103.0], [83.7, 103.0], [83.8, 103.0], [83.9, 103.0], [84.0, 103.0], [84.1, 103.0], [84.2, 103.0], [84.3, 103.0], [84.4, 103.0], [84.5, 103.0], [84.6, 103.0], [84.7, 103.0], [84.8, 103.0], [84.9, 103.0], [85.0, 103.0], [85.1, 103.0], [85.2, 103.0], [85.3, 103.0], [85.4, 103.0], [85.5, 103.0], [85.6, 103.0], [85.7, 103.0], [85.8, 103.0], [85.9, 103.0], [86.0, 103.0], [86.1, 103.0], [86.2, 103.0], [86.3, 103.0], [86.4, 103.0], [86.5, 103.0], [86.6, 103.0], [86.7, 103.0], [86.8, 103.0], [86.9, 103.0], [87.0, 103.0], [87.1, 104.0], [87.2, 104.0], [87.3, 104.0], [87.4, 104.0], [87.5, 104.0], [87.6, 104.0], [87.7, 104.0], [87.8, 104.0], [87.9, 104.0], [88.0, 104.0], [88.1, 104.0], [88.2, 104.0], [88.3, 104.0], [88.4, 104.0], [88.5, 104.0], [88.6, 104.0], [88.7, 104.0], [88.8, 104.0], [88.9, 104.0], [89.0, 104.0], [89.1, 104.0], [89.2, 104.0], [89.3, 104.0], [89.4, 104.0], [89.5, 104.0], [89.6, 104.0], [89.7, 104.0], [89.8, 104.0], [89.9, 104.0], [90.0, 104.0], [90.1, 104.0], [90.2, 104.0], [90.3, 104.0], [90.4, 104.0], [90.5, 104.0], [90.6, 104.0], [90.7, 104.0], [90.8, 104.0], [90.9, 104.0], [91.0, 104.0], [91.1, 104.0], [91.2, 104.0], [91.3, 105.0], [91.4, 105.0], [91.5, 105.0], [91.6, 105.0], [91.7, 105.0], [91.8, 105.0], [91.9, 105.0], [92.0, 105.0], [92.1, 105.0], [92.2, 105.0], [92.3, 105.0], [92.4, 105.0], [92.5, 105.0], [92.6, 105.0], [92.7, 105.0], [92.8, 105.0], [92.9, 105.0], [93.0, 105.0], [93.1, 105.0], [93.2, 105.0], [93.3, 105.0], [93.4, 105.0], [93.5, 105.0], [93.6, 105.0], [93.7, 105.0], [93.8, 106.0], [93.9, 106.0], [94.0, 106.0], [94.1, 106.0], [94.2, 106.0], [94.3, 106.0], [94.4, 106.0], [94.5, 106.0], [94.6, 106.0], [94.7, 106.0], [94.8, 106.0], [94.9, 106.0], [95.0, 106.0], [95.1, 106.0], [95.2, 106.0], [95.3, 106.0], [95.4, 107.0], [95.5, 107.0], [95.6, 107.0], [95.7, 107.0], [95.8, 107.0], [95.9, 107.0], [96.0, 107.0], [96.1, 107.0], [96.2, 107.0], [96.3, 107.0], [96.4, 107.0], [96.5, 107.0], [96.6, 108.0], [96.7, 108.0], [96.8, 108.0], [96.9, 108.0], [97.0, 108.0], [97.1, 108.0], [97.2, 108.0], [97.3, 109.0], [97.4, 109.0], [97.5, 109.0], [97.6, 109.0], [97.7, 109.0], [97.8, 110.0], [97.9, 110.0], [98.0, 110.0], [98.1, 110.0], [98.2, 110.0], [98.3, 111.0], [98.4, 111.0], [98.5, 111.0], [98.6, 112.0], [98.7, 112.0], [98.8, 113.0], [98.9, 113.0], [99.0, 113.0], [99.1, 114.0], [99.2, 115.0], [99.3, 116.0], [99.4, 118.0], [99.5, 120.0], [99.6, 121.0], [99.7, 124.0], [99.8, 133.0], [99.9, 157.0], [100.0, 233.0]], "isOverall": false, "label": "pinning-lock", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 18.0, "minX": 100.0, "maxY": 108057.0, "series": [{"data": [[100.0, 108057.0], [200.0, 18.0]], "isOverall": false, "label": "pinning-lock", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 200.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 108075.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 108075.0, "series": [{"data": [[0.0, 108075.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 4.9E-324, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 176.9022299702188, "minX": 1.79275284E12, "maxY": 199.5385828335877, "series": [{"data": [[1.7927529E12, 199.5385828335877], [1.79275284E12, 176.9022299702188]], "isOverall": false, "label": "Usuarios (200)", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7927529E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 100.7083333333333, "minX": 1.0, "maxY": 155.03906249999991, "series": [{"data": [[3.0, 102.0], [5.0, 102.0], [6.0, 103.0], [7.0, 103.0], [8.0, 153.875], [9.0, 103.0], [10.0, 102.5], [11.0, 102.77777777777777], [12.0, 103.0], [13.0, 103.83333333333331], [14.0, 102.75], [15.0, 102.63636363636364], [16.0, 102.0], [17.0, 103.08333333333333], [18.0, 101.83333333333334], [19.0, 102.6923076923077], [20.0, 102.00000000000001], [21.0, 102.0769230769231], [22.0, 102.28571428571429], [23.0, 103.06666666666666], [24.0, 102.33333333333333], [25.0, 103.60000000000001], [26.0, 101.69230769230766], [27.0, 101.86666666666667], [28.0, 102.18181818181819], [29.0, 102.0], [30.0, 102.6], [31.0, 102.0625], [32.0, 101.82352941176472], [33.0, 101.64285714285714], [34.0, 102.15000000000002], [35.0, 102.07142857142856], [36.0, 101.80952380952381], [37.0, 102.6875], [38.0, 101.60000000000001], [39.0, 102.2777777777778], [40.0, 102.50000000000001], [41.0, 101.59090909090907], [42.0, 102.91304347826087], [43.0, 101.70588235294116], [44.0, 101.85185185185185], [45.0, 101.26315789473685], [46.0, 101.84], [47.0, 101.10000000000001], [48.0, 101.27586206896552], [49.0, 101.52380952380952], [50.0, 101.6923076923077], [51.0, 101.87499999999999], [52.0, 102.22222222222223], [53.0, 101.77272727272728], [54.0, 101.71875], [55.0, 101.72727272727273], [56.0, 101.75757575757576], [57.0, 101.51999999999998], [58.0, 101.62857142857143], [59.0, 101.32142857142857], [60.0, 101.23529411764707], [61.0, 101.26923076923076], [62.0, 101.44736842105264], [63.0, 101.16129032258064], [64.0, 101.27027027027027], [65.0, 101.3548387096774], [66.0, 101.06060606060606], [67.0, 101.17647058823529], [68.0, 101.21621621621624], [69.0, 103.05882352941178], [70.0, 100.93939393939392], [71.0, 101.49999999999997], [72.0, 101.12499999999999], [73.0, 101.15789473684212], [74.0, 101.11764705882351], [75.0, 101.13513513513513], [76.0, 101.36363636363636], [77.0, 100.81818181818181], [78.0, 100.95121951219511], [79.0, 101.20512820512822], [80.0, 101.81578947368423], [81.0, 101.24390243902437], [82.0, 101.23076923076924], [83.0, 101.14583333333333], [84.0, 101.3953488372093], [85.0, 101.00000000000003], [86.0, 101.11538461538461], [87.0, 101.20454545454547], [88.0, 101.1666666666667], [89.0, 101.08888888888887], [90.0, 101.11627906976744], [91.0, 101.29310344827584], [92.0, 101.14634146341466], [93.0, 101.10416666666669], [94.0, 101.41666666666664], [95.0, 101.46000000000001], [96.0, 101.77358490566039], [97.0, 101.65384615384615], [98.0, 101.51063829787235], [99.0, 101.69230769230771], [100.0, 101.30612244897958], [101.0, 101.38461538461539], [102.0, 101.31818181818183], [103.0, 101.45161290322578], [104.0, 107.67391304347825], [105.0, 101.08771929824563], [106.0, 102.10526315789474], [107.0, 102.67123287671232], [108.0, 101.23809523809526], [109.0, 103.43529411764703], [110.0, 101.20000000000002], [111.0, 101.91954022988506], [112.0, 100.76923076923077], [113.0, 101.09090909090905], [114.0, 100.7083333333333], [115.0, 101.20202020202014], [116.0, 101.31034482758619], [117.0, 101.42391304347822], [118.0, 101.12499999999999], [119.0, 101.38636363636367], [120.0, 101.29411764705878], [121.0, 101.30337078651682], [122.0, 100.97058823529412], [123.0, 101.18390804597698], [124.0, 101.08695652173913], [125.0, 101.45783132530121], [126.0, 100.95348837209302], [127.0, 101.54444444444444], [128.0, 101.00000000000003], [129.0, 101.37037037037037], [130.0, 101.30188679245283], [131.0, 101.1168831168831], [132.0, 100.969696969697], [133.0, 102.196261682243], [134.0, 101.17241379310344], [135.0, 104.50704225352112], [136.0, 101.66071428571429], [137.0, 101.79452054794518], [138.0, 101.64788732394368], [139.0, 101.39999999999998], [140.0, 101.83783783783782], [141.0, 100.97999999999996], [142.0, 101.30434782608697], [143.0, 101.48076923076923], [144.0, 102.70192307692308], [145.0, 101.48837209302326], [146.0, 103.35576923076928], [147.0, 101.1698113207547], [148.0, 105.42990654205603], [149.0, 101.46511627906976], [150.0, 102.92727272727272], [151.0, 100.89999999999999], [152.0, 102.66086956521741], [153.0, 101.68750000000001], [154.0, 103.0701754385965], [155.0, 103.19999999999999], [156.0, 103.41379310344828], [157.0, 115.20930232558139], [158.0, 104.78021978021977], [159.0, 106.32857142857144], [160.0, 103.29473684210525], [161.0, 105.5846153846154], [162.0, 104.06250000000004], [163.0, 103.4411764705882], [164.0, 103.87234042553186], [165.0, 104.89333333333335], [166.0, 105.81188118811878], [167.0, 105.85074626865669], [168.0, 104.66666666666669], [169.0, 106.84375], [170.0, 104.08474576271189], [171.0, 104.9037037037037], [172.0, 106.88524590163935], [173.0, 105.91089108910896], [174.0, 105.0], [175.0, 104.65384615384617], [176.0, 105.15217391304343], [177.0, 104.54117647058824], [178.0, 103.11999999999999], [179.0, 104.31460674157304], [180.0, 104.69662921348316], [181.0, 107.02777777777779], [182.0, 111.04166666666666], [183.0, 104.59649122807018], [184.0, 108.34108527131784], [185.0, 102.85999999999997], [186.0, 109.94666666666669], [187.0, 103.73333333333333], [188.0, 116.34615384615384], [189.0, 146.97674418604652], [190.0, 155.03906249999991], [191.0, 124.3064516129032], [192.0, 105.94957983193281], [193.0, 105.07575757575756], [194.0, 104.268115942029], [195.0, 104.13432835820893], [196.0, 104.06201550387595], [197.0, 103.49999999999999], [198.0, 103.6455696202532], [199.0, 103.36842105263158], [200.0, 101.93275768913256], [1.0, 101.0]], "isOverall": false, "label": "pinning-lock", "isController": false}, {"data": [[193.77157529493516, 102.14249363867764]], "isOverall": false, "label": "pinning-lock-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 200.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 65163.8, "minX": 1.79275284E12, "maxY": 438674.38333333336, "series": [{"data": [[1.7927529E12, 438674.38333333336], [1.79275284E12, 149900.3]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7927529E12, 190613.7], [1.79275284E12, 65163.8]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7927529E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 101.82001713413094, "minX": 1.79275284E12, "maxY": 103.08578484782434, "series": [{"data": [[1.7927529E12, 101.82001713413094], [1.79275284E12, 103.08578484782434]], "isOverall": false, "label": "pinning-lock", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7927529E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 101.81601917036033, "minX": 1.79275284E12, "maxY": 103.0751434589964, "series": [{"data": [[1.7927529E12, 101.81601917036033], [1.79275284E12, 103.0751434589964]], "isOverall": false, "label": "pinning-lock", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7927529E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.79275284E12, "maxY": 0.01714244207162057, "series": [{"data": [[1.7927529E12, 0.0], [1.79275284E12, 0.01714244207162057]], "isOverall": false, "label": "pinning-lock", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7927529E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 100.0, "minX": 1.79275284E12, "maxY": 233.0, "series": [{"data": [[1.7927529E12, 129.0], [1.79275284E12, 233.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.7927529E12, 100.0], [1.79275284E12, 100.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.7927529E12, 103.0], [1.79275284E12, 106.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.7927529E12, 111.0], [1.79275284E12, 133.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.7927529E12, 101.0], [1.79275284E12, 101.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.7927529E12, 105.0], [1.79275284E12, 111.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7927529E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 101.0, "minX": 136.0, "maxY": 105.0, "series": [{"data": [[533.0, 101.0], [729.0, 101.0], [940.0, 101.0], [1133.0, 101.0], [1289.0, 101.0], [1486.0, 103.0], [1615.0, 105.0], [1782.0, 104.0], [1840.0, 105.0], [1911.0, 102.0], [1902.0, 103.0], [1918.0, 102.0], [1917.0, 101.0], [1973.0, 101.0], [1955.0, 101.0], [1965.0, 101.0], [1967.0, 101.0], [1971.0, 101.0], [1942.0, 101.0], [1940.0, 101.0], [1947.0, 101.0], [1946.0, 101.0], [1948.0, 101.0], [1929.0, 103.0], [1920.0, 102.0], [1921.0, 101.0], [1945.0, 101.0], [1961.0, 101.0], [1935.0, 102.0], [1963.0, 101.0], [1976.0, 101.0], [1975.0, 101.0], [1974.0, 101.0], [1979.0, 101.0], [1982.0, 102.0], [1952.0, 101.0], [1954.0, 101.0], [1990.0, 102.0], [1997.0, 101.0], [1988.0, 102.0], [1985.0, 101.0], [1992.0, 101.0], [1986.0, 101.0], [2000.0, 101.0], [1993.0, 102.0], [1999.0, 102.0], [136.0, 103.0], [151.0, 101.0], [332.0, 102.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2000.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 101.0, "minX": 136.0, "maxY": 105.0, "series": [{"data": [[533.0, 101.0], [729.0, 101.0], [940.0, 101.0], [1133.0, 101.0], [1289.0, 101.0], [1486.0, 103.0], [1615.0, 105.0], [1782.0, 104.0], [1840.0, 105.0], [1911.0, 102.0], [1902.0, 103.0], [1918.0, 102.0], [1917.0, 101.0], [1973.0, 101.0], [1955.0, 101.0], [1965.0, 101.0], [1967.0, 101.0], [1971.0, 101.0], [1942.0, 101.0], [1940.0, 101.0], [1947.0, 101.0], [1946.0, 101.0], [1948.0, 101.0], [1929.0, 103.0], [1920.0, 102.0], [1921.0, 101.0], [1945.0, 101.0], [1961.0, 101.0], [1935.0, 102.0], [1963.0, 101.0], [1976.0, 101.0], [1975.0, 101.0], [1974.0, 101.0], [1979.0, 101.0], [1982.0, 102.0], [1952.0, 101.0], [1954.0, 101.0], [1990.0, 102.0], [1997.0, 101.0], [1988.0, 102.0], [1985.0, 101.0], [1992.0, 101.0], [1986.0, 101.0], [2000.0, 101.0], [1993.0, 102.0], [1999.0, 102.0], [136.0, 103.0], [151.0, 101.0], [332.0, 102.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2000.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 462.21666666666664, "minX": 1.79275284E12, "maxY": 1339.0333333333333, "series": [{"data": [[1.7927529E12, 1339.0333333333333], [1.79275284E12, 462.21666666666664]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7927529E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 458.9, "minX": 1.79275284E12, "maxY": 1342.35, "series": [{"data": [[1.7927529E12, 1342.35], [1.79275284E12, 458.9]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7927529E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 458.9, "minX": 1.79275284E12, "maxY": 1342.35, "series": [{"data": [[1.7927529E12, 1342.35], [1.79275284E12, 458.9]], "isOverall": false, "label": "pinning-lock-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7927529E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 458.9, "minX": 1.79275284E12, "maxY": 1342.35, "series": [{"data": [[1.7927529E12, 1342.35], [1.79275284E12, 458.9]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7927529E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

