export class User {
  name:string;
  username: string;
  password: string;
  rememberMe: boolean;
  repeatPassword:string;
  oldPassword: string;
  primarySport:string;
  educationLevel:string;
  dateOfBirth:string;
  yearOfBirth: string;
  gender:string;
  country:string;
  state:string;
  stateCode:string;
  phone: number;
  user:string;

  isValidEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.username);
  }
  isPasswordMatch() {
    if(this.password !==undefined && this.repeatPassword!== undefined) {
      if(this.repeatPassword.match(this.password) && this.password.match(this.repeatPassword)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}