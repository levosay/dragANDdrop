document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form-js')
  const input = document.querySelector('.input-js')
  const preview = document.querySelector('.preview-js')
  let filesArray = []


  const dragOver = (event) => {
    event.preventDefault()
    event.stopPropagation()

    form.classList.add('form-over')


  }
  const dragLeave = () => {
    form.classList.remove('form-over')
  }
  const dragDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()
    form.classList.remove('form-over')

    formValidate(event.dataTransfer.files)
  }

  const removeElem = (event) => {
    let nameImg = event.target.parentElement.getAttribute('data')

    for (let i = 0; i < filesArray.length; i++) {
      if (filesArray[i].images.name === nameImg) {

        filesArray.splice(i, 1)

      }
    }

    event.target.parentElement.remove()
  }

  input.addEventListener('change', (event) => {
    formValidate(event.srcElement.files)
  })

  const createPrevElem = (elem) => {
    let imgWrapper = document.createElement('div')
    let img = document.createElement('img')
    let iconClose = document.createElement('img')

    iconClose.addEventListener('click', removeElem)

    img.classList.add('preview-img')
    imgWrapper.classList.add('preview-wrapper')
    imgWrapper.setAttribute('data',elem.name)
    iconClose.classList.add('icon-close')
    iconClose.src = 'img/close.png'
    img.src = URL.createObjectURL(elem)

    imgWrapper.append(iconClose)
    imgWrapper.append(img)
    preview.append(imgWrapper)
  }


  const formValidate = (dataTransfer) =>  {
    const maxFileSize = 1000000

    for (let i = 0; i < dataTransfer.length; i++) {
      if ((dataTransfer[i].size <= maxFileSize) && ((dataTransfer[i].type === 'image/png') || (dataTransfer[i].type === 'image/jpeg'))) {
        filesArray.push({'images': dataTransfer[i]})

        createPrevElem(dataTransfer[i])
      } else {
        alert('Файл не должен превышать 1мб и быть в формата jpg, png')
      }
    }

    return filesArray
  }

  const sendForm = (event) => {

    if (filesArray.length) {
      alert('Отправка')
    } else {
      alert('Добавьте файлы')
    }

    event.preventDefault()

  }


  form.addEventListener('dragover', dragOver)
  form.addEventListener('dragleave', dragLeave)
  form.addEventListener('drop', dragDrop)
  form.addEventListener('submit', sendForm)
})





