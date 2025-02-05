// if (localStorage.getItem("isLogin") !== null) {
//     if (localStorage.getItem("isLogin") === 'true') {
//         // langsung alihkan ke index.html
//         window.location.href = 'index.html'
//     }
// }

document.getElementById("btnLogin").addEventListener("click", () => {
    login()
})

function login() {
    let email = document.getElementById('input_email').value.trim()
    let password = document.getElementById('input_password').value.trim()

    // reset
    document.getElementById('error').className = "mt-2 hidden"

    // validasi
    if (email === "") {
        document.getElementById('error').className = "mt-2 text-red text-center"
        document.getElementById('error').innerText = "Email tidak boleh kosong"
        return;
    }

    if (password === "") {
        document.getElementById('error').className = "mt-2 text-red text-center"
        document.getElementById('error').innerText = "Password tidak boleh kosong"
        return;
    }

    /*
        - localStorage.getItem("users") itu mengembalikan string jika ingin dia menjadi array of objek gunakan json parse, 
        - jika ingin dari objek/arr ke string gunakan json stringify
    */

    let users = JSON.parse(localStorage.getItem("users"))
    for (let user of users) {
        // if account exist
        if (user['email'] === email) {
            if (user['password'] === password) {
                // berhasil login
                window.location.href = 'home.html'
                localStorage.setItem("isLogin", true)

                // simpan informasi user yang login
                localStorage.setItem('user', JSON.stringify(user))
            } else {
                // akun ditemukan tapi password salah
                document.getElementById('error').className = "mt-2 text-red text-center"
                document.getElementById('error').innerText = "Password yang anda masukkan salah"
                return;
            }
            break
        } else {
            // akun tidak ditemukan
            document.getElementById('error').className = "mt-2 text-red text-center"
            document.getElementById('error').innerText = "Akun dengan email tersebut tidak ditemukan"
            return;
        }
    }
}