 const form = document.getElementById('myForm');
const responseMsg = document.getElementById('responseMsg');
const buttonEl = document.getElementById("buttonvalue");
const buttonEl1 = document.getElementById("buttonvalue1");
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

    if (response.ok) {
        messageElement.textContent = responseText;
        messageElement.style.color = 'green';
        
        // **Ikkada redirect code add cheyyandi.**
        // 3 seconds tarvata 'main.html' ki redirect avvadaniki.
        setTimeout(() => {
            window.location.href = 'https://ai-voice-assisstant-ap4o.onrender.com';
        }, 3000); // 3000 milliseconds = 3 seconds
    } else {
        messageElement.textContent = responseText;
        messageElement.style.color = 'red';
    }
});


    
    buttonEl.style.display = 'none';

  function checkInputs() {
      if (nameEl.value !== "" && emailEl.value !== "") {
          buttonEl.style.display = 'block';
      } else {
          buttonEl.style.display = 'none';
      }
  }

  nameEl.addEventListener('input', checkInputs);
  emailEl.addEventListener('input', checkInputs);


//  buttonEl1.style.display = 'none';

//   function checkInputs() {
//       if (nameEl.value !== "" && emailEl.value !== "") {
//           buttonEl1.style.display = 'block';
//       } else {
//           buttonEl1.style.display = 'none';
//       }
//   }

//   nameEl.addEventListener('input', checkInputs);
//   emailEl.addEventListener('input', checkInputs);