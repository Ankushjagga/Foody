const eyeIcon = document.getElementById('input-password');
const cEyeIcon = document.getElementById('input-cpassword');
		const passwordInputField = document.getElementById('password');
		const cPasswordInputField = document.getElementById('cpassword');
		const emailInputField = document.getElementById('email');
	
		const handleClick = eyeIcon.addEventListener("click",()=>{
			const type = passwordInputField.getAttribute('type') ;
            console.log("clickedd");
		 if (type === 'password' ) {
        passwordInputField.setAttribute('type', 'text');
      
		eyeIcon.classList.remove("fa-eye-slash")
		eyeIcon.classList.add("fa-eye")
    } else {
        passwordInputField.setAttribute('type', 'password');
			eyeIcon.classList.add("fa-eye-slash")
		eyeIcon.classList.remove("fa-eye")
    }

			})


            const handleClick2 = cEyeIcon.addEventListener('click',()=>{
                const ctype =cPasswordInputField.getAttribute('type') ;

                if(ctype === 'password') {
    
                    cPasswordInputField.setAttribute('type', 'text');
                    cEyeIcon.classList.remove("fa-eye-slash")
                    cEyeIcon.classList.add("fa-eye")
                } else {
                    cPasswordInputField.setAttribute('type', 'password');
                    cEyeIcon.classList.add("fa-eye-slash")
                    cEyeIcon.classList.remove("fa-eye")
                }
            })

			
	
			