import {findElement, getElement} from './elementSeeker.js';

const variationsArray = ['level', 'description', 'reps', 'sets'];

export class AddEditModal {
	
	constructor (mainElementIds) {
		this.wrapper = getElement(mainElementIds.wrapper);
		this.dropdown = getElement(mainElementIds.dropdown);
		this.inputs = getElement(mainElementIds.inputs);

		this.inputsId = mainElementIds.inputs;
		this.variationsId = mainElementIds.variations;
		this.origVariation = findElement(`#${this.variationsId}0`);
	}

	showHide(showOrHide){

		 console.log(`set wrapper id ${this.wrapper} visibility to: ${showOrHide}`);
		 this.wrapper.setAttribute('style', `display:${showOrHide}`);
		 this.dropdown.options[0].selected = true;
	}

	displayEditDropdown(){
		 // (hide inputs)
		 this.inputs.setAttribute('style', 'display:none');
		 // show dropdown
		 this.dropdown.options[0].selected = true; // reset default selection to "please select"
		 this.dropdown.setAttribute('style', 'display:block');
	}

	getSelectedExercise(){
		return this.dropdown.options[this.dropdown.selectedIndex].value;
	}

	displayInputs(exerciseObj){
		 // (hide dropdown)
		 this.dropdown.setAttribute('style', 'display:none');
		 // show inputs
		 this.resetInputs();
		 this.inputs.setAttribute('style', 'display:block');

		 this.populateInputs(exerciseObj);
	}


	populateInputs(exercise){
		//populate the name
		findElement(`#${this.inputsId} #name`).setAttribute('value', exercise.name);
		//populate the variation elements, and copy as needed
		this.populateVariations(exercise.variations);
	}


	populateVariations(exerciseVariations) {
		console.log(this.origVariation);
		var loopNum = 0;
		// loop variations
		for(var variation of exerciseVariations){

			var elementBlock = this.origVariation;
			if(loopNum > 0) {
				elementBlock = this.origVariation.cloneNode(true);
				elementBlock.id = this.variationsId + loopNum; 
			}

			for(var varDetail of variationsArray){
	//			console.log(`seeking id: #${varDetail}-${loopNum}`)
				var detailElement = 
				elementBlock.querySelector(`#${varDetail}-0`);
				if(varDetail === 'level') {
					detailElement.textContent = variation[varDetail];
				} else {
					detailElement.setAttribute('value', variation[varDetail]);
				}
				detailElement.id = varDetail + '-' + loopNum;
			}

			if(loopNum > 0){
				this.inputs.appendChild(elementBlock);
			}
			loopNum++;
		}
	}


	resetInputs(){

		let inputBlock = this.inputs;
		inputBlock.querySelector('#name').value = '';

		let lastVariation = inputBlock.lastChild.previousSibling;

		if(lastVariation.id !== `${this.variationsId}0`){

			lastVariation = inputBlock.lastChild;
			const maxId = lastVariation.id.replace(/^.*-/g, '');
			console.log("yes, remove them! We've got " + maxId + " blocks");
			for(var v = maxId; v > 0; v--){

				console.log("remove " + inputBlock.lastChild.id);
				inputBlock.removeChild(inputBlock.lastChild);
			}
		}
	}
	
}
