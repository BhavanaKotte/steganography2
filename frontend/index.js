const API_URL = "http://localhost:3000/api"; // replace with your API endpoint

let authToken = null; // stores the authentication token

loginBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
  
    // hardcoded values for username and password
    if (username === 'testuser' && password === 'testpassword') {
      // enable file upload and decryption button
      const fileInput = document.getElementById('file-input');
      const textInput = document.getElementById('text-input');
      const baseFileInput = document.getElementById('base-file-input');
      const decryptBtn = document.getElementById('decrypt-btn');
      fileInput.disabled = false;
      textInput.disabled = false;
      baseFileInput.disabled = false;
      decryptBtn.disabled = false;
    } else {
      alert('Invalid username or password');
    }
});

// function to handle the file upload and encryption functionality
function encrypt() {
  const fileInput = document.getElementById("file");
  const textInput = document.getElementById("text");
  const imageInput = document.getElementById("image");
  const carrierInput = document.getElementById("carrier");
  
  const file = fileInput.files[0];
  const text = textInput.value;
  const image = imageInput.files[0];
  const carrier = carrierInput.files[0];
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("text", text);
  formData.append("image", image);
  formData.append("carrier", carrier);
  
  // make a POST request to the API endpoint to encrypt the file
  fetch(`${API_URL}/encrypt`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  })
    .then((response) => response.blob())
    .then((blob) => {
      // create a download link for the encrypted file
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.getElementById("download-link");
      link.href = url;
      link.style.display = "block";
      document.getElementById("download").style.display = "block";
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while encrypting the file");
    });
}
