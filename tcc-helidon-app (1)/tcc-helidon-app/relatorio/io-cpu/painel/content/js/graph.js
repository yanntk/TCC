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
        data: {"result": {"minY": 101.0, "minX": 0.0, "maxY": 972.0, "series": [{"data": [[0.0, 101.0], [0.1, 101.0], [0.2, 101.0], [0.3, 101.0], [0.4, 101.0], [0.5, 101.0], [0.6, 101.0], [0.7, 101.0], [0.8, 101.0], [0.9, 101.0], [1.0, 101.0], [1.1, 101.0], [1.2, 101.0], [1.3, 101.0], [1.4, 101.0], [1.5, 101.0], [1.6, 101.0], [1.7, 101.0], [1.8, 101.0], [1.9, 101.0], [2.0, 101.0], [2.1, 101.0], [2.2, 101.0], [2.3, 101.0], [2.4, 101.0], [2.5, 101.0], [2.6, 101.0], [2.7, 101.0], [2.8, 101.0], [2.9, 101.0], [3.0, 101.0], [3.1, 101.0], [3.2, 101.0], [3.3, 101.0], [3.4, 101.0], [3.5, 101.0], [3.6, 101.0], [3.7, 101.0], [3.8, 101.0], [3.9, 101.0], [4.0, 102.0], [4.1, 102.0], [4.2, 102.0], [4.3, 102.0], [4.4, 102.0], [4.5, 102.0], [4.6, 102.0], [4.7, 102.0], [4.8, 102.0], [4.9, 102.0], [5.0, 102.0], [5.1, 102.0], [5.2, 102.0], [5.3, 102.0], [5.4, 102.0], [5.5, 102.0], [5.6, 102.0], [5.7, 102.0], [5.8, 102.0], [5.9, 102.0], [6.0, 102.0], [6.1, 102.0], [6.2, 102.0], [6.3, 102.0], [6.4, 102.0], [6.5, 102.0], [6.6, 102.0], [6.7, 102.0], [6.8, 102.0], [6.9, 102.0], [7.0, 102.0], [7.1, 102.0], [7.2, 102.0], [7.3, 102.0], [7.4, 102.0], [7.5, 102.0], [7.6, 102.0], [7.7, 102.0], [7.8, 102.0], [7.9, 102.0], [8.0, 102.0], [8.1, 102.0], [8.2, 102.0], [8.3, 102.0], [8.4, 102.0], [8.5, 102.0], [8.6, 102.0], [8.7, 102.0], [8.8, 102.0], [8.9, 102.0], [9.0, 102.0], [9.1, 102.0], [9.2, 102.0], [9.3, 102.0], [9.4, 102.0], [9.5, 102.0], [9.6, 102.0], [9.7, 102.0], [9.8, 102.0], [9.9, 102.0], [10.0, 102.0], [10.1, 102.0], [10.2, 102.0], [10.3, 102.0], [10.4, 102.0], [10.5, 102.0], [10.6, 102.0], [10.7, 102.0], [10.8, 102.0], [10.9, 102.0], [11.0, 102.0], [11.1, 102.0], [11.2, 102.0], [11.3, 102.0], [11.4, 102.0], [11.5, 102.0], [11.6, 102.0], [11.7, 102.0], [11.8, 102.0], [11.9, 102.0], [12.0, 102.0], [12.1, 102.0], [12.2, 102.0], [12.3, 102.0], [12.4, 102.0], [12.5, 102.0], [12.6, 102.0], [12.7, 102.0], [12.8, 102.0], [12.9, 102.0], [13.0, 102.0], [13.1, 102.0], [13.2, 102.0], [13.3, 102.0], [13.4, 102.0], [13.5, 102.0], [13.6, 102.0], [13.7, 102.0], [13.8, 102.0], [13.9, 102.0], [14.0, 102.0], [14.1, 102.0], [14.2, 102.0], [14.3, 102.0], [14.4, 102.0], [14.5, 102.0], [14.6, 102.0], [14.7, 102.0], [14.8, 102.0], [14.9, 102.0], [15.0, 102.0], [15.1, 102.0], [15.2, 102.0], [15.3, 102.0], [15.4, 102.0], [15.5, 102.0], [15.6, 102.0], [15.7, 102.0], [15.8, 102.0], [15.9, 102.0], [16.0, 102.0], [16.1, 102.0], [16.2, 102.0], [16.3, 102.0], [16.4, 102.0], [16.5, 102.0], [16.6, 102.0], [16.7, 102.0], [16.8, 102.0], [16.9, 102.0], [17.0, 102.0], [17.1, 102.0], [17.2, 102.0], [17.3, 102.0], [17.4, 102.0], [17.5, 102.0], [17.6, 102.0], [17.7, 102.0], [17.8, 102.0], [17.9, 102.0], [18.0, 102.0], [18.1, 102.0], [18.2, 102.0], [18.3, 102.0], [18.4, 102.0], [18.5, 102.0], [18.6, 102.0], [18.7, 102.0], [18.8, 102.0], [18.9, 102.0], [19.0, 102.0], [19.1, 102.0], [19.2, 102.0], [19.3, 102.0], [19.4, 102.0], [19.5, 102.0], [19.6, 102.0], [19.7, 102.0], [19.8, 102.0], [19.9, 102.0], [20.0, 102.0], [20.1, 102.0], [20.2, 102.0], [20.3, 102.0], [20.4, 102.0], [20.5, 102.0], [20.6, 102.0], [20.7, 102.0], [20.8, 102.0], [20.9, 102.0], [21.0, 102.0], [21.1, 102.0], [21.2, 102.0], [21.3, 102.0], [21.4, 102.0], [21.5, 102.0], [21.6, 102.0], [21.7, 102.0], [21.8, 102.0], [21.9, 102.0], [22.0, 102.0], [22.1, 102.0], [22.2, 102.0], [22.3, 102.0], [22.4, 102.0], [22.5, 102.0], [22.6, 102.0], [22.7, 102.0], [22.8, 102.0], [22.9, 102.0], [23.0, 102.0], [23.1, 102.0], [23.2, 102.0], [23.3, 102.0], [23.4, 102.0], [23.5, 102.0], [23.6, 102.0], [23.7, 102.0], [23.8, 102.0], [23.9, 102.0], [24.0, 102.0], [24.1, 102.0], [24.2, 102.0], [24.3, 102.0], [24.4, 102.0], [24.5, 102.0], [24.6, 102.0], [24.7, 102.0], [24.8, 102.0], [24.9, 102.0], [25.0, 102.0], [25.1, 102.0], [25.2, 102.0], [25.3, 102.0], [25.4, 102.0], [25.5, 103.0], [25.6, 103.0], [25.7, 103.0], [25.8, 103.0], [25.9, 103.0], [26.0, 103.0], [26.1, 103.0], [26.2, 103.0], [26.3, 103.0], [26.4, 103.0], [26.5, 103.0], [26.6, 103.0], [26.7, 103.0], [26.8, 103.0], [26.9, 103.0], [27.0, 103.0], [27.1, 103.0], [27.2, 103.0], [27.3, 103.0], [27.4, 103.0], [27.5, 103.0], [27.6, 103.0], [27.7, 103.0], [27.8, 103.0], [27.9, 103.0], [28.0, 103.0], [28.1, 103.0], [28.2, 103.0], [28.3, 103.0], [28.4, 103.0], [28.5, 103.0], [28.6, 103.0], [28.7, 103.0], [28.8, 103.0], [28.9, 103.0], [29.0, 103.0], [29.1, 103.0], [29.2, 103.0], [29.3, 103.0], [29.4, 103.0], [29.5, 103.0], [29.6, 103.0], [29.7, 103.0], [29.8, 103.0], [29.9, 103.0], [30.0, 103.0], [30.1, 103.0], [30.2, 103.0], [30.3, 103.0], [30.4, 103.0], [30.5, 103.0], [30.6, 103.0], [30.7, 103.0], [30.8, 103.0], [30.9, 103.0], [31.0, 103.0], [31.1, 104.0], [31.2, 104.0], [31.3, 104.0], [31.4, 104.0], [31.5, 104.0], [31.6, 104.0], [31.7, 104.0], [31.8, 104.0], [31.9, 104.0], [32.0, 104.0], [32.1, 104.0], [32.2, 104.0], [32.3, 104.0], [32.4, 104.0], [32.5, 104.0], [32.6, 104.0], [32.7, 104.0], [32.8, 104.0], [32.9, 104.0], [33.0, 104.0], [33.1, 104.0], [33.2, 104.0], [33.3, 104.0], [33.4, 104.0], [33.5, 104.0], [33.6, 104.0], [33.7, 104.0], [33.8, 104.0], [33.9, 104.0], [34.0, 104.0], [34.1, 104.0], [34.2, 105.0], [34.3, 105.0], [34.4, 105.0], [34.5, 105.0], [34.6, 105.0], [34.7, 105.0], [34.8, 105.0], [34.9, 105.0], [35.0, 105.0], [35.1, 105.0], [35.2, 105.0], [35.3, 105.0], [35.4, 105.0], [35.5, 105.0], [35.6, 105.0], [35.7, 105.0], [35.8, 105.0], [35.9, 105.0], [36.0, 105.0], [36.1, 105.0], [36.2, 105.0], [36.3, 105.0], [36.4, 105.0], [36.5, 106.0], [36.6, 106.0], [36.7, 106.0], [36.8, 106.0], [36.9, 106.0], [37.0, 106.0], [37.1, 106.0], [37.2, 106.0], [37.3, 106.0], [37.4, 106.0], [37.5, 106.0], [37.6, 106.0], [37.7, 106.0], [37.8, 106.0], [37.9, 106.0], [38.0, 106.0], [38.1, 106.0], [38.2, 106.0], [38.3, 106.0], [38.4, 106.0], [38.5, 106.0], [38.6, 107.0], [38.7, 107.0], [38.8, 107.0], [38.9, 107.0], [39.0, 107.0], [39.1, 107.0], [39.2, 107.0], [39.3, 107.0], [39.4, 107.0], [39.5, 107.0], [39.6, 107.0], [39.7, 107.0], [39.8, 107.0], [39.9, 107.0], [40.0, 107.0], [40.1, 107.0], [40.2, 107.0], [40.3, 107.0], [40.4, 107.0], [40.5, 108.0], [40.6, 108.0], [40.7, 108.0], [40.8, 108.0], [40.9, 108.0], [41.0, 108.0], [41.1, 108.0], [41.2, 108.0], [41.3, 108.0], [41.4, 108.0], [41.5, 108.0], [41.6, 108.0], [41.7, 108.0], [41.8, 108.0], [41.9, 108.0], [42.0, 108.0], [42.1, 108.0], [42.2, 109.0], [42.3, 109.0], [42.4, 109.0], [42.5, 109.0], [42.6, 109.0], [42.7, 109.0], [42.8, 109.0], [42.9, 109.0], [43.0, 109.0], [43.1, 109.0], [43.2, 109.0], [43.3, 109.0], [43.4, 109.0], [43.5, 109.0], [43.6, 109.0], [43.7, 109.0], [43.8, 109.0], [43.9, 109.0], [44.0, 110.0], [44.1, 110.0], [44.2, 110.0], [44.3, 110.0], [44.4, 110.0], [44.5, 110.0], [44.6, 110.0], [44.7, 110.0], [44.8, 110.0], [44.9, 110.0], [45.0, 110.0], [45.1, 110.0], [45.2, 110.0], [45.3, 110.0], [45.4, 110.0], [45.5, 110.0], [45.6, 110.0], [45.7, 111.0], [45.8, 111.0], [45.9, 111.0], [46.0, 111.0], [46.1, 111.0], [46.2, 111.0], [46.3, 111.0], [46.4, 111.0], [46.5, 111.0], [46.6, 111.0], [46.7, 111.0], [46.8, 111.0], [46.9, 111.0], [47.0, 111.0], [47.1, 111.0], [47.2, 111.0], [47.3, 112.0], [47.4, 112.0], [47.5, 112.0], [47.6, 112.0], [47.7, 112.0], [47.8, 112.0], [47.9, 112.0], [48.0, 112.0], [48.1, 112.0], [48.2, 112.0], [48.3, 112.0], [48.4, 112.0], [48.5, 112.0], [48.6, 112.0], [48.7, 112.0], [48.8, 112.0], [48.9, 113.0], [49.0, 113.0], [49.1, 113.0], [49.2, 113.0], [49.3, 113.0], [49.4, 113.0], [49.5, 113.0], [49.6, 113.0], [49.7, 113.0], [49.8, 113.0], [49.9, 113.0], [50.0, 113.0], [50.1, 113.0], [50.2, 113.0], [50.3, 114.0], [50.4, 114.0], [50.5, 114.0], [50.6, 114.0], [50.7, 114.0], [50.8, 114.0], [50.9, 114.0], [51.0, 114.0], [51.1, 114.0], [51.2, 114.0], [51.3, 114.0], [51.4, 114.0], [51.5, 114.0], [51.6, 114.0], [51.7, 114.0], [51.8, 114.0], [51.9, 115.0], [52.0, 115.0], [52.1, 115.0], [52.2, 115.0], [52.3, 115.0], [52.4, 115.0], [52.5, 115.0], [52.6, 115.0], [52.7, 115.0], [52.8, 115.0], [52.9, 115.0], [53.0, 115.0], [53.1, 115.0], [53.2, 115.0], [53.3, 116.0], [53.4, 116.0], [53.5, 116.0], [53.6, 116.0], [53.7, 116.0], [53.8, 116.0], [53.9, 116.0], [54.0, 116.0], [54.1, 116.0], [54.2, 116.0], [54.3, 116.0], [54.4, 116.0], [54.5, 116.0], [54.6, 116.0], [54.7, 117.0], [54.8, 117.0], [54.9, 117.0], [55.0, 117.0], [55.1, 117.0], [55.2, 117.0], [55.3, 117.0], [55.4, 117.0], [55.5, 117.0], [55.6, 117.0], [55.7, 117.0], [55.8, 117.0], [55.9, 117.0], [56.0, 117.0], [56.1, 118.0], [56.2, 118.0], [56.3, 118.0], [56.4, 118.0], [56.5, 118.0], [56.6, 118.0], [56.7, 118.0], [56.8, 118.0], [56.9, 118.0], [57.0, 118.0], [57.1, 118.0], [57.2, 118.0], [57.3, 118.0], [57.4, 119.0], [57.5, 119.0], [57.6, 119.0], [57.7, 119.0], [57.8, 119.0], [57.9, 119.0], [58.0, 119.0], [58.1, 119.0], [58.2, 119.0], [58.3, 119.0], [58.4, 119.0], [58.5, 119.0], [58.6, 120.0], [58.7, 120.0], [58.8, 120.0], [58.9, 120.0], [59.0, 120.0], [59.1, 120.0], [59.2, 120.0], [59.3, 120.0], [59.4, 120.0], [59.5, 120.0], [59.6, 120.0], [59.7, 120.0], [59.8, 120.0], [59.9, 121.0], [60.0, 121.0], [60.1, 121.0], [60.2, 121.0], [60.3, 121.0], [60.4, 121.0], [60.5, 121.0], [60.6, 121.0], [60.7, 121.0], [60.8, 121.0], [60.9, 121.0], [61.0, 122.0], [61.1, 122.0], [61.2, 122.0], [61.3, 122.0], [61.4, 122.0], [61.5, 122.0], [61.6, 122.0], [61.7, 122.0], [61.8, 122.0], [61.9, 122.0], [62.0, 122.0], [62.1, 123.0], [62.2, 123.0], [62.3, 123.0], [62.4, 123.0], [62.5, 123.0], [62.6, 123.0], [62.7, 123.0], [62.8, 123.0], [62.9, 123.0], [63.0, 123.0], [63.1, 124.0], [63.2, 124.0], [63.3, 124.0], [63.4, 124.0], [63.5, 124.0], [63.6, 124.0], [63.7, 124.0], [63.8, 124.0], [63.9, 124.0], [64.0, 124.0], [64.1, 125.0], [64.2, 125.0], [64.3, 125.0], [64.4, 125.0], [64.5, 125.0], [64.6, 125.0], [64.7, 125.0], [64.8, 125.0], [64.9, 125.0], [65.0, 126.0], [65.1, 126.0], [65.2, 126.0], [65.3, 126.0], [65.4, 126.0], [65.5, 126.0], [65.6, 126.0], [65.7, 126.0], [65.8, 127.0], [65.9, 127.0], [66.0, 127.0], [66.1, 127.0], [66.2, 127.0], [66.3, 127.0], [66.4, 127.0], [66.5, 127.0], [66.6, 128.0], [66.7, 128.0], [66.8, 128.0], [66.9, 128.0], [67.0, 128.0], [67.1, 128.0], [67.2, 128.0], [67.3, 129.0], [67.4, 129.0], [67.5, 129.0], [67.6, 129.0], [67.7, 129.0], [67.8, 129.0], [67.9, 129.0], [68.0, 130.0], [68.1, 130.0], [68.2, 130.0], [68.3, 130.0], [68.4, 130.0], [68.5, 130.0], [68.6, 130.0], [68.7, 131.0], [68.8, 131.0], [68.9, 131.0], [69.0, 131.0], [69.1, 131.0], [69.2, 131.0], [69.3, 131.0], [69.4, 132.0], [69.5, 132.0], [69.6, 132.0], [69.7, 132.0], [69.8, 132.0], [69.9, 132.0], [70.0, 133.0], [70.1, 133.0], [70.2, 133.0], [70.3, 133.0], [70.4, 133.0], [70.5, 133.0], [70.6, 133.0], [70.7, 134.0], [70.8, 134.0], [70.9, 134.0], [71.0, 134.0], [71.1, 134.0], [71.2, 135.0], [71.3, 135.0], [71.4, 135.0], [71.5, 135.0], [71.6, 135.0], [71.7, 136.0], [71.8, 136.0], [71.9, 136.0], [72.0, 136.0], [72.1, 136.0], [72.2, 136.0], [72.3, 137.0], [72.4, 137.0], [72.5, 137.0], [72.6, 137.0], [72.7, 137.0], [72.8, 138.0], [72.9, 138.0], [73.0, 138.0], [73.1, 138.0], [73.2, 138.0], [73.3, 139.0], [73.4, 139.0], [73.5, 139.0], [73.6, 139.0], [73.7, 139.0], [73.8, 140.0], [73.9, 140.0], [74.0, 140.0], [74.1, 140.0], [74.2, 140.0], [74.3, 141.0], [74.4, 141.0], [74.5, 141.0], [74.6, 141.0], [74.7, 142.0], [74.8, 142.0], [74.9, 142.0], [75.0, 142.0], [75.1, 143.0], [75.2, 143.0], [75.3, 143.0], [75.4, 143.0], [75.5, 144.0], [75.6, 144.0], [75.7, 144.0], [75.8, 144.0], [75.9, 145.0], [76.0, 145.0], [76.1, 145.0], [76.2, 146.0], [76.3, 146.0], [76.4, 146.0], [76.5, 146.0], [76.6, 147.0], [76.7, 147.0], [76.8, 147.0], [76.9, 147.0], [77.0, 148.0], [77.1, 148.0], [77.2, 148.0], [77.3, 149.0], [77.4, 149.0], [77.5, 149.0], [77.6, 149.0], [77.7, 150.0], [77.8, 150.0], [77.9, 150.0], [78.0, 151.0], [78.1, 151.0], [78.2, 151.0], [78.3, 152.0], [78.4, 152.0], [78.5, 152.0], [78.6, 153.0], [78.7, 153.0], [78.8, 153.0], [78.9, 153.0], [79.0, 154.0], [79.1, 154.0], [79.2, 154.0], [79.3, 155.0], [79.4, 155.0], [79.5, 155.0], [79.6, 156.0], [79.7, 156.0], [79.8, 156.0], [79.9, 157.0], [80.0, 157.0], [80.1, 157.0], [80.2, 158.0], [80.3, 158.0], [80.4, 158.0], [80.5, 159.0], [80.6, 159.0], [80.7, 159.0], [80.8, 159.0], [80.9, 160.0], [81.0, 160.0], [81.1, 160.0], [81.2, 161.0], [81.3, 161.0], [81.4, 161.0], [81.5, 162.0], [81.6, 162.0], [81.7, 162.0], [81.8, 163.0], [81.9, 163.0], [82.0, 163.0], [82.1, 164.0], [82.2, 164.0], [82.3, 165.0], [82.4, 165.0], [82.5, 165.0], [82.6, 166.0], [82.7, 166.0], [82.8, 167.0], [82.9, 167.0], [83.0, 168.0], [83.1, 168.0], [83.2, 168.0], [83.3, 169.0], [83.4, 169.0], [83.5, 170.0], [83.6, 170.0], [83.7, 171.0], [83.8, 171.0], [83.9, 172.0], [84.0, 172.0], [84.1, 173.0], [84.2, 173.0], [84.3, 174.0], [84.4, 174.0], [84.5, 174.0], [84.6, 175.0], [84.7, 175.0], [84.8, 176.0], [84.9, 176.0], [85.0, 177.0], [85.1, 177.0], [85.2, 178.0], [85.3, 178.0], [85.4, 179.0], [85.5, 179.0], [85.6, 180.0], [85.7, 180.0], [85.8, 181.0], [85.9, 181.0], [86.0, 182.0], [86.1, 182.0], [86.2, 183.0], [86.3, 183.0], [86.4, 184.0], [86.5, 184.0], [86.6, 185.0], [86.7, 185.0], [86.8, 186.0], [86.9, 186.0], [87.0, 187.0], [87.1, 187.0], [87.2, 188.0], [87.3, 188.0], [87.4, 189.0], [87.5, 190.0], [87.6, 191.0], [87.7, 191.0], [87.8, 192.0], [87.9, 193.0], [88.0, 194.0], [88.1, 194.0], [88.2, 195.0], [88.3, 196.0], [88.4, 197.0], [88.5, 198.0], [88.6, 199.0], [88.7, 200.0], [88.8, 201.0], [88.9, 202.0], [89.0, 203.0], [89.1, 204.0], [89.2, 206.0], [89.3, 207.0], [89.4, 208.0], [89.5, 209.0], [89.6, 211.0], [89.7, 212.0], [89.8, 213.0], [89.9, 215.0], [90.0, 216.0], [90.1, 217.0], [90.2, 218.0], [90.3, 220.0], [90.4, 221.0], [90.5, 222.0], [90.6, 224.0], [90.7, 226.0], [90.8, 228.0], [90.9, 229.0], [91.0, 231.0], [91.1, 233.0], [91.2, 235.0], [91.3, 237.0], [91.4, 239.0], [91.5, 241.0], [91.6, 243.0], [91.7, 245.0], [91.8, 247.0], [91.9, 250.0], [92.0, 252.0], [92.1, 254.0], [92.2, 256.0], [92.3, 259.0], [92.4, 262.0], [92.5, 265.0], [92.6, 268.0], [92.7, 270.0], [92.8, 273.0], [92.9, 276.0], [93.0, 279.0], [93.1, 283.0], [93.2, 286.0], [93.3, 289.0], [93.4, 292.0], [93.5, 295.0], [93.6, 299.0], [93.7, 302.0], [93.8, 306.0], [93.9, 310.0], [94.0, 314.0], [94.1, 317.0], [94.2, 321.0], [94.3, 324.0], [94.4, 327.0], [94.5, 331.0], [94.6, 333.0], [94.7, 336.0], [94.8, 339.0], [94.9, 342.0], [95.0, 345.0], [95.1, 348.0], [95.2, 350.0], [95.3, 354.0], [95.4, 356.0], [95.5, 359.0], [95.6, 361.0], [95.7, 364.0], [95.8, 367.0], [95.9, 370.0], [96.0, 372.0], [96.1, 375.0], [96.2, 378.0], [96.3, 381.0], [96.4, 383.0], [96.5, 386.0], [96.6, 389.0], [96.7, 392.0], [96.8, 394.0], [96.9, 396.0], [97.0, 399.0], [97.1, 402.0], [97.2, 405.0], [97.3, 409.0], [97.4, 413.0], [97.5, 418.0], [97.6, 422.0], [97.7, 425.0], [97.8, 430.0], [97.9, 433.0], [98.0, 437.0], [98.1, 442.0], [98.2, 447.0], [98.3, 453.0], [98.4, 458.0], [98.5, 464.0], [98.6, 469.0], [98.7, 473.0], [98.8, 478.0], [98.9, 483.0], [99.0, 489.0], [99.1, 495.0], [99.2, 501.0], [99.3, 515.0], [99.4, 528.0], [99.5, 536.0], [99.6, 546.0], [99.7, 577.0], [99.8, 608.0], [99.9, 649.0]], "isOverall": false, "label": "io-cpu", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 2.0, "minX": 100.0, "maxY": 68087.0, "series": [{"data": [[300.0, 2604.0], [600.0, 127.0], [700.0, 21.0], [200.0, 3824.0], [100.0, 68087.0], [400.0, 1651.0], [800.0, 14.0], [900.0, 2.0], [500.0, 475.0]], "isOverall": false, "label": "io-cpu", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 900.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 623.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 76182.0, "series": [{"data": [[0.0, 76182.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 623.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 45.80319803198037, "minX": 1.79275266E12, "maxY": 194.6154726813349, "series": [{"data": [[1.79275272E12, 194.6154726813349], [1.79275266E12, 45.80319803198037]], "isOverall": false, "label": "Usuarios (200)", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275272E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 101.0, "minX": 1.0, "maxY": 391.8064516129032, "series": [{"data": [[2.0, 102.0], [3.0, 102.0], [4.0, 102.0], [5.0, 102.0], [6.0, 105.0], [7.0, 109.0], [9.0, 114.5], [10.0, 110.0], [11.0, 139.0], [12.0, 116.0], [13.0, 137.0], [14.0, 101.0], [16.0, 186.1875], [17.0, 106.0], [18.0, 102.0], [19.0, 107.16666666666667], [20.0, 119.71428571428571], [21.0, 113.5], [22.0, 119.625], [23.0, 121.5], [24.0, 107.99999999999999], [25.0, 133.11764705882354], [26.0, 105.25], [27.0, 122.60000000000002], [28.0, 115.16666666666666], [29.0, 103.5], [30.0, 120.0], [31.0, 103.6], [32.0, 115.47058823529412], [33.0, 117.73333333333333], [34.0, 103.00000000000001], [35.0, 119.76923076923077], [36.0, 103.60000000000001], [37.0, 111.44], [38.0, 108.0], [39.0, 107.25], [40.0, 123.33333333333334], [41.0, 103.99999999999999], [42.0, 104.875], [43.0, 142.40000000000006], [44.0, 123.16666666666667], [45.0, 105.25], [46.0, 139.51515151515153], [47.0, 106.28571428571429], [48.0, 103.53333333333333], [49.0, 133.62962962962965], [50.0, 112.4285714285714], [51.0, 103.84615384615384], [52.0, 130.53846153846152], [53.0, 103.76923076923077], [54.0, 107.35714285714285], [55.0, 126.39024390243904], [56.0, 106.73333333333333], [57.0, 113.3061224489796], [58.0, 109.00000000000001], [59.0, 107.89743589743591], [60.0, 108.27272727272728], [61.0, 103.06060606060608], [62.0, 116.25000000000001], [63.0, 104.21212121212123], [64.0, 113.65517241379312], [65.0, 106.29999999999997], [66.0, 105.2962962962963], [67.0, 113.67500000000001], [68.0, 103.68], [69.0, 116.17073170731706], [70.0, 107.06250000000001], [71.0, 116.17647058823526], [72.0, 107.6842105263158], [73.0, 115.6285714285714], [74.0, 107.41025641025644], [75.0, 117.42307692307692], [76.0, 113.45833333333331], [77.0, 111.24137931034485], [78.0, 113.44186046511629], [79.0, 105.54285714285714], [80.0, 113.02941176470586], [81.0, 112.16279069767441], [82.0, 122.79999999999998], [83.0, 123.10256410256412], [84.0, 118.02222222222223], [85.0, 103.03571428571429], [86.0, 123.67999999999996], [87.0, 117.23076923076923], [88.0, 112.49999999999999], [89.0, 117.12962962962966], [90.0, 118.26470588235294], [91.0, 125.94594594594594], [92.0, 118.55357142857142], [93.0, 104.33333333333333], [94.0, 120.71052631578948], [95.0, 140.71186440677968], [96.0, 110.69565217391302], [97.0, 114.02127659574467], [98.0, 127.79591836734697], [99.0, 103.89743589743591], [100.0, 120.35185185185186], [101.0, 105.92682926829268], [102.0, 108.16279069767444], [103.0, 114.7910447761194], [104.0, 102.27586206896554], [105.0, 115.87499999999997], [106.0, 119.43103448275863], [107.0, 109.60000000000002], [108.0, 129.0], [109.0, 137.85294117647055], [110.0, 112.5], [111.0, 134.6], [112.0, 166.2777777777778], [113.0, 211.38235294117646], [114.0, 206.61111111111111], [115.0, 147.62745098039215], [116.0, 144.22222222222223], [117.0, 127.06249999999999], [118.0, 202.6976744186047], [119.0, 144.45205479452056], [120.0, 117.39285714285712], [121.0, 127.10638297872342], [122.0, 133.13333333333333], [123.0, 102.4], [124.0, 120.56097560975611], [125.0, 149.09333333333336], [126.0, 111.0952380952381], [127.0, 102.84615384615385], [128.0, 155.469696969697], [129.0, 127.60317460317462], [130.0, 106.05263157894736], [131.0, 126.25531914893617], [132.0, 145.63013698630132], [133.0, 110.87301587301586], [134.0, 106.10714285714285], [135.0, 158.0789473684211], [136.0, 173.73076923076928], [137.0, 161.38461538461533], [138.0, 110.73684210526315], [139.0, 102.89999999999999], [140.0, 186.72413793103445], [141.0, 185.22033898305085], [142.0, 129.32835820895525], [143.0, 105.71428571428571], [144.0, 158.26923076923077], [145.0, 150.0092592592593], [146.0, 102.22222222222221], [147.0, 108.86666666666667], [148.0, 163.16883116883108], [149.0, 144.7727272727273], [150.0, 106.64285714285715], [151.0, 142.08219178082192], [152.0, 139.96341463414637], [153.0, 103.20833333333331], [154.0, 106.04], [155.0, 174.82894736842107], [156.0, 170.11538461538464], [157.0, 114.27777777777779], [158.0, 126.54545454545453], [159.0, 174.22619047619042], [160.0, 132.37681159420293], [161.0, 108.42307692307692], [162.0, 149.53030303030306], [163.0, 158.50537634408602], [164.0, 111.10204081632654], [165.0, 134.38888888888889], [166.0, 144.4731182795699], [167.0, 135.27868852459022], [168.0, 108.76190476190477], [169.0, 130.85], [170.0, 219.72916666666663], [171.0, 237.32812499999994], [172.0, 191.20000000000002], [173.0, 113.19999999999999], [174.0, 170.57894736842098], [175.0, 192.98000000000002], [176.0, 234.2325581395349], [177.0, 234.55263157894734], [178.0, 209.39583333333331], [179.0, 170.00000000000003], [180.0, 190.0697674418605], [181.0, 138.10344827586206], [182.0, 109.75], [183.0, 391.8064516129032], [184.0, 332.18965517241367], [185.0, 298.86046511627904], [186.0, 291.80392156862746], [187.0, 197.8867924528302], [188.0, 163.3181818181818], [189.0, 105.90476190476188], [190.0, 104.10526315789474], [191.0, 252.52173913043467], [192.0, 250.4925373134328], [193.0, 198.77215189873417], [194.0, 130.9180327868853], [195.0, 163.95652173913044], [196.0, 169.76923076923077], [197.0, 193.2222222222222], [198.0, 207.78571428571425], [199.0, 217.44897959183677], [200.0, 143.82296568346072], [1.0, 102.0]], "isOverall": false, "label": "io-cpu", "isController": false}, {"data": [[193.0402577957148, 144.03106568582888]], "isOverall": false, "label": "io-cpu-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 200.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 2059.6, "minX": 1.79275266E12, "maxY": 405269.56666666665, "series": [{"data": [[1.79275272E12, 405269.56666666665], [1.79275266E12, 4322.45]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.79275272E12, 192513.06666666668], [1.79275266E12, 2059.6]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275272E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 117.72447724477242, "minX": 1.79275266E12, "maxY": 144.31250657964037, "series": [{"data": [[1.79275272E12, 144.31250657964037], [1.79275266E12, 117.72447724477242]], "isOverall": false, "label": "io-cpu", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275272E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 117.55596555965556, "minX": 1.79275266E12, "maxY": 144.308835140543, "series": [{"data": [[1.79275272E12, 144.308835140543], [1.79275266E12, 117.55596555965556]], "isOverall": false, "label": "io-cpu", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275272E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0018422991893883522, "minX": 1.79275266E12, "maxY": 1.1512915129151302, "series": [{"data": [[1.79275272E12, 0.0018422991893883522], [1.79275266E12, 1.1512915129151302]], "isOverall": false, "label": "io-cpu", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275272E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 101.0, "minX": 1.79275266E12, "maxY": 972.0, "series": [{"data": [[1.79275272E12, 972.0], [1.79275266E12, 215.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.79275272E12, 101.0], [1.79275266E12, 102.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.79275272E12, 153.0], [1.79275266E12, 139.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.79275272E12, 270.0], [1.79275266E12, 209.86]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.79275272E12, 108.0], [1.79275266E12, 112.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.79275272E12, 175.0], [1.79275266E12, 148.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275272E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 105.0, "minX": 61.0, "maxY": 435.5, "series": [{"data": [[531.0, 385.0], [534.0, 376.0], [522.0, 435.5], [559.0, 370.0], [604.0, 326.0], [587.0, 326.0], [626.0, 302.0], [608.0, 356.0], [662.0, 338.5], [647.0, 325.0], [680.0, 105.0], [745.0, 304.0], [794.0, 196.0], [814.0, 106.0], [808.0, 128.0], [819.0, 207.0], [850.0, 224.5], [924.0, 141.0], [988.0, 188.0], [1013.0, 182.0], [1068.0, 148.0], [1045.0, 151.0], [1367.0, 138.0], [1480.0, 126.0], [1618.0, 110.0], [1652.0, 111.0], [1659.0, 106.0], [1635.0, 113.0], [1655.0, 111.0], [1661.0, 110.0], [1715.0, 112.0], [1702.0, 108.0], [1711.0, 108.0], [1691.0, 111.0], [1680.0, 109.0], [1698.0, 113.0], [1718.0, 106.0], [1682.0, 109.0], [1690.0, 106.0], [1705.0, 109.0], [1693.0, 109.0], [1672.0, 110.0], [1664.0, 110.0], [1751.0, 107.0], [1739.0, 107.0], [1730.0, 107.0], [1761.0, 109.0], [1738.0, 107.0], [1820.0, 105.0], [1802.0, 106.0], [1794.0, 109.0], [1799.0, 106.0], [61.0, 122.0], [283.0, 119.0], [297.0, 121.0], [469.0, 107.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1820.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 105.0, "minX": 61.0, "maxY": 435.5, "series": [{"data": [[531.0, 385.0], [534.0, 376.0], [522.0, 435.5], [559.0, 370.0], [604.0, 326.0], [587.0, 326.0], [626.0, 302.0], [608.0, 356.0], [662.0, 338.5], [647.0, 325.0], [680.0, 105.0], [745.0, 304.0], [794.0, 196.0], [814.0, 106.0], [808.0, 128.0], [819.0, 207.0], [850.0, 224.5], [924.0, 141.0], [988.0, 188.0], [1013.0, 182.0], [1068.0, 148.0], [1045.0, 151.0], [1367.0, 138.0], [1480.0, 126.0], [1618.0, 110.0], [1652.0, 111.0], [1659.0, 106.0], [1635.0, 113.0], [1655.0, 111.0], [1661.0, 110.0], [1715.0, 112.0], [1702.0, 108.0], [1711.0, 108.0], [1691.0, 111.0], [1680.0, 109.0], [1698.0, 113.0], [1718.0, 106.0], [1682.0, 109.0], [1690.0, 106.0], [1705.0, 109.0], [1693.0, 109.0], [1672.0, 110.0], [1664.0, 110.0], [1751.0, 107.0], [1739.0, 107.0], [1730.0, 107.0], [1761.0, 109.0], [1738.0, 107.0], [1820.0, 105.0], [1802.0, 106.0], [1794.0, 109.0], [1799.0, 106.0], [61.0, 122.0], [283.0, 119.0], [297.0, 121.0], [469.0, 107.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1820.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 14.6, "minX": 1.79275266E12, "maxY": 1265.4833333333333, "series": [{"data": [[1.79275272E12, 1265.4833333333333], [1.79275266E12, 14.6]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275272E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 13.55, "minX": 1.79275266E12, "maxY": 1266.5333333333333, "series": [{"data": [[1.79275272E12, 1266.5333333333333], [1.79275266E12, 13.55]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275272E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 13.55, "minX": 1.79275266E12, "maxY": 1266.5333333333333, "series": [{"data": [[1.79275272E12, 1266.5333333333333], [1.79275266E12, 13.55]], "isOverall": false, "label": "io-cpu-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275272E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 13.55, "minX": 1.79275266E12, "maxY": 1266.5333333333333, "series": [{"data": [[1.79275272E12, 1266.5333333333333], [1.79275266E12, 13.55]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275272E12, "title": "Total Transactions Per Second"}},
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

