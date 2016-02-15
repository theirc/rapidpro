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
input#id_min_value {
  width: 60px;
}
input#id_max_value {
  width: 60px;
}
.glyph.message-label.checked:before {
  content: "\e05a";
}
.glyph.message-label.partial:before {
  content: "\e003";
}
.glyph.message-label.checked-child:before {
  content: "\e003";
}
.glyph.checked:before {
  content: "\e05a";
}
.glyph.message-label:before {
  content: "\e004";
}
.glyph.message-label.checked:before {
  content: "\e05a";
}
.dropdown-submenu:hover > a:after {
  border-left-color: #CCC;
}
.label-menu .glyph {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  color: #999;
  font-size: 12px;
  margin-top: 2px;
  width: 12px;
}
.label-menu.dropdown-menu a {
  padding-left: 10px;
  padding-right: 10px;
}
.dropdown-submenu > a::after {
  margin-right: -5px;
}
td.value-received {
  text-align: right;
}
td.checkbox .glyph {
  font-size: 14px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}
.radio,
.checkbox {
  min-height: 18px;
  padding-left: 18px;
}
tr.sms:hover {
  cursor: pointer;
}
tr.sms.checked .glyph.message-checkbox:before {
  content: "\e05a";
}
.sms_list tbody td.checkbox {
  color: #777;
}
.glyph.message-checkbox:before {
  content: "\e004";
}
.glyph.message-checkbox,
.glyph.message-label {
  font-family: 'temba';
  speak: none;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  float: left;
  margin-top: 3px;
  margin-right: 5px;
}
a:hover.clear-link {
  text-decoration: none;
}
.value-labels {
  float: right;
}
.rotate {
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
}
.float-left {
  float: left;
}
.send-form {
  width: 682px;
  padding-bottom: 10px;
  background-color: #efefef;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 18px;
  border-left: 1px solid #dedede;
  border-right: 1px solid #dedede;
  border-top: 1px solid #eee;
}
#id_text {
  width: 510px;
  height: 50px;
  padding: 10px;
  margin-right: 15px;
}
#id_send {
  vertical-align: bottom;
  margin-bottom: 10px;
}
td.clickable a {
  color: #333333;
}
.force-wrap {
  word-break: break-all;
}
.spin {
  -webkit-animation: rotation 2s infinite linear;
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}
#page-container {
  /* firefox 19+ */
  /* ie */
}
#page-container ::-webkit-input-placeholder {
  color: #e6e6e6;
  font-weight: 200;
}
#page-container ::-moz-placeholder {
  color: #e6e6e6;
  font-weight: 200;
}
#page-container :-ms-input-placeholder {
  color: #e6e6e6;
  font-weight: 200;
}
#page-container input:-moz-placeholder {
  color: #e6e6e6;
  font-weight: 200;
}
[class^="icon-"],
[class*=" icon-"] {
  background-image: none;
}
.btn,
.btn-group,
.dropdown,
.dropdown-toggle,
.dropdown-menu,
.btn-group > .btn:first-child,
.btn-group > .btn:last-child {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}
.btn-group > .btn:last-child,
.btn-group > .dropdown-toggle {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}
.btn.btn-mini {
  padding: 1px 6px;
  margin-right: 0;
  margin-left: 0;
  float: left;
}
.btn.remove {
  margin-right: 5px;
}
.btn.disabled,
.btn[disabled] {
  opacity: 0.15;
}
.table-condensed th,
.table-condensed td {
  padding: 7px 6px;
}
.label,
.badge {
  text-shadow: none;
}
.dropdown-menu li > a:hover,
.dropdown-menu li > a:focus,
.dropdown-submenu:hover > a {
  background: #e4eff8;
  color: #2c3e50;
  text-shadow: none;
}
.nav > li > a {
  text-shadow: none;
}
.nav > li > a:hover {
  background: #e4eff8;
  color: #2980b9;
  text-shadow: none;
  margin-right: -15px;
}
.nav-list .active > a {
  background: #e4eff8;
  color: #2980b9;
  text-shadow: none;
}
.nav-list .active > a:hover {
  background: #e4eff8;
  color: #2980b9;
  text-shadow: none;
}
.nav-list.level2 a {
  margin-right: -30px;
}
.nav-list.level2 a:hover {
  margin-right: -30px;
}
li {
  list-style-type: none;
}
ul.recipients-list {
  padding: 0;
  margin: 0;
}
ul.recipients-list li {
  padding: 0;
}
form,
input {
  margin: 0;
}
.input-append .add-on,
.input-prepend .add-on,
.input-append .btn,
.input-prepend .btn {
  margin-left: -1px;
  vertical-align: top;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}
.input-append input,
.input-prepend input,
.input-append select,
.input-prepend select,
.input-append .uneditable-input,
.input-prepend .uneditable-input {
  position: relative;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 14px;
  vertical-align: top;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}
.input-append .add-on,
.input-prepend .add-on {
  display: inline-block;
  width: auto;
  height: 25px;
  min-width: 16px;
  padding: 4px 5px;
  font-size: 14px;
  font-weight: 400;
  line-height: 25px;
  text-align: center;
  text-shadow: 0 1px 0 #fff;
  background-color: #eee;
  border: 1px solid #ccc;
}
.input-prepend .add-on:first-child,
.input-prepend .btn:first-child {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}
input,
textarea {
  width: 350px;
}
select,
textarea,
input[type="text"],
input[type="password"],
input[type="datetime"],
input[type="datetime-local"],
input[type="date"],
input[type="month"],
input[type="time"],
input[type="week"],
input[type="number"],
input[type="email"],
input[type="url"],
input[type="search"],
input[type="tel"],
input[type="color"],
.uneditable-input {
  display: inline-block;
  height: 25px;
  padding: 4px 6px;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}
