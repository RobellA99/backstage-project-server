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

interface CreateDoc {
  slug: string;
  title: string;
  content: string;
}

interface UpdateDoc extends CreateDoc {
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
      error: "Email and password are required",
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
      error: "All fields are required except repo_url",
    };
  }
  return {
    success: true,
    data: data,
  };
}

function validateCreateDocForm(data: CreateDoc) {
  if (!data.slug || !data.title || !data.content) {
    return {
      success: false,
      error: "All fields are required",
    };
  }
  return {
    success: true,
    data: data,
  };
}

function validateUpdateServiceForm(data: UpdateService) {
  return validateCreateServiceForm(data);
}

function validateUpdateDocForm(data: UpdateDoc) {
  return validateCreateDocForm(data);
}

export {
  validateUsersRegisterForm,
  validateUsersLoginForm,
  validateCreateServiceForm,
  validateUpdateServiceForm,
  validateCreateDocForm,
  validateUpdateDocForm,
};
