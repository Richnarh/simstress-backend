class StatusCode{
    static OK  = 200;
    static CREATED  = 201;

    static FOUND = 302;
    static SEE_OTHER = 303;
    static USE_PROXY = 305;
    static TEMP_REDIRECT = 307;
    static PERM_REDIRECT = 308;

    static BAD_REQUEST = 400;
    static UNAUTHORISED = 401;
    static PAYMENT_REQUIRED = 402;
    static FORBIDDEN = 403;
    static NOT_FOUND = 404;
    static METHOD_NOT_ALLOWED = 405;
    static REQUEST_TIME_OUT = 408;
    static PAYLOAD_TOO_LARGE = 413;
    static UNSUPPORTED_MEDIA_TYPE = 415;

    static INTERNAL_SERVER_ERROR = 500;
    static BAD_GATEWAY = 502;
    static GATEWAY_TIMEOUT = 503;
    static INSUFFICIENT_STORAGE = 507;
    static NETWORK_AUTHENTICATION_REQUIRED = 511;
  }
  export default StatusCode;