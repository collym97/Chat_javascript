
const texto = document.querySelector("#inputChat")
const botones = document.querySelector("#botones")
const users  = document.querySelector("#users")
const contenido = document.querySelector("#contenido")

firebase.auth().onAuthStateChanged(user => {
    if(user){
        formulario.classList = 'input-group mb-3 fixed-bottom container'
        contenidoChat(user)
    }else{
        formulario.classList = 'input-group mb-3 fixed-bottom container d-none'
    }
})

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // console.log(user)
    botones.innerHTML = `<button class="btn btn-outline-success mr-2" id="cerrar">Cerrar sesion</button>`
    users.innerHTML = user.displayName
    cerrarSesion()
  }
  else {
    console.log("no existe user")
    botones.innerHTML = `<button class="btn btn-outline-success mr-2" id="Acceder">Acceder</button>`
    iniciar()
    users.innerHTML = ` <img src="./icons8-phone-50.png" width="40" hight="40"> ChatWeb`
    contenido.innerHTML = `
    
    
    <div class="col d-flex justify-content-center">
    
<div class="card " style="width: 25rem; ">
    <p class="text-center h4">Debes iniciar sesión</p>
  <img class="card-img-top" src="./coding.jpg" alt="Card image cap">
  <div class="card-body">
    <p class="card-text">Welcome!! This project was created by my </br> Luis collymoore as part of my portfolio</p>
     
  </div>
 
</div>
 </div>
    
     `
    
  }
})
const contenidoChat = (user) => {
  
  
  formulario.addEventListener('submit', event => {
    event.preventDefault();
        
    console.log("funciona")
    if (!texto.value.trim()) {
      console.log('input vacio')
      return
    }
        
    firebase.firestore().collection('chat').add({
      texto: texto.value,
      uid: user.uid,
      fecha: Date.now()
    }).then(res => {
      console.log('texto agregado')
    })
    texto.value = ''
  })
      
firebase.firestore().collection('chat').orderBy('fecha')
  .onSnapshot(query => {
          console.log(query)
    contenido.innerHTML = '';
    query.forEach(doc => {
              console.log(doc.data())
                if(doc.data().uid === user.uid){
                    contenido.innerHTML += `
                    <div class="lead d-flex justify-content-end mb-3">
                        <span class="badge badge-primary">
                            ${doc.data().texto}
                        </span>
                    </div>
                    `
                }else{
                    contenido.innerHTML += `
                    <div class="d-flex justify-content-start mb-3">
                        <span class=" lead badge badge-secondary">${doc.data().texto}</span>
                    </div>
                    `
                }
                contenido.scrollTop = contenido.scrollHeight
            })
        })

}
const iniciar = () => {
  const Acceder = document.querySelector('#Acceder')
  Acceder.addEventListener('click', async () => {
    
    try {
      console.log("funciona")
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase.auth().signInWithPopup(provider)
    } catch (error) {
      console.log(error)
    }
  })
}

const cerrarSesion = () => {
  const cerrar = document.querySelector('#cerrar')
  cerrar.addEventListener('click',() => {
    firebase.auth().signOut()
  
  })
}
