export const checkValidDate=(email,password)=>{
    const isEmailValid=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    const isPwdValid=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)

    if(!isEmailValid) return "Email is not valid"
    if(!isPwdValid) return "Password is not valid.Minimum eight characters, at least one letter and one number"
    return null;
}