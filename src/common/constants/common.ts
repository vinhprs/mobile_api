export const REQUEST_ID_TOKEN_HEADER = 'x-request-id';

export const FORWARDED_FOR_TOKEN_HEADER = 'x-forwarded-for';

export const MESSAGES = {
  GET_SUCCEED: 'get_succeed',
  CREATED_SUCCEED: 'created_model_succeed',
  DELETE_SUCCEED: 'delete_succeed',
  UPDATE_SUCCEED: 'update_succeed',
  UPDATE_OR_CREATE_SUCCEED: 'update_or_create_succeed',
  CANNOT_GET_DATA: 'cannot_get_data',
  CANNOT_CREATE: 'cannot_create_new_model',
  CANNOT_DELETE: 'cannot_deleted',
  CANNOT_UPDATE: 'cannot_update',
  CANNOT_UPDATE_OR_CREATE: 'cannot_update_or_create',
  INSERT_SUCCEED: 'insert_succeed',
  OK: 'ok',
  WRONG_PASSWORD: 'wrong_password',
  PERMISSION_DENIED: 'permission_denied',
  UNAUTHORIZED: 'unauthorized',
  INVALID_TOKEN: 'invalid_token',
  CANNOT_UPLOAD_IMAGE: 'cannot_upload_image',
  INVALID_QUERY: 'invalid_query',
  INVALID_PARAM: 'invalid_param',
  UNAUTHORIZED_ADMIN: 'unauthorized_admin_request',
  NOT_FOUND_USER: 'not_found_user',
  NOT_FOUND: 'not_found',
  INVALID_CODE: 'invalid_code',
  VERIFY_SUCCESS: 'verify_succes',
  CONFIRMED_ACCOUNT: 'confirmed_account',
  UNCONFIRMED_ACCOUNT: 'unconfirmed_account',
  LOCKED_ACCOUNT: 'account_has_been_locked',
  DELETED_ACCOUNT: 'account_has_been_deleted',
  ACTION_NOT_PERFORMED: 'action_not_performed',
  ROLE_NOT_FOUND: 'role_not_found',
  EMAIL_EXISTS: 'email_exists',
  NOT_REGISTER_EXPERT: 'user_not_register_expert',
  ALREADY_EXPERT: 'user_already_expert',
  SENT_EMAIL_TO_RECOVER_PASSWORD: 'sent_email_to_recover_password',
  CATEGORY_NOT_FOUND: 'category_not_found',
  USERNAME_EXISTS: 'username_exists',
};

export const MAIL_TEMPLATE = {
  VERIFY_EMAIL_TEMPLATE: 'verify-email',
  FORGOT_PASSWORD_TEMPLATE: 'forgot-password',
  UPDATE_EMAIL_TEMPLATE: 'update-email',
};
