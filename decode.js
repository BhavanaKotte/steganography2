const fs = require('fs');

function decode(filename, skip, target) {
  const buffer = fs.readFileSync(`saved/${filename}`);
  const messageBytes = [];
  let i = skip ;
  let count = 0; // Initialize byte count
  i--;
  while (count < target) {
    console.log(String.fromCharCode(buffer[i-1]))
    const byte = buffer[i-1];
    messageBytes.push(byte);
    i += skip;
    count++;
  }

  const message = new TextDecoder().decode(new Uint8Array(messageBytes));
  console.log(`Hidden message: ${message}`); // Print the hidden message
}

decode('hello_encrypted.txt', 2, 7);
