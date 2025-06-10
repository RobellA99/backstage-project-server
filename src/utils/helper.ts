interface UserRegisterData {
  name: string;
  email: string;
  password: string;
}

interface UserLoginData {
  email: string;
  password: string;
}

function validateUsersRegisterForm(data: UserRegisterData) {
  if (!data.name || !data.email || !data.password) {
    return {
      success: false,
      error: "Fields are required",
    };
  }
  return {
    success: true,
    data: data,
  };
}

function validateUsersLoginForm(data: UserLoginData) {
  if (!data.email || !data.password) {
    return {
      success: false,
      error: "Fields are required",
    };
  }
  return {
    success: true,
    data: data,
  };
}

export { validateUsersRegisterForm, validateUsersLoginForm };
