 const form = document.getElementById('myForm');
const responseMsg = document.getElementById('responseMsg');
const buttonEl = document.getElementById("buttonvalue");
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email')
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = {

      name: formData.get('name'),
      email: formData.get('email'),
      };


      try {
        const res = await fetch('http://localhost:3000/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await res.json();
        responseMsg.textContent = result.message;
        responseMsg.textContent = "User Register Successfully"
      } catch (err) {
        responseMsg.textContent = 'Error sending data to server';
        console.error('Frontend error:', err);
      }
    });



const loginForm = document.getElementById('loginForm');
   
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    });

    const messageElement = document.getElementById('message');
    const responseText = await response.text();
     if (name.name === ""){
        responseMsg.textContent = "Requried";
     }
    
});
// setTimeout(() => {
//             window.location.href = 'https://ai-voice-assisstant-ap4o.onrender.com';
//         }, 3000); // 3000 milliseconds = 3 seconds

//data needs to be in check--data.value--if value in data need to show some msg else need to pass



    buttonEl.style.display = 'none';
    buttonEl.addEventListener('click', function() {
    if (nameEl.value === "" || emailEl.value === "") {
        buttonEl.style.display = 'none'; 
    }else{
        buttonEl.style.display = 'block';
    }
});


