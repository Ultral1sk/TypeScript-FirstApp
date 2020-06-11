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

      @autobind
      private submitHandler(event: Event) {
            event.preventDefault();
            console.log(this.titleInputElement.value);
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