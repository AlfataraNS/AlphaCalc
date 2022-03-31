//fungsi tombol ON
function removeElement() {
    document.querySelector('.on-btn').style.display = 'none'
    document.querySelector('.off-btn').style.display = 'block'
    for (let el of document.querySelectorAll('.num')) el.style.visibility = 'visible';
    for (let el of document.querySelectorAll('.operator')) el.style.visibility = 'visible';
    for (let el of document.querySelectorAll('.decimal')) el.style.visibility = 'visible';
    for (let el of document.querySelectorAll('.percen')) el.style.visibility = 'visible';
    for (let el of document.querySelectorAll('.equal')) el.style.visibility = 'visible';
    for (let el of document.querySelectorAll('.all-clear')) el.style.visibility = 'visible';
    for (let el of document.querySelectorAll('.just-clear')) el.style.visibility = 'visible';
    screen.value='0'
    currentNum = ''
    prevNum = ''
    operandNum = ''
}

//fungsi tombol OFF
function resetElement() {
    screen.value=' '
    document.querySelector('.off-btn').style.display = 'none'
    document.querySelector('.on-btn').style.display = 'block'
    for (let el of document.querySelectorAll('.num')) el.style.visibility = 'hidden';
    for (let el of document.querySelectorAll('.operator')) el.style.visibility = 'hidden';
    for (let el of document.querySelectorAll('.decimal')) el.style.visibility = 'hidden';
    for (let el of document.querySelectorAll('.percen')) el.style.visibility = 'hidden';
    for (let el of document.querySelectorAll('.equal')) el.style.visibility = 'hidden';
    for (let el of document.querySelectorAll('.all-clear')) el.style.visibility = 'hidden';
    for (let el of document.querySelectorAll('.just-clear')) el.style.visibility = 'hidden';
}

// mendefinisikan var untuk pengambilan bilangan, menampilkan bilangan, dan pengoperasian bilangan
let screen = document.querySelector('.calc-screen')
let numbers = document.querySelectorAll('.num')
let operators = document.querySelectorAll('.operator')

// mendefinisikan var untuk angka pada layar
let currentNum = `${screen.value}` // diubah ke string dlu biar bisa concat
let operandNum = ''
let prevNum = ''

// clear all button
const clearAll = () => {
    currentNum = '0'
    operandNum = ''
    prevNum = ''
}

//clear button
const hapus = () => {
    currentNum = currentNum.toString().slice(0,-1);
}

// update bilangan
const updateScreen = (number) => {
    screen.value = number
}

// function untuk mengubah temp angka ketika operator diklik
const addOperator = (operator) => {
    if(operandNum == ''){
        prevNum = currentNum
    }
    operandNum = operator
    currentNum = ''
}

// antisipasi double comma
const commaClick = (comma) => {
    if(currentNum.includes('.')){
        return
    }
    // jika angka masih 0
    if (screen.value == '0'){
        currentNum = screen.value
    }
    currentNum += comma
}

// proses menghitung
const calculating = () => {
    let result = ''
    if(currentNum == ''){
        currentNum = '0'
    }
    
    switch(operandNum){
        case '+':
            result = parseFloat(prevNum) + parseFloat(currentNum)
            break
        case '-':
            result = parseFloat(prevNum) - parseFloat(currentNum)
            break
        case '*':
            result = parseFloat(prevNum) * parseFloat(currentNum)
            break
        case '/':
            result = parseFloat(prevNum) / parseFloat(currentNum)
            break
        default:
            break
    }
    currentNum = result
    operandNum = ''
}

// input angka pada layar
numbers.forEach((number)=>{
    number.addEventListener('click', (event)=>{
        // jika angka pd layar = 0, maka ubah angka menjadi angka yg diklik
        if(currentNum=='0'){
            currentNum = event.target.value
            updateScreen(currentNum)
        }
        // jika angka pd layar != 0, maka concat angka
        else{
            currentNum += event.target.value
            updateScreen(currentNum)
        }
    })
})

// menambahkan operator, namun tidak ditampilkan
operators.forEach((operator)=>{
    operator.addEventListener('click', (event)=>{
        addOperator(event.target.value)
    })
})

// btn equl, calculating proccess
const btn_equal = document.querySelector('.equal')

btn_equal.addEventListener('click', (event)=>{
    if(prevNum == ''){
        updateScreen(screen.value) 
    }
    else{
        if(screen.value != '0'){
            currentNum = screen.value
        }
        calculating()
        updateScreen(currentNum)
        clearAll()
    }
})

// btn all-clear
const btn_clearAll = document.querySelector('.all-clear')

btn_clearAll.addEventListener('click', (event)=>{
    clearAll()
    updateScreen(currentNum)
})

//btn clear
const btn_clear = document.querySelector('.just-clear')

btn_clear.addEventListener('click', (event)=>{
    hapus()
    updateScreen(currentNum)
})

//btn comma
const btn_comma = document.querySelector('.decimal')
inputDecimal = (dot) => {
    if(currentNum.includes('.')){
        return
    }
    currentNum += dot
}

btn_comma.addEventListener('click', (event)=>{
    commaClick(event.target.value)
    updateScreen(currentNum)
})

//  btn persen
const btn_percen = document.querySelector('.percen')

btn_percen.addEventListener('click', (event)=>{
    currentNum = currentNum / 100
    updateScreen(currentNum)
})