.uneditable-input {
  line-height: 25px;
}
form.form-horizontal textarea,
form.form-vertical textarea {
  height: auto;
  margin-bottom: 5px;
}
.form-horizontal .controls,
.form-horizontal .form-control {
  margin-left: 10px;
}
.formax-form .form-horizontal .form-control {
  margin-left: 0px;
}
.form-horizontal .formax-vertical .form-control {
  margin-left: 0px;
}
.form-horizontal .control-label {
  float: left;
  width: 150px;
  padding-top: 5px;
  margin-right: 10px;
  text-align: right;
}
.smartmin-form-buttons,
.form-actions {
  background-color: transparent;
  border: 0;
}
.form-horizontal .smartmin-form-buttons {
  padding-left: 160px;
}
.nav > li > a {
  display: block;
  font-weight: 200;
  color: #2980b9;
}
.nav-list > li > a {
  padding: 6px 15px;
}
.pagination ul > li > a,
.pagination ul > li > span {
  float: left;
  padding: 4px 12px;
  line-height: 20px;
  text-decoration: none;
  background-color: #ffffff;
  border: 0px solid #dddddd;
  border-left-width: 0;
}
.pagination ul {
  display: inline-block;
  margin-bottom: 0;
  margin-left: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
  -webkit-box-shadow: 0;
  -moz-box-shadow: 0;
  box-shadow: none;
}
.pagination a,
.pagination span {
  float: left;
  padding: 0 14px;
  line-height: 48px;
  text-decoration: none;
  background-color: #fff;
  border-left-width: 0;
}
.pagination a {
  float: left;
  padding: 0 14px;
  line-height: 48px;
  text-decoration: none;
  border: 0;
  border-left-width: 0;
}
.pagination a {
  line-height: 30px;
}
.pagination ul > li:first-child > a,
.pagination ul > li:first-child > span {
  border-left-width: 0px;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}
