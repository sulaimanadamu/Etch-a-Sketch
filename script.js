'use strict';
//logic for the app is 
//create row with 16 divs, then add each row to the container div 16 times

const fillerDiv = document.createElement('div')
const rowDiv = document.createElement('div')
const tileContainer = document.createElement('div')
const interactionContainer = document.createElement('div')
const formFieldCont = document.createElement('div')
const btnContainer = document.createElement('div')
const header = document.createElement('header')
const body = document.querySelector('body')
const rows = 16
const cols = 16

formFieldCont.id = 'form'
interactionContainer.id = 'aside'

header.textContent = 'Etch-a-Sketch'
console.log(tileContainer.offsetWidth)

// tileContainer.style.border = '2px solid green'
tileContainer.setAttribute('id',"tile-container")
interactionContainer.setAttribute('id', "interaction-Container")
fillerDiv.style.width = '100px'
rowDiv.style.display = "flex"
rowDiv.style.height = '30px'

function buildTile(){
for (let i = 0; i < cols; i++){
    fillerDiv.className = 'block'
    rowDiv.appendChild(fillerDiv.cloneNode(true))
}
for (let i = 0; i < rows; i++){
    const rowClone = rowDiv.cloneNode(true)
    rowClone.className = `row${i}`
    tileContainer.appendChild(rowClone)
}
}


tileContainer.addEventListener('mouseover', (e)=>{
    if(e.target.classList.contains('block')){
    e.target.style.backgroundColor = 'red'
    }
})



function constructForm(formContainer){
    const rowInput = document.createElement('input')
    const rowLabel = document.createElement('label')
    const colInput = document.createElement('input')
    const colLabel = document.createElement('label')
    const rowInputBlock = document.createElement('div')
    const colInputBlock = document.createElement('div')
    rowLabel.className = "label"
    colLabel.className = "label"
    rowInput.placeholder = 'Maximum of 100'
    colInput.placeholder = 'Maximum of 100'
    rowInputBlock.id = 'row-block'
    colInputBlock.id = 'col-block'
    rowLabel.textContent = "Box per row"
    colLabel.textContent = "Box per column"
    rowInput.setAttribute('id', "row-input")
    rowLabel.setAttribute('for', 'row-input')
    colInput.setAttribute('id', "col-input")
    colLabel.setAttribute('for', 'col-input')
    rowInputBlock.append(rowLabel, rowInput)
    colInputBlock.append(colLabel, colInput)
    formContainer.append(rowInputBlock, colInputBlock)
}

function constructBtns(btnsContainer){
    const resetBtn = document.createElement('button')
    const clearBtn = document.createElement('button')
    resetBtn.textContent = "RESET"
    clearBtn.textContent = "CLEAR"
    btnContainer.setAttribute("id", 'btns')

    resetBtn.setAttribute('id', "reset")
    clearBtn.setAttribute('id', "clear")
    resetBtn.setAttribute('class', "btn")
    clearBtn.setAttribute('class', "btn")
    btnsContainer.append(clearBtn, resetBtn)
}

function buildAsideBlock(){
    constructForm(formFieldCont)
    constructBtns(btnContainer)
    interactionContainer.append(header, formFieldCont, btnContainer)
}

function buildDom(parent, ...children){
    for(let child of children){
        parent.append(child)
    }
}
buildTile()
buildAsideBlock()
buildDom(body, interactionContainer, tileContainer)