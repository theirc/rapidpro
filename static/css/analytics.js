.box-sizing {
  -webkit-box-sizing: border-box;
  /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;
  /* Firefox, other Gecko */
  box-sizing: border-box /* Opera/IE 8+ */;
}
/* Message Bubble Colors */
.queued {
  color: #faa732;
}
.queued_instantly {
  color: #49afcd;
}
.pending {
  color: #faa732;
}
.pending_instantly {
  color: #51a351;
}
.sent {
  color: #51a351;
}
.delivered {
  color: #51a351;
}
.handled {
  color: #51a351;
}
.errored {
  color: #da4f49;
}
.failed {
  color: #da4f49;
}
/* SMS Table stylings */
.glyph.green {
  color: #51a351;
}
.glyph.orange {
  color: #faa732;
}
.glyph.red {
  color: #da4f49;
}
.glyph.grey {
  color: #ccc;
}
.glyph.blue {
  color: #49afcd;
}
.glyph.primary {
  color: #3498db;
}
.choropleth-map {
  height: 300px;
}
.results {
  margin-left: 320px;
  border-left: #ddd 1px solid;
  padding-left: 15px;
  padding-right: 15px;
}
#footer {
  display: none;
}
#page-container.container {
  width: 100%;
}
.slide-show,
.slide-hide {
  -webkit-transition: 200ms cubic-bezier(0.25, 0.25, 0.75, 0.75) all;
  -moz-transition: 200ms cubic-bezier(0.25, 0.25, 0.75, 0.75) all;
  -ms-transition: 200ms cubic-bezier(0.25, 0.25, 0.75, 0.75) all;
  -o-transition: 200ms cubic-bezier(0.25, 0.25, 0.75, 0.75) all;
  transition: 200ms cubic-bezier(0.25, 0.25, 0.75, 0.75) all;
  position: relative;
  display: block;
}
.slide-show.slide-show-active,
.slide-hide {
  opacity: 1;
  top: 0;
  height: 20px;
}
.slide-hide.slide-hide-active,
.slide-show {
  opacity: 0;
  top: -20px;
  height: 0px;
}
table.datatable {
  width: 100%;
  margin-top: 2px;
}
table.datatable .datatable-label {
  width: 25%;
  text-align: right;
  background-color: #f8f8f8;
}
table.datatable .datatable-value {
  text-align: right;
  width: 50px;
}
table.datatable .datatable-segment-odd {
  background-color: #F0F7FC;
}
table.datatable .datatable-segment {
  text-align: center;
}
#controls {
  margin-left: 0px;
  padding-bottom: 400px;
  overflow-y: auto;
  top: 0px;
  width: 290px;
  z-index: 6000;
  left: 0px;
  padding-bottom: 30px;
  padding-left: 30px;
  background: #fff;
  float: left;
  height: 92%;
}
#controls h5 {
  margin-top: 15px;
}
#controls.ui-scrollfix {
  top: 0px;
  left: 0px;
  position: fixed;
  padding-top: 15px;
}
#controls #field-selector {
  margin-bottom: 15px;
}
#controls .filter,
#controls .segment {
  background: #fff;
  padding: 10px;
  margin-bottom: 5px;
  color: #dddddd;
  cursor: pointer;
  border: 1px solid #e6e6e6;
}
#controls .filter .icon,
#controls .segment .icon {
  color: #dddddd;
}
#controls .filter.active,
#controls .segment.active {
  border: 1px solid #c4c4c4;
  background: #fff;
  color: #666666;
}
#controls .filter.active .icon,
#controls .segment.active .icon {
  color: #666666;
}
#controls .filter:hover,
#controls .segment:hover {
  border-color: #c4c4c4;
}
#controls .filter .segment-label,
#controls .segment .segment-label,
#controls .filter .filter-label,
#controls .segment .filter-label {
  margin-left: 2px;
}
#controls .filter .segment-categories .segment-category,
#controls .segment .segment-categories .segment-category,
#controls .filter .filter-categories .segment-category,
#controls .segment .filter-categories .segment-category,
#controls .filter .segment-categories .filter-category,
#controls .segment .segment-categories .filter-category,
#controls .filter .filter-categories .filter-category,
#controls .segment .filter-categories .filter-category {
  margin-top: 4px;
  margin-left: 3px;
  color: #666666;
}
#controls .filter .segment-categories .segment-category.field-visible-false .field-visible-check,
#controls .segment .segment-categories .segment-category.field-visible-false .field-visible-check,
#controls .filter .filter-categories .segment-category.field-visible-false .field-visible-check,
#controls .segment .filter-categories .segment-category.field-visible-false .field-visible-check,
#controls .filter .segment-categories .filter-category.field-visible-false .field-visible-check,
#controls .segment .segment-categories .filter-category.field-visible-false .field-visible-check,
#controls .filter .filter-categories .filter-category.field-visible-false .field-visible-check,
#controls .segment .filter-categories .filter-category.field-visible-false .field-visible-check {
  color: #888888;
}
.current-report-title {
  min-height: 50px;
}
.current-report-title a {
  margin-left: 10px;
}
.current-report-title #dirty-notification {
  font-size: 16px;
  padding-bottom: 0;
  padding-top: 0px;
  padding-right: 12px;
  height: 38px;
}
.current-report-title .current-report-label {
  width: 50%;
  margin-right: 0;
}
.current-report-title .current-report-description {
  font-size: 16px;
  margin-left: 5px;
}
.charts {
  padding-left: -5px;
  margin-left: 5px;
}
.charts .chart-title {
  border-bottom: 1px solid #ccc;
  margin-bottom: 0px;
  font-size: 36px;
  margin-right: 5px;
}
.charts .chart-title-responses {
  float: right;
  font-size: 12px;
  line-height: 100%;
  padding-top: 22px;
  padding-right: 10px;
}
.charts .chart-container {
  margin-bottom: 20px;
  display: inline-block;
  vertical-align: top;
}
.charts .chart-container-size-2 {
  width: 100%;
}
.charts .chart-container-size-2 .choropleth-map {
  height: 600px;
}
.charts .chart-container-size-1 {
  width: 50%;
}
.charts .chart-container-size-1 .leaflet-container .legend {
  line-height: 13px;
  color: #555;
  font-size: 10px;
}
.charts .chart-container-size-1 .leaflet-container .legend i {
  width: 13px;
  height: 13px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}
