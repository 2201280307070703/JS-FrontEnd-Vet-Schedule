function solve(){
    const inputDomElements={
        name:document.querySelector("#name"),
        type:document.querySelector("#animal"),
        date:document.querySelector("#datetime")
    }
    
    const otherDomElements={
        addBtn:document.querySelector(".button.add"),
        upcomingContainer:document.querySelector(".list.upcoming"),
        doneContainer:document.querySelector(".list.done")
    }

    otherDomElements.addBtn.addEventListener("click", addAppointment);

    function addAppointment(){
        const allInputsHaveValue=Object.values(inputDomElements).every((input)=>
            input.value!=="")

        if(!allInputsHaveValue){
            return;
        }

        const li=createElement("li", otherDomElements.upcomingContainer, null, ["item"]);
        createElement("h3", li, inputDomElements.name.value, ["name"]);
        createElement("h4", li, inputDomElements.type.value, ["animal"]);
        createElement("p", li, inputDomElements.date.value, ["datetime"]);

        const buttonsContainer=createElement("div", li, null, ["buttons"]);
        const editBtn=createElement("button", buttonsContainer, `Edit`, ["button", "edit"]);
        const doneBtn=createElement("button", buttonsContainer, `Done`, ["button", "done"]);

        editBtn.addEventListener("click", editAppointment);
        doneBtn.addEventListener("click", doneAppointment);

        clearAllInputs();
    }

    function editAppointment(){
        const parent=this.parentNode.parentNode;
        const[name, type, date, _buttons]=Array.from(parent.children);
        
        inputDomElements.name.value=name.textContent;
        inputDomElements.type.value=type.textContent;
        inputDomElements.date.value=date.textContent;

        parent.parentNode.innerHTML="";
    }

    function doneAppointment(){
        const parent=this.parentNode.parentNode;
        otherDomElements.doneContainer.appendChild(parent);

        const buttons=parent.querySelector(".buttons");

        const deleteBtn=createElement("button", parent, `Delete`, ["button", "delete"]);

        buttons.remove();

        deleteBtn.addEventListener("click", deleteAppointment);
    }

    function deleteAppointment(){
        this.parentNode.parentNode.innerHTML="";
    }
    function clearAllInputs(){
        Object.values(inputDomElements).forEach((input)=>{
            input.value="";
        })
    }
    function createElement(type, parentNode, content, classes, id, attributes, useInnerHtml) {
        const htmlElement = document.createElement(type);
      
        if (content && useInnerHtml) {
          htmlElement.innerHTML = content;
        } else {
          if (content && type !== 'input') {
            htmlElement.textContent = content;
          }
      
          if (content && type === 'input') {
            htmlElement.value = content;
          }
        }
      
        if (classes && classes.length > 0) {
          htmlElement.classList.add(...classes);
        }
      
        if (id) {
          htmlElement.id = id;
        }
      
        if (attributes) {
          for (const key in attributes) {
            htmlElement.setAttribute(key, attributes[key])
          }
        }
      
        if (parentNode) {
          parentNode.appendChild(htmlElement);
        }
      
        return htmlElement;
      }
}

solve();