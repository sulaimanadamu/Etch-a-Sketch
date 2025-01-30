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

// const empty = DOMPurify.sanitize('')
let erase = false
let rows = 100
let cols = 100

app()

  // console.log("box width", boxWidth)
    // console.log("box Height", boxHeight)
    // console.log("interaction height", interactionContainer.offsetHeight)
    // console.log("interaction width", interactionContainer.offsetWidth)
    
function buildTile(){
    rowDiv.textContent = ''
    fillerDiv.textContent = ''
    tileContainer.textContent = ''
    console.log(rowDiv)
    console.log(fillerDiv)

    tileContainer.setAttribute('id',"tile-container")
    let boxHeight = interactionContainer.offsetHeight / rows
    let boxWidth = interactionContainer.offsetWidth / cols
  
    rowDiv.style.display = "flex"
    rowDiv.style.height = `${boxHeight}px`
    fillerDiv.style.width = `${boxWidth}px`

    for (let i = 0; i < cols; i++){
        fillerDiv.className = 'block'
        rowDiv.appendChild(fillerDiv.cloneNode(true))
    }

    for (let i = 0; i < rows; i++){

        const rowClone = rowDiv.cloneNode(true)
        rowClone.className = `row${i}`
        console.log(rowClone)
        tileContainer.appendChild(rowClone)
    }
    
}

function getUserInput(){
        const rowElement = document.querySelector('#row-input')
        const colElement = document.querySelector('#col-input')
        const rowValue = parseInt(rowElement.value)
        const colValue = parseInt(colElement.value)
       
        if(colElement.value && rowElement.value){
            if((colValue <= 100 && colValue > 0) && (rowValue <= 100 && rowValue > 0)){
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
    buildTile()
    eventListeners()
}


function eventListeners(){
    const reset = document.querySelector('#reset')
    reset.addEventListener('click', ()=>{
        cols = 100
        rows = 100
        console.log("before", tileContainer.children)
        tileContainer.textContent = ''
        buildTile()
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
                e.target.style.backgroundColor = "white"
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

