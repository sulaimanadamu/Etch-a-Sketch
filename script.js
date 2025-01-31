'use strict';

//logic for the app is 
//create row with 16 divs, then add each row to the container div 16 times

const tileContainer = document.createElement('div')
const interactionContainer = document.createElement('div')
const formFieldCont = document.createElement('div')
const btnContainer = document.createElement('div')
const header = document.createElement('header')
const body = document.querySelector('body')
const fillerDiv = document.createElement('div')
const rowDiv = document.createElement('div')
let boxHeight = 0
let boxWidth = 0
const paddingPlusMargin = 24

let erase = false
let rows = 50
let cols = 50

app()

function buildTile(){
    rowDiv.textContent = ''
    tileContainer.textContent = ''
    tileContainer.setAttribute('id',"tile-container")
    boxHeight = (tileContainer.offsetHeight - paddingPlusMargin) / rows
    boxWidth = (tileContainer.offsetWidth - paddingPlusMargin) / cols
   
    for (let i = 0; i < cols; i++){
        fillerDiv.style.width = `${boxWidth}px`
        fillerDiv.style.height = `${boxHeight}px`
        fillerDiv.className = 'block'
        fillerDiv.id = `id-${i}`
        rowDiv.appendChild(fillerDiv.cloneNode(true))
    }

    for (let i = 0; i < rows; i++){        
        const rowClone = rowDiv.cloneNode(true)
        rowClone.className = `row ${i}`
        tileContainer.appendChild(rowClone)
    }
}

function getUserInput(){
        const rowElement = document.querySelector('#row-input')
        const colElement = document.querySelector('#col-input')
        const rowValue = parseInt(rowElement.value)
        const colValue = parseInt(colElement.value)
       
        if(colElement.value && rowElement.value){
            if((colValue <= 50 && colValue > 0) && (rowValue <= 50 && rowValue > 0)){
                rows = parseInt(colElement.value)
                cols = parseInt(colElement.value)
                rowElement.value = ''
                colElement.value = ''
            }
            else{
                alert("Please make your input with the range specified")
            }
        }
        else{
                alert("Please fill the number of tiles for rows and columns!")
        }
    }


function generateRandomHexCode(){
    let hex = '#'
    for(let i = 0; i < 6; i++){
        const alphaNumeric = [1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
        const component = alphaNumeric[Math.floor(Math.random() * alphaNumeric.length)]
        hex += component
    }
    return hex
}

function constructForm(formContainer){
    const rowInput = document.createElement('input')
    const rowLabel = document.createElement('label')
    const colInput = document.createElement('input')
    const colLabel = document.createElement('label')
    const rowInputBlock = document.createElement('div')
    const colInputBlock = document.createElement('div')
    rowLabel.className = "label"
    colLabel.className = "label"
    rowInput.placeholder = 'Maximum of 50'
    colInput.placeholder = 'Maximum of 50'
    rowInputBlock.id = 'row-block'
    colInputBlock.id = 'col-block'
    rowLabel.textContent = "Box per row"
    colLabel.textContent = "Box per column"
    rowInput.setAttribute('id', "row-input")
    rowLabel.setAttribute('for', 'row-input')
    colInput.setAttribute('id', "col-input")
    colLabel.setAttribute('for', 'col-input')
    formContainer.setAttribute("id", 'form')
    rowInputBlock.append(rowLabel, rowInput)
    colInputBlock.append(colLabel, colInput)
    formContainer.append(rowInputBlock, colInputBlock)
}

function constructBtns(btnsContainer){
    const resetBtn = document.createElement('button')
    const clearBtn = document.createElement('button')
    const enter = document.createElement('button')
    
    enter.textContent = "Show Tile"
    resetBtn.textContent = "RESET"
    clearBtn.textContent = "CLEAR"

    btnContainer.setAttribute("id", 'btns')
    resetBtn.setAttribute('id', "reset")
    clearBtn.setAttribute('id', "clear")
    resetBtn.setAttribute('class', "btn")
    clearBtn.setAttribute('class', "btn")
    enter.setAttribute('class', "btn")
    enter.setAttribute('id', "enter")
    btnsContainer.append(clearBtn, resetBtn, enter)
}

function buildAsideBlock(){
    interactionContainer.setAttribute('id', "interaction-Container")
    header.textContent = 'Etch-a-Sketch'
    constructForm(formFieldCont)
    constructBtns(btnContainer)
    interactionContainer.append(header, formFieldCont, btnContainer)
}

function buildDom(parent, ...children){
    for(let child of children){
        parent.append(child)
    }
}

function app(){
    body.textContent = ''
    buildAsideBlock()
    buildDom(body, interactionContainer, tileContainer)
    // build tile depends on tile container being positioned first in the dom
    buildTile()
    eventListeners()
}

window.addEventListener('resize', function() {
    buildTile()
 })


function eventListeners(){
    const reset = document.querySelector('#reset')
    reset.addEventListener('click', ()=>{
        cols = 50
        rows = 50
        erase = false
        buildTile()
        console.log("Reset" )
    })

    //
    const clear = document.querySelector('#clear')
    clear.addEventListener("click", ()=>{
        erase = true;
    })

    //
    tileContainer.addEventListener('mouseover', (e)=>{
        if(e.target.classList.contains('block')){
            if(!erase){
                e.target.style.backgroundColor = generateRandomHexCode()
            }
            else{
                e.target.style.backgroundColor = "rgb(245, 240, 240)"
            }
        }
    })

    //
    const showTile = document.querySelector('#enter')
    showTile.addEventListener("click", ()=>{
        getUserInput()
        buildTile()
    })
}

