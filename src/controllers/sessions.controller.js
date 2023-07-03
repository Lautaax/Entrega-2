import CurrentUserDto from "../dao/dtos/current-user-dto.js";

export async function registerUser(req, res) {
  return res.send({ status: "Success", message: "User registered" })
}
export async function failRegister(req, res) {
  return res.send({ status: "status", error: "User already exists" })
}
export async function loginUser(req, res) {

  if (!req.user)
    return res.status(401).send({ status: "error", error: "Unauthorized" });

  if (req.user.email === "adminCoder@coder.com") {
    req.user.role = "admin"
  } else {
    req.user.role = "user"
  }

  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
    role: req.user.role,
    password: "",
    cart: req.user.cart,
  }

  return res.send({ status: "success", payload: req.user })
}
export function githubCallback(req, res) {
  req.session.user = req.user
  res.redirect("/products")
}
export function Logout(req, res) {
  req.session.destroy((error) => {
    if (!error) return res.send("Logout successful!");

    return res.send({ status: "error", message: "Logout error", body: error });
  });
}
export function failLogin(req, res) {
  res.send({ status: "error", error: "Authentication error" })
}
export function getcurrentUser(req, res) {

  const userDto = new CurrentUserDto(req.session.user);

  return res.send({ status: "success", payload: userDto })
}