import apiAuth from '../../Api/apiAuth';

interface NewUser {
  username: string;
  password: string;
  confirmPassword: string;
}

export const RegisterValidate = (newUser: NewUser): string | undefined => {
  if (!newUser.username) {
    return "Username is required";
  }
  if (!newUser.password) {
    return "Password is required";
  }
  if (!newUser.confirmPassword) {
    return "Confirm password is required";
  }
  if (newUser.password !== newUser.confirmPassword) {
    return "Confirm password is not match";
  }
};

export const RegisterPost = async (data: NewUser) => {
  const response = await apiAuth.register(data);

  return response;
};
