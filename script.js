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
        const res = await fetch('http://localhost:3000/register-form', {
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


 buttonEl1.style.display = 'none';

  function checkInputs() {
      if (nameEl.value !== "" && emailEl.value !== "") {
          buttonEl1.style.display = 'block';
      } else {
          buttonEl1.style.display = 'none';
      }
  }

  nameEl.addEventListener('input', checkInputs);
  emailEl.addEventListener('input', checkInputs);