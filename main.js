'use strict';

Blockly.Blocks['rotationImage'] = {
  init: function() {
    this.appendDummyInput().appendField("画像を");
    this.appendValueInput('DURATION').setCheck('Number');
    this.appendDummyInput().appendField('秒で回転させる');
    this.setColour(160);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    }
};

Blockly.JavaScript['rotationImage'] = function(block) {
  const argument0 = Blockly.JavaScript.valueToCode(
    block,
    'DURATION',
    Blockly.JavaScript.ORDER_FUNCTION_CALL)
  || 10;
  return `(() => {
    const style = document.createElement('style');
    style.innerHTML = \`img{
      animation: spin ${argument0}s infinite linear;
    }
    @keyframes spin {
      from {transform:rotate(0deg);}
      to {transform:rotate(360deg);}
    }\`;
    document.querySelector('#playarea').appendChild(style)
  })();`;
};


Blockly.Blocks['showImage'] = {
  init: function() {
    this.appendDummyInput().appendField("画像を表示する (URL:");
    this.appendValueInput('IMAGE_URL').setCheck('String');
    this.appendDummyInput().appendField(')');
    this.setColour(160);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    }
};

Blockly.JavaScript['showImage'] = function(block) {
  const argument0 = Blockly.JavaScript.valueToCode(
    block,
    'IMAGE_URL',
    Blockly.JavaScript.ORDER_FUNCTION_CALL)
  || '\'\'';
  return `(() => {
    const src = ${argument0}
    if (!src) return;
    const image = document.createElement('img');
    image.src = src;
    document.querySelector('#playarea').appendChild(image)
  })();`;
};

const workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox')
});
const onUpdate = () => {
  document.querySelector('#playarea').innerHTML = ''
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  console.log(code)
  eval(code)
}
workspace.addChangeListener(onUpdate)
