export class Session {
    static CurrentUserId = '';
    static AuthToken = '';
    
    static setAuthToken(token){
        this.AuthToken = token || '';
    }

    static changeCurrentUser(user){
        this.CurrentUser = user;
    }
  }