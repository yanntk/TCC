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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 9013.0, "series": [{"data": [[0.0, 1.0], [0.1, 1.0], [0.2, 1.0], [0.3, 1.0], [0.4, 1.0], [0.5, 1.0], [0.6, 1.0], [0.7, 1.0], [0.8, 2.0], [0.9, 2.0], [1.0, 2.0], [1.1, 2.0], [1.2, 2.0], [1.3, 2.0], [1.4, 2.0], [1.5, 2.0], [1.6, 2.0], [1.7, 2.0], [1.8, 2.0], [1.9, 2.0], [2.0, 2.0], [2.1, 2.0], [2.2, 2.0], [2.3, 2.0], [2.4, 2.0], [2.5, 2.0], [2.6, 2.0], [2.7, 2.0], [2.8, 2.0], [2.9, 2.0], [3.0, 2.0], [3.1, 2.0], [3.2, 2.0], [3.3, 2.0], [3.4, 2.0], [3.5, 2.0], [3.6, 2.0], [3.7, 2.0], [3.8, 2.0], [3.9, 2.0], [4.0, 2.0], [4.1, 2.0], [4.2, 2.0], [4.3, 2.0], [4.4, 2.0], [4.5, 2.0], [4.6, 2.0], [4.7, 2.0], [4.8, 2.0], [4.9, 2.0], [5.0, 2.0], [5.1, 2.0], [5.2, 2.0], [5.3, 2.0], [5.4, 2.0], [5.5, 2.0], [5.6, 2.0], [5.7, 2.0], [5.8, 2.0], [5.9, 2.0], [6.0, 2.0], [6.1, 2.0], [6.2, 2.0], [6.3, 2.0], [6.4, 2.0], [6.5, 2.0], [6.6, 2.0], [6.7, 2.0], [6.8, 2.0], [6.9, 3.0], [7.0, 3.0], [7.1, 3.0], [7.2, 3.0], [7.3, 3.0], [7.4, 3.0], [7.5, 3.0], [7.6, 3.0], [7.7, 3.0], [7.8, 3.0], [7.9, 3.0], [8.0, 3.0], [8.1, 3.0], [8.2, 3.0], [8.3, 3.0], [8.4, 3.0], [8.5, 3.0], [8.6, 3.0], [8.7, 3.0], [8.8, 3.0], [8.9, 3.0], [9.0, 3.0], [9.1, 3.0], [9.2, 3.0], [9.3, 3.0], [9.4, 3.0], [9.5, 3.0], [9.6, 3.0], [9.7, 3.0], [9.8, 3.0], [9.9, 3.0], [10.0, 3.0], [10.1, 3.0], [10.2, 3.0], [10.3, 3.0], [10.4, 3.0], [10.5, 3.0], [10.6, 3.0], [10.7, 3.0], [10.8, 3.0], [10.9, 3.0], [11.0, 3.0], [11.1, 3.0], [11.2, 3.0], [11.3, 3.0], [11.4, 4.0], [11.5, 4.0], [11.6, 4.0], [11.7, 4.0], [11.8, 4.0], [11.9, 4.0], [12.0, 4.0], [12.1, 4.0], [12.2, 4.0], [12.3, 4.0], [12.4, 4.0], [12.5, 4.0], [12.6, 4.0], [12.7, 4.0], [12.8, 4.0], [12.9, 4.0], [13.0, 4.0], [13.1, 4.0], [13.2, 4.0], [13.3, 5.0], [13.4, 5.0], [13.5, 5.0], [13.6, 5.0], [13.7, 5.0], [13.8, 5.0], [13.9, 5.0], [14.0, 5.0], [14.1, 5.0], [14.2, 5.0], [14.3, 6.0], [14.4, 6.0], [14.5, 6.0], [14.6, 6.0], [14.7, 6.0], [14.8, 6.0], [14.9, 7.0], [15.0, 7.0], [15.1, 7.0], [15.2, 7.0], [15.3, 8.0], [15.4, 8.0], [15.5, 8.0], [15.6, 9.0], [15.7, 9.0], [15.8, 10.0], [15.9, 11.0], [16.0, 11.0], [16.1, 13.0], [16.2, 14.0], [16.3, 16.0], [16.4, 19.0], [16.5, 25.0], [16.6, 37.0], [16.7, 47.0], [16.8, 52.0], [16.9, 56.0], [17.0, 61.0], [17.1, 66.0], [17.2, 70.0], [17.3, 76.0], [17.4, 84.0], [17.5, 89.0], [17.6, 95.0], [17.7, 103.0], [17.8, 110.0], [17.9, 113.0], [18.0, 113.0], [18.1, 113.0], [18.2, 114.0], [18.3, 114.0], [18.4, 114.0], [18.5, 114.0], [18.6, 115.0], [18.7, 115.0], [18.8, 115.0], [18.9, 115.0], [19.0, 115.0], [19.1, 115.0], [19.2, 116.0], [19.3, 116.0], [19.4, 116.0], [19.5, 116.0], [19.6, 116.0], [19.7, 116.0], [19.8, 116.0], [19.9, 116.0], [20.0, 117.0], [20.1, 117.0], [20.2, 117.0], [20.3, 117.0], [20.4, 117.0], [20.5, 117.0], [20.6, 117.0], [20.7, 117.0], [20.8, 117.0], [20.9, 117.0], [21.0, 118.0], [21.1, 118.0], [21.2, 118.0], [21.3, 118.0], [21.4, 118.0], [21.5, 118.0], [21.6, 118.0], [21.7, 118.0], [21.8, 118.0], [21.9, 118.0], [22.0, 118.0], [22.1, 119.0], [22.2, 119.0], [22.3, 119.0], [22.4, 119.0], [22.5, 119.0], [22.6, 119.0], [22.7, 119.0], [22.8, 119.0], [22.9, 119.0], [23.0, 119.0], [23.1, 119.0], [23.2, 119.0], [23.3, 119.0], [23.4, 120.0], [23.5, 120.0], [23.6, 120.0], [23.7, 120.0], [23.8, 120.0], [23.9, 120.0], [24.0, 120.0], [24.1, 120.0], [24.2, 120.0], [24.3, 120.0], [24.4, 120.0], [24.5, 120.0], [24.6, 120.0], [24.7, 120.0], [24.8, 120.0], [24.9, 120.0], [25.0, 121.0], [25.1, 121.0], [25.2, 121.0], [25.3, 121.0], [25.4, 121.0], [25.5, 121.0], [25.6, 121.0], [25.7, 121.0], [25.8, 121.0], [25.9, 121.0], [26.0, 121.0], [26.1, 121.0], [26.2, 121.0], [26.3, 121.0], [26.4, 121.0], [26.5, 121.0], [26.6, 121.0], [26.7, 121.0], [26.8, 122.0], [26.9, 122.0], [27.0, 122.0], [27.1, 122.0], [27.2, 122.0], [27.3, 122.0], [27.4, 122.0], [27.5, 122.0], [27.6, 122.0], [27.7, 122.0], [27.8, 122.0], [27.9, 122.0], [28.0, 122.0], [28.1, 122.0], [28.2, 122.0], [28.3, 122.0], [28.4, 122.0], [28.5, 122.0], [28.6, 122.0], [28.7, 123.0], [28.8, 123.0], [28.9, 123.0], [29.0, 123.0], [29.1, 123.0], [29.2, 123.0], [29.3, 123.0], [29.4, 123.0], [29.5, 123.0], [29.6, 123.0], [29.7, 123.0], [29.8, 123.0], [29.9, 123.0], [30.0, 123.0], [30.1, 123.0], [30.2, 123.0], [30.3, 123.0], [30.4, 123.0], [30.5, 124.0], [30.6, 124.0], [30.7, 124.0], [30.8, 124.0], [30.9, 124.0], [31.0, 124.0], [31.1, 124.0], [31.2, 124.0], [31.3, 124.0], [31.4, 124.0], [31.5, 124.0], [31.6, 124.0], [31.7, 124.0], [31.8, 124.0], [31.9, 124.0], [32.0, 124.0], [32.1, 124.0], [32.2, 125.0], [32.3, 125.0], [32.4, 125.0], [32.5, 125.0], [32.6, 125.0], [32.7, 125.0], [32.8, 125.0], [32.9, 125.0], [33.0, 125.0], [33.1, 125.0], [33.2, 125.0], [33.3, 125.0], [33.4, 125.0], [33.5, 125.0], [33.6, 125.0], [33.7, 125.0], [33.8, 125.0], [33.9, 126.0], [34.0, 126.0], [34.1, 126.0], [34.2, 126.0], [34.3, 126.0], [34.4, 126.0], [34.5, 126.0], [34.6, 126.0], [34.7, 126.0], [34.8, 126.0], [34.9, 126.0], [35.0, 126.0], [35.1, 126.0], [35.2, 126.0], [35.3, 126.0], [35.4, 126.0], [35.5, 127.0], [35.6, 127.0], [35.7, 127.0], [35.8, 127.0], [35.9, 127.0], [36.0, 127.0], [36.1, 127.0], [36.2, 127.0], [36.3, 127.0], [36.4, 127.0], [36.5, 127.0], [36.6, 127.0], [36.7, 127.0], [36.8, 127.0], [36.9, 127.0], [37.0, 127.0], [37.1, 128.0], [37.2, 128.0], [37.3, 128.0], [37.4, 128.0], [37.5, 128.0], [37.6, 128.0], [37.7, 128.0], [37.8, 128.0], [37.9, 128.0], [38.0, 128.0], [38.1, 128.0], [38.2, 128.0], [38.3, 128.0], [38.4, 128.0], [38.5, 128.0], [38.6, 129.0], [38.7, 129.0], [38.8, 129.0], [38.9, 129.0], [39.0, 129.0], [39.1, 129.0], [39.2, 129.0], [39.3, 129.0], [39.4, 129.0], [39.5, 129.0], [39.6, 129.0], [39.7, 129.0], [39.8, 129.0], [39.9, 129.0], [40.0, 130.0], [40.1, 130.0], [40.2, 130.0], [40.3, 130.0], [40.4, 130.0], [40.5, 130.0], [40.6, 130.0], [40.7, 130.0], [40.8, 130.0], [40.9, 130.0], [41.0, 130.0], [41.1, 130.0], [41.2, 130.0], [41.3, 131.0], [41.4, 131.0], [41.5, 131.0], [41.6, 131.0], [41.7, 131.0], [41.8, 131.0], [41.9, 131.0], [42.0, 131.0], [42.1, 131.0], [42.2, 131.0], [42.3, 131.0], [42.4, 132.0], [42.5, 132.0], [42.6, 132.0], [42.7, 132.0], [42.8, 132.0], [42.9, 132.0], [43.0, 132.0], [43.1, 132.0], [43.2, 132.0], [43.3, 132.0], [43.4, 132.0], [43.5, 133.0], [43.6, 133.0], [43.7, 133.0], [43.8, 133.0], [43.9, 133.0], [44.0, 133.0], [44.1, 133.0], [44.2, 133.0], [44.3, 133.0], [44.4, 133.0], [44.5, 134.0], [44.6, 134.0], [44.7, 134.0], [44.8, 134.0], [44.9, 134.0], [45.0, 134.0], [45.1, 134.0], [45.2, 134.0], [45.3, 135.0], [45.4, 135.0], [45.5, 135.0], [45.6, 135.0], [45.7, 135.0], [45.8, 135.0], [45.9, 135.0], [46.0, 135.0], [46.1, 136.0], [46.2, 136.0], [46.3, 136.0], [46.4, 136.0], [46.5, 136.0], [46.6, 136.0], [46.7, 136.0], [46.8, 137.0], [46.9, 137.0], [47.0, 137.0], [47.1, 137.0], [47.2, 137.0], [47.3, 137.0], [47.4, 137.0], [47.5, 138.0], [47.6, 138.0], [47.7, 138.0], [47.8, 138.0], [47.9, 138.0], [48.0, 138.0], [48.1, 139.0], [48.2, 139.0], [48.3, 139.0], [48.4, 139.0], [48.5, 139.0], [48.6, 139.0], [48.7, 139.0], [48.8, 140.0], [48.9, 140.0], [49.0, 140.0], [49.1, 140.0], [49.2, 140.0], [49.3, 140.0], [49.4, 141.0], [49.5, 141.0], [49.6, 141.0], [49.7, 141.0], [49.8, 141.0], [49.9, 141.0], [50.0, 142.0], [50.1, 142.0], [50.2, 142.0], [50.3, 142.0], [50.4, 142.0], [50.5, 142.0], [50.6, 143.0], [50.7, 143.0], [50.8, 143.0], [50.9, 143.0], [51.0, 143.0], [51.1, 144.0], [51.2, 144.0], [51.3, 144.0], [51.4, 144.0], [51.5, 144.0], [51.6, 145.0], [51.7, 145.0], [51.8, 145.0], [51.9, 145.0], [52.0, 145.0], [52.1, 146.0], [52.2, 146.0], [52.3, 146.0], [52.4, 146.0], [52.5, 146.0], [52.6, 147.0], [52.7, 147.0], [52.8, 147.0], [52.9, 147.0], [53.0, 147.0], [53.1, 148.0], [53.2, 148.0], [53.3, 148.0], [53.4, 148.0], [53.5, 148.0], [53.6, 149.0], [53.7, 149.0], [53.8, 149.0], [53.9, 150.0], [54.0, 150.0], [54.1, 150.0], [54.2, 150.0], [54.3, 151.0], [54.4, 151.0], [54.5, 152.0], [54.6, 152.0], [54.7, 152.0], [54.8, 152.0], [54.9, 153.0], [55.0, 153.0], [55.1, 153.0], [55.2, 154.0], [55.3, 154.0], [55.4, 154.0], [55.5, 154.0], [55.6, 155.0], [55.7, 155.0], [55.8, 155.0], [55.9, 156.0], [56.0, 156.0], [56.1, 157.0], [56.2, 157.0], [56.3, 157.0], [56.4, 158.0], [56.5, 158.0], [56.6, 158.0], [56.7, 159.0], [56.8, 159.0], [56.9, 160.0], [57.0, 160.0], [57.1, 160.0], [57.2, 161.0], [57.3, 161.0], [57.4, 162.0], [57.5, 162.0], [57.6, 162.0], [57.7, 163.0], [57.8, 163.0], [57.9, 163.0], [58.0, 164.0], [58.1, 164.0], [58.2, 165.0], [58.3, 165.0], [58.4, 165.0], [58.5, 166.0], [58.6, 166.0], [58.7, 167.0], [58.8, 168.0], [58.9, 168.0], [59.0, 169.0], [59.1, 169.0], [59.2, 170.0], [59.3, 170.0], [59.4, 170.0], [59.5, 171.0], [59.6, 172.0], [59.7, 172.0], [59.8, 173.0], [59.9, 173.0], [60.0, 173.0], [60.1, 174.0], [60.2, 175.0], [60.3, 176.0], [60.4, 176.0], [60.5, 177.0], [60.6, 177.0], [60.7, 178.0], [60.8, 178.0], [60.9, 179.0], [61.0, 179.0], [61.1, 180.0], [61.2, 180.0], [61.3, 180.0], [61.4, 181.0], [61.5, 181.0], [61.6, 181.0], [61.7, 182.0], [61.8, 182.0], [61.9, 182.0], [62.0, 183.0], [62.1, 183.0], [62.2, 183.0], [62.3, 184.0], [62.4, 184.0], [62.5, 184.0], [62.6, 185.0], [62.7, 185.0], [62.8, 186.0], [62.9, 186.0], [63.0, 187.0], [63.1, 187.0], [63.2, 187.0], [63.3, 188.0], [63.4, 188.0], [63.5, 189.0], [63.6, 189.0], [63.7, 189.0], [63.8, 190.0], [63.9, 190.0], [64.0, 191.0], [64.1, 191.0], [64.2, 191.0], [64.3, 192.0], [64.4, 192.0], [64.5, 193.0], [64.6, 193.0], [64.7, 194.0], [64.8, 194.0], [64.9, 195.0], [65.0, 195.0], [65.1, 196.0], [65.2, 196.0], [65.3, 196.0], [65.4, 197.0], [65.5, 197.0], [65.6, 197.0], [65.7, 198.0], [65.8, 198.0], [65.9, 198.0], [66.0, 199.0], [66.1, 199.0], [66.2, 199.0], [66.3, 199.0], [66.4, 200.0], [66.5, 200.0], [66.6, 200.0], [66.7, 200.0], [66.8, 201.0], [66.9, 201.0], [67.0, 202.0], [67.1, 202.0], [67.2, 202.0], [67.3, 202.0], [67.4, 203.0], [67.5, 203.0], [67.6, 204.0], [67.7, 204.0], [67.8, 204.0], [67.9, 205.0], [68.0, 205.0], [68.1, 205.0], [68.2, 206.0], [68.3, 206.0], [68.4, 207.0], [68.5, 207.0], [68.6, 207.0], [68.7, 208.0], [68.8, 208.0], [68.9, 209.0], [69.0, 209.0], [69.1, 209.0], [69.2, 210.0], [69.3, 210.0], [69.4, 210.0], [69.5, 211.0], [69.6, 211.0], [69.7, 211.0], [69.8, 212.0], [69.9, 212.0], [70.0, 213.0], [70.1, 213.0], [70.2, 213.0], [70.3, 213.0], [70.4, 214.0], [70.5, 214.0], [70.6, 215.0], [70.7, 215.0], [70.8, 215.0], [70.9, 216.0], [71.0, 216.0], [71.1, 216.0], [71.2, 217.0], [71.3, 217.0], [71.4, 217.0], [71.5, 218.0], [71.6, 218.0], [71.7, 218.0], [71.8, 219.0], [71.9, 219.0], [72.0, 219.0], [72.1, 220.0], [72.2, 220.0], [72.3, 221.0], [72.4, 221.0], [72.5, 221.0], [72.6, 222.0], [72.7, 222.0], [72.8, 223.0], [72.9, 223.0], [73.0, 224.0], [73.1, 224.0], [73.2, 225.0], [73.3, 225.0], [73.4, 225.0], [73.5, 226.0], [73.6, 226.0], [73.7, 227.0], [73.8, 227.0], [73.9, 227.0], [74.0, 228.0], [74.1, 228.0], [74.2, 229.0], [74.3, 229.0], [74.4, 229.0], [74.5, 229.0], [74.6, 230.0], [74.7, 230.0], [74.8, 230.0], [74.9, 231.0], [75.0, 231.0], [75.1, 232.0], [75.2, 232.0], [75.3, 233.0], [75.4, 233.0], [75.5, 234.0], [75.6, 234.0], [75.7, 235.0], [75.8, 235.0], [75.9, 235.0], [76.0, 236.0], [76.1, 236.0], [76.2, 237.0], [76.3, 237.0], [76.4, 238.0], [76.5, 238.0], [76.6, 239.0], [76.7, 240.0], [76.8, 240.0], [76.9, 241.0], [77.0, 241.0], [77.1, 241.0], [77.2, 242.0], [77.3, 242.0], [77.4, 243.0], [77.5, 243.0], [77.6, 244.0], [77.7, 244.0], [77.8, 245.0], [77.9, 245.0], [78.0, 246.0], [78.1, 246.0], [78.2, 247.0], [78.3, 247.0], [78.4, 248.0], [78.5, 248.0], [78.6, 249.0], [78.7, 249.0], [78.8, 250.0], [78.9, 250.0], [79.0, 251.0], [79.1, 251.0], [79.2, 252.0], [79.3, 252.0], [79.4, 253.0], [79.5, 254.0], [79.6, 254.0], [79.7, 255.0], [79.8, 255.0], [79.9, 256.0], [80.0, 256.0], [80.1, 257.0], [80.2, 258.0], [80.3, 258.0], [80.4, 259.0], [80.5, 259.0], [80.6, 260.0], [80.7, 261.0], [80.8, 261.0], [80.9, 262.0], [81.0, 262.0], [81.1, 263.0], [81.2, 264.0], [81.3, 264.0], [81.4, 265.0], [81.5, 266.0], [81.6, 266.0], [81.7, 267.0], [81.8, 268.0], [81.9, 268.0], [82.0, 269.0], [82.1, 270.0], [82.2, 270.0], [82.3, 271.0], [82.4, 272.0], [82.5, 273.0], [82.6, 274.0], [82.7, 274.0], [82.8, 275.0], [82.9, 276.0], [83.0, 277.0], [83.1, 279.0], [83.2, 280.0], [83.3, 281.0], [83.4, 281.0], [83.5, 283.0], [83.6, 283.0], [83.7, 284.0], [83.8, 285.0], [83.9, 286.0], [84.0, 287.0], [84.1, 288.0], [84.2, 289.0], [84.3, 289.0], [84.4, 290.0], [84.5, 291.0], [84.6, 292.0], [84.7, 294.0], [84.8, 295.0], [84.9, 295.0], [85.0, 296.0], [85.1, 298.0], [85.2, 299.0], [85.3, 301.0], [85.4, 302.0], [85.5, 303.0], [85.6, 304.0], [85.7, 306.0], [85.8, 307.0], [85.9, 308.0], [86.0, 309.0], [86.1, 310.0], [86.2, 311.0], [86.3, 312.0], [86.4, 313.0], [86.5, 314.0], [86.6, 315.0], [86.7, 316.0], [86.8, 317.0], [86.9, 319.0], [87.0, 319.0], [87.1, 320.0], [87.2, 321.0], [87.3, 322.0], [87.4, 323.0], [87.5, 324.0], [87.6, 324.0], [87.7, 325.0], [87.8, 326.0], [87.9, 326.0], [88.0, 327.0], [88.1, 328.0], [88.2, 328.0], [88.3, 329.0], [88.4, 330.0], [88.5, 330.0], [88.6, 331.0], [88.7, 332.0], [88.8, 333.0], [88.9, 334.0], [89.0, 335.0], [89.1, 336.0], [89.2, 337.0], [89.3, 338.0], [89.4, 339.0], [89.5, 339.0], [89.6, 340.0], [89.7, 342.0], [89.8, 342.0], [89.9, 343.0], [90.0, 344.0], [90.1, 345.0], [90.2, 346.0], [90.3, 347.0], [90.4, 348.0], [90.5, 348.0], [90.6, 349.0], [90.7, 350.0], [90.8, 350.0], [90.9, 351.0], [91.0, 352.0], [91.1, 353.0], [91.2, 354.0], [91.3, 355.0], [91.4, 355.0], [91.5, 357.0], [91.6, 358.0], [91.7, 359.0], [91.8, 361.0], [91.9, 363.0], [92.0, 364.0], [92.1, 365.0], [92.2, 367.0], [92.3, 369.0], [92.4, 372.0], [92.5, 374.0], [92.6, 375.0], [92.7, 376.0], [92.8, 378.0], [92.9, 379.0], [93.0, 380.0], [93.1, 381.0], [93.2, 382.0], [93.3, 383.0], [93.4, 385.0], [93.5, 386.0], [93.6, 388.0], [93.7, 389.0], [93.8, 391.0], [93.9, 393.0], [94.0, 394.0], [94.1, 395.0], [94.2, 397.0], [94.3, 398.0], [94.4, 400.0], [94.5, 401.0], [94.6, 403.0], [94.7, 404.0], [94.8, 405.0], [94.9, 406.0], [95.0, 408.0], [95.1, 409.0], [95.2, 410.0], [95.3, 411.0], [95.4, 412.0], [95.5, 413.0], [95.6, 414.0], [95.7, 415.0], [95.8, 416.0], [95.9, 417.0], [96.0, 419.0], [96.1, 420.0], [96.2, 421.0], [96.3, 422.0], [96.4, 423.0], [96.5, 424.0], [96.6, 425.0], [96.7, 426.0], [96.8, 427.0], [96.9, 428.0], [97.0, 429.0], [97.1, 430.0], [97.2, 431.0], [97.3, 432.0], [97.4, 434.0], [97.5, 435.0], [97.6, 437.0], [97.7, 440.0], [97.8, 442.0], [97.9, 444.0], [98.0, 446.0], [98.1, 448.0], [98.2, 451.0], [98.3, 454.0], [98.4, 458.0], [98.5, 462.0], [98.6, 466.0], [98.7, 469.0], [98.8, 474.0], [98.9, 480.0], [99.0, 490.0], [99.1, 507.0], [99.2, 526.0], [99.3, 535.0], [99.4, 549.0], [99.5, 563.0], [99.6, 587.0], [99.7, 614.0], [99.8, 782.0], [99.9, 1786.0], [100.0, 9013.0]], "isOverall": false, "label": "db", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 30777.0, "series": [{"data": [[0.0, 11160.0], [8900.0, 1.0], [9000.0, 1.0], [600.0, 80.0], [700.0, 13.0], [800.0, 8.0], [900.0, 10.0], [1000.0, 7.0], [1100.0, 8.0], [1200.0, 6.0], [1300.0, 7.0], [1400.0, 7.0], [1500.0, 2.0], [100.0, 30777.0], [1600.0, 2.0], [1700.0, 4.0], [1800.0, 2.0], [1900.0, 3.0], [2000.0, 2.0], [2100.0, 2.0], [2300.0, 3.0], [2200.0, 2.0], [2400.0, 2.0], [2500.0, 3.0], [2600.0, 5.0], [2800.0, 4.0], [2700.0, 5.0], [2900.0, 4.0], [3000.0, 3.0], [3100.0, 3.0], [200.0, 11909.0], [3300.0, 3.0], [3200.0, 2.0], [3400.0, 3.0], [3500.0, 2.0], [3700.0, 3.0], [3600.0, 3.0], [3800.0, 2.0], [300.0, 5791.0], [400.0, 2965.0], [500.0, 374.0]], "isOverall": false, "label": "db", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 9000.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 71.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 62605.0, "series": [{"data": [[0.0, 62605.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 517.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 71.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 46.31417244796831, "minX": 1.7927529E12, "maxY": 197.00807281615727, "series": [{"data": [[1.7927529E12, 46.31417244796831], [1.79275296E12, 197.00807281615727]], "isOverall": false, "label": "Usuarios (200)", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275296E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 28.75, "minX": 2.0, "maxY": 1178.4374999999998, "series": [{"data": [[2.0, 97.0], [4.0, 118.0], [6.0, 83.5], [9.0, 88.0], [11.0, 92.5], [12.0, 90.0], [13.0, 174.8571428571429], [14.0, 28.75], [15.0, 63.33333333333333], [16.0, 70.1], [17.0, 82.33333333333333], [18.0, 72.61538461538461], [19.0, 64.07692307692308], [20.0, 82.83333333333333], [21.0, 63.294117647058826], [22.0, 53.00000000000001], [23.0, 63.33333333333333], [24.0, 76.76923076923077], [25.0, 67.80000000000001], [26.0, 59.062499999999986], [27.0, 50.86666666666666], [28.0, 69.29411764705883], [29.0, 53.07142857142857], [30.0, 64.66666666666667], [31.0, 64.19999999999999], [32.0, 60.42857142857142], [33.0, 53.0], [34.0, 53.62500000000001], [35.0, 57.07692307692308], [36.0, 51.66666666666667], [37.0, 62.125000000000014], [38.0, 51.07142857142858], [39.0, 59.18750000000001], [40.0, 63.46666666666666], [41.0, 40.8], [42.0, 51.35714285714286], [43.0, 50.470588235294116], [44.0, 46.07692307692307], [45.0, 90.29166666666669], [46.0, 229.5], [47.0, 271.85714285714283], [48.0, 197.77272727272725], [49.0, 274.2], [50.0, 200.13043478260872], [51.0, 157.95], [52.0, 131.6315789473684], [53.0, 166.14999999999998], [54.0, 132.33333333333331], [55.0, 315.45000000000005], [56.0, 142.66666666666663], [57.0, 132.0], [58.0, 151.77272727272725], [59.0, 144.93750000000003], [60.0, 144.92592592592592], [61.0, 149.8125], [62.0, 142.8421052631579], [63.0, 162.58333333333331], [64.0, 141.0416666666667], [65.0, 140.23999999999995], [66.0, 144.22727272727275], [67.0, 128.66666666666669], [68.0, 137.4230769230769], [69.0, 136.962962962963], [70.0, 113.55555555555554], [71.0, 129.34615384615384], [72.0, 162.38095238095238], [73.0, 158.7], [74.0, 169.05555555555554], [75.0, 170.7222222222222], [76.0, 188.2727272727273], [77.0, 171.125], [78.0, 176.1851851851852], [79.0, 139.77777777777777], [80.0, 130.15625], [81.0, 122.33333333333329], [82.0, 117.52173913043478], [83.0, 121.1304347826087], [84.0, 145.08695652173913], [85.0, 157.04166666666663], [86.0, 163.2777777777778], [87.0, 143.39999999999998], [88.0, 140.04761904761907], [89.0, 189.89189189189187], [90.0, 294.70370370370364], [91.0, 229.04347826086953], [92.0, 291.7916666666666], [93.0, 217.70833333333331], [94.0, 249.35], [95.0, 229.375], [96.0, 225.74999999999997], [97.0, 235.49999999999997], [98.0, 206.28571428571428], [99.0, 247.5], [100.0, 262.61111111111114], [101.0, 262.68750000000006], [102.0, 272.20000000000005], [103.0, 275.4], [104.0, 233.00000000000003], [105.0, 260.9473684210526], [106.0, 258.33333333333337], [107.0, 252.90476190476193], [108.0, 255.0], [109.0, 216.51724137931035], [110.0, 217.91666666666669], [111.0, 184.15384615384616], [112.0, 192.27272727272728], [113.0, 196.1], [114.0, 194.85714285714286], [115.0, 208.23809523809524], [116.0, 240.04999999999998], [117.0, 197.33333333333334], [118.0, 283.5454545454545], [119.0, 253.00000000000003], [120.0, 298.1111111111111], [121.0, 295.8], [122.0, 308.65], [123.0, 274.95238095238096], [124.0, 276.40909090909093], [125.0, 272.5882352941176], [126.0, 280.18749999999994], [127.0, 250.17647058823533], [128.0, 251.60000000000005], [129.0, 290.625], [130.0, 227.47058823529414], [131.0, 246.2], [132.0, 204.2857142857143], [133.0, 243.76470588235293], [134.0, 306.7391304347827], [135.0, 250.4285714285714], [136.0, 283.19047619047615], [137.0, 333.0714285714286], [138.0, 276.65], [139.0, 234.2972972972973], [140.0, 260.25], [141.0, 273.56000000000006], [142.0, 211.75], [143.0, 199.54545454545456], [144.0, 223.40000000000006], [145.0, 213.9], [146.0, 233.41176470588235], [147.0, 222.58823529411768], [148.0, 242.6842105263158], [149.0, 205.5454545454545], [150.0, 274.8], [151.0, 286.57142857142856], [152.0, 249.36842105263165], [153.0, 268.6111111111111], [154.0, 328.75], [155.0, 291.1363636363636], [156.0, 279.30434782608694], [157.0, 260.36363636363643], [158.0, 274.6842105263157], [159.0, 230.06896551724137], [160.0, 227.91666666666663], [161.0, 215.05555555555554], [162.0, 204.04166666666663], [163.0, 217.66666666666666], [164.0, 240.63333333333335], [165.0, 244.5], [166.0, 274.962962962963], [167.0, 306.1538461538462], [168.0, 236.99999999999994], [169.0, 319.66666666666674], [170.0, 247.57142857142856], [171.0, 314.3999999999999], [172.0, 319.1], [173.0, 264.2380952380952], [174.0, 1178.4374999999998], [175.0, 749.65], [176.0, 1004.9999999999998], [177.0, 562.3333333333331], [178.0, 810.9999999999999], [179.0, 743.9655172413793], [180.0, 872.6666666666665], [181.0, 756.5238095238095], [182.0, 1030.2352941176473], [183.0, 678.1818181818181], [184.0, 757.846153846154], [185.0, 641.3636363636364], [186.0, 674.5333333333334], [187.0, 449.69230769230774], [188.0, 318.68292682926835], [189.0, 496.40909090909093], [190.0, 449.05], [191.0, 255.37499999999997], [192.0, 369.4193548387096], [193.0, 538.6799999999998], [194.0, 491.11538461538464], [195.0, 248.98275862068968], [196.0, 449.03448275862075], [197.0, 316.79999999999995], [198.0, 437.82758620689657], [199.0, 326.2857142857143], [200.0, 169.47523567007778]], "isOverall": false, "label": "db", "isController": false}, {"data": [[194.60194958302378, 174.83983985568062]], "isOverall": false, "label": "db-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 200.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 2352.266666666667, "minX": 1.7927529E12, "maxY": 1360001.1833333333, "series": [{"data": [[1.7927529E12, 22063.983333333334], [1.79275296E12, 1360001.1833333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7927529E12, 2352.266666666667], [1.79275296E12, 144981.4]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275296E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 118.29633300297324, "minX": 1.7927529E12, "maxY": 175.75731699472618, "series": [{"data": [[1.7927529E12, 118.29633300297324], [1.79275296E12, 175.75731699472618]], "isOverall": false, "label": "db", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275296E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 117.95143706640238, "minX": 1.7927529E12, "maxY": 175.75025730091093, "series": [{"data": [[1.7927529E12, 117.95143706640238], [1.79275296E12, 175.75025730091093]], "isOverall": false, "label": "db", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275296E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.011353402804579863, "minX": 1.7927529E12, "maxY": 0.7115956392467793, "series": [{"data": [[1.7927529E12, 0.7115956392467793], [1.79275296E12, 0.011353402804579863]], "isOverall": false, "label": "db", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275296E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.7927529E12, "maxY": 9013.0, "series": [{"data": [[1.7927529E12, 1614.0], [1.79275296E12, 9013.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.7927529E12, 3.0], [1.79275296E12, 1.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.7927529E12, 159.0], [1.79275296E12, 233.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.7927529E12, 1118.499999999999], [1.79275296E12, 373.9900000000016]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.7927529E12, 77.0], [1.79275296E12, 128.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.7927529E12, 207.0], [1.79275296E12, 273.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275296E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 54.0, "minX": 240.0, "maxY": 528.0, "series": [{"data": [[540.0, 413.0], [559.0, 418.0], [574.0, 378.0], [612.0, 377.0], [630.0, 322.0], [649.0, 307.0], [691.0, 335.0], [714.0, 353.0], [836.0, 305.0], [872.0, 269.5], [909.0, 307.0], [961.0, 213.0], [1006.0, 238.0], [1023.0, 199.0], [1075.0, 210.0], [1028.0, 212.0], [1043.0, 239.0], [1124.0, 182.0], [1108.0, 233.0], [1137.0, 221.0], [1174.0, 188.5], [1192.0, 183.0], [1155.0, 160.0], [1265.0, 124.0], [1241.0, 189.0], [1227.0, 207.0], [1274.0, 182.0], [1267.0, 194.0], [1304.0, 143.0], [1330.0, 187.0], [1454.0, 141.0], [1592.0, 136.0], [1662.0, 133.0], [1692.0, 133.0], [1724.0, 127.0], [1769.0, 126.0], [1776.0, 127.0], [1777.0, 122.0], [1738.0, 128.0], [1786.0, 123.0], [1800.0, 122.0], [1827.0, 121.0], [1854.0, 124.0], [1813.0, 125.0], [1878.0, 122.0], [1950.0, 122.0], [240.0, 66.0], [328.0, 290.5], [331.0, 313.0], [347.0, 54.0], [356.0, 293.5], [355.0, 349.0], [396.0, 249.0], [422.0, 147.5], [428.0, 154.5], [420.0, 528.0], [468.0, 442.0], [474.0, 445.5], [507.0, 413.0], [509.0, 404.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1950.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 54.0, "minX": 240.0, "maxY": 528.0, "series": [{"data": [[540.0, 413.0], [559.0, 418.0], [574.0, 378.0], [612.0, 377.0], [630.0, 322.0], [649.0, 307.0], [691.0, 335.0], [714.0, 353.0], [836.0, 305.0], [872.0, 269.5], [909.0, 307.0], [961.0, 213.0], [1006.0, 238.0], [1023.0, 199.0], [1075.0, 210.0], [1028.0, 212.0], [1043.0, 239.0], [1124.0, 182.0], [1108.0, 233.0], [1137.0, 221.0], [1174.0, 188.5], [1192.0, 183.0], [1155.0, 160.0], [1265.0, 124.0], [1241.0, 189.0], [1227.0, 207.0], [1274.0, 182.0], [1267.0, 194.0], [1304.0, 143.0], [1330.0, 187.0], [1454.0, 141.0], [1592.0, 136.0], [1662.0, 133.0], [1692.0, 133.0], [1724.0, 127.0], [1769.0, 126.0], [1776.0, 127.0], [1777.0, 122.0], [1738.0, 128.0], [1786.0, 123.0], [1800.0, 122.0], [1827.0, 121.0], [1854.0, 124.0], [1813.0, 125.0], [1878.0, 122.0], [1950.0, 122.0], [240.0, 65.5], [328.0, 290.5], [331.0, 313.0], [347.0, 54.0], [356.0, 293.5], [355.0, 349.0], [396.0, 249.0], [422.0, 147.0], [428.0, 154.5], [420.0, 528.0], [468.0, 442.0], [474.0, 445.5], [507.0, 413.0], [509.0, 404.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1950.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 18.016666666666666, "minX": 1.7927529E12, "maxY": 1035.2, "series": [{"data": [[1.7927529E12, 18.016666666666666], [1.79275296E12, 1035.2]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275296E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 16.816666666666666, "minX": 1.7927529E12, "maxY": 1036.4, "series": [{"data": [[1.7927529E12, 16.816666666666666], [1.79275296E12, 1036.4]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79275296E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 16.816666666666666, "minX": 1.7927529E12, "maxY": 1036.4, "series": [{"data": [[1.7927529E12, 16.816666666666666], [1.79275296E12, 1036.4]], "isOverall": false, "label": "db-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275296E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 16.816666666666666, "minX": 1.7927529E12, "maxY": 1036.4, "series": [{"data": [[1.7927529E12, 16.816666666666666], [1.79275296E12, 1036.4]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79275296E12, "title": "Total Transactions Per Second"}},
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