.pagination ul > li:last-child > a,
.pagination ul > li:last-child > span {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}
body.modal-open {
  overflow: hidden;
}
.btn.disabled {
  opacity: 0.2;
}
html,
body {
  height: 100%;
}
body {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 200;
  text-transform: none;
}
.container {
  min-height: 100%;
  padding-top: -130px;
  padding-bottom: -380px;
  position: relative;
}
a {
  color: #2980b9;
}
h1,
h2,
h3,
h4,
h5 {
  font-family: 'Helvetica Neue', 'RobotoThin', sans-serif;
  letter-spacing: 1px;
  padding: 0;
  text-transform: none;
  font-weight: 100;
  color: #666;
}
h1 {
  font-size: 44px;
  line-height: 40px;
}
h2 {
  font-size: 42px;
}
h3 {
  font-size: 26px;
}
h5 {
  font-weight: 300;
  color: #999999;
  margin-bottom: 5px;
}
.btn {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  background-image: none;
  border: 0;
  padding: 8px 20px;
  font-weight: 300;
  margin-right: 0px;
}
.btn-group .btn {
  margin-right: 0;
}
.btn-group .tooltip {
  top: -38px !important;
}
.btn-group.open .btn.dropdown-toggle {
  background-color: #cacecf;
  color: #646869;
  text-shadow: none;
}
.btn {
  border: 1px solid #e6eaeb;
  background-color: #ecf0f1;
  background-image: -webkit-linear-gradient(top, #ecf0f1, #dce0e1);
  background: -moz-linear-gradient(top, #ecf0f1, #dce0e1);
  color: #646869;
  text-shadow: none;
}
.btn:hover,
.btn:focus,
.btn:active,
.btn.open {
  background-color: #dbdfe0;
  background-image: none;
  color: #646869;
  text-shadow: none;
}
.btn-primary {
  border: 1px solid #237ab3;
  background-color: #2980b9;
  background-image: -webkit-linear-gradient(top, #2980b9, #1970a9);
  background: -moz-linear-gradient(top, #2980b9, #1970a9);
  color: #fff;
  text-shadow: none;
}
.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active,
.btn-primary.open {
  background-color: #186fa8;
  background-image: none;
  color: #fff;
  text-shadow: none;
}
.group-membership {
  display: inline-block;
}
.group-membership .btn.btn-primary {
  border: 0px;
}
.btn-danger {
  border: 1px solid #e14636;
  background-color: #e74c3c;
  background-image: -webkit-linear-gradient(top, #e74c3c, #d73c2c);
  background: -moz-linear-gradient(top, #e74c3c, #d73c2c);
  color: #fff;
  text-shadow: none;
}
.btn-danger:hover,
.btn-danger:focus,
.btn-danger:active,
.btn-danger.open {
  background-color: #d63b2b;
  background-image: none;
  color: #fff;
  text-shadow: none;
}
.btn-success {
  border: 1px solid #28c66b;
  background-color: #2ecc71;
  background-image: -webkit-linear-gradient(top, #2ecc71, #1ebc61);
  background: -moz-linear-gradient(top, #2ecc71, #1ebc61);
  color: #fff;
  text-shadow: none;
}
.btn-success:hover,
.btn-success:focus,
.btn-success:active,
.btn-success.open {
  background-color: #1dbb60;
  background-image: none;
  color: #fff;
  text-shadow: none;
}
.btn-tiny {
  padding: 3px 8px;
  font-size: 12px;
}
.label-info,
.badge-info {
  background-color: #3498db;
}
.label {
  border: 1px solid #2387ca;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
  font-weight: 200;
  font-size: 10px;
  padding: 2px 4px 0px 4px;
  margin-right: 0px;
  height: 16px;
  line-height: 16px;
  display: inline-block;
  white-space: nowrap;
  vertical-align: baseline;
  color: #FFF;
  padding-top: 0px;
}
.label.label-success {
  border: 1px solid #297536;
  background-color: #3a8647;
}
.label.label-group {
  margin-right: -4px;
  margin-left: 0;
  padding: 2px 6px;
}
.label.label-group.remove {
  line-height: 14px;
  font-size: 14px;
  text-align: match-parent;
  padding: 2px 6px;
  margin-right: 1px;
  margin-top: 0px;
}
.label.btn {
  border: 0;
}
.glyph {
  line-height: 1;
  text-decoration: none;
  font-size: 16px;
}
.glyph.success {
  color: #5ca869;
}
.glyph.warning {
  color: #e68628;
}
a.logo {
  color: #fff;
  font-size: 96px;
  margin-top: -2px;
  text-decoration: none;
}
.spacer-right-10 {
  padding-right: 10px;
}
.spacer-bottom-12 {
  margin-bottom: 12px;
}
.search-details {
  float: left;
  margin-top: 10px;
  width: 650px;
}
table.list-table td.value-phone {
  width: 100px;
}
table.list-table td.value-received {
  width: 50px;
  text-align: right;
}
table.list-table td.value-icon {
  width: 20px;
  text-align: right;
  padding-right: 0px;
}
table.list-table tr:hover td {
  color: #000;
}
table.list-table tr td.checkbox {
  cursor: pointer;
  color: #999999;
}
table.list-table tr:hover td.checkbox {
  color: #999999;
}
table.list-table tr:hover td.checkbox:hover {
  color: #3498db;
}
.empty-message {
  padding: 30px 20px;
  font-size: 16px;
  font-weight: normal;
  letter-spacing: .1em;
}
.empty-message p {
  padding-top: 0;
  margin-top: 0;
}
.logo {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  padding-left: 30px;
  padding-top: 20px;
}
#top-menu {
  position: absolute;
  width: 600px;
  z-index: 1025;
  height: 60px;
  top: 38px;
  text-align: right;
  right: 20px;
  padding-right: 50px;
}
#top-menu li {
  border: 0px solid red;
  display: inline-block;
  position: relative;
  font-size: 40px;
  margin-left: 10px;
  z-index: 20;
  width: 55px;
}
#top-menu li.more {
  width: 5px;
  margin-left: 10px;
  padding-left: -5px;
  padding-right: -5px;
}
#top-menu li.more a {
  width: 5px;
}
#top-menu li.more:hover a.icon-more {
  padding-bottom: 25px;
}
#top-menu li.more:hover a.icon-more:before {
  content: "\e0be";
}
#top-menu li .submenu-container {
  position: absolute;
  top: 35px;
  left: -12px;
  width: 55px;
  padding: 10px 5px;
  padding-bottom: 40px;
  z-index: 2000;
}
#top-menu li .submenu-container .submenu {
  position: relative;
  width: 50px;
  top: 10px;
  background: #fff;
  -webkit-box-shadow: 0 1px 1px 3px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 1px 1px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px 3px rgba(0, 0, 0, 0.1);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  border: 1px solid #2387ca;
}
#top-menu li .submenu-container .submenu::before {
  position: absolute;
  top: -7px;
  left: 19px;
  display: inline-block;
  border-right: 7px solid transparent;
  border-bottom: 7px solid #CCC;
  border-left: 7px solid transparent;
  border-bottom-color: #ffffff;
  content: '';
}
#top-menu li .submenu-container .submenu a {
  font-size: 28px;
  color: #2387ca;
  padding-top: 5px;
  display: inline-block;
  width: 50px;
  height: 50px;
  position: relative;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 0px;
}
#top-menu li .submenu-container .submenu a .title {
  border: 0px solid green;
  color: #2387ca;
  padding: 0px;
  width: 50px;
  margin: 0;
  margin-left: 0px;
  margin-top: 8px;
}
#top-menu li .title {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 12px;
  text-align: center;
  width: 60px;
  height: 10px;
  margin-top: 5px;
  color: #fff;
  border: 0px solid green;
}
#top-menu li .notification {
  position: absolute;
  padding: 3px 3px;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 12px;
  background: #da4f49;
  color: #fff;
  line-height: 12px;
  left: 34px;
  top: -10px;
  text-align: center;
  border-radius: 2px;
  -moz-border-radius: 2px;
  box-shadow: 1px 1px 0px #666;
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.8);
  border: 0px solid maroon;
}
#top-menu li .notification.icon-warning {
  font-family: temba;
}
#top-menu li a {
  color: #fff;
  text-decoration: none;
  text-transform: lowercase;
  display: inline-block;
  border: 0px solid black;
  height: 50px;
  width: 60px;
  text-align: center;
}
#top-menu li a.icon-nav-messages.active:before {
  content: "\e085";
}
#top-menu li a.icon-nav-messages:hover:before {
  content: "\e085";
}
#top-menu li a.icon-nav-learn.active:before {
  content: "\e0b9";
}
#top-menu li a.icon-nav-learn:hover:before {
  content: "\e0b9";
}
#top-menu li a.icon-nav-docs.active:before {
  content: "\f15c";
}
#top-menu li a.icon-nav-docs:hover:before {
  content: "\f15c";
}
#top-menu li a.icon-nav-analytics.active:before {
  content: "\e087";
}
#top-menu li a.icon-nav-analytics:hover:before {
  content: "\e087";
}
#top-menu li a.icon-more.active:before {
  content: "\e0be";
}
#top-menu li a.icon-more:hover:before {
  content: "\e0be";
}
#top-menu li a.icon-nav-orgs.active:before {
  content: "\e0ad";
}
#top-menu li a.icon-nav-orgs:hover:before {
  content: "\e0ad";
}
#top-menu li a.icon-nav-flows.active:before {
  content: "\e08c";
}
#top-menu li a.icon-nav-flows:hover:before {
  content: "\e08c";
}
#top-menu li a.icon-nav-contacts.active:before {
  content: "\e081";
}
#top-menu li a.icon-nav-contacts:hover:before {
  content: "\e081";
}
#top-menu li a.icon-nav-channels.active:before {
  content: "\e098";
}
#top-menu li a.icon-nav-channels:hover:before {
  content: "\e098";
}
#top-menu li a.icon-nav-home.active:before {
  content: "\e083";
}
#top-menu li a.icon-nav-home:hover:before {
  content: "\e083";
}
#top-menu li a.icon-nav-login:hover:before {
  content: "\e090";
}
#top-menu li a.icon-nav-login.active:before {
  content: "\e090";
}
#top-menu li a.icon-nav-channels:hover:before {
  content: "\e098";
}
#top-menu li a.icon-nav-channels.active:before {
  content: "\e098";
}
#top-menu li a.icon-nav-pricing:hover:before {
  content: "\e09e";
}
#top-menu li a.icon-nav-pricing.active:before {
  content: "\e09e";
}
#top-menu li a.icon-nav-groups.active:before {
  content: "\e08e";
}
#top-menu li a.icon-nav-groups:hover:before {
  content: "\e08e";
}
#top-menu li a.icon-nav-dashboard.active:before {
  content: "\e0a3";
}
#top-menu li a.icon-nav-dashboard:hover:before {
  content: "\e0a3";
}
#top-menu li a.icon-nav-triggers.active:before {
  content: "\e0a5";
}
#top-menu li a.icon-nav-triggers:hover:before {
  content: "\e0a5";
}
#top-menu li a.icon-nav-locations.active:before {
  content: "\e601";
}
#top-menu li a.icon-nav-locations:hover:before {
  content: "\e601";
}
#top-menu li a.icon-nav-campaigns:hover:before {
  content: "\e0bc";
}
#top-menu li a.icon-nav-campaigns.active:before {
  content: "\e0bc";
}
#top-menu li a.icon-nav-blog.active:before {
  content: "\e0b7";
}
#top-menu li a.icon-nav-blog:hover:before {
  content: "\e0b7";
}
#top-menu li a.icon-nav-logout.active:before {
  content: "\e0c8";
}
#top-menu li a.icon-nav-logout:hover:before {
  content: "\e0c8";
}
@media all and (max-width: 767px) {
  #top-menu {
    text-align: right;
    left: 0;
    top: 110px;
    width: 350px;
    text-align: left;
    padding: 0;
  }
  #top-menu li {
    width: 25px;
    height: 25px;
    font-size: 24px;
    text-align: left;
    padding-bottom: 10px;
    margin: 0;
    margin-right: 10px;
  }
  #top-menu li.more .submenu-container {
    text-transform: lowercase;
    left: -20px;
    top: 14px;
  }
  #top-menu li.more .submenu-container .submenu {
    -webkit-box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.25);
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.25);
  }
  #top-menu li.more .submenu-container .submenu a {
    height: 22px;
    font-size: 24px;
  }
  #top-menu li .notification {
    font-size: 8px;
    left: 15px;
    top: -8px;
    line-height: 8px;
    width: 12px;
    height: 12px;
    padding: 1px;
    padding-top: 3px;
    padding-bottom: 0px;
  }
  #top-menu li a {
    width: 25px;
    height: 25px;
    padding: 0;
  }
  #top-menu li a .title {
    display: none;
  }
}
.nav-alert {
  position: absolute;
  top: 110px;
  right: 50px;
  text-align: center;
  float: right;
  color: #fff;
  background: rgba(0, 0, 0, 0.15);
  margin-top: 0px;
  height: 20px;
  padding: 1px 20px;
  -webkit-border-radius: 3px 3px 0px 0px;
  -moz-border-radius: 3px 3px 0px 0px;
  -ms-border-radius: 3px 3px 0px 0px;
  -o-border-radius: 3px 3px 0px 0px;
  border-radius: 3px 3px 0px 0px;
  font-size: 11px;
  font-weight: 200;
}
.nav-alert a {
  color: #fff;
}
.nav-alert a:hover {
  text-decoration: none;
  color: #f3f3f3;
}
.nav-alert.interrupted {
  background: #b2171a;
}
.nav-alert .icon-warning {
  margin-right: 1px;
}
@media all and (max-width: 767px) {
  .nav-alert {
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    -o-border-radius: 3px;
    border-radius: 3px;
    margin-top: 10px;
    right: 50px;
    top: 25px;
    width: 170px;
    background: none;
    text-align: left;
    font-size: 12px;
    padding: 0;
  }
}
a.org-choose {
  padding: 5px;
  background: #eee;
  margin-bottom: 10px;
  display: block;
  color: #333;
  line-height: 50px;
  width: 500px;
  height: 50px;
}
a.org-choose .name {
  margin-left: 50px;
}
a.org-choose .icon-home {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 30px;
  float: left;
}
a.org-choose:hover {
  color: #f5f5f5;
  text-decoration: none;
  background-color: #3498db;
}
.org-header {
  z-index: 1039;
  position: absolute;
  top: -7px;
  right: 50px;
  text-align: center;
  float: right;
  background: rgba(0, 0, 0, 0.15);
  margin-top: 0px;
  padding-top: 6px;
  font-size: 11px;
  min-width: 100px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
}
.org-header a {
  color: #fff;
  text-decoration: none;
}
.org-header a:hover {
  text-decoration: none;
  color: #f3f3f3;
}
.org-header .icon-warning {
  color: #da4f49;
}
.org-header .org {
  line-height: 14px;
  padding: 3px 10px;
  padding-bottom: 5px;
  min-width: 150px;
}
.org-header .other-orgs {
  width: 100%;
  margin: -10px;
  background: #fff;
  margin-top: -2px;
  text-align: left;
  border: 1px solid #1276b9;
}
.org-header .other-orgs .account-details {
  padding: 5px 0px;
  border-bottom: 1px solid #ccc;
  margin: 0 10px;
  margin-bottom: 3px;
}
.org-header .other-orgs .account-details a {
  color: #2387ca;
}
.org-header .other-orgs .account-details .org {
  padding: 0;
}
.org-header .other-orgs .org {
  max-width: 200px;
}
.org-header .other-orgs .org a {
  color: #2387ca;
}
.org-header .other-orgs .org a:hover {
  color: #0165a8;
}
.org-header.expanded {
  -webkit-box-shadow: 0 1px 1px 3px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 1px 1px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px 3px rgba(0, 0, 0, 0.1);
}
.org-header.expanded .other-orgs {
  display: inline-block;
  -webkit-border-radius: 0 0 3px 3px;
  -moz-border-radius: 0 0 3px 3px;
  -ms-border-radius: 0 0 3px 3px;
  -o-border-radius: 0 0 3px 3px;
  border-radius: 0 0 3px 3px;
}
#header {
  background-color: #2387ca;
  padding-top: 32px;
  padding-bottom: 20px;
  margin-bottom: 30px;
  border: 0px solid pink;
  z-index: 0;
  position: relative;
  height: 80px;
}
@media all and (max-width: 940px) and (min-width: 767px) {
  #header {
    min-width: 940px;
  }
}
@media all and (max-width: 767px) {
  #header {
    margin-left: -20px;
    margin-right: -20px;
    padding-left: 20px;
    padding-right: 20px;
    height: 100px;
  }
}
#header #menu-right-container {
  height: 60px;
  position: absolute;
  width: 600px;
  top: 10px;
  right: 0px;
  overflow-x: hidden;
}
#header #menu-right-container #menu-right {
  float: right;
  border: 1px solid yellow;
  height: 60px;
  width: 600px;
}
#header #menu-left {
  height: 70px;
  border: 0px solid yellow;
}
#print-header {
  text-align: right;
  font-size: 32px;
  margin-right: 20px;
  color: #666;
  display: none;
}
.instructions {
  font-size: 16px;
  margin-bottom: 20px;
  color: #999;
  line-height: 25px;
  width: 80%;
}
@media screen {
  .instructions {
    display: gone;
  }
}
form.smartmin-form .help-block {
  margin-top: 0px !important;
}
form.smartmin-form .uneditable-input {
  margin-bottom: 5px;
}
form.smartmin-form select {
  margin-bottom: 9px;
}
form.smartmin-form .select2-container {
  margin-bottom: 5px;
}
form.smartmin-form ul.errorlist {
  margin: 0;
}
form.smartmin-form ul.errorlist li {
  color: #952624;
}
form.smartmin-form .alert-error {
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  -ms-border-radius: 0px;
  -o-border-radius: 0px;
  border-radius: 0px;
}
.sort-placeholder {
  border-top: 1px solid #dbdfe0;
  border-bottom: 1px solid #dbdfe0;
  background-color: #f5f9fa;
  width: 94%;
}
input[type='text'].search-query {
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  -ms-border-radius: 12px;
  -o-border-radius: 12px;
  border-radius: 12px;
  width: 200px;
  padding: 5px 15px;
  padding-top: 2;
  font-size: 14px;
  font-weight: 200;
}
.top-bar {
  margin-top: 5px;
  border-top: 0px;
}
.top-form {
  margin-top: 15px;
}
.title-icon .glyph {
  margin-top: 22px;
  font-size: 56px;
  line-height: 0;
  color: #999;
  float: left;
}
.title-icon .glyph.icon-bubble-notification {
  margin-top: 35px;
}
.title-icon + .title-text {
  margin-left: 85px;
}
.title-text h2 {
  margin-bottom: 0px;
  margin-top: 0px;
}
.title-text h5 {
  margin-bottom: 0px;
  margin-top: 2px;
}
#gear-container {
  height: 46px;
  display: inline-block;
}
#gear-container .gear-menu .dropdown-menu {
  left: -96px;
}
#gear-container .gear-menu .dropdown-menu li > a {
  padding: 8px 8px;
}
#gear-container .gear-menu .btn {
  padding: 8px 20px;
}
#gear-container .gear-menu .glyph {
  color: #646869;
}
#gear-container .gear-menu .caret {
  border-top-color: #646869;
}
#big-help {
  font-size: 250px;
  color: #bdc3c7;
  margin-top: 20px;
}
@media (max-width: 2000px) {
  #big-help {
    font-size: 180px;
    height: 200px;
    margin-left: 25px;
  }
}
@media (max-width: 768px) {
  #big-help {
    font-size: 80px;
    height: 200px;
    margin-left: 25px;
    display: none;
  }
}
#big-help.icon-vcard {
  margin-top: -30px;
}
.medium-help {
  color: #999;
  height: 90px;
  font-size: 72px;
}
.medium-glyph {
  line-height: 1;
  font-size: 18px;
  text-decoration: none;
}
#footer {
  border-top: #ddd 1px solid;
  background: #f6f6f6;
  color: #999999;
  padding-top: 20px;
  min-height: 360px;
  position: relative;
  margin-top: 40px;
}
#footer ul#contact-info {
  list-style: none;
}
#footer ul#contact-info .field {
  font-weight: bold;
}
#footer ul#contact-info .glyph {
  font-size: 20px;
  float: left;
  line-height: 18px;
  margin-right: 15px;
  margin-bottom: 25px;
}
#footer #copyright {
  color: #CCC;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 10px;
}
@media all and (max-width: 767px) {
  #footer {
    margin-left: -20px;
    margin-right: -20px;
    padding-left: 20px;
    padding-right: 20px;
  }
}
.italics {
  font-style: italic;
}
#sidebar-nav {
  border: 1px solid #e6e6e6;
}
#sidebar-nav .nav li a {
  font-size: 13px;
}
.message-buttons {
  margin-bottom: 0px;
}
tr.checked td {
  background-color: #e4eff8;
  color: #2c3e50;
}
#omni #omni-select2 {
  margin-top: 30px;
}
#omni #loading {
  font-size: 14px;
  border: 1px solid #f6f6f6;
  padding: 10px 0;
  color: #CCC;
  margin-top: 30px;
  background-image: url('../images/loader-bars.gif');
  background-repeat: no-repeat;
  background-position: 97% 50%;
}
#omni #loading:after {
  content: 'Loading recipients..';
  padding-left: 10px;
}
.select2-container-multi .select2-choices .select2-search-field input.select2-active {
  background: #fff url('../images/loader-bars.gif?asdfasdf') no-repeat 100% !important;
}
.select2tag {
  width: 50%;
}
.select2-match {
  text-decoration: underline;
}
.select2-container-multi .select2-choices .select2-search-field input {
  margin: 0 0;
  font-family: sans-serif;
  font-size: 14px;
  height: 20px;
  width: 100%;
  padding: 8px 4px;
}
.select2-container-multi .select2-choices .select2-search-choice {
  margin-top: 6px;
  margin-bottom: -2px;
  line-height: 14px;
  font-size: 14px;
  height: 16px;
  color: #333;
  cursor: default;
}
.select2-container-multi .select2-choices {
  position: static;
}
.select2-container .select2-choice .select2-arrow {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}
.select2-choices .omni-option:before,
.select2-results .omni-option:before {
  font-family: temba;
  color: #999;
  font-size: 14px;
  margin-right: 5px;
}
.select2-choices .omni-group:before,
.select2-results .omni-group:before {
  content: "\e03c";
}
.select2-choices .omni-contact:before,
.select2-results .omni-contact:before {
  content: "\e03b";
}
.select2-choices .omni-tel:before,
.select2-results .omni-tel:before {
  content: "\e04a";
}
.select2-choices .omni-twitter:before,
.select2-results .omni-twitter:before {
  content: "\e007";
}
.select2-choices .omni-telegram:before,
.select2-results .omni-telegram:before {
  content: "\e900";
  padding-top: 5px;
}
.select2-temba-field,
.select2-temba-user-group-field {
  width: 520px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  border-radius: 0px;
  -webkit-border-radius: 0px;
  margin-bottom: 5px;
}
.select2-no-search .select2-search {
  display: none;
}
.select2-container .select2-choice {
  border-radius: 0px;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  padding: 3px 5px;
  background: #FFFFFF;
  overflow: inherit;
  font-weight: 200;
}
.select2-container .select2-choice div {
  width: 20px;
  padding: 2px 5px;
  border-radius: 0px;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  background-color: #f6f6f6;
  background-image: none;
}
.select2-container {
  font-size: 14px;
}
.select2-highlighted .omni-option:before {
  color: #eee;
}
.select2-container .select2-choice .select2-arrow b {
  margin-top: 3px;
  margin-left: 3px;
}
.select2-container .select2-choice .select2-arrow {
  width: 23px;
}
#send-message label {
  margin-top: 0px;
  color: #666;
}
#send-message #id_text {
  width: 96%;
  min-height: 80px;
}
#send-message #counter {
  font-size: 12px;
  float: right;
}
#send-message #errors {
  margin-top: 10px;
}
form.smartmin-form ul.errorlist li {
  color: #b94a48;
}
.form-horizontal .form-actions {
  padding-left: 160px;
}
.form-actions {
  padding: 0px;
  margin-top: 0px;
}
#modal-container .smartmin-form-buttons,
#modal-container .form-actions {
  display: none;
}
#modal-container .span12 {
  width: 100%;
  margin-left: 0;
}
@media (min-width: 767px) and (max-width: 979px) {
  .modal {
    width: 655px;
    margin-left: -330px;
  }
}
.modal,
.send-message {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}
.modal .span12,
.send-message .span12 {
  width: 100%;
  margin-left: 0;
}
.modal .smartmin-form-buttons,
.send-message .smartmin-form-buttons,
.modal .form-actions,
.send-message .form-actions {
  display: none;
}
.modal .modal-header,
.send-message .modal-header {
  padding: 10px 15px 8px 15px;
  border-bottom: 1px solid #186fa8;
  background: #2980b9;
  color: #FFF;
}
.modal .modal-header .title,
.send-message .modal-header .title {
  color: #FFF;
}
.modal .modal-header #modal-title,
.send-message .modal-header #modal-title {
  color: #FFF;
  font-size: 22px;
  font-weight: 200;
  bottom: 15px;
  top: -2px;
  position: relative;
}
.modal .modal-header .glyph,
.send-message .modal-header .glyph {
  color: #FFF;
  font-size: 23px;
  margin-right: 15px;
}
.modal .modal-header .glyph.icon-bubble-3,
.send-message .modal-header .glyph.icon-bubble-3 {
  margin-top: 4px;
}
.modal .modal-body,
.send-message .modal-body {
  padding: 20px;
}
.modal .modal-body .details,
.send-message .modal-body .details {
  color: #ccc;
  margin-top: 15px;
  font-size: 14px;
  font-style: italic;
}
.modal .modal-body #send-form #counter,
.send-message .modal-body #send-form #counter {
  margin-right: 3px;
}
.modal .modal-body #send-form .error,
.send-message .modal-body #send-form .error {
  padding-left: 5px;
  border: none;
}
.modal .modal-body .form,
.send-message .modal-body .form {
  margin-top: 15px;
}
.modal .modal-body .control-group,
.send-message .modal-body .control-group,
.modal .modal-body .form-group,
.send-message .modal-body .form-group {
  margin-bottom: 0;
}
.modal .modal-body .control-label,
.send-message .modal-body .control-label {
  width: auto;
  text-align: left;
  display: block;
  float: none;
}
.modal .modal-body .controls,
.send-message .modal-body .controls,
.modal .modal-body .form-control,
.send-message .modal-body .form-control {
  display: block;
  margin-left: 0;
  float: none;
}
.modal .modal-body .help-block,
.send-message .modal-body .help-block {
  color: #999999 !important;
  font-size: 13px !important;
  margin-top: -5px !important;
}
.modal .modal-body .help-block ul.errorlist li,
.send-message .modal-body .help-block ul.errorlist li {
  color: #952624 !important;
}
.modal .modal-body #modal-message,
.send-message .modal-body #modal-message {
  color: #2c3e50;
}
.modal .modal-footer,
.send-message .modal-footer {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
  background-color: #f6f6f6;
  border-top: 1px solid #CCC;
  padding-top: 10px;
}
.modal .modal-footer .primary,
.send-message .modal-footer .primary {
  float: right;
  margin-left: 10px;
}
.modal.alert,
.send-message.alert {
  color: #444;
  padding: 0px;
}
.modal.alert .modal-header,
.send-message.alert .modal-header {
  background: #952624;
  border-bottom: 1px solid #841513;
}
.modal.alert .modal-header #modal-title,
.send-message.alert .modal-header #modal-title {
  color: #ecf0f1;
  text-shadow: none;
}
.modal.alert .modal-header .close,
.send-message.alert .modal-header .close {
  margin-right: 20px;
}
.modal.alert .modal-footer .primary,
.send-message.alert .modal-footer .primary {
  background: #952624;
  border: 1px solid #841513;
}
.modal.alert .glyph,
.send-message.alert .glyph {
  color: #510000;
}
.modal .error,
.send-message .error {
  color: #952624;
  font-size: 14px;
}
.weight-200 {
  font-weight: 200;
}
.weight-100 {
  font-weight: 100;
}
code {
  color: #2980b9;
  padding: 1px 4px;
}
div.tooltip.in {
  opacity: 1;
}
.header-margin {
  margin-left: 100px;
  margin-top: 4px;
}
.ui-timepicker-div .ui-widget-header {
  margin-bottom: 8px;
}
.ui-timepicker-div dl {
  text-align: left;
}
.ui-timepicker-div dl dt {
  width: 0px;
  margin-bottom: -25px;
  display: none;
}
.ui-timepicker-div dl dd {
  margin: 0 10px 10px 10px;
}
.ui-timepicker-div td {
  font-size: 90%;
}
.ui-tpicker-grid-label {
  background: none;
  border: none;
  margin: 0;
  padding: 0;
}
.ui-timepicker-rtl {
  direction: rtl;
}
.ui-timepicker-rtl dl {
  text-align: right;
}
.ui-corner-all {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}
#posterizer {
  display: none;
}
.loader-circles {
  background-image: url('../images/loader-circles.gif');
  width: 150px;
  height: 14px;
}
/*.btn-primary {
background: #997ad1;

&.hover {
background: #624e87;
}
}*/
.ie #big-help {
  font-size: 190px;
}
.ie #header a.charm .glyph {
  position: absolute;
  font-size: 17px;
  margin-top: -21px;
}
.ie .formax .formax-container .formax-form {
  margin-left: 60px;
}
.ie .formax .formax-container .formax-form .category-input input {
  height: 25px;
}
.ie .formax .formax-container .formax-form .icon-link {
  margin-top: -4px;
}
.ie .formax .formax-container .formax-form #later-option {
  margin-top: -5px;
}
.ie .formax .formax-container .formax-form #start-datetime {
  margin-left: -5px;
  margin-top: 10px;
}
.select-row:hover {
  cursor: pointer;
}
.span9 .list-table {
  margin-top: 48px;
}
.modal-body .row {
  margin-left: 0px;
}
.modal-body input,
.modal-body textarea {
  width: 505px;
}
.modal-body .select2-container {
  /* Headsup this is select2 the style for width is inline this is the only way for now. */
  width: 520px;
  margin-bottom: 5px;
}
.modal-body .loader {
  display: none;
  width: 270px;
  margin: 0 auto;
  padding: 30px 0;
}
/*.empty-list
.icon.icon-feed
.message
%h2 Triggering your Flows
.details
*/
.empty-list {
  position: relative;
}
.empty-list .icon {
  position: absolute;
  font-size: 180px;
  color: #ecf0f1;
  left: 30px;
  top: 5px;
}
.empty-list .message {
  position: absolute;
}
/* Schedules UI */
#start-datetime {
  width: 400px;
  font-size: 14px;
  font-weight: 200;
  line-height: 20px;
  color: #999;
  background-color: transparent;
  border: 0px solid #999;
  cursor: text;
}
.weekly-repeat-options .btn-group {
  z-index: 0;
}
.weekly-repeat-options .btn-group .btn {
  padding: 2px 8px;
}
#start-datetime-value {
  display: none;
}
#modal .repeat-peroid select,
.repeat-period select {
  width: 100px;
  margin-top: 5px;
}
#modal .repeat-peroid .control-label,
.repeat-period .control-label {
  float: left;
  text-align: left;
  margin-right: 5px;
  margin-top: 2px;
  width: 50px;
  display: block;
  font-size: 14px;
  font-weight: 200;
  line-height: 20px;
  color: #999;
}
input[type='radio'] {
  margin-top: -5px;
  margin-right: 6px;
  margin-left: 6px;
}
#schedule-next-run > #start-datetime {
  color: #2E8BCC;
}
#start-datetime.hasDatepicker:focus {
  outline: none;
  text-shadow: none;
  box-shadow: none;
  -moz-box-shadow: none;
}
#schedule-next-run > #start-datetime:hover {
  text-decoration: underline;
}
[data-handler=today] {
  display: none;
}
#id-schedule.fixed .formax-container {
  margin-left: 115px;
  margin-top: 15px;
}
#id-schedule .formax-container .formax-form input[value='Save'] {
  display: none;
}
.stop-button {
  margin-top: 20px;
}
.fixed #form-buttons {
  border-top: 0px solid #ddd;
  margin-top: 20px;
  margin-left: -70px;
}
#schedule-options {
  font-size: 14px;
}
.schedule-options-label {
  display: initial;
  font-weight: 200;
}
.error {
  color: #FFF;
  background-color: #b74846;
  border: 1px solid #952624;
  text-shadow: none;
  width: 520px;
}
.error ul.errorlist {
  margin: 0px;
}
.error.control-group,
.error.form-group {
  color: #952624;
  background-color: #fff;
  border: 0;
  box-shadow: none;
}
.modal .error {
  background-color: #fff;
  border: 1px solid #952624;
}
.modal .error.control-group,
.modal .error.form-group {
  background-color: #fff;
  border: 0;
  box-shadow: none;
}
.select2-container.error {
  background-color: #fff;
  padding: 0px;
}
.login {
  margin-top: 0px;
  width: 150px;
  padding: 3px 8px;
  margin: 0;
}
.login.TIER_249 {
  background: #EAE180;
}
.login.TIER_39 {
  background: #CB8D56;
  color: #fff;
}
.login.FREE {
  background: #fff;
  color: #3498db;
}
.login.TRIAL {
  background: #75AE82;
  color: #fff;
}
.disconnect-help {
  font-size: 16px;
  line-height: 20px;
}
.disconnect-help .account_details {
  padding: 15px 30px 0px 0px;
}
.disconnect-help .account_details .account_key {
  float: left;
  width: 140px;
  text-align: right;
  font-weight: 400;
}
.disconnect-help .account_details .account_value {
  margin-left: 150px;
}
.org-button {
  width: 130px;
}
.glyph.notif-checkbox:before {
  content: "\e004";
}
.field-input.checked .glyph.notif-checkbox:before,
.view_toggle.checked .glyph.notif-checkbox:before {
  content: "\e05a";
}
.field-input .help-block {
  padding-top: 4px !important;
}
.glyph.notif-checkbox {
  font-family: 'temba';
  speak: none;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  float: left;
  margin-top: 6px;
  margin-right: 5px;
}
.font-checkbox {
  padding: 10px 0px 5px 0px;
}
.font-checkbox #checkbox-label {
  display: none;
}
.help-block label {
  color: #333 !important;
}
.span9 .table td {
  border-top: 0;
  border-bottom: 1px solid #ddd;
}
.span9 .table tr:first-child {
  border-top: 1px solid #ddd;
}
.span9 .object-list {
  margin-top: 14px;
}
.span9 .object-list tbody tr.new td {
  font-weight: bold;
}
.span9 .object-list tbody td.checkbox {
  padding-left: 6px;
  color: #777;
  width: 10px;
}
.span9 .object-list tbody td.checkbox:hover {
  color: #6885c7;
}
.span9 .object-list tbody td.checkbox .glyph {
  margin-top: 3px;
}
.span9 .object-list tbody td.value-text {
  width: 75%;
}
.span9 .object-list tbody td.value-text .value-labels {
  float: right;
  white-space: nowrap;
}
.span9 .object-list tbody td.value-name {
  width: 90%;
}
.span9 .object-list tbody td.value-name .icon-phone {
  color: #999999;
  font-size: 16px;
  margin-right: 5px;
  margin-top: -1px;
}
.span9 .object-list tbody td.value-name .icon-mobile {
  color: #999999;
  font-size: 16px;
  margin-right: 5px;
}
.span9 .object-list tbody td.value-status {
  white-space: nowrap;
  text-align: right;
}
.span9 .object-list tbody td.value-phone a:hover {
  text-decoration: none;
}
.span9 .object-list tbody td.value-received {
  text-align: right;
}
.span9 .object-list tbody td .last-triggered {
  font-size: 13px;
}
.span9 .object-list tbody td .count {
  font-size: 11px;
  margin-left: 5px;
}
.span9 .list-buttons-container {
  height: 35px;
}
.span9 .list-buttons-container .list-buttons button {
  min-width: 70px;
}
.span9 .list-buttons-container .list-buttons button .glyph {
  margin-right: 3px;
}
.span9 .list-buttons-container .list-buttons button .glyph.icon-excel {
  margin-left: -2px;
}
tr.object-row:hover {
  cursor: pointer;
}
tr.object-row {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.glyph.label-checkbox:before {
  content: "\e004";
}
.glyph.object-row-checkbox:before {
  content: "\e004";
}
tr.checked td .glyph.object-row-checkbox:before {
  content: "\e05a";
}
.glyph.label-checkbox.checked:before {
  content: "\e05a";
}
.glyph.label-checkbox.partial:before {
  content: "\e003";
}
.glyph.label-checkebox.checked-child:before {
  content: "\e003";
}
.glyph.checked:before {
  content: "\e05a";
}
.glyph.object-row-checkbox,
.glyph.label-checkbox {
  font-family: 'temba';
  speak: none;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  float: left;
  margin-top: 6px;
  margin-right: 5px;
}
.form #number {
  width: 150px;
}
a:hover.clar-link {
  text-decoration: none;
}
.label-menu.dropdown-menu a {
  padding-left: 10px;
  padding-right: 10px;
}
.label-menu .glyph {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  color: #999;
  font-size: 12px;
  margin-top: 2px;
  width: 12px;
}
li.level1 ul {
  display: none;
}
li.active ul {
  display: block;
}
ul.nav.level2 {
  display: none;
}
li.expanded ul.nav.level2 {
  display: block;
}
ul.level1 li.expanded ul {
  display: block;
}
.dropdown-submenu > a::after {
  margin-right: -5px;
}
.level2 li a {
  padding-left: 10px;
  margin-right: -30px;
}
.modal-body #stop-option,
.modal-body #later-option {
  width: auto;
}
.modal-body .repeat-period .control-label {
  float: left;
  width: 55px;
}
.modal-body .repeat-period {
  margin-top: 10px;
}
.modal-body .instructions {
  margin-bottom: 0px;
}
span.label a {
  color: #fff;
  text-decoration: none;
  margin: 0px;
}
.label-responses {
  background-color: #aaa;
  border-color: #aaa;
}
.imsg {
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  -ms-border-radius: 12px;
  -o-border-radius: 12px;
  border-radius: 12px;
  margin: 0 10px 5px;
  padding: 8px 20px;
  position: relative;
  word-wrap: break-word;
}
.imsg.to {
  background-color: #2095FE;
  color: #fff;
  margin-left: 30px;
}
.imsg.from {
  background-color: #E5E4E9;
  color: #363636;
  margin-right: 30px;
}
.imsg.to + .message.to,
.imsg.from + .message.from {
  margin-top: -7px;
}
.imsg:before {
  border-color: #2095FE;
  border-radius: 50% 50% 50% 50%;
  border-style: solid;
  border-width: 0 20px;
  bottom: 0;
  clip: rect(20px, 35px, 42px, 0px);
  content: " ";
  height: 40px;
  position: absolute;
  right: -50px;
  width: 30px;
}
.imsg.from:before {
  border-color: #E5E4E9;
  left: -50px;
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.atwho-view {
  width: 280px;
  max-width: 300px;
  color: #555555;
}
.atwho-view .atwho-view-ul {
  color: #555555;
}
.atwho-view .atwho-view-ul .cur {
  background: #efefef;
  color: #555555;
}
.atwho-view .atwho-view-ul .cur small {
  color: #555555;
}
.completion-dropdown .option-name {
  font-size: 1em;
}
.completion-dropdown .option-example {
  display: none;
}
.completion-dropdown .option-display {
  display: none;
}
.completion-dropdown .display-labels {
  display: none;
}
.cur > .completion-dropdown .option-display {
  display: block;
}
.cur:first-child:last-child > .completion-dropdown .option-example {
  display: block;
  margin-top: 5px;
}
.cur:first-child:last-child > .completion-dropdown .display-labels {
  display: block;
  font-size: 0.75em;
}
.cur:first-child:last-child > .completion-dropdown .option-display {
  display: block;
  margin-top: 5px;
}
#intercom-container .intercom-launcher {
  bottom: 60px;
  right: 12px;
}
