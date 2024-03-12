
const tbody = document.querySelector('tbody')
const modal = document.querySelector('dialog')
const close = document.querySelector('.cross')

let id
function reloadTable(arr, place) {
    place.innerHTML = ''

    for(let item of arr) {
        let tr = document.createElement('tr')
        let num = document.createElement('td')
        let name = document.createElement('td')
        let age = document.createElement('td')
        let tools = document.createElement('td')
        let edit = document.createElement('button')
        let editImg = document.createElement('img')
        let deleteBtn = document.createElement('button')
        let deleteImg = document.createElement('img')

        place.append(tr)
        tr.append(num, name, age, tools)
        tools.append(edit, deleteBtn)
        edit.append(editImg)
        deleteBtn.append(deleteImg)
        editImg.src = './img/edit_icon.svg'
        editImg.alt = 'edit'
        deleteImg.src = './img/trash-bin.svg'
        deleteImg.alt = 'delete'

        num.innerHTML = arr.indexOf(item) + 1
        name.innerHTML = item.name
        age.innerHTML = item.age

        deleteBtn.onclick = () => {
            arr.splice(arr.indexOf(item), 1)
            reloadTable(arr, tbody)
        }

        edit.onclick = () => {
            modal.showModal();
            id = item.id;
         
            modalForm.name.value = item.name;
            modalForm.age.value = new Date().getFullYear() - item.age;
        };
    }
}

close.onclick = () => {
    modal.close()
}

let peoples = []

const form = document.forms.tableForm
const inps = form.querySelectorAll('input')
const modalForm = document.forms.modalForm

let errors = 0
form.onsubmit = (e) => {
    e.preventDefault()
    inps.forEach(inp => {
        if (inp.value === '') ++errors
    })

    if(errors === 0) submit()
}

function submit() {
    let value = {
        id: Math.random()
    }
    new FormData(form).forEach((val, key) => {
        value[key] = val
    })
    value.age = new Date().getFullYear() - +value.age

    if(value.age < new Date().getFullYear() - 100) return
    if(!isNaN(value.name)) return

    peoples.push(value)
    
    reloadTable(peoples, tbody)
}

modalForm.onsubmit = (e) => {
    e.preventDefault()
 
    let name = new FormData(modalForm).get('name')
    let age = new FormData(modalForm).get('age')
  
    let finded = peoples.find(el => el.id === id)
    finded.name = name
    finded.age = new Date().getFullYear() - age
    
    reloadTable(peoples, tbody)
    modal.close()
}