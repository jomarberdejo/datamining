/*Prevent from accessing*/
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (!username || !password) {
  window.location.href = "index.html";
}