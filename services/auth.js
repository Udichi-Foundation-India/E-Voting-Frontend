import axios from "axios";

export async function signup(signUpInfo) {
  console.log(signUpInfo);
  return await axios.post("http://10.145.44.112:5000/users", signUpInfo);
}

export async function signin(signInInfo) {
  console.log(signInInfo);
  return await axios.post("http://10.145.44.112:5000/users/login", signInInfo);
}
