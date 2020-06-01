export class Session {
    static CurrentUser = '';
    static AuthToken = '';
    
    static setAuthToken(token){
        this.AuthToken = token || '';
    }

    static setCurrentUser(user){
        this.CurrentUser = user;
    }
  }