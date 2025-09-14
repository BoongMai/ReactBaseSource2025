// Service-specific error messages
const SERVICE_ERROR_MESSAGES = {
  account: {
    400: 'Thông tin tài khoản không hợp lệ',
    401: 'Đăng nhập thất bại',
    403: 'Không có quyền truy cập tài khoản',
    404: 'Tài khoản không tồn tại',
    409: 'Tài khoản đã tồn tại',
    422: 'Dữ liệu tài khoản không hợp lệ',
  },
  payment: {
    400: 'Thông tin thanh toán không hợp lệ',
    401: 'Không có quyền thực hiện thanh toán',
    403: 'Thanh toán bị từ chối',
    404: 'Phương thức thanh toán không tồn tại',
    409: 'Giao dịch đã tồn tại',
    422: 'Dữ liệu thanh toán không hợp lệ',
  },
  notification: {
    400: 'Thông tin thông báo không hợp lệ',
    401: 'Không có quyền gửi thông báo',
    403: 'Gửi thông báo bị từ chối',
    404: 'Thông báo không tồn tại',
    409: 'Thông báo đã tồn tại',
    422: 'Dữ liệu thông báo không hợp lệ',
  },
  user: {
    400: 'Thông tin người dùng không hợp lệ',
    401: 'Không có quyền truy cập thông tin người dùng',
    403: 'Truy cập thông tin người dùng bị từ chối',
    404: 'Người dùng không tồn tại',
    409: 'Thông tin người dùng đã tồn tại',
    422: 'Dữ liệu người dùng không hợp lệ',
  },
  default: {
    400: 'Yêu cầu không hợp lệ',
    401: 'Không có quyền truy cập',
    403: 'Bị cấm truy cập',
    404: 'Không tìm thấy tài nguyên',
    409: 'Xung đột dữ liệu',
    422: 'Dữ liệu không hợp lệ',
    429: 'Quá nhiều yêu cầu',
    500: 'Lỗi máy chủ',
    502: 'Lỗi gateway',
    503: 'Dịch vụ không khả dụng',
    504: 'Hết thời gian chờ gateway',
  },
};

// Detect service from URL
const detectService = (url: string): keyof typeof SERVICE_ERROR_MESSAGES => {
  if (url.includes('/account-svc/')) return 'account';
  if (url.includes('/payment-svc/')) return 'payment';
  if (url.includes('/notification-svc/')) return 'notification';
  if (url.includes('/user-svc/')) return 'user';
  return 'default';
};

// Error handling utilities
export const getErrorMessage = (error: any): string => {
  // Handle different error types
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  // Get service-specific error messages
  if (error?.response?.status) {
    const status = error.response.status;
    // Use service from error object if available, otherwise detect from URL
    const service = error.service || detectService(error?.config?.url || '');
    const serviceMessages =
      SERVICE_ERROR_MESSAGES[service as keyof typeof SERVICE_ERROR_MESSAGES] ||
      SERVICE_ERROR_MESSAGES.default;

    return (
      serviceMessages[status as keyof typeof serviceMessages] ||
      SERVICE_ERROR_MESSAGES.default[status as keyof typeof SERVICE_ERROR_MESSAGES.default] ||
      'Đã xảy ra lỗi không xác định'
    );
  }

  return 'Đã xảy ra lỗi không xác định';
};

export const isNetworkError = (error: any): boolean => {
  return !error?.response && error?.message?.includes('Network Error');
};

export const isTimeoutError = (error: any): boolean => {
  return error?.code === 'ECONNABORTED' || error?.message?.includes('timeout');
};

export const getErrorType = (
  error: any,
): 'network' | 'timeout' | 'server' | 'client' | 'unknown' => {
  if (isNetworkError(error)) return 'network';
  if (isTimeoutError(error)) return 'timeout';
  if (error?.response?.status >= 500) return 'server';
  if (error?.response?.status >= 400) return 'client';
  return 'unknown';
};
