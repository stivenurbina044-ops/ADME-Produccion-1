const URL_BASE = "https://proyectoacmeproduccion1-default-rtdb.firebaseio.com/";

const formulario = document.getElementById("registroForm");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const id = document.getElementById("regId").value.trim();
    const nombre = document.getElementById("regNombre").value.trim();
    const cargo = document.getElementById("regCargo").value;
    const password = document.getElementById("regPass").value;
    const confirmar = document.getElementById("regPassConfirn").value;

    const error = document.getElementById("errorRegistro");
    const exito = document.getElementById("exitoRegistro");

    error.textContent = "";
    exito.textContent = "";

    if(password !== confirmar){
        error.textContent = "Las contraseñas no coinciden";
        return;
    }

    try{

        // Buscar si ya existe esa identificación
        const consulta = query(
            collection(db, "usuarios"),
            where("identificacion", "==", id)
        );

        const resultado = await getDocs(consulta);

        if(!resultado.empty){
            error.textContent = "La identificación ya está registrada.";
            return;
        }

        // Guardar usuario
        await addDoc(collection(db,"usuarios"),{

            identificacion: id,
            nombre: nombre,
            cargo: cargo,
            password: password

        });

        exito.textContent = "Usuario registrado correctamente.";

        formulario.reset();

    }catch(error){

        console.error(error);

        document.getElementById("errorRegistro").textContent =
        "Ocurrió un error al registrar.";

    }

});