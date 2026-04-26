const crypto = require('crypto');
const fs = require('fs');

async function decryptModel() {
  const encryptedFile = fs.readFileSync('../../../../public/models/character.enc');
  const iv = encryptedFile.slice(0, 16);
  const data = encryptedFile.slice(16);
  
  const password = "Character3D#@";
  const hashedPassword = crypto.createHash('sha256').update(password).digest();
  
  const decipher = crypto.createDecipheriv('aes-256-cbc', hashedPassword, iv);
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  
  fs.writeFileSync('character_decrypted.glb', decrypted);
  console.log("Decrypted to character_decrypted.glb");

  // Basic parse of GLB to find JSON chunk
  const magic = decrypted.readUInt32LE(0);
  const version = decrypted.readUInt32LE(4);
  const chunk0Length = decrypted.readUInt32LE(12);
  const chunk0Data = decrypted.slice(20, 20 + chunk0Length);
  
  const jsonStr = chunk0Data.toString('utf8');
  const json = JSON.parse(jsonStr);
  
  console.log("Meshes:");
  json.meshes.forEach((m, i) => {
    console.log(`[Mesh ${i}] ${m.name}`);
    if (m.weights) console.log(`   Weights:`, m.weights);
    if (m.extras) console.log(`   Extras:`, m.extras);
  });

  if (json.materials) {
    console.log("\nMaterials:");
    json.materials.forEach((m, i) => console.log(`[Mat ${i}] ${m.name}`));
  }
}

decryptModel();
