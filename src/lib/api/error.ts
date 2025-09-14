import { notification as antNotification } from 'antd';

type AuthErrorCode =
  | 'UserNotConfirmedException'
  | 'NotAuthorizedException'
  | 'UserNotFoundException'
  | 'CodeMismatchException'
  | 'ExpiredCodeException'
  | 'LimitExceededException'
  | 'InvalidPasswordException'
  | 'InvalidParameterException'
  | 'UsernameExistsException';

export interface AuthError {
  code?: AuthErrorCode;
  name?: string;
  message?: string;
}

const MESSAGES = {
  invalidEmail: 'Invalid Email address. Please try again.',
  nonexistentEmail:
    'You should receive a reset password email shortly if your email address is registered in our system. Please check your inbox for further instructions.',
  forbidden: 'Forbidden resource',
  invalidPhone: 'Phone number is invalid',
  invalidDate: 'Date is invalid, please try again.',
  invalidSSN: 'SSN number is invalid format',
  unknown: 'An error has occurred',
  required: 'This field is required',
  notFound: 'NOT_FOUND',
  accountNotExist: 'Username does not exist',
  accountExist: 'An account with this email already exists.',
  userExistError: 'User is already existed.',
  incorrectUsernameClientId: 'Username/client id combination not found.',
  incorrectUsername: 'Incorrect username. Please try again',
  incorrectAccount: 'Incorrect login credentials. Please try again',
  incorrectCredentials: 'Your access is currently pending. To proceed, please set a new password.',
  incorrectPassword: 'Incorrect password.', // pragma: allowlist secret
  incorrectUsernamePassword: 'Incorrect username or password.', // pragma: allowlist secret
  onlyLetter: 'Only English alphabets are allowed for this field.',
  SSNMessage: 'SSN already exists, please enter again.',
  alphanumeric: 'Alphanumeric characters',
  businessIdLength: '3-25 characters',
  noSpaces: 'No spaces',
  noSpecialCharacters: 'No special characters',
  invalidRoutingNumber: 'Invalid routing number',
  onlyLetterAndNumber: 'Only alphabets or numeric are allowed for this field.',
  invalidInformation: 'The provided information is invalid. Please try again.',
  notTrimmable: 'Space character is not allowed at the beginning and end.',
  pleaseUseEnglishAlphabetForInput: 'Please use English alphabet for input.',
  inValidUsername: 'Please use only letters, numbers (0-9), underscore (_), dot (.), hyphen (-).',
  invalidCode: 'Invalid verification code provided, please try again.',
  awsDisabledMessage: 'User is disabled.',
  disabledMessage: 'Your access is temporarily disabled. Please contact your site administrator.',
  existEmail: 'An account with this email already existed.',
  matchConfirmPassword: 'This Confirm Password does not match.', // pragma: allowlist secret
  emailAddressAlreadyExisted: 'An account with this email already existed.',
  userStatusPending: 'Only active users can reset their passwords.',
  invalidCustomerUsername:
    'Please use only letters (a-z), numbers (0-9), underscore (_), plus (+), hyphen (-), and at (@).',
  invalidCustomerUsernameLenght: 'Username must be between 5 and 50 characters.',
};

const handler = (error: AuthError | Error) => {
  if (error?.message?.includes('Attempt limit exceeded, please try after some time.')) {
    return antNotification.error({
      message: 'Error',
      description:
        'The code you entered is incorrect more than 5 times. Please try after few minutes or resend email to receive the new code.',
    });
  }

  if (error?.message?.includes('The account is already logged in on another device')) {
    return;
  }

  if (window.location.href.includes('identity/customers') && error) {
    return;
  }

  antNotification.error({
    message: 'Error',
    description: error?.message?.toString() || MESSAGES.unknown,
  });
};

const interceptorsErrorHandler = (error: (AuthError | Error) & { code?: string } = {}) => {
  const { message: messInError, code } = error;
  switch (code) {
    case TYPES.NotAuthorizedException:
    case TYPES.UserNotFoundException:
      if (messInError === MESSAGES.awsDisabledMessage) {
        return antNotification.error({
          message: 'Error',
          description: MESSAGES.disabledMessage,
        });
      }
      return handler(error);
    default:
      return handler(error);
  }
};

export const TYPES = {
  NotAuthorizedException: 'NotAuthorizedException',
  UserNotFoundException: 'UserNotFoundException',
  UserNotConfirmedException: 'UserNotConfirmedException',
  CodeMismatchException: 'CodeMismatchException',
  ExpiredCodeException: 'ExpiredCodeException',
  LimitExceededException: 'LimitExceededException',
  InvalidPasswordException: 'InvalidPasswordException', // pragma: allowlist secret
  UsernameExistsException: 'UsernameExistsException',
  UserLambdaValidationException: 'UserLambdaValidationException',
  badRequest: 'BAD_REQUEST',
};

export default {
  handler,
  interceptorsErrorHandler,
  MESSAGES,
  TYPES,
};
