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
#drag-helper {
  position: absolute;
  width: 500px;
}
#drag-helper .tail {
  width: 4px;
  height: 30px;
  left: 13px;
  background-color: #98C0D9;
  position: absolute;
}
#drag-helper .arrow {
  top: 13px;
  font-size: 30px;
  color: #98C0D9;
  position: absolute;
}
#drag-helper .help-text {
  position: absolute;
  padding: 8px;
  left: 30px;
  top: 7px;
  font-size: 18px;
}
#drag-helper .attn {
  font-style: italic;
  font-weight: 700;
}
#active-modal .modal-body .recipients {
  margin-top: 8px;
}
#active-modal .modal-body .groups {
  margin-top: 8px;
}
#active-modal .modal-body textarea {
  width: 499px;
  height: 100px;
  font-size: 14px;
  color: #34495e;
  padding: 10px;
  line-height: 22px;
  margin-top: 8px;
}
#active-modal .label {
  font-weight: 500;
  font-size: 14px;
  background: none;
  border: none;
  color: #777;
  margin: 0;
  padding: 0;
}
#active-modal.send-response .modal-header {
  background: #86a9ca;
  border-bottom-color: #6487a8;
}
#active-modal.say .modal-header {
  background: #86a9ca;
  border-bottom-color: #6487a8;
}
#active-modal.send-message .modal-header {
  background: #80668d;
  border-bottom-color: #5e446b;
}
#active-modal.add-to-group .modal-header {
  background: #5ca869;
  border-bottom-color: #3a8647;
}
#active-modal.remove-from-group .modal-header {
  background: #c14c46;
  border-bottom-color: #9f2a24;
}
#active-modal .group-variables {
  padding: 6px;
  font-size: 15px;
  color: #333;
  font-weight: 200;
}
#active-modal.api .modal-header {
  background: #e68628;
  border-bottom-color: #c46406;
}
#active-modal.api .step-id {
  font-style: italic;
  font-size: 14px;
}
#active-modal.api .api-message {
  margin-top: 10px;
}
#active-modal.api .uuid-box {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  background: #ecf0f1;
  border: #bdc3c7;
  padding: 10px;
}
#active-modal.api .uuid-box .label {
  width: 40px;
}
#active-modal.save-to-contact .modal-header,
#active-modal.lang .modal-header {
  background: #00ac9a;
  border-bottom-color: #008a78;
}
#active-modal.start-flow .modal-header {
  background: #c05093;
  border-bottom-color: #9e2e71;
}
#active-modal.trigger-flow .modal-header {
  background: #c05093;
  border-bottom-color: #9e2e71;
}
#active-modal.send-email .modal-header {
  background: #80668d;
  border-bottom-color: #5e446b;
}
#active-modal.send-email textarea {
  margin-top: 0;
}
#active-modal.remove-action .form {
  font-weight: 500;
}
#active-modal.rules-dialog .modal-header {
  background: #677c91;
  border-bottom-color: #455a6f;
}
#active-modal.rules-dialog .form {
  margin-top: 0;
}
#active-modal.rules-dialog .modal-body {
  padding: 0;
}
#active-modal.rules-dialog #modal-content {
  padding: 0 15px;
  padding-bottom: 10px;
}
@media only screen and (min-width: 980px) {
  #active-modal.rules-dialog {
    width: 660px;
    margin-left: -330px;
  }
}
.ie #active-modal.rules-dialog {
  width: 660px;
  margin-left: -330px;
}
#active-modal.rules-dialog #tab-container {
  width: 100%;
}
#active-modal.rules-dialog #tab-container button {
  width: 33%;
  padding: 7px;
  margin: 0;
}
#active-modal.rules-dialog #tab-container button:first-child {
  width: 34%;
}
#active-modal.rules-dialog #tab-container button .glyph {
  display: inline-block;
  margin-top: -2px;
  margin-right: 12px;
  font-size: 22px;
}
#active-modal.rules-dialog #tab-container button .title {
  display: inline-block;
}
#active-modal.rules-dialog #tab-container button.btn-secondary {
  background: #ecf0f1;
  border: 1px solid transparent;
  box-shadow: none;
  color: #bdc3c7;
}
#active-modal.rules-dialog #tab-container button.active {
  background: #fff;
  border: 1px solid transparent;
  box-shadow: none;
  color: #677c91;
}
#active-modal.rules-dialog #response-type.ivr button {
  width: 50%;
}
#options input {
  margin-bottom: 6px;
  margin-right: 2px;
}
#options label {
  color: #9ba1a5;
  display: inline;
}
#counter {
  font-size: 12px;
  float: right;
}
#label-name {
  display: inline-block;
  width: 100px;
  height: 22px;
  padding-top: 0px;
  padding-bottom: 2px;
  line-height: 18px;
}
#label-name.error {
  box-shadow: 0px 0px 10px #e74c3c;
}
div.error,
textarea.error,
input.error {
  background: #fff;
  color: #333;
  box-shadow: 0px 0px 10px #e74c3c;
}
#toolbar {
  height: 80px;
  padding: 20px;
}
#toolbar h2 {
  margin-top: -5px;
}
#toolbar .actions {
  margin-right: 30px;
}
#toolbar .actions .language {
  margin-right: 20px;
  font-size: 14px;
  line-height: 14px;
  padding-top: 10px;
}
#toolbar .actions .language .name {
  text-align: right;
}
#toolbar .actions .language .others {
  font-size: 11px;
}
table {
  border-spacing: 0;
  border-collapse: collapse;
  position: relative;
}
#pageBody {
  background-color: #fff;
  background-position: -12px -7px;
  background-image: linear-gradient(0deg, transparent 24%, rgba(80, 80, 80, 0.05) 25%, rgba(80, 80, 80, 0.05) 26%, transparent 27%, transparent 74%, rgba(80, 80, 80, 0.05) 75%, rgba(80, 80, 80, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(80, 80, 80, 0.05) 25%, rgba(80, 80, 80, 0.05) 26%, transparent 27%, transparent 74%, rgba(80, 80, 80, 0.05) 75%, rgba(80, 80, 80, 0.05) 76%, transparent 77%, transparent);
  height: 100%;
  background-size: 50px 50px;
}
.rule-list {
  margin: 13px 0;
}
#rule-form-body #category-options {
  margin-top: 5px;
  margin-bottom: 5px;
}
#rule-form-body #category-options label {
  text-align: left;
  padding-left: 2px;
  display: inline-block;
  font-size: 14px;
  font-weight: 200;
}
#rule-form-body #category-options input[type=checkbox] {
  display: inline-block;
  margin-left: 8px;
  margin-top: -1px;
  width: auto;
}
#variable-name {
  border-bottom: 0px solid #eee;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 5px;
  padding-top: 5px;
  font-size: 16px;
}
#variable-name .message {
  margin-bottom: -10px;
  display: inline-block;
  margin-right: 5px;
}
#variable-name input[type=text] {
  display: inline-block;
  width: 100px;
  height: 22px;
  margin-top: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  margin-bottom: 10px;
  line-height: 18px;
}
#split-help {
  margin-top: 9px;
  float: right;
  margin-right: 30px;
  padding-top: 5px;
}
#split-on {
  width: 580px;
  margin-left: 20px;
  border-top: 1px solid #e6e6e6;
  padding-top: 7px;
  margin-top: 5px;
  font-size: 13px;
  margin-top: 3px;
  margin-bottom: 9px;
}
#split-on .split-variable {
  display: inline-block;
}
.update-variable {
  padding-left: 5px;
  line-height: 24px;
  font-size: 16px;
  margin-top: -10px;
}
.update-variable .split-operand {
  width: 390px;
}
#content-numeric .message {
  font-size: 16px;
  display: inline-block;
}
#content-numeric .message.range {
  margin-left: 20px;
}
#content-numeric .error-message {
  font-size: 13px;
  text-align: center;
  width: 100%;
  color: #c0392b;
}
#content-numeric input {
  display: inline-block;
  width: 100px;
  height: 22px;
  margin-top: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  margin-bottom: 10px;
  line-height: 18px;
}
#content-numeric input.error {
  box-shadow: 0px 0px 10px #e74c3c;
}
#content-menu {
  width: 540px;
  padding: 10px 0;
  margin: 0 auto;
}
#content-menu .keypad {
  display: inline-block;
  margin: 10px;
}
#content-menu .keypad .break {
  display: block;
}
#content-menu .keypad .num {
  font-size: 28px;
  font-weight: 100;
  width: 30px;
  display: inline-block;
  color: #bdc3c7;
}
#content-menu .keypad.num-0 {
  padding-left: 175px;
}
#content-menu .keypad .category {
  display: inline-block;
}
#content-menu .keypad .category input {
  width: 100px;
  padding: 5px;
  font-size: 14px;
  font-weight: 200;
  color: #2c3e50;
  margin-top: -5px;
}
.categorize-as {
  padding-left: 20px;
}
#label-container {
  display: inline-block;
}
#label-container input {
  width: 100px;
}
.rule-row {
  /* firefox 19+ */
  /* ie */
  width: 625px;
  cursor: pointer;
  background-color: #fff;
  margin-right: auto;
  margin-left: -5px;
  padding-bottom: 3px;
}
.rule-row ::-webkit-input-placeholder {
  color: #d0d0d0;
  font-weight: 200;
}
.rule-row ::-moz-placeholder {
  color: #d0d0d0;
  font-weight: 200;
}
.rule-row :-ms-input-placeholder {
  color: #d0d0d0;
  font-weight: 200;
}
.rule-row input:-moz-placeholder {
  color: #d0d0d0;
  font-weight: 200;
}
.rule-row .error-message {
  font-size: 13px;
  text-align: center;
  width: 100%;
  color: #c0392b;
}
.rule-row .close {
  float: none;
  margin-left: 0px;
}
.rule-row .close .icon-close {
  margin-top: 10px;
}
.rule-row .icon-menu {
  visibility: hidden;
  cursor: move;
}
.rule-row:hover .close {
  display: inline;
}
.rule-row:hover .icon-menu {
  visibility: visible;
  color: #3498db;
}
.rule-row.ui-sortable-helper {
  border: 1px solid #ecf0f1;
  box-shadow: 0px 0px 10px #ecf0f1;
}
.rule-row.ui-sortable-helper .close {
  display: none;
}
.rule-row input[type=text] {
  display: inline-block;
  width: 100px;
  height: 22px;
  padding-top: 2px;
  padding-bottom: 2px;
  line-height: 18px;
}
.rule-row input[type=checkbox] {
  margin-top: -3px;
  margin-right: 8px;
}
.rule-row .message {
  display: inline-block;
  font-size: 16px;
  cursor: move;
}
.rule-row select.operator {
  display: inline-block;
  width: 200px;
  margin-top: 5px;
  height: 30px;
}
.rule-row .icon-menu {
  margin-top: 4px;
  margin-right: 3px;
  color: #bdc3c7;
}
.rule-row #operand-two-container {
  display: inline-block;
}
.rule-row #operand-hide {
  display: inline-block;
  width: 164px;
}
.rule-row #date-operator-1 {
  display: inline-block;
  width: 55px;
}
.rule-row #date-operator-2 {
  display: inline-block;
  width: 35px;
}
.rule-row input.operand[type=text],
.rule-row input.operand-two[type=text] {
  display: inline-block;
  width: 150px;
  height: 22px;
  margin-top: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  line-height: 18px;
}
.rule-row input.operand[type=text].operand-two,
.rule-row input.operand-two[type=text].operand-two {
  width: 50px;
}
.rule-row input.operand[type=text].between,
.rule-row input.operand-two[type=text].between {
  width: 50px;
}
.rule-row input.category[type=text] {
  display: inline-block;
  width: 90px;
  height: 22px;
  margin-top: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  line-height: 18px;
}
.rule-row .error {
  box-shadow: 0px 0px 10px #e74c3c;
}
.api .help-text {
  margin-top: 5px;
}
.api .example .help-text {
  margin-top: -5px;
}
.api .form-action {
  display: inline-block;
}
.api .url {
  width: 400px;
  margin-left: 6px;
  margin-top: -4px;
  height: 23px;
}
.api .step-uuid {
  font-size: 11px;
  margin-top: -8px;
  color: #8a9094;
}
.api .step-label {
  font-size: 11px;
  margin-right: 3px;
  float: left;
  color: #8a9094;
  margin-top: -8px;
}
.api .error-text {
  color: #952624;
  margin-top: 8px;
  margin-bottom: 0px;
  font-size: 12px;
}
.api .response {
  margin-top: 5px;
}
.api .message {
  font-size: 16px;
  line-height: 18px;
  margin-top: 5px;
  /* firefox 19+ */
  /* ie */
}
.api .message h4 {
  margin-bottom: 1px;
  font-size: 18px;
}
.api .message p.description {
  font-size: 15px;
  line-height: 18px;
}
.api .message pre {
  font-size: 11px;
  line-height: 13px;
}
.api .message ::-webkit-input-placeholder {
  color: #e9e9e9;
  font-weight: 200;
}
.api .message ::-moz-placeholder {
  color: #e9e9e9;
  font-weight: 200;
}
.api .message :-ms-input-placeholder {
  color: #e9e9e9;
  font-weight: 200;
}
.api .message input:-moz-placeholder {
  color: #e9e9e9;
  font-weight: 200;
}
.api .message input {
  padding: 4px;
}
.sort-placeholder {
  margin-left: 20px;
  width: 580px;
}
.webhook-dialog .message {
  margin-top: -20px;
}
.sticky {
  position: absolute;
  background-color: #F4F39E;
  border-color: #DEE184;
  padding: 1em 1em;
  -webkit-box-shadow: #DDD 0px 1px 2px;
  -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  width: 200px;
  display: block-inline;
  cursor: pointer;
}
.sticky.ui-draggable-dragging {
  z-index: 1000;
}
.sticky .note-input {
  border: none;
  border-color: transparent;
  background-color: transparent;
  overflow-x: clip;
  width: 185px;
  overflow: auto;
  outline: none;
  line-height: 17px;
  padding: 0 3px;
  margin: 0;
  font-size: 14px;
  resize: none;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
}
.sticky .note-input:disabled {
  cursor: pointer;
}
.sticky .note-input:focus {
  outline: 0;
}
.sticky .title {
  font-weight: 500;
  margin-bottom: 5px;
}
.sticky .close {
  margin-top: -12px;
  margin-right: -5px;
}
.sticky.taped:after {
  display: block;
  content: "";
  position: absolute;
  width: 151px;
  height: 35px;
  top: -21px;
  left: 25%;
  background: transparent url(../images/tape.png) 0 0 no-repeat;
}
.toast {
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  -ms-border-radius: 2px;
  -o-border-radius: 2px;
  border-radius: 2px;
  position: absolute;
  z-index: 1000;
  background: #fff;
  color: #3498db;
  padding: 15px 20px;
  font-size: 18px;
  border: 1px solid #1276b9;
  -webkit-box-shadow: 0 0 60px 15px rgba(255, 255, 255, 0.85);
  -moz-box-shadow: 0 0 60px 15px rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 60px 15px rgba(255, 255, 255, 0.85);
}
.rules {
  padding-bottom: 2px;
}
.node .icon-loop {
  position: absolute;
  right: 6px;
  top: 4px;
  color: #537697;
  display: none;
}
.call-status {
  display: none;
  position: fixed;
  top: 0;
  right: 20px;
  background: #2387ca;
  color: #ecf0f1;
  z-index: 50000;
  -webkit-border-radius: 0 0 5px 5px;
  -moz-border-radius: 0 0 5px 5px;
  -ms-border-radius: 0 0 5px 5px;
  -o-border-radius: 0 0 5px 5px;
  border-radius: 0 0 5px 5px;
  padding: 5px;
  border: 2px solid #1276b9;
  border-top: none;
}
.call-status .icon-phone {
  color: #ecf0f1;
  margin-left: 3px;
}
.call-status .status {
  display: inline-block;
  font-weight: bold;
  margin-top: 3px;
  margin-left: 3px;
}
.call-status .duration {
  display: inline-block;
  font-size: 16px;
  font-weight: 100;
  margin-left: 15px;
  margin-top: 3px;
}
.call-status .hangup {
  display: inline-block;
  float: none;
  margin-left: 15px;
  margin-top: -5px;
  background: #e68628;
  border-color: #f79739;
}
.call .call-status {
  display: block;
}
.call .rules {
  padding-bottom: 8px;
}
.call h2 .icon-phone {
  color: #999;
}
.call .recording .icon-loop {
  display: block;
}
.call .end-call {
  display: inline-block;
}
.call #header,
.call #top-menu,
.call .logo,
.call .upgrade,
.call #show-simulator,
.call #toolbar > .actions {
  display: none;
}
.call#pageBody {
  background: #333;
}
.call .end-call {
  display: inline-block;
}
.call ._jsPlumb_overlay.label,
.call ._jsPlumb_overlay._jsPlumb_hover.label {
  background: none;
  color: transparent;
  border: none;
}
.call .node {
  border: 1px solid #444;
}
.call .node .add-action {
  display: none;
}
.call .node.root .actions {
  padding-top: 0;
  background: none;
}
.call .node .source,
.call .node .source._jsPlumb_endpoint_anchor_ {
  background: none;
  height: 3px;
}
.call .node .action,
.call .node.rules {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}
.call .node .action .name,
.call .node.rules .name {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}
.call .node .action .mask,
.call .node.rules .mask {
  width: 100%;
  height: 100%;
  background: rgba(50, 50, 50, 0.6);
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  cursor: pointer;
}
.call .node .say > .mask,
.call .node .recording {
  width: 100%;
  height: 100%;
  -webkit-box-shadow: 0px 0 0px 2px #ffff00;
  -moz-box-shadow: 0px 0 0px 2px #ffff00;
  box-shadow: 0px 0 0px 2px #ffff00;
  z-index: 10000;
  background: rgba(255, 255, 0, 0.5);
  display: none;
}
.call .node .say > .mask.recording,
.call .node .recording.recording {
  -webkit-box-shadow: 0px 0 0px 5px #ffff00;
  -moz-box-shadow: 0px 0 0px 5px #ffff00;
  box-shadow: 0px 0 0px 5px #ffff00;
}
.call .node .say > .mask .message,
.call .node .recording .message {
  color: #555;
}
.call .node .say:hover > .mask {
  display: inline-block;
  background: none;
  z-index: 20000;
}
.action .body {
  position: relative;
}
.audio-player {
  position: absolute;
  left: 200px;
  width: 300px;
  align: center;
  padding: 0px;
  border: 1px solid;
  z-index: 9000;
  background: rgba(33, 33, 33, 0.8);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
}
.node {
  border: 1px solid #ccc;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  -ms-border-radius: 2px;
  -o-border-radius: 2px;
  border-radius: 2px;
  border: 1px solid rgba(210, 210, 210, 0.7);
  min-width: 200px;
  cursor: pointer;
  position: absolute;
  background: #fff;
  opacity: 0.9;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=(90));
  filter: alpha(opacity = (90));
  color: #677c91;
  z-index: 700;
}
.node .mask {
  display: none;
}
.node .node-label {
  display: inline-block;
}
.node .delete {
  position: absolute;
  right: 0;
  width: 100%;
  color: #fff;
  background: #e74c3c;
  text-align: center;
  padding: 2px 0px;
  font-size: 14px;
}
.node .flow-help {
  position: absolute;
  margin-left: 240px;
  margin-top: 50px;
}
.node .flow-help .arrow {
  -ms-transform: rotate(180deg);
  /* IE 9 */
  -moz-transform: rotate(180deg);
  /* Firefox */
  -webkit-transform: rotate(180deg);
  /* Safari and Chrome */
  -o-transform: rotate(180deg);
  /* Opera */
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
  width: 100px;
  margin-top: 40px;
  margin-left: -90px;
}
.node .flow-start {
  visibility: hidden;
  position: absolute;
  top: -20px;
  z-index: 10000;
  width: 100%;
  border: 0px solid #0165a8;
  text-align: center;
}
.node .flow-start .title {
  padding-left: 4px;
  font-size: 12px;
  margin: auto 0;
}
.node.root .flow-start {
  visibility: visible;
}
.node.root .actions .name,
.node.root.rules .name {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}
.node.root.initial > .flow-start {
  visibility: hidden;
}
.node .move-up {
  -ms-transform: rotate(180deg);
  /* IE 9 */
  -moz-transform: rotate(180deg);
  /* Firefox */
  -webkit-transform: rotate(180deg);
  /* Safari and Chrome */
  -o-transform: rotate(180deg);
  /* Opera */
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
  position: absolute;
  color: rgba(30, 30, 30, 0.2);
  font-size: 10px;
  margin-left: 4px;
  margin-top: 3px;
  text-shadow: 0px -1px rgba(230, 230, 230, 0.2);
  z-index: 800;
}
.node .message {
  max-width: 200px;
  padding: 6px;
  font-size: 14px;
  width: 185px;
}
.node .add-action {
  background: #677c91;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px;
  text-align: center;
  line-height: 12px;
  padding-bottom: 3px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  margin-left: 192px;
  margin-top: -5px;
  width: 15px;
}
.node .configure {
  background: #677c91;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px;
  text-align: center;
  line-height: 8px;
  padding-bottom: 3px;
  right: -8px;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  margin-top: -8px;
  width: 18px;
}
.node .configure .icon-tree-2 {
  padding-top: 2px;
  margin-bottom: -2px;
  font-size: 10px;
}
.node .icon-users-2 {
  margin-right: -2px;
}
.node .name {
  float: left;
  width: 100%;
  text-align: center;
  padding: 2px 0px;
  font-size: 14px;
  color: #fff;
  opacity: 0.9;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=(90));
  filter: alpha(opacity = (90));
  margin-right: 50px;
}
.node :first-child > .name {
  -webkit-border-radius: 1px 1px 0 0;
  -moz-border-radius: 1px 1px 0 0;
  -ms-border-radius: 1px 1px 0 0;
  -o-border-radius: 1px 1px 0 0;
  border-radius: 1px 1px 0 0;
}
.node .send-message .name,
.node .send-email .name,
.node .trigger-flow .name {
  text-shadow: 0px 1px #5e446b;
  background-color: #80668d;
  background-image: -o-linear-gradient(bottom, #70567d 24%, #80668d 92%);
  background-image: -moz-linear-gradient(bottom, #70567d 24%, #80668d 92%);
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.24, #70567d), color-stop(0.92, #80668d));
  background-image: -webkit-linear-gradient(bottom, #70567d 24%, #80668d 92%);
  background-image: -ms-linear-gradient(bottom, #70567d 24%, #80668d 92%);
  background-image: linear-gradient(bottom, #70567d 24%, #80668d 92%);
}
.node .send-message .to,
.node .send-email .to,
.node .trigger-flow .to {
  background: #f6f6f6;
  padding: 5px 5px 3px 5px;
  color: #acb2b6;
  font-size: 10px;
  line-height: 10px;
}
.node .send-message .to .to-label,
.node .send-email .to .to-label,
.node .trigger-flow .to .to-label {
  margin-top: 2px;
  float: left;
  font-weight: bold;
}
.node .send-message .to .recipients,
.node .send-email .to .recipients,
.node .trigger-flow .to .recipients {
  margin-top: 0;
  width: 170px;
}
.node .send-message .to .selection,
.node .send-email .to .selection,
.node .trigger-flow .to .selection {
  line-height: 16px;
  display: inline-block;
  margin-right: 8px;
}
.node .send-message .to .selection.omni-option:before,
.node .send-email .to .selection.omni-option:before,
.node .trigger-flow .to .selection.omni-option:before {
  color: #acb2b6;
  font-size: 10px;
  margin-right: 3px;
}
.node .send-message .to .recipients,
.node .send-email .to .recipients,
.node .trigger-flow .to .recipients {
  margin-left: 20px;
  maring-right: -20px;
}
.node .add-to-group .name {
  text-shadow: 0px 1px #3a8647;
  background-color: #5ca869;
  background-image: -o-linear-gradient(bottom, #4c9859 24%, #5ca869 92%);
  background-image: -moz-linear-gradient(bottom, #4c9859 24%, #5ca869 92%);
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.24, #4c9859), color-stop(0.92, #5ca869));
  background-image: -webkit-linear-gradient(bottom, #4c9859 24%, #5ca869 92%);
  background-image: -ms-linear-gradient(bottom, #4c9859 24%, #5ca869 92%);
  background-image: linear-gradient(bottom, #4c9859 24%, #5ca869 92%);
}
.node .add-to-group .group {
  padding: 6px;
  font-size: 14px;
  color: #677c91;
}
.node .remove-from-group .name {
  text-shadow: 0px 1px #9f2a24;
  background-color: #c14c46;
  background-image: -o-linear-gradient(bottom, #b13c36 24%, #c14c46 92%);
  background-image: -moz-linear-gradient(bottom, #b13c36 24%, #c14c46 92%);
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.24, #b13c36), color-stop(0.92, #c14c46));
  background-image: -webkit-linear-gradient(bottom, #b13c36 24%, #c14c46 92%);
  background-image: -ms-linear-gradient(bottom, #b13c36 24%, #c14c46 92%);
  background-image: linear-gradient(bottom, #b13c36 24%, #c14c46 92%);
}
.node .remove-from-group .group {
  padding: 6px;
  font-size: 14px;
  color: #677c91;
}
.node .send-response {
  border-color: #86a9ca;
}
.node .send-response .name {
  text-shadow: 0px 1px #6487a8;
  background-color: #86a9ca;
  background-image: -o-linear-gradient(bottom, #7699ba 24%, #86a9ca 92%);
  background-image: -moz-linear-gradient(bottom, #7699ba 24%, #86a9ca 92%);
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.24, #7699ba), color-stop(0.92, #86a9ca));
  background-image: -webkit-linear-gradient(bottom, #7699ba 24%, #86a9ca 92%);
  background-image: -ms-linear-gradient(bottom, #7699ba 24%, #86a9ca 92%);
  background-image: linear-gradient(bottom, #7699ba 24%, #86a9ca 92%);
}
.node .send-response .empty {
  color: #bdc3c7;
  font-style: italic;
}
.node .say {
  border-color: #86a9ca;
}
.node .say .name {
  text-shadow: 0px 1px #6487a8;
  background-color: #86a9ca;
  background-image: -o-linear-gradient(bottom, #7699ba 24%, #86a9ca 92%);
  background-image: -moz-linear-gradient(bottom, #7699ba 24%, #86a9ca 92%);
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.24, #7699ba), color-stop(0.92, #86a9ca));
  background-image: -webkit-linear-gradient(bottom, #7699ba 24%, #86a9ca 92%);
  background-image: -ms-linear-gradient(bottom, #7699ba 24%, #86a9ca 92%);
  background-image: linear-gradient(bottom, #7699ba 24%, #86a9ca 92%);
}
.node .say .empty {
  color: #bdc3c7;
  font-style: italic;
}
.node .say .play-button {
  font-size: 22px;
  position: absolute;
  right: 5px;
  bottom: 10px;
}
.node .say .play-button:hover {
  color: #3498db;
}
.node .send-email {
  border-color: #80668d;
}
.node .send-email .name {
  text-shadow: 0px 1px #5e446b;
  background-color: #80668d;
  background-image: -o-linear-gradient(bottom, #70567d 24%, #80668d 92%);
  background-image: -moz-linear-gradient(bottom, #70567d 24%, #80668d 92%);
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.24, #70567d), color-stop(0.92, #80668d));
  background-image: -webkit-linear-gradient(bottom, #70567d 24%, #80668d 92%);
  background-image: -ms-linear-gradient(bottom, #70567d 24%, #80668d 92%);
  background-image: linear-gradient(bottom, #70567d 24%, #80668d 92%);
}
.node .start-flow {
  border-color: #c05093;
}
.node .start-flow .name {
  text-shadow: 0px 1px #9e2e71;
  background-color: #c05093;
  background-image: -o-linear-gradient(bottom, #b04083 24%, #c05093 92%);
  background-image: -moz-linear-gradient(bottom, #b04083 24%, #c05093 92%);
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.24, #b04083), color-stop(0.92, #c05093));
  background-image: -webkit-linear-gradient(bottom, #b04083 24%, #c05093 92%);
  background-image: -ms-linear-gradient(bottom, #b04083 24%, #c05093 92%);
  background-image: linear-gradient(bottom, #b04083 24%, #c05093 92%);
}
.node .start-flow .flow {
  font-weight: 400;
}
.node .trigger-flow {
  border-color: #c05093;
}
.node .trigger-flow .name {
  text-shadow: 0px 1px #9e2e71;
  background-color: #c05093;
  background-image: -o-linear-gradient(bottom, #b04083 24%, #c05093 92%);
  background-image: -moz-linear-gradient(bottom, #b04083 24%, #c05093 92%);
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.24, #b04083), color-stop(0.92, #c05093));
  background-image: -webkit-linear-gradient(bottom, #b04083 24%, #c05093 92%);
  background-image: -ms-linear-gradient(bottom, #b04083 24%, #c05093 92%);
  background-image: linear-gradient(bottom, #b04083 24%, #c05093 92%);
}
.node .trigger-flow .flow {
  font-weight: 400;
}
.node .save-to-contact,
.node .lang {
  border-color: #00ac9a;
}
.node .save-to-contact .name,
.node .lang .name {
  text-shadow: 0px 1px #008a78;
  background-color: #00ac9a;
  background-image: -o-linear-gradient(bottom, #009c8a 24%, #00ac9a 92%);
  background-image: -moz-linear-gradient(bottom, #009c8a 24%, #00ac9a 92%);
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.24, #009c8a), color-stop(0.92, #00ac9a));
  background-image: -webkit-linear-gradient(bottom, #009c8a 24%, #00ac9a 92%);
  background-image: -ms-linear-gradient(bottom, #009c8a 24%, #00ac9a 92%);
  background-image: linear-gradient(bottom, #009c8a 24%, #00ac9a 92%);
}
.node .save-to-contact .field,
.node .lang .field {
  font-weight: 600;
}
.node .save-to-contact .value,
.node .lang .value {
  font-weight: 400;
  word-wrap: break-word;
  font-style: italic;
}
.node .api {
  border-color: #e68628;
}
.node .api .name {
  text-shadow: 0px 1px #c46406;
  background-color: #e68628;
  background-image: -o-linear-gradient(bottom, #d67618 24%, #e68628 92%);
  background-image: -moz-linear-gradient(bottom, #d67618 24%, #e68628 92%);
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.24, #d67618), color-stop(0.92, #e68628));
  background-image: -webkit-linear-gradient(bottom, #d67618 24%, #e68628 92%);
  background-image: -ms-linear-gradient(bottom, #d67618 24%, #e68628 92%);
  background-image: linear-gradient(bottom, #d67618 24%, #e68628 92%);
}
.node .api .title {
  font-weight: 500;
}
.node .api .url {
  font-size: 13px;
  word-break: break-all;
}
.node .no-source {
  width: 190px;
  margin: 0 auto;
  font-size: 11px;
  color: #899eb3;
  line-height: 12px;
  padding: 5px;
  font-style: italic;
  text-justify: center;
}
.node.rules .name {
  text-shadow: 0px 1px #455a6f;
  background-color: #677c91;
  background-image: -o-linear-gradient(bottom, #576c81 24%, #677c91 92%);
  background-image: -moz-linear-gradient(bottom, #576c81 24%, #677c91 92%);
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.24, #576c81), color-stop(0.92, #677c91));
  background-image: -webkit-linear-gradient(bottom, #576c81 24%, #677c91 92%);
  background-image: -ms-linear-gradient(bottom, #576c81 24%, #677c91 92%);
  background-image: linear-gradient(bottom, #576c81 24%, #677c91 92%);
}
.node.rules .webhook {
  background: #fff;
  border-color: #e68628;
}
.node.rules .webhook .name {
  text-shadow: 0px 1px #c46406;
  background-color: #e68628;
  background-image: -o-linear-gradient(bottom, #d67618 24%, #e68628 92%);
  background-image: -moz-linear-gradient(bottom, #d67618 24%, #e68628 92%);
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.24, #d67618), color-stop(0.92, #e68628));
  background-image: -webkit-linear-gradient(bottom, #d67618 24%, #e68628 92%);
  background-image: -ms-linear-gradient(bottom, #d67618 24%, #e68628 92%);
  background-image: linear-gradient(bottom, #d67618 24%, #e68628 92%);
}
.node.rules .webhook .url {
  font-size: 13px;
  word-break: break-all;
  padding: 5px;
  padding-top: 27px;
}
.node table {
  width: 100%;
  background: #fff;
}
.node .activity {
  position: absolute;
  margin-left: -10px;
  margin-top: -13px;
  background: #3498db;
  padding: 2px 5px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  min-width: 15px;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  -ms-border-radius: 15px;
  -o-border-radius: 15px;
  border-radius: 15px;
  z-index: 600;
}
.node .close {
  position: absolute;
  right: 8px;
  font-size: 16px;
}
.node.jsPlumb_dragged {
  z-index: 800;
  -webkit-box-shadow: 0 0 12px 3px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 0 12px 3px rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 12px 3px rgba(0, 0, 0, 0.15);
  border-color: #acb2b6;
}
.node.drop-hover {
  box-shadow: 0px 0px 5px #2ecc71;
}
.node.collides {
  border: 1px solid #e74c3c;
}
.node.ghost {
  opacity: 0.3;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=(30));
  filter: alpha(opacity = (30));
}
.node .source {
  background-color: #e74c3c;
  height: 13px;
  width: 13px;
  margin-left: auto;
  margin-right: auto;
  z-index: 1000;
  padding: 0px;
  float: none;
  align: center;
  cursor: pointer;
  margin-top: 0;
  margin-bottom: -8px;
}
.node .source._jsPlumb_endpoint_anchor_,
.node .source.connected {
  background-color: #98C0D9;
}
.node .source._jsPlumb_endpoint_anchor_:hover,
.node .source.connected:hover {
  background-color: #e74c3c;
}
.node .source.source-disabled {
  background-color: #bdc3c7;
}
.node .rule {
  border-left: 1px solid #ecf0f1;
}
.node .rule .add-rules {
  position: absolute;
  width: 100%;
  border: 0px solid green;
  text-align: center;
  padding-top: 4px;
}
.node .rule .add-rules .icon-tree {
  display: inline-block;
  width: 20px;
  border: 0px solid blue;
  margin-right: 2px;
}
.node .rule .add-rules .text {
  display: inline-block;
  border: 0px solid orange;
}
.node .rule:first-child {
  border-left: none;
}
.node .rule .activity {
  background: #ecf0f1;
  text-align: center;
  font-size: 12px;
}
.node .rule .caption {
  text-align: center;
  min-width: 80px;
  font-size: 14px;
  padding: 4px;
}
.node .rule input {
  width: 39%;
  margin: 0px;
  padding: 0px;
}
.node .rule select {
  width: 49%;
  margin: 0px;
  padding: 0px;
}
#workspace {
  min-height: 800px;
  position: relative;
}
#page-container {
  width: 100%;
  background: #ccc;
}
#header {
  margin-bottom: 5px;
}
._jsPlumb_endpoint {
  z-index: 800;
}
._jsPlumb_connector {
  z-index: 200;
  opacity: 1;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=(100));
  filter: alpha(opacity = (100));
}
._jsPlumb_connector._jsPlumb_dragging {
  z-index: 1000;
}
._jsPlumb_overlay {
  z-index: 100;
}
._jsPlumb_overlay.label {
  background: #ecf0f1;
  border: 1px solid #bdc3c7;
  color: #9ba1a5;
  z-index: 800;
  display: none;
  cursor: default;
}
._jsPlumb_overlay.label._jsPlumb_hover {
  border-color: #27ae60;
  background: #fff;
  color: #27ae60;
}
._jsPlumb_endpoint_full._jsPlumb_hover {
  cursor: pointer;
}
#status {
  float: right;
  margin-right: 15px;
  margin-top: 0px;
}
#status.fixed {
  position: fixed;
  top: 0px;
  right: 0px;
}
#saving {
  display: none;
}
#error {
  display: none;
  color: #952624;
}
#error .glyph {
  font-size: 14px;
}
.poll-links {
  float: left;
}
.mini-header {
  width: 100%;
  font-size: 16px;
  padding-top: 10px;
}
.mega-glyph {
  line-height: 1;
  font-size: 72px;
  text-decoration: none;
  display: inline;
}
a.btn-mega {
  width: 120px;
  padding: 20px;
  margin: 10px;
}
.btn-mega {
  width: 90%;
  display: iniline-block;
  font-size: 36px;
}
.btn-mega:hover {
  text-decoration: none;
}
#id_is_archived {
  width: 20px;
}
#id_is_archived + p.help-block {
  display: inline-block;
}
.select2-container .select2-choice .omni-option {
  width: 98%;
  background: #ffffff;
  padding: 0px;
  padding-left: 2px;
}
.help-text {
  font-size: 11px;
  color: #9ba1a5;
  line-height: 11px;
  margin-bottom: 10px;
}
.action {
  background: #fff;
  position: relative;
}
.action-form {
  margin-top: 10px;
}
.action-form .instructions {
  color: #2c3e50;
  margin-bottom: 10px;
  width: 100%;
}
.action-dialog .modal-body {
  min-height: 190px;
}
.handling-responses .help-container {
  padding: 20px;
  font-size: 17px;
}
.handling-responses .help-container .text {
  font-style: italic;
  font-size: 18px;
  padding: 8px 0;
}
.handling-responses .help-container .example {
  background: url('../images/help-category.png');
  background-size: 433px 22px;
  width: 574px;
  height: 84px;
  margin-top: 12px;
  float: left;
}
.handling-responses .help-container h4 {
  margin-top: 10px;
  margin-bottom: 2px;
}
.handling-responses .help-container h4.top {
  margin-top: 0px;
}
.handling-responses .help-container .examples {
  padding: 15px;
  background-color: #ecf0f1;
}
.handling-responses .help-container .examples h4 {
  margin: 0;
  margin-top: -5px;
  font-weight: 500;
  font-size: 14px;
  color: #8a9094;
}
.handling-responses .help-container .examples .category .attn {
  font-weight: 500;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .flow-create .example {
    background: url('../images/flow-create@2x.png');
    background-size: 206px 207px;
  }
  .handling-responses .help-container .example {
    background: url('../images/help-category@2x.png');
    background-size: 574px 84px;
  }
}
.close .icon-close {
  margin-top: 4px;
}
