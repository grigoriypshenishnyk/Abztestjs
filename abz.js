let page = 1;
let count = 6;
const maxSumbol = 25;
const maxName = 20;


// при загрузке страницы тянет юзеров с бека и отрисовывает

function firstRun () {
    
    fetch(
  `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`
)
  .then((response) => {
    spin();
    return response.json();
  })
  .then((data) => {
    Drawer(data);
  })
}
firstRun ()

const getCon = document.querySelector(".getCon");

const Drawer = (data) => {
  data.users.map((user) => {
    const div = document.createElement("div");
    div.classList.add("user");
    getCon.appendChild(div);

    const cont = document.createElement("div");
    cont.classList.add("cont");
    div.appendChild(cont);

    const img = document.createElement("img");
    cont.appendChild(img);
    img.src = user.photo;
    img.onerror = () => {
        console.log(img);
        img.src = './img/photo-cover.png'
    }

    const name = document.createElement("p");
    name.classList.add("name");
    cont.appendChild(name);
    const nameText = user.name.length > maxName ? user.name.slice(0, maxName) + "..." : user.name
    name.title = user.name
    name.innerText = nameText;

    const position = document.createElement("p");
    cont.appendChild(position);
    position.innerText = user.position;

    const email = document.createElement("p");
    cont.appendChild(email);
    //! place
    const emailText =  user.email.length > maxSumbol ? user.email.slice(0, maxSumbol) + '...' : user.email
    email.title = user.email;
    email.innerText = emailText;

    const phone = document.createElement("p");
    cont.appendChild(phone);

    const rightPhone =
      user.phone[0] === "+"
        ? `${user.phone.slice(0, 3)} (${user.phone.slice(
            3,
            6
          )}) ${user.phone.slice(6, 9)} ${user.phone.slice(
            9,
            11
          )} ${user.phone.slice(11)}`
        : `+${user.phone.slice(0, 3)} (${user.phone.slice(
            3,
            6
          )}) ${user.phone.slice(6, 9)} ${user.phone.slice(
            9,
            11
          )} ${user.phone.slice(11)}`;
    phone.innerText = rightPhone;
  });
  page++;
  spinoff();
};

// по нажатию кноки шоумор переходит на следующую страницу и тянет из бека юзеров и рисует на странице

const showMore = document.querySelector(".showMore");

showMore.addEventListener("click", show);

function show() {
  fetch(
    `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`
  )
    .then((response) => {
      spin();
      return response.json();
    })
    .then((data) => {
      Drawer(data);
        createError('errors')
      data.total_pages === page ? (showMore.style.display = "none") : null;
    });
}

// тянет позитионс из бека и рисует на странице

const poscon = document.querySelector(".poscon");

fetch("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
  .then((response) => response.json())
  .then((data) => {
    data.positions.forEach((position) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      const span = document.createElement("span");
      poscon.appendChild(label);
      label.appendChild(input);
      label.appendChild(span);

      label.for = position.id;
      span.innerText = position.name;

      input.type = "radio";
      input.id = position.id;
      input.checked = input.id === "1";

      input.value = position.name;
      input.name = "position";
    });
  });

// спинеровключатель
const spinner = document.querySelector(".spinner");

const spin = () => {
  spinner.style.display = "block";
};

const spinoff = () => {
  spinner.style.display = "none";
};

// проверка инпутов

const inputForPost = document.querySelectorAll(".inputForPost");
const errors = document.querySelectorAll(".errors");
const signup = document.querySelector(".signup");
const yname = document.querySelector(".yname");
const email = document.querySelector(".email");
const phone = document.querySelector(".phone");
const upload = document.querySelector("#upload");
const loaded = document.querySelector(".loaded");


const errorName = document.querySelector(".errorName");
const errorMail = document.querySelector(".errorMail");
const errorPhone = document.querySelector(".errorPhone");
const errorPhoto = document.querySelector(".errorPhoto");
const uploadBlock = document.querySelector(".upload");




inputForPost.forEach((teg,i)=>{
    teg.oninput = () => {
        teg.style.border = "1px solid #D0CFCF";
        errors[i].style.display = "none";
        checkIfReady()
    }
})

upload.oninput = () => {
    if (upload.files[0]) {
        loaded.innerText = upload.files[0].name
        uploadBlock.style.border = "none";
        errorPhoto.style.display = "none";
        checkIfReady() 
    } else {
        return
    }
    
}

const checkIfReady = () => {
     if (yname.value !== "" && email.value !== "" && phone.value !== "" && upload.value !== "") {
            signup.classList.add("signActive")
            signup.addEventListener('click', checkForms)
        } else {
            signup.classList.remove("signActive")
            signup.removeEventListener('click', checkForms)
        }
}

const isError = {
    yname : false,
    email : false,
    phone : false,
    upload : false
}

function checkForms () {
    if(yname.value.length < 2 || yname.value.length > 60) {
        yname.style.border = "2px solid #CB3D40";
        errorName.style.display = "block";
        isError.yname = false
    } else {
        isError.yname = true
    }

    const emailRight =/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    if (!emailRight.test(email.value) || email.value.length > 100) {
        email.style.border = "2px solid #CB3D40";
        errorMail.style.display = "block";
        isError.email = false
    } else {
        isError.email = true
    }

    const phoneRight = /^[\+]{0,1}380([0-9]{9})$/;

    if (!phoneRight.test(phone.value)) {
        phone.style.border = "2px solid #CB3D40";
        errorPhone.style.display = "block";
        isError.phone = false
    } else {
        isError.phone = true
    }


    const normal = document.querySelector(".normal")
                        const afterSent = document.querySelector(".afterSent")

    const url = window.URL.createObjectURL(upload.files[0]);
    const img = new Image();
    img.src = url;

    img.onload = function () {

        if (upload.files[0].size > 5242880 || upload.files[0].type !== "image/jpeg" || img.width < 70 || img.height < 70) {
            errorPhoto.style.display = "block";
            uploadBlock.style.border = "2px solid #CB3D40";
            uploadBlock.style.borderRadius = "4px";
            isError.upload = false
            
        } else {
            isError.upload = true
            
            if (isError.yname && isError.email && isError.phone && isError.upload) {
                const selectedId = parseInt(document.querySelector('input[name="position"]:checked').id)
                
                const formData = new FormData()
                formData.append('position_id', selectedId)
                formData.append('name', yname.value)
                formData.append('email', email.value)
                formData.append('phone', phone.value)
                formData.append('photo', upload.files[0])
                
                fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token') 
                .then(function(response) { 
                    spin();
                    return response.json();
                 }) 
                .then(function(data) { 
                    const token = data.token
                    post (token)

                }) 

              function post (token) {
                fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
                     method: 'POST', 
                     body: formData, 
                     headers: { 'Token': token,
                    },
                 })
                .then(function(response) { 
                    return response.json(); 
                }) .then(function(data) { 
                    
                    if(data.success) {
                        const users = document.querySelectorAll(".user")
                        users.forEach((user)=> user.remove())
                        page = 1
                        firstRun ()

                        normal.remove()
                        const h2 = document.createElement("h2")
                        afterSent.appendChild(h2)
                        const img = document.createElement("img")
                        afterSent.appendChild(img)
                        img.src = "img/success-image.jpg"
                        h2.innerText = data.message
                        spinoff()
                    } else { 
                        
                        normal.remove()
                        const h2 = document.createElement("h2")
                        afterSent.appendChild(h2)
                        h2.innerText = data.message
                        spinoff()
                    }
                    }) 
                    .catch(function(error) {
                         
                    });    
              }         
            } 
        }
    }       
}