.charts .chart-container-size-1 .info.leaflet-control {
  padding-right: 5px;
  margin: 0;
}
.charts .chart-container-size-1 .info.leaflet-control .summary {
  padding: 0;
}
.charts .chart-container-size-1 .info.leaflet-control .summary .title {
  font-size: 20px;
  line-height: 20px;
  padding-right: 0;
}
.charts .chart-container-size-1 .info.leaflet-control .summary .total {
  font-weight: 13px;
  padding-right: 0px;
}
.charts .chart-container-size-1 .info.leaflet-control .summary .categories {
  margin-top: 5px;
}
.charts .chart-container-size-1 .info.leaflet-control .summary .categories .category {
  padding: 10px;
}
.charts .chart-container-size-1 .info.leaflet-control .summary .categories .category .pct {
  font-size: 22px;
}
.charts .chart-container-size-1 .info.leaflet-control .summary .categories .category .label {
  font-size: 10px;
}
.charts .chart-options {
  height: 32px;
  visibility: visible;
}
.charts .chart-options .chart-types {
  float: right;
  visibility: hidden;
}
.charts .chart-options .chart-sizes {
  visibility: hidden;
}
.charts .chart-options:hover .chart-table {
  visibility: visible;
}
.charts .chart-options:hover .chart-types {
  visibility: visible;
}
.charts .chart-options:hover .chart-sizes {
  visibility: visible;
}
.charts .chart-options .chart-table {
  visibility: hidden;
  margin-left: 2px;
  margin-top: 2px;
  float: right;
}
.charts .chart-options .chart-table.active {
  background: #3498db;
  color: #fff;
}
.charts .chart-options .chart-size {
  margin-top: 2px;
  display: inline-block;
  cursor: pointer;
  background: #ecf0f1;
  color: #fff;
  height: 30px;
}
.charts .chart-options .chart-size.active {
  background: #3498db;
}
.charts .chart-options .chart-size-1 {
  width: 30px;
}
.charts .chart-options .chart-size-2 {
  width: 60px;
}
.charts .option-bar {
  -ms-transform: rotate(90deg);
  /* IE 9 */
  -moz-transform: rotate(90deg);
  /* Firefox */
  -webkit-transform: rotate(90deg);
  /* Safari and Chrome */
  -o-transform: rotate(90deg);
  /* Opera */
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
}
.charts .chart-button {
  font-size: 20px;
  width: 20px;
  height: 20px;
  padding: 5px;
  color: #bdc3c7;
  background: #ecf0f1;
  display: inline-block;
  cursor: pointer;
}
.charts .chart-button.selected {
  background: #3498db;
  color: #fff;
}
.field-contacts {
  display: inline;
  font-size: 85%;
}
.field-count {
  font-size: 12px;
  margin-top: -3px;
}
.field-flow {
  font-weight: bold;
}
.field-flow option .count {
  font-weight: normal;
}
.field-rule {
  padding-left: 10px;
  display: inline;
  padding-right: 5px;
  font-size: 90%;
}
.fields li:hover {
  cursor: pointer;
}
.samples {
  width: 49%;
  display: inline-block;
  vertical-align: top;
}
.samples h2 {
  font-size: 30px;
  border-bottom: 1px solid #ecf0f1;
  margin-bottom: 30px;
  padding-bottom: 10px;
  margin-left: 25px;
}
.samples .flow {
  padding-left: 20px;
  margin-bottom: 30px;
}
.samples .flow .message-count {
  display: inline-block;
  width: 120px;
  font-size: 36px;
  margin-top: 5px;
  text-align: right;
  color: #9ba1a5;
  float: left;
  font-weight: bold;
}
.samples .flow .message-count:hover {
  color: #3498db;
  cursor: pointer;
}
.samples .flow .message-count .message-label {
  font-size: 11px;
  color: #bdc3c7;
  font-weight: 200;
}
.samples .flow .flow-name {
  margin-left: 135px;
  line-height: 24px;
  font-size: 24px;
}
.samples .flow .flow-name:hover {
  color: #3498db;
  cursor: pointer;
}
.samples .flow .field-count {
  margin-left: 135px;
  font-size: 14px;
  margin-top: 6px;
}
.samples .flow .field-count:hover {
  color: #3498db;
  cursor: pointer;
}
.samples .flow .last-message {
  margin-left: 135px;
  color: #9ba1a5;
}
ul.fields,
ul.filters,
ul.segments {
  margin-top: 5px;
  margin-left: 0px;
  margin-bottom: 0;
  width: 95%;
}
ul.fields .field,
ul.filters .field,
ul.segments .field {
  background: #fff;
}
ul.reports {
  margin-bottom: 10px;
  padding-left: 0px;
}
ul.reports .report .report-label {
  margin-right: 0;
  margin-left: 0px;
  padding-left: 10px;
}
.field-button {
  float: right;
  color: #fff;
  margin-left: 10px;
  margin-top: 2px;
}
.field:hover .field-button {
  color: #999;
}
.field:hover .field-button:hover {
  color: #333;
}
.field-visible-true {
  color: #333;
}
.field-visible-true .field-visible-check:before {
  content: "\e05a";
}
.field-visible-false {
  color: #999;
}
.field-visible-false .field-visible-check:before {
  content: "\e004";
}
.icon {
  font-family: 'temba';
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}
.icon:hover {
  cursor: pointer;
}
.info.leaflet-control .summary {
  padding: 20px;
}
.info.leaflet-control .summary .title {
  font-size: 36px;
  font-weight: 100;
  text-align: right;
  color: #666;
  line-height: 36px;
  padding-right: 15px;
}
.info.leaflet-control .summary .total {
  text-align: right;
  color: #666;
  font-weight: 200;
  padding-right: 15px;
}
.info.leaflet-control .summary .categories {
  margin-top: 15px;
  float: right;
  line-height: 1;
}
.info.leaflet-control .summary .categories .category {
  border-top: 1px solid #eee;
  padding: 15px;
}
.info.leaflet-control .summary .categories .category.category-0 .pct {
  color: #44ac7b;
}
.info.leaflet-control .summary .categories .category.category-1 .pct {
  color: #e9446a;
}
.info.leaflet-control .summary .categories .category .label {
  display: block;
  background: none;
  border: none;
  color: #bbb;
  font-size: 14px;
  text-align: right;
}
.info.leaflet-control .summary .categories .category .count {
  font-size: 14px;
  color: #aaa;
  display: none;
  text-align: center;
}
.info.leaflet-control .summary .categories .category .pct {
  font-size: 48px;
  font-weight: 200;
}
.info.leaflet-control .summary .categories .category .pct .unit {
  font-size: 60%;
}
.chart-container {
  margin-bottom: 10px;
}
.chart-container .leaflet-container {
  background: #fff;
}
.legend {
  line-height: 18px;
  color: #666;
}
.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}
