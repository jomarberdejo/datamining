
document.querySelector('.logout-link').addEventListener('click', function(e) {
  e.preventDefault();

  Swal.fire({
    title: `<p style= "color: #fff">Are you sure you want to log out? </p>`,
    icon: 'warning',
    background: '#225',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log out!',
    
  }).then((result) => {
    if (result.isConfirmed) {

      localStorage.removeItem("username");
      localStorage.removeItem("password");

      window.location.href = "index.html";

    
    }
  

  })
});


 

  

  
