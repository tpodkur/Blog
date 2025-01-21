export const extractError = (error): string => {
  let message = '';
  message += error.username ? `username ${error.username} ` : '';
  message += error.email ? `email ${error.email} ` : '';
  message += error.password ? `password ${error.password} ` : '';
  message += error['email or password'] ? `email or password ${error['email or password']}` : '';

  return message.trim();
};
