const fs = require('fs');
const express = require('express');

const filename = 'hello.txt'; // Hardcoded filename
const text = 'Bhavana'; // Hardcoded text to hide
const skip = 2; // Hardcoded skip value

const app = express();
const port = 3000;

function encrypt_text() {
  // Convert text message to byte array
  const messageBytes = new TextEncoder().encode(text);
  console.log("The length of the bytes is = ", messageBytes);

  // Read file into buffer
  const buffer = fs.readFileSync(`files/${filename}`);

  // Check if file is large enough to hide message
  if ((messageBytes.length + 1) * skip > buffer.length) {
    console.error('Error: File is too small to hide message');
    process.exit(1);
  }

  // Hide message in file
  let i = 0;
  let j = 0;
  while (i < messageBytes.length) {
    const byte = messageBytes[i];
    buffer[j] = byte;
    j += skip;
    i++;
  }
  // Add termination byte
  buffer[j] = 0;

  // Create new filename with '_encrypted' suffix
  const encryptedFilename = `${filename.split('.')[0]}_encrypted.${filename.split('.')[1]}`;

  // Write buffer to new file in 'saved' directory
  fs.writeFileSync(`saved/${encryptedFilename}`, buffer);
  console.log(`Message hidden successfully. Encrypted file saved as ${encryptedFilename}`);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });


app.get('/encode', (req, res) => {
  const filename = 'test.txt'; // replace with your file name
  const skip = 10; // replace with your skip value
  const message = 'Hello, world!'; // replace with your message
  encode(filename, skip, message);
  res.send('Message encoded successfully.');
});

app.post('/decrypt', (req, res) => {
  // get data from request body
  const { encryptedFile } = req.body;

  // perform decryption using steganography algorithm
  // assume that the steganography implementation is already defined
  const decryptedText = steganography.decode(encryptedFile);

  // return the decrypted text as a response
  res.json({ decryptedText });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
