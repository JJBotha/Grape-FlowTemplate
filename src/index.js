//search 'implement' for outsystems sections
import loadComponents from './components';
import loadBlocks from './blocks';

export default (editor, opts = {}) => {
  const options = { ...{
    // default options
  },  ...opts };
	var blockManager = editor.BlockManager;
	var domComps = editor.DomComponents;
	var dType = domComps.getType('default');
	var dModel = dType.model;
	var dView = dType.view;
	
  // Add components
  loadComponents(editor, options);

  // Add FlowTemplateBlock
	blockManager.add('INITIATE_JOB',{
	id:'flowTemplate',
	label:'Initiate Job',
	content:{
		content:'<div class="my-block fa fa-paint-brush">your flowtemplate</div>',
		type:'INITIATE_JOB'
	},
	});

	domComps.addType('INITIATE_JOB', {
		model: dModel.extend({
			defaults: Object.assign({}, dModel.prototype.defaults, {
				traits: [
					{
						type: 'flowTemplateName',
						label: 'flow template',
					},
					{
						type: 'flowTemplateSelectorButton',
						label: '',
						name: ''
					},		  
				], 
			}),
		}, {
		  isComponent: function(el) {
			if(el.tagName == 'INPUT'){
			  return {type: 'input'};
			}
		  },
		}),

		view: dView,
	});
	
	editor.TraitManager.addType('flowTemplateSelectorButton', {
		events: {
			'click': 'selectFlow', // trigger parent onChange method on click
		},

		selectFlow: function () {
			var flowTemplate = prompt("flow template name: ");
			//implement
			//$('#"+ InitiateJobButton.Id +"').trigger('click');
			const traitEl = document.querySelector('input[type="flowTemplateName"]');	//implement these 2 lines in outsystems javascript after flow popup is closed.
			traitEl && grapesjs.$(traitEl).val(flowTemplate).trigger('change');
		},
		getInputEl() {
            var button = document.createElement('button');
            button.id = 'btnFlowTemplateSelector';
			button.classList.add('actionButton');
            button.appendChild(document.createTextNode('Select a flow'));
			
            return button;
		//implement - after selection update trait value
		},
	});
   
  loadBlocks(editor, options);
  
 
  // TODO Remove
  //editor.on('load', () => editor.addComponents(`<div style="margin:100px; padding:25px;">Content loaded from the plugin</div>`, { at: 0 }))
};

