import bcrypt from "bcrypt";

const hash = await bcrypt.hash("admin2024", 12);
console.log(hash);
