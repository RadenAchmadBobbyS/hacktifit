// if (localStorage.getItem("isLogin") !== null) {
//     if (localStorage.getItem("isLogin") === 'true') {
//         window.location.href = 'index.html'
//     }
// }


let users
if (localStorage.getItem("users") !== null) {
    users = JSON.parse(localStorage.getItem("users"))
} else {
    users = []
}

document.getElementById('btnRegister').addEventListener("click", () => {
    register()
})


// functions
function register() {

    let namaLengkap = document.getElementById('input_nama_lengkap').value.trim()
    let email = document.getElementById('input_email').value.trim()
    let password = document.getElementById('input_password').value.trim()
    let confirmPassword = document.getElementById('input_konfirmasi_password').value.trim()

    // reset
    document.getElementById('error').className = "mt-2 mx-auto hidden"

    // Validasi
    if (namaLengkap === "") {
        document.getElementById('error').className = "mt-2 mx-auto text-red"
        document.getElementById('error').innerText = "Nama lengkap tidak boleh kosong"
        return;
    }

    if (email === "") {
        document.getElementById('error').className = "mt-2 mx-auto text-red text-center"
        document.getElementById('error').innerText = "Email tidak boleh kosong"
        return;
    }

    if (password === "") {
        document.getElementById('error').className = "mt-2 mx-auto text-red text-center"
        document.getElementById('error').innerText = "Password tidak boleh kosong"
        return;
    }

    if (confirmPassword === "") {
        document.getElementById('error').className = "mt-2 mx-auto text-red text-center"
        document.getElementById('error').innerText = "Konfirmasi tidak boleh kosong"
        return;
    }

    if (confirmPassword !== password) {
        document.getElementById('error').className = "mt-2 mx-auto text-red text-center"
        document.getElementById('error').innerText = "Password dan konfirmasi password harus sama"
        return;
    }

    let user = {
        'nama_lengkap': namaLengkap,
        'email': email,
        'password': password
    }
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
    window.location.href = 'login.html'

    // simpan informasi user yang login
    localStorage.setItem('user', JSON.stringify(user))
}