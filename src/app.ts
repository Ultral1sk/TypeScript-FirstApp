//validation  This in TypeScript is called INDEX PROPERTIES style 
interface Validatable {
      value        : string | number;      // a value that is a MUST!
      minLength   ?: number | undefined;  // ? still optional different syntax
      required    ?: boolean;             // ? optional
      maxLength   ?: number;              // ? optional
      min         ?: number;              // ? optional
      max         ?: number;              // ? optional   
}

function validate(validatableInput: Validatable) {
      let isValid = true; // we will use this whenever one of our input failes

      //if this is true then the value must be reqiured and value must not be empty
      if( validatableInput.required ) {
            
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
      }

      if    ( validatableInput.minLength != null    && 
              typeof validatableInput.value === 'string'
            ) 
            { isValid = isValid && validatableInput.value.length > validatableInput.minLength }
      
      if    ( validatableInput.maxLength != null   && 
              typeof validatableInput.value === 'string'
            ) 
            { isValid = isValid && validatableInput.value.length < validatableInput.maxLength }
     
      if    ( validatableInput.min != null && 
               typeof validatableInput.value === 'number'
            ) 
            { isValid = isValid && validatableInput.value > validatableInput.min; }
     
      if    ( validatableInput.max != null && 
               typeof validatableInput.value === 'number'
            ) 
            { isValid = isValid && validatableInput.value < validatableInput.max; }
               
      return isValid

}

//autobind decorator
function autobind(
      _: any,
       _2: string,
        descriptor: PropertyDescriptor
      ) {

      const originalMethod = descriptor.value
      const adjDescriptor: PropertyDescriptor  = {
            configurable: true,
            get() {
                  const boundFn = originalMethod.bind(this);
                  return boundFn;
            }

      };
      return adjDescriptor
}


//Project list Class

class ProjectList {
      templateElement         : HTMLTemplateElement;
      hostElement             : HTMLDivElement;
      element                 : HTMLElement;

                  //making the id dynamic
      constructor( private type: 'active' |  'finished' ) {
            this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
            this.hostElement     = document.getElementById('app')! as HTMLDivElement;
            
            // we store the templateElement content inside the varuable
            const importendNode = document.importNode(this.templateElement.content, true);
            // and then here we say inside the form and it's first child implement the content
            this.element    = importendNode.firstElementChild as HTMLElement
            this.element.id = `${this.type}-projects` //making the id dynamic based on the parameters in the constructor
            
            this.attach();
            this.renderContent();
      }

      private renderContent() {
            const listId = `${this.type}project-list`

            this.element.querySelector('ul')!.id = listId  // adding id to the only ul 
            this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS'

      }

      private attach() {
            this.hostElement.insertAdjacentElement('beforeend', this.element);

      }
}



//ProjectInput class
class ProjectInput {
      templateElement         : HTMLTemplateElement;
      hostElement             : HTMLDivElement;
      element                 : HTMLFormElement;
      titleInputElement       : HTMLInputElement;
      descriptionInputElement : HTMLInputElement;
      peopleInputElement      : HTMLInputElement;


      constructor() {
            // targeting the template and div elements 
            this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
            this.hostElement     = document.getElementById('app')! as HTMLDivElement;
            
            // we store the templateElement content inside the varuable
            const importendNode = document.importNode(this.templateElement.content, true);
            // and then here we say inside the form and it's first child implement the content
            this.element    = importendNode.firstElementChild as HTMLFormElement
            this.element.id = 'user-input'
           
            // here we are saying that we want to target the elements that are inside the form element(this.element) that have an id of title, desc, people in
            this.titleInputElement        = this.element.querySelector('#title')!       as HTMLInputElement;
            this.descriptionInputElement  = this.element.querySelector('#description')! as HTMLInputElement;
            this.peopleInputElement       = this.element.querySelector('#people')!      as HTMLInputElement;

            this.configure();
            this.attach();
        
      }

      // in one case we have a tuple and in another we return nothing that is why we have the void situation combined with union type
      private gatherUserInput(): [string, string, number] | void {
            const enteredTitle       = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople      = this.peopleInputElement.value;

            const titleValidatable: Validatable = {
                  value     : enteredTitle,
                  required  : true
            }
            const descriptionValidatable: Validatable = {
                  value     : enteredDescription,
                  required  : true,
                  minLength : 5
            }
            const peopleValidatable: Validatable = {
                  value     : +enteredPeople,
                  required  : true,
                  min       : 1,
                  max       : 5,
            }

            // if(enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0 )
            if( 
                !validate(titleValidatable) ||
                !validate(descriptionValidatable) ||
                !validate(peopleValidatable)
            ) { 
                 alert('Invalid input please try again')
                 return;
            } else {
                 return [enteredTitle, enteredDescription, parseFloat(enteredPeople)];
            }
      }

      private clearInputs() {
            this.titleInputElement.value = ''
            this.descriptionInputElement.value = ''
            this.peopleInputElement.value = ''
      }

      @autobind
      private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            // we are checking if the tuple that we are going to receive is an array that is the only way how we can check
            if(Array.isArray(userInput)) {
                  const [title, description, people] = userInput;
                  console.log(title, description, people)
                  this.clearInputs() // clearing the inptus after submitting
            }
      }

      private configure() {
            this.element.addEventListener("submit", this.submitHandler)
      }
 
      private attach() {
            // this is a js vanila method that says at the beginning put the content of this element
            this.hostElement.insertAdjacentElement('afterbegin', this.element);
      }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishPrjList = new ProjectList('finished');
