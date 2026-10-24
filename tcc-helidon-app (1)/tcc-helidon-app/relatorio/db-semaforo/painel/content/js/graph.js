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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 2440.0, "series": [{"data": [[0.0, 1.0], [0.1, 1.0], [0.2, 1.0], [0.3, 1.0], [0.4, 1.0], [0.5, 1.0], [0.6, 1.0], [0.7, 1.0], [0.8, 1.0], [0.9, 1.0], [1.0, 2.0], [1.1, 2.0], [1.2, 2.0], [1.3, 2.0], [1.4, 2.0], [1.5, 2.0], [1.6, 2.0], [1.7, 2.0], [1.8, 2.0], [1.9, 2.0], [2.0, 2.0], [2.1, 2.0], [2.2, 2.0], [2.3, 2.0], [2.4, 2.0], [2.5, 2.0], [2.6, 2.0], [2.7, 2.0], [2.8, 2.0], [2.9, 2.0], [3.0, 2.0], [3.1, 2.0], [3.2, 2.0], [3.3, 2.0], [3.4, 2.0], [3.5, 2.0], [3.6, 2.0], [3.7, 2.0], [3.8, 2.0], [3.9, 2.0], [4.0, 2.0], [4.1, 2.0], [4.2, 2.0], [4.3, 2.0], [4.4, 2.0], [4.5, 2.0], [4.6, 2.0], [4.7, 2.0], [4.8, 2.0], [4.9, 2.0], [5.0, 2.0], [5.1, 2.0], [5.2, 2.0], [5.3, 2.0], [5.4, 2.0], [5.5, 2.0], [5.6, 2.0], [5.7, 2.0], [5.8, 2.0], [5.9, 2.0], [6.0, 2.0], [6.1, 2.0], [6.2, 2.0], [6.3, 2.0], [6.4, 2.0], [6.5, 2.0], [6.6, 2.0], [6.7, 2.0], [6.8, 2.0], [6.9, 2.0], [7.0, 2.0], [7.1, 2.0], [7.2, 2.0], [7.3, 2.0], [7.4, 2.0], [7.5, 2.0], [7.6, 2.0], [7.7, 2.0], [7.8, 2.0], [7.9, 2.0], [8.0, 2.0], [8.1, 2.0], [8.2, 2.0], [8.3, 2.0], [8.4, 2.0], [8.5, 2.0], [8.6, 2.0], [8.7, 2.0], [8.8, 2.0], [8.9, 2.0], [9.0, 2.0], [9.1, 3.0], [9.2, 3.0], [9.3, 3.0], [9.4, 3.0], [9.5, 3.0], [9.6, 3.0], [9.7, 3.0], [9.8, 3.0], [9.9, 3.0], [10.0, 3.0], [10.1, 3.0], [10.2, 3.0], [10.3, 3.0], [10.4, 3.0], [10.5, 3.0], [10.6, 3.0], [10.7, 3.0], [10.8, 3.0], [10.9, 3.0], [11.0, 3.0], [11.1, 3.0], [11.2, 3.0], [11.3, 3.0], [11.4, 3.0], [11.5, 3.0], [11.6, 3.0], [11.7, 3.0], [11.8, 3.0], [11.9, 3.0], [12.0, 3.0], [12.1, 3.0], [12.2, 3.0], [12.3, 3.0], [12.4, 3.0], [12.5, 3.0], [12.6, 3.0], [12.7, 3.0], [12.8, 3.0], [12.9, 3.0], [13.0, 3.0], [13.1, 3.0], [13.2, 3.0], [13.3, 3.0], [13.4, 4.0], [13.5, 4.0], [13.6, 4.0], [13.7, 4.0], [13.8, 4.0], [13.9, 4.0], [14.0, 4.0], [14.1, 4.0], [14.2, 4.0], [14.3, 4.0], [14.4, 4.0], [14.5, 5.0], [14.6, 5.0], [14.7, 5.0], [14.8, 5.0], [14.9, 6.0], [15.0, 6.0], [15.1, 6.0], [15.2, 7.0], [15.3, 8.0], [15.4, 9.0], [15.5, 11.0], [15.6, 14.0], [15.7, 17.0], [15.8, 19.0], [15.9, 22.0], [16.0, 24.0], [16.1, 27.0], [16.2, 33.0], [16.3, 38.0], [16.4, 41.0], [16.5, 43.0], [16.6, 46.0], [16.7, 49.0], [16.8, 53.0], [16.9, 55.0], [17.0, 57.0], [17.1, 58.0], [17.2, 60.0], [17.3, 62.0], [17.4, 67.0], [17.5, 71.0], [17.6, 75.0], [17.7, 78.0], [17.8, 81.0], [17.9, 83.0], [18.0, 85.0], [18.1, 86.0], [18.2, 88.0], [18.3, 90.0], [18.4, 92.0], [18.5, 94.0], [18.6, 96.0], [18.7, 98.0], [18.8, 100.0], [18.9, 102.0], [19.0, 104.0], [19.1, 105.0], [19.2, 107.0], [19.3, 108.0], [19.4, 110.0], [19.5, 111.0], [19.6, 112.0], [19.7, 113.0], [19.8, 114.0], [19.9, 114.0], [20.0, 115.0], [20.1, 115.0], [20.2, 116.0], [20.3, 116.0], [20.4, 116.0], [20.5, 116.0], [20.6, 116.0], [20.7, 116.0], [20.8, 117.0], [20.9, 117.0], [21.0, 117.0], [21.1, 117.0], [21.2, 117.0], [21.3, 117.0], [21.4, 117.0], [21.5, 117.0], [21.6, 117.0], [21.7, 118.0], [21.8, 118.0], [21.9, 118.0], [22.0, 118.0], [22.1, 118.0], [22.2, 118.0], [22.3, 118.0], [22.4, 118.0], [22.5, 118.0], [22.6, 118.0], [22.7, 118.0], [22.8, 118.0], [22.9, 118.0], [23.0, 119.0], [23.1, 119.0], [23.2, 119.0], [23.3, 119.0], [23.4, 119.0], [23.5, 119.0], [23.6, 119.0], [23.7, 119.0], [23.8, 119.0], [23.9, 119.0], [24.0, 119.0], [24.1, 119.0], [24.2, 119.0], [24.3, 119.0], [24.4, 120.0], [24.5, 120.0], [24.6, 120.0], [24.7, 120.0], [24.8, 120.0], [24.9, 120.0], [25.0, 120.0], [25.1, 120.0], [25.2, 120.0], [25.3, 120.0], [25.4, 120.0], [25.5, 120.0], [25.6, 120.0], [25.7, 120.0], [25.8, 120.0], [25.9, 120.0], [26.0, 120.0], [26.1, 120.0], [26.2, 120.0], [26.3, 121.0], [26.4, 121.0], [26.5, 121.0], [26.6, 121.0], [26.7, 121.0], [26.8, 121.0], [26.9, 121.0], [27.0, 121.0], [27.1, 121.0], [27.2, 121.0], [27.3, 121.0], [27.4, 121.0], [27.5, 121.0], [27.6, 121.0], [27.7, 121.0], [27.8, 121.0], [27.9, 121.0], [28.0, 121.0], [28.1, 121.0], [28.2, 121.0], [28.3, 121.0], [28.4, 121.0], [28.5, 121.0], [28.6, 121.0], [28.7, 121.0], [28.8, 122.0], [28.9, 122.0], [29.0, 122.0], [29.1, 122.0], [29.2, 122.0], [29.3, 122.0], [29.4, 122.0], [29.5, 122.0], [29.6, 122.0], [29.7, 122.0], [29.8, 122.0], [29.9, 122.0], [30.0, 122.0], [30.1, 122.0], [30.2, 122.0], [30.3, 122.0], [30.4, 122.0], [30.5, 122.0], [30.6, 122.0], [30.7, 122.0], [30.8, 122.0], [30.9, 122.0], [31.0, 122.0], [31.1, 122.0], [31.2, 122.0], [31.3, 122.0], [31.4, 122.0], [31.5, 122.0], [31.6, 122.0], [31.7, 122.0], [31.8, 123.0], [31.9, 123.0], [32.0, 123.0], [32.1, 123.0], [32.2, 123.0], [32.3, 123.0], [32.4, 123.0], [32.5, 123.0], [32.6, 123.0], [32.7, 123.0], [32.8, 123.0], [32.9, 123.0], [33.0, 123.0], [33.1, 123.0], [33.2, 123.0], [33.3, 123.0], [33.4, 123.0], [33.5, 123.0], [33.6, 123.0], [33.7, 123.0], [33.8, 123.0], [33.9, 123.0], [34.0, 123.0], [34.1, 123.0], [34.2, 123.0], [34.3, 123.0], [34.4, 123.0], [34.5, 123.0], [34.6, 123.0], [34.7, 123.0], [34.8, 123.0], [34.9, 123.0], [35.0, 123.0], [35.1, 123.0], [35.2, 123.0], [35.3, 123.0], [35.4, 123.0], [35.5, 123.0], [35.6, 123.0], [35.7, 123.0], [35.8, 124.0], [35.9, 124.0], [36.0, 124.0], [36.1, 124.0], [36.2, 124.0], [36.3, 124.0], [36.4, 124.0], [36.5, 124.0], [36.6, 124.0], [36.7, 124.0], [36.8, 124.0], [36.9, 124.0], [37.0, 124.0], [37.1, 124.0], [37.2, 124.0], [37.3, 124.0], [37.4, 124.0], [37.5, 124.0], [37.6, 124.0], [37.7, 124.0], [37.8, 124.0], [37.9, 124.0], [38.0, 124.0], [38.1, 124.0], [38.2, 124.0], [38.3, 124.0], [38.4, 124.0], [38.5, 124.0], [38.6, 124.0], [38.7, 124.0], [38.8, 124.0], [38.9, 124.0], [39.0, 124.0], [39.1, 124.0], [39.2, 124.0], [39.3, 124.0], [39.4, 124.0], [39.5, 124.0], [39.6, 124.0], [39.7, 124.0], [39.8, 124.0], [39.9, 124.0], [40.0, 124.0], [40.1, 124.0], [40.2, 124.0], [40.3, 124.0], [40.4, 125.0], [40.5, 125.0], [40.6, 125.0], [40.7, 125.0], [40.8, 125.0], [40.9, 125.0], [41.0, 125.0], [41.1, 125.0], [41.2, 125.0], [41.3, 125.0], [41.4, 125.0], [41.5, 125.0], [41.6, 125.0], [41.7, 125.0], [41.8, 125.0], [41.9, 125.0], [42.0, 125.0], [42.1, 125.0], [42.2, 125.0], [42.3, 125.0], [42.4, 125.0], [42.5, 125.0], [42.6, 125.0], [42.7, 125.0], [42.8, 125.0], [42.9, 125.0], [43.0, 125.0], [43.1, 125.0], [43.2, 125.0], [43.3, 125.0], [43.4, 125.0], [43.5, 125.0], [43.6, 125.0], [43.7, 125.0], [43.8, 125.0], [43.9, 125.0], [44.0, 125.0], [44.1, 125.0], [44.2, 125.0], [44.3, 125.0], [44.4, 125.0], [44.5, 125.0], [44.6, 125.0], [44.7, 125.0], [44.8, 125.0], [44.9, 125.0], [45.0, 126.0], [45.1, 126.0], [45.2, 126.0], [45.3, 126.0], [45.4, 126.0], [45.5, 126.0], [45.6, 126.0], [45.7, 126.0], [45.8, 126.0], [45.9, 126.0], [46.0, 126.0], [46.1, 126.0], [46.2, 126.0], [46.3, 126.0], [46.4, 126.0], [46.5, 126.0], [46.6, 126.0], [46.7, 126.0], [46.8, 126.0], [46.9, 126.0], [47.0, 126.0], [47.1, 126.0], [47.2, 126.0], [47.3, 126.0], [47.4, 126.0], [47.5, 126.0], [47.6, 126.0], [47.7, 126.0], [47.8, 126.0], [47.9, 126.0], [48.0, 126.0], [48.1, 126.0], [48.2, 126.0], [48.3, 126.0], [48.4, 126.0], [48.5, 126.0], [48.6, 126.0], [48.7, 126.0], [48.8, 126.0], [48.9, 126.0], [49.0, 126.0], [49.1, 126.0], [49.2, 126.0], [49.3, 126.0], [49.4, 127.0], [49.5, 127.0], [49.6, 127.0], [49.7, 127.0], [49.8, 127.0], [49.9, 127.0], [50.0, 127.0], [50.1, 127.0], [50.2, 127.0], [50.3, 127.0], [50.4, 127.0], [50.5, 127.0], [50.6, 127.0], [50.7, 127.0], [50.8, 127.0], [50.9, 127.0], [51.0, 127.0], [51.1, 127.0], [51.2, 127.0], [51.3, 127.0], [51.4, 127.0], [51.5, 127.0], [51.6, 127.0], [51.7, 127.0], [51.8, 127.0], [51.9, 127.0], [52.0, 127.0], [52.1, 127.0], [52.2, 127.0], [52.3, 127.0], [52.4, 127.0], [52.5, 127.0], [52.6, 127.0], [52.7, 127.0], [52.8, 127.0], [52.9, 127.0], [53.0, 127.0], [53.1, 128.0], [53.2, 128.0], [53.3, 128.0], [53.4, 128.0], [53.5, 128.0], [53.6, 128.0], [53.7, 128.0], [53.8, 128.0], [53.9, 128.0], [54.0, 128.0], [54.1, 128.0], [54.2, 128.0], [54.3, 128.0], [54.4, 128.0], [54.5, 128.0], [54.6, 128.0], [54.7, 128.0], [54.8, 128.0], [54.9, 128.0], [55.0, 128.0], [55.1, 128.0], [55.2, 128.0], [55.3, 128.0], [55.4, 128.0], [55.5, 128.0], [55.6, 128.0], [55.7, 128.0], [55.8, 128.0], [55.9, 128.0], [56.0, 128.0], [56.1, 128.0], [56.2, 129.0], [56.3, 129.0], [56.4, 129.0], [56.5, 129.0], [56.6, 129.0], [56.7, 129.0], [56.8, 129.0], [56.9, 129.0], [57.0, 129.0], [57.1, 129.0], [57.2, 129.0], [57.3, 129.0], [57.4, 129.0], [57.5, 129.0], [57.6, 129.0], [57.7, 129.0], [57.8, 129.0], [57.9, 129.0], [58.0, 129.0], [58.1, 129.0], [58.2, 129.0], [58.3, 129.0], [58.4, 129.0], [58.5, 129.0], [58.6, 129.0], [58.7, 129.0], [58.8, 130.0], [58.9, 130.0], [59.0, 130.0], [59.1, 130.0], [59.2, 130.0], [59.3, 130.0], [59.4, 130.0], [59.5, 130.0], [59.6, 130.0], [59.7, 130.0], [59.8, 130.0], [59.9, 130.0], [60.0, 130.0], [60.1, 130.0], [60.2, 130.0], [60.3, 130.0], [60.4, 130.0], [60.5, 130.0], [60.6, 130.0], [60.7, 130.0], [60.8, 130.0], [60.9, 131.0], [61.0, 131.0], [61.1, 131.0], [61.2, 131.0], [61.3, 131.0], [61.4, 131.0], [61.5, 131.0], [61.6, 131.0], [61.7, 131.0], [61.8, 131.0], [61.9, 131.0], [62.0, 131.0], [62.1, 131.0], [62.2, 131.0], [62.3, 131.0], [62.4, 131.0], [62.5, 131.0], [62.6, 131.0], [62.7, 131.0], [62.8, 132.0], [62.9, 132.0], [63.0, 132.0], [63.1, 132.0], [63.2, 132.0], [63.3, 132.0], [63.4, 132.0], [63.5, 132.0], [63.6, 132.0], [63.7, 132.0], [63.8, 132.0], [63.9, 132.0], [64.0, 132.0], [64.1, 132.0], [64.2, 132.0], [64.3, 133.0], [64.4, 133.0], [64.5, 133.0], [64.6, 133.0], [64.7, 133.0], [64.8, 133.0], [64.9, 133.0], [65.0, 133.0], [65.1, 133.0], [65.2, 133.0], [65.3, 133.0], [65.4, 133.0], [65.5, 133.0], [65.6, 134.0], [65.7, 134.0], [65.8, 134.0], [65.9, 134.0], [66.0, 134.0], [66.1, 134.0], [66.2, 134.0], [66.3, 134.0], [66.4, 134.0], [66.5, 134.0], [66.6, 134.0], [66.7, 134.0], [66.8, 135.0], [66.9, 135.0], [67.0, 135.0], [67.1, 135.0], [67.2, 135.0], [67.3, 135.0], [67.4, 135.0], [67.5, 135.0], [67.6, 135.0], [67.7, 135.0], [67.8, 136.0], [67.9, 136.0], [68.0, 136.0], [68.1, 136.0], [68.2, 136.0], [68.3, 136.0], [68.4, 136.0], [68.5, 136.0], [68.6, 136.0], [68.7, 136.0], [68.8, 136.0], [68.9, 137.0], [69.0, 137.0], [69.1, 137.0], [69.2, 137.0], [69.3, 137.0], [69.4, 137.0], [69.5, 137.0], [69.6, 137.0], [69.7, 138.0], [69.8, 138.0], [69.9, 138.0], [70.0, 138.0], [70.1, 138.0], [70.2, 138.0], [70.3, 138.0], [70.4, 138.0], [70.5, 139.0], [70.6, 139.0], [70.7, 139.0], [70.8, 139.0], [70.9, 139.0], [71.0, 139.0], [71.1, 139.0], [71.2, 140.0], [71.3, 140.0], [71.4, 140.0], [71.5, 140.0], [71.6, 140.0], [71.7, 140.0], [71.8, 140.0], [71.9, 140.0], [72.0, 141.0], [72.1, 141.0], [72.2, 141.0], [72.3, 141.0], [72.4, 141.0], [72.5, 141.0], [72.6, 141.0], [72.7, 142.0], [72.8, 142.0], [72.9, 142.0], [73.0, 142.0], [73.1, 142.0], [73.2, 143.0], [73.3, 143.0], [73.4, 143.0], [73.5, 143.0], [73.6, 143.0], [73.7, 143.0], [73.8, 144.0], [73.9, 144.0], [74.0, 144.0], [74.1, 144.0], [74.2, 144.0], [74.3, 144.0], [74.4, 144.0], [74.5, 145.0], [74.6, 145.0], [74.7, 145.0], [74.8, 145.0], [74.9, 145.0], [75.0, 145.0], [75.1, 146.0], [75.2, 146.0], [75.3, 146.0], [75.4, 146.0], [75.5, 146.0], [75.6, 146.0], [75.7, 147.0], [75.8, 147.0], [75.9, 147.0], [76.0, 147.0], [76.1, 147.0], [76.2, 148.0], [76.3, 148.0], [76.4, 148.0], [76.5, 148.0], [76.6, 149.0], [76.7, 149.0], [76.8, 149.0], [76.9, 149.0], [77.0, 150.0], [77.1, 150.0], [77.2, 150.0], [77.3, 150.0], [77.4, 150.0], [77.5, 151.0], [77.6, 151.0], [77.7, 151.0], [77.8, 151.0], [77.9, 152.0], [78.0, 152.0], [78.1, 152.0], [78.2, 152.0], [78.3, 152.0], [78.4, 153.0], [78.5, 153.0], [78.6, 153.0], [78.7, 153.0], [78.8, 154.0], [78.9, 154.0], [79.0, 154.0], [79.1, 154.0], [79.2, 155.0], [79.3, 155.0], [79.4, 155.0], [79.5, 155.0], [79.6, 156.0], [79.7, 156.0], [79.8, 156.0], [79.9, 157.0], [80.0, 157.0], [80.1, 157.0], [80.2, 158.0], [80.3, 158.0], [80.4, 159.0], [80.5, 159.0], [80.6, 159.0], [80.7, 160.0], [80.8, 160.0], [80.9, 160.0], [81.0, 161.0], [81.1, 161.0], [81.2, 162.0], [81.3, 162.0], [81.4, 162.0], [81.5, 163.0], [81.6, 163.0], [81.7, 163.0], [81.8, 164.0], [81.9, 164.0], [82.0, 164.0], [82.1, 165.0], [82.2, 165.0], [82.3, 165.0], [82.4, 165.0], [82.5, 166.0], [82.6, 166.0], [82.7, 166.0], [82.8, 167.0], [82.9, 167.0], [83.0, 167.0], [83.1, 167.0], [83.2, 168.0], [83.3, 168.0], [83.4, 168.0], [83.5, 169.0], [83.6, 169.0], [83.7, 169.0], [83.8, 170.0], [83.9, 170.0], [84.0, 170.0], [84.1, 171.0], [84.2, 171.0], [84.3, 171.0], [84.4, 172.0], [84.5, 172.0], [84.6, 172.0], [84.7, 173.0], [84.8, 173.0], [84.9, 173.0], [85.0, 174.0], [85.1, 174.0], [85.2, 175.0], [85.3, 175.0], [85.4, 175.0], [85.5, 175.0], [85.6, 176.0], [85.7, 176.0], [85.8, 177.0], [85.9, 177.0], [86.0, 177.0], [86.1, 177.0], [86.2, 178.0], [86.3, 178.0], [86.4, 178.0], [86.5, 179.0], [86.6, 179.0], [86.7, 179.0], [86.8, 179.0], [86.9, 180.0], [87.0, 180.0], [87.1, 180.0], [87.2, 181.0], [87.3, 181.0], [87.4, 181.0], [87.5, 182.0], [87.6, 182.0], [87.7, 182.0], [87.8, 183.0], [87.9, 183.0], [88.0, 183.0], [88.1, 184.0], [88.2, 184.0], [88.3, 185.0], [88.4, 185.0], [88.5, 185.0], [88.6, 186.0], [88.7, 186.0], [88.8, 187.0], [88.9, 187.0], [89.0, 188.0], [89.1, 188.0], [89.2, 189.0], [89.3, 189.0], [89.4, 190.0], [89.5, 190.0], [89.6, 191.0], [89.7, 191.0], [89.8, 192.0], [89.9, 192.0], [90.0, 193.0], [90.1, 193.0], [90.2, 194.0], [90.3, 195.0], [90.4, 195.0], [90.5, 196.0], [90.6, 196.0], [90.7, 197.0], [90.8, 198.0], [90.9, 198.0], [91.0, 199.0], [91.1, 200.0], [91.2, 201.0], [91.3, 201.0], [91.4, 202.0], [91.5, 202.0], [91.6, 203.0], [91.7, 204.0], [91.8, 204.0], [91.9, 205.0], [92.0, 205.0], [92.1, 206.0], [92.2, 206.0], [92.3, 207.0], [92.4, 208.0], [92.5, 208.0], [92.6, 209.0], [92.7, 210.0], [92.8, 211.0], [92.9, 212.0], [93.0, 213.0], [93.1, 214.0], [93.2, 214.0], [93.3, 215.0], [93.4, 216.0], [93.5, 217.0], [93.6, 217.0], [93.7, 218.0], [93.8, 219.0], [93.9, 220.0], [94.0, 221.0], [94.1, 222.0], [94.2, 222.0], [94.3, 223.0], [94.4, 224.0], [94.5, 225.0], [94.6, 226.0], [94.7, 226.0], [94.8, 227.0], [94.9, 228.0], [95.0, 229.0], [95.1, 230.0], [95.2, 231.0], [95.3, 232.0], [95.4, 232.0], [95.5, 233.0], [95.6, 234.0], [95.7, 235.0], [95.8, 236.0], [95.9, 237.0], [96.0, 238.0], [96.1, 239.0], [96.2, 240.0], [96.3, 241.0], [96.4, 242.0], [96.5, 243.0], [96.6, 244.0], [96.7, 246.0], [96.8, 248.0], [96.9, 250.0], [97.0, 252.0], [97.1, 254.0], [97.2, 257.0], [97.3, 260.0], [97.4, 262.0], [97.5, 264.0], [97.6, 266.0], [97.7, 268.0], [97.8, 271.0], [97.9, 274.0], [98.0, 278.0], [98.1, 285.0], [98.2, 292.0], [98.3, 298.0], [98.4, 305.0], [98.5, 310.0], [98.6, 316.0], [98.7, 323.0], [98.8, 331.0], [98.9, 337.0], [99.0, 341.0], [99.1, 344.0], [99.2, 347.0], [99.3, 351.0], [99.4, 355.0], [99.5, 360.0], [99.6, 367.0], [99.7, 378.0], [99.8, 388.0], [99.9, 676.0], [100.0, 2440.0]], "isOverall": false, "label": "db-semaforo", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 2.0, "minX": 0.0, "maxY": 64250.0, "series": [{"data": [[0.0, 16702.0], [600.0, 15.0], [700.0, 13.0], [800.0, 12.0], [900.0, 10.0], [1000.0, 5.0], [1100.0, 5.0], [1200.0, 4.0], [1300.0, 4.0], [1400.0, 4.0], [1500.0, 4.0], [100.0, 64250.0], [1600.0, 4.0], [1700.0, 5.0], [1800.0, 2.0], [1900.0, 2.0], [2000.0, 2.0], [2100.0, 3.0], [2300.0, 2.0], [2200.0, 2.0], [2400.0, 2.0], [200.0, 6479.0], [300.0, 1347.0], [400.0, 24.0], [500.0, 14.0]], "isOverall": false, "label": "db-semaforo", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2400.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 28.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 88802.0, "series": [{"data": [[0.0, 88802.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 86.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 28.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 190.9732545396537, "minX": 1.79275302E12, "maxY": 197.9226929704677, "series": [{"data": [[1.79275308E12, 197.9226929704677], [1.79275302E12, 190.9732545396537]], "isOverall": false, "label": "Usuarios (200)", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275308E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 3.0, "minX": 1.0, "maxY": 952.3157894736842, "series": [{"data": [[3.0, 3.0], [4.0, 13.666666666666666], [5.0, 9.0], [6.0, 26.0], [8.0, 92.10000000000001], [9.0, 22.857142857142858], [10.0, 19.857142857142858], [11.0, 21.48], [12.0, 25.517241379310345], [13.0, 22.352941176470587], [14.0, 22.241379310344826], [15.0, 22.90909090909091], [16.0, 22.068965517241384], [17.0, 31.571428571428577], [18.0, 24.192307692307697], [19.0, 30.105263157894733], [20.0, 23.194444444444443], [21.0, 19.468750000000004], [22.0, 25.315789473684212], [23.0, 20.372093023255818], [24.0, 17.871794871794876], [25.0, 21.2258064516129], [26.0, 24.83333333333333], [27.0, 25.461538461538463], [28.0, 20.45], [29.0, 87.6923076923077], [30.0, 114.00000000000001], [31.0, 82.48275862068967], [32.0, 57.892857142857146], [33.0, 54.352941176470594], [34.0, 65.38235294117646], [35.0, 63.99999999999999], [36.0, 54.94285714285714], [37.0, 55.500000000000014], [38.0, 49.65714285714285], [39.0, 46.23809523809524], [40.0, 54.06666666666666], [41.0, 54.69696969696968], [42.0, 40.97297297297296], [43.0, 47.470588235294116], [44.0, 49.05], [45.0, 37.488372093023244], [46.0, 49.358974358974365], [47.0, 40.641025641025635], [48.0, 47.09523809523809], [49.0, 159.07142857142856], [50.0, 137.74999999999997], [51.0, 65.8235294117647], [52.0, 72.64102564102566], [53.0, 69.88235294117648], [54.0, 83.5], [55.0, 79.6764705882353], [56.0, 76.26666666666668], [57.0, 99.1470588235294], [58.0, 80.99999999999999], [59.0, 89.34375], [60.0, 74.76923076923076], [61.0, 71.68181818181817], [62.0, 69.55], [63.0, 56.67391304347825], [64.0, 62.89999999999999], [65.0, 52.67441860465116], [66.0, 55.45454545454545], [67.0, 59.0], [68.0, 57.20454545454546], [69.0, 48.254901960784316], [70.0, 93.86274509803923], [71.0, 267.4651162790697], [72.0, 91.64285714285711], [73.0, 96.48484848484847], [74.0, 108.1764705882353], [75.0, 106.15384615384613], [76.0, 88.63414634146343], [77.0, 104.79999999999998], [78.0, 98.45714285714286], [79.0, 101.52941176470588], [80.0, 130.50000000000003], [81.0, 102.13333333333333], [82.0, 103.57575757575759], [83.0, 117.72500000000002], [84.0, 117.82857142857141], [85.0, 113.5111111111111], [86.0, 102.7741935483871], [87.0, 107.26785714285714], [88.0, 105.38709677419357], [89.0, 125.22727272727273], [90.0, 115.5135135135135], [91.0, 107.02325581395348], [92.0, 96.24137931034481], [93.0, 87.3111111111111], [94.0, 100.91666666666666], [95.0, 99.1842105263158], [96.0, 106.56818181818181], [97.0, 106.92499999999998], [98.0, 115.0526315789474], [99.0, 107.21052631578947], [100.0, 122.14285714285714], [101.0, 114.37500000000001], [102.0, 116.26190476190474], [103.0, 119.07692307692307], [104.0, 122.92857142857143], [105.0, 111.22222222222223], [106.0, 115.4], [107.0, 107.74074074074073], [108.0, 89.2], [109.0, 90.64583333333333], [110.0, 81.89090909090909], [111.0, 74.24], [112.0, 84.66666666666666], [113.0, 102.78787878787875], [114.0, 134.35897435897436], [115.0, 124.85000000000002], [116.0, 89.52830188679248], [117.0, 93.9814814814815], [118.0, 90.1875], [119.0, 102.37777777777777], [120.0, 95.11538461538458], [121.0, 84.6764705882353], [122.0, 108.44897959183675], [123.0, 89.16176470588236], [124.0, 88.65], [125.0, 100.13333333333333], [126.0, 149.96774193548384], [127.0, 144.00000000000006], [128.0, 169.2], [129.0, 157.28571428571428], [130.0, 234.92592592592595], [131.0, 952.3157894736842], [132.0, 881.6400000000001], [133.0, 762.1333333333333], [134.0, 470.72222222222234], [135.0, 430.2142857142857], [136.0, 320.1515151515152], [137.0, 315.93103448275866], [138.0, 330.72222222222223], [139.0, 303.0], [140.0, 296.84000000000003], [141.0, 241.00000000000003], [142.0, 236.4411764705882], [143.0, 250.84000000000003], [144.0, 262.5714285714285], [145.0, 259.0000000000001], [146.0, 225.61538461538458], [147.0, 243.14285714285714], [148.0, 261.99999999999994], [149.0, 217.4054054054054], [150.0, 205.80952380952382], [151.0, 173.7297297297297], [152.0, 231.00000000000003], [153.0, 194.84905660377356], [154.0, 164.73584905660377], [155.0, 149.76190476190476], [156.0, 174.92592592592595], [157.0, 173.09259259259258], [158.0, 154.13888888888889], [159.0, 122.13333333333337], [160.0, 110.84615384615385], [161.0, 132.40845070422534], [162.0, 134.72340425531914], [163.0, 147.10714285714286], [164.0, 151.5434782608696], [165.0, 158.1860465116279], [166.0, 172.00000000000003], [167.0, 185.4], [168.0, 179.57446808510636], [169.0, 164.89705882352942], [170.0, 152.26000000000008], [171.0, 168.54716981132074], [172.0, 245.52], [173.0, 189.2037037037037], [174.0, 175.78260869565224], [175.0, 193.45652173913038], [176.0, 166.48], [177.0, 195.59259259259258], [178.0, 193.44186046511626], [179.0, 224.4444444444444], [180.0, 252.5], [181.0, 226.14583333333337], [182.0, 216.91836734693877], [183.0, 218.91666666666669], [184.0, 199.41304347826087], [185.0, 212.7450980392157], [186.0, 200.3818181818182], [187.0, 198.20408163265304], [188.0, 199.91111111111115], [189.0, 186.57142857142856], [190.0, 210.95121951219514], [191.0, 175.73913043478257], [192.0, 205.7441860465116], [193.0, 226.17241379310343], [194.0, 203.25423728813558], [195.0, 191.9464285714286], [196.0, 218.37704918032787], [197.0, 205.33333333333326], [198.0, 188.1111111111111], [199.0, 173.59523809523813], [200.0, 123.18217641336194], [1.0, 3.0]], "isOverall": false, "label": "db-semaforo", "isController": false}, {"data": [[192.28856448783253, 124.26547528003934]], "isOverall": false, "label": "db-semaforo-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 200.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 40077.28333333333, "minX": 1.79275302E12, "maxY": 1576751.25, "series": [{"data": [[1.79275308E12, 368045.8], [1.79275302E12, 1576751.25]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.79275308E12, 40077.28333333333], [1.79275302E12, 171675.53333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275308E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 123.57279398504558, "minX": 1.79275302E12, "maxY": 127.23257472220548, "series": [{"data": [[1.79275308E12, 127.23257472220548], [1.79275302E12, 123.57279398504558]], "isOverall": false, "label": "db-semaforo", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275308E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 123.5638742075547, "minX": 1.79275302E12, "maxY": 127.2276427595221, "series": [{"data": [[1.79275308E12, 127.2276427595221], [1.79275302E12, 123.5638742075547]], "isOverall": false, "label": "db-semaforo", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275308E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.79275302E12, "maxY": 0.015162234522174587, "series": [{"data": [[1.79275308E12, 0.0], [1.79275302E12, 0.015162234522174587]], "isOverall": false, "label": "db-semaforo", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275308E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.79275302E12, "maxY": 2440.0, "series": [{"data": [[1.79275308E12, 393.0], [1.79275302E12, 2440.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.79275308E12, 1.0], [1.79275302E12, 1.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.79275308E12, 217.0], [1.79275302E12, 145.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.79275308E12, 355.7000000000007], [1.79275302E12, 190.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.79275308E12, 128.0], [1.79275302E12, 126.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.79275308E12, 262.5], [1.79275302E12, 161.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275308E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 21.0, "minX": 111.0, "maxY": 277.0, "series": [{"data": [[603.0, 264.0], [624.0, 22.0], [682.0, 46.0], [692.0, 107.0], [795.0, 64.0], [780.0, 108.0], [796.0, 105.5], [774.0, 225.0], [829.0, 221.0], [843.0, 277.0], [902.0, 207.0], [1011.0, 166.0], [1133.0, 181.0], [1132.0, 189.0], [1124.0, 166.5], [1212.0, 177.0], [1176.0, 202.0], [1165.0, 153.0], [1247.0, 163.0], [1246.0, 181.0], [1282.0, 171.0], [1343.0, 137.0], [1443.0, 176.0], [1518.0, 134.0], [1566.0, 142.0], [1598.0, 135.0], [1649.0, 124.0], [1626.0, 144.0], [1646.0, 126.0], [1623.0, 131.0], [1608.0, 124.0], [1697.0, 132.0], [1700.0, 137.0], [1678.0, 132.0], [1777.0, 126.0], [1775.0, 125.0], [1788.0, 127.0], [1750.0, 128.0], [1781.0, 129.0], [1786.0, 128.0], [1764.0, 127.0], [1849.0, 124.0], [1850.0, 122.0], [1908.0, 125.0], [1857.0, 124.0], [1862.0, 120.0], [1856.0, 122.0], [1877.0, 124.0], [1899.0, 124.0], [1893.0, 128.0], [1898.0, 125.0], [1918.0, 124.0], [1907.0, 124.0], [1905.0, 125.0], [1892.0, 124.0], [1923.0, 126.0], [1932.0, 125.0], [1935.0, 123.0], [111.0, 21.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1935.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 21.0, "minX": 111.0, "maxY": 277.0, "series": [{"data": [[603.0, 263.0], [624.0, 22.0], [682.0, 46.0], [692.0, 107.0], [795.0, 64.0], [780.0, 108.0], [796.0, 105.5], [774.0, 225.0], [829.0, 221.0], [843.0, 277.0], [902.0, 207.0], [1011.0, 166.0], [1133.0, 181.0], [1132.0, 189.0], [1124.0, 166.5], [1212.0, 177.0], [1176.0, 202.0], [1165.0, 153.0], [1247.0, 163.0], [1246.0, 180.5], [1282.0, 171.0], [1343.0, 137.0], [1443.0, 176.0], [1518.0, 134.0], [1566.0, 142.0], [1598.0, 135.0], [1649.0, 124.0], [1626.0, 144.0], [1646.0, 126.0], [1623.0, 131.0], [1608.0, 124.0], [1697.0, 132.0], [1700.0, 137.0], [1678.0, 132.0], [1777.0, 126.0], [1775.0, 125.0], [1788.0, 127.0], [1750.0, 128.0], [1781.0, 129.0], [1786.0, 128.0], [1764.0, 127.0], [1849.0, 124.0], [1850.0, 122.0], [1908.0, 125.0], [1857.0, 124.0], [1862.0, 120.0], [1856.0, 122.0], [1877.0, 124.0], [1899.0, 124.0], [1893.0, 128.0], [1898.0, 125.0], [1918.0, 124.0], [1907.0, 124.0], [1905.0, 125.0], [1892.0, 124.0], [1923.0, 126.0], [1932.0, 125.0], [1935.0, 123.0], [111.0, 21.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1935.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 277.15, "minX": 1.79275302E12, "maxY": 1204.7833333333333, "series": [{"data": [[1.79275308E12, 277.15], [1.79275302E12, 1204.7833333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275308E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 280.48333333333335, "minX": 1.79275302E12, "maxY": 1201.45, "series": [{"data": [[1.79275308E12, 280.48333333333335], [1.79275302E12, 1201.45]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275308E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 280.48333333333335, "minX": 1.79275302E12, "maxY": 1201.45, "series": [{"data": [[1.79275308E12, 280.48333333333335], [1.79275302E12, 1201.45]], "isOverall": false, "label": "db-semaforo-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275308E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 280.48333333333335, "minX": 1.79275302E12, "maxY": 1201.45, "series": [{"data": [[1.79275308E12, 280.48333333333335], [1.79275302E12, 1201.45]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275308E12, "title": "Total Transactions Per Second"}},
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

