//logic for the app is 
//create row with 16 divs, then add each row to the container div 16 times

const fillerDiv = document.createElement('div')
const rowDiv = document.createElement('div')
const entireContainerDiv = document.createElement('div')
const body = document.querySelector('body')

entireContainerDiv.style.width = '100vw'
entireContainerDiv.style.height = '100vh'
console.log(entireContainerDiv.offsetHeight)

entireContainerDiv.style.border = '2px solid green'


fillerDiv.style.width = '100px'
rowDiv.style.display = "flex"
rowDiv.style.height = '30px'


const rows = 16
const cols = 16

for (let i = 0; i < cols; i++){
    rowDiv.appendChild(fillerDiv.cloneNode(true))
}

for (let i = 0; i < rows; i++){
    const rowClone = rowDiv.cloneNode(true)
    entireContainerDiv.appendChild(rowClone)
}

body.appendChild(entireContainerDiv)
entireContainerDiv.addEventListener('click', (e)=>{
    if(e.target){
       
    }
})
