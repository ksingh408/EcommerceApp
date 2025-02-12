
export const loginUser = (email, password) => {
        return {
          type: "LOGIN_USER",
          payload: { email, password },
        };
      };
      
      export const logoutUser = () => {
        return {
          type: "LOGOUT_USER",
        };
      };
      