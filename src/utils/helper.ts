function validateUsersRegisterForm(data: any) {
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

function validateUsersLoginForm(data: any) {
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
