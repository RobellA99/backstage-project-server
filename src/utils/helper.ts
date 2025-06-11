interface UserRegisterData {
  name: string;
  email: string;
  password: string;
}

interface UserLoginData {
  email: string;
  password: string;
}

interface CreateService {
  name: string;
  owner: string;
  status: string;
  repo_url?: string;
  docs_slug: string;
}

interface UpdateService extends CreateService {
  updated: boolean;
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

function validateCreateServiceForm(data: CreateService) {
  if (!data.name || !data.owner || !data.status || !data.docs_slug) {
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

function validateUpdateServiceForm(data: UpdateService) {
  if (
    !data.name ||
    !data.owner ||
    !data.status ||
    !data.docs_slug ||
    !data.updated
  ) {
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

export {
  validateUsersRegisterForm,
  validateUsersLoginForm,
  validateCreateServiceForm,
  validateUpdateServiceForm,
};
