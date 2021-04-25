let getForm = document.forms.form
let getSignUp = document.querySelector('.press')
let getInputEmail = document.querySelector('.email')
let getExist = document.querySelector('.existEmail')
let goToWindowUp = document.querySelector('.now')
let goToWindowIn = document.querySelector('.up')
let regForNameAndSur = /^[a-zA-Z]{2,20}$/
let regForEmail = /[a-zA-Z0-9]{2,30}@\w{1,10}\.\w+/
let regForPass = /[a-z?A-Z?0-9?@?\*?\/]+/

class User {
    constructor(name, surname, email, password) {
        this.name = name
        this.surname = surname
        this.email = email
        this.password = password
    }
}

let DB;
let objSave;
let onlyEmail;
let save;

if (localStorage.getItem('Data') == null) {
    DB = []
    onlyEmail = []
} else {
    onlyEmail = []
    objSave;
    save = JSON.parse(localStorage.getItem('Data'))
    console.log(save);
    DB = save
    for (let obj of DB)
        onlyEmail.push(obj.email)

}

let SignUp = document.querySelector('.signUp')
let SignIn = document.querySelector('.signIn')
goToWindowUp.addEventListener('click', function (e) {
    e.preventDefault()
    SignUp.classList.add('hide')
    SignIn.classList.add('show')
})
goToWindowIn.addEventListener('click', function (e) {
    e.preventDefault()
    SignUp.classList.remove('hide')
    SignIn.classList.remove('show')
})


getSignUp.addEventListener('click', function (e) {
    e.preventDefault()
    let getValueName = getForm.name.value
    let getValueSurname = getForm.surname.value
    let getValueEmail = getForm.email.value
    let getValuePass = getForm.password.value
    // Перевірка регулярних виразів
    let checkName = getValueName.match(regForNameAndSur)
    let checkSurname = getValueSurname.match(regForNameAndSur)
    let checkEmail = getValueEmail.match(regForEmail)
    let checkPass = getValueEmail.match(regForPass)



    if (checkName != null && checkSurname != null && checkEmail != null && checkPass != null) {

        // Перевіряє , чи є email вже в базі , якщо немає , тоді дозволяє добавити ,в іншому випадку , скаже що такий юзер вже є 
        if (onlyEmail.indexOf(getValueEmail) === -1) {
            console.log('Проходь');
            console.log('Перевірило на регулярку');
            let myUser = new User(getValueName, getValueSurname, getValueEmail, getValuePass)
            console.log("Добавлення юзере", myUser);
            DB.push(myUser)
            localStorage.setItem('Data', JSON.stringify(DB))
            onlyEmail.push(myUser.email)
            console.log(onlyEmail);
            getInputEmail.style.borderColor = 'rgb(0, 140, 255)'
            getForm.reset()
            getExist.classList.remove('existEmail')
            getExist.classList.remove('show');

        } else {

            getInputEmail.style.border = '2px solid red'
            getExist.classList.add('existEmail')
            getExist.classList.add('show')

        }
    }



})
let getIncorrect = document.querySelector('.incorrect')
let getSignIn = document.querySelector('.sgn')
let getEmpty = document.querySelector('.empty')
let getNotFound = document.querySelector('.notFound')
let getWindwoProfile = document.querySelector('.profile')
let getProfileName = document.querySelector('.profileName')
let getProfileEmail = document.querySelector('.profileEmail')
let getPrevPage = document.querySelector('.prevPage')
let getFormIn = document.forms.signInFrom
getSignIn.addEventListener('click', function () {
    let valueInEmail = getFormIn.email2.value
    let valueInPass = getFormIn.pass2.value
    let elem;
    for (elem of DB)
    // Вхід в профіль
        if (valueInEmail == elem.email) {
            if (valueInPass == elem.password) {
                console.log('ta');
                console.log(elem.password);
                getIncorrect.classList.remove('show')
                getNotFound.classList.remove('show')
                getFormIn.reset()
                SignIn.classList.remove('show')
                getWindwoProfile.classList.add('show')
                getProfileName.textContent = elem.name + ' ' + elem.surname
                getProfileEmail.textContent = elem.email

                getPrevPage.addEventListener('click', function (e) {
                    e.preventDefault()
                    SignIn.classList.add('show')
                    getWindwoProfile.classList.remove('show')
                    getProfileName.textContent = ''
                    getProfileEmail.textContent = ''
                })

            } else {
                getIncorrect.classList.add('show')
                getNotFound.classList.remove('show')

            }
        }



    if (onlyEmail.indexOf(valueInEmail) == -1 && valueInEmail != false && valueInPass != false) {
        console.log('немає користувача');
        getNotFound.classList.add('show')
        getIncorrect.classList.remove('show')
    }

    if (valueInEmail == false) {
        getFormIn.email2.style.borderColor = 'red'
        getEmpty.classList.add('show')
        getNotFound.classList.remove('show')


    }
    if (valueInPass == false) {
        getFormIn.pass2.style.borderColor = 'red'
        getEmpty.classList.add('show')
        getNotFound.classList.remove('show')

    } else if (valueInEmail != false && valueInPass != false) {
        getEmpty.classList.remove('show')
        getFormIn.email2.style.borderColor = 'rgb(0, 140, 255)'
        getFormIn.pass2.style.borderColor = 'rgb(0, 140, 255)'

        getNotFound.classList.add('hide')
    }

})

let getEye = document.querySelector('.checkMe')
getFormIn.chk.addEventListener('click', function () {
    if (getFormIn.chk.checked) {
        getFormIn.pass2.type = 'text'
    } else {
        getFormIn.pass2.type = 'password'
    }
})

let clearLocal = document.querySelector('.clearLocal')
clearLocal.addEventListener('click', function (e) {
    e.preventDefault()
    localStorage.clear()
    SignIn.classList.remove('show')
    getWindwoProfile.classList.remove('show')
    SignUp.classList.remove('hide')
    location.reload()
    alert('Веб-сховище почищено')

})