const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export function buildQueryString(params = {}) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "undefined" &&
      value !== "null"
    ) {
      searchParams.append(key, value);
    }
  }
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

async function request(endpoint, options = {}, retries = 2) {
  const token = localStorage.getItem("skywardens_admin_token") || localStorage.getItem("cms_token");
  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  let response;
  try {
    response = await fetch(url, { ...options, headers });
  } catch (netErr) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return request(endpoint, options, retries - 1);
    }
    throw new Error(
      `Cannot connect to CMS API server (${API_BASE_URL}). Please ensure the backend server is running ('npm run dev:server' or 'npm run dev:all').`
    );
  }

  if (response.status === 401) {
    localStorage.removeItem("skywardens_admin_token");
    localStorage.removeItem("cms_token");
    localStorage.removeItem("skywardens_admin_user");
    if (!window.location.pathname.includes("/login")) {
      window.location.href = "/login";
    }
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMessage =
      data.message ||
      data.error ||
      (Array.isArray(data.errors) ? data.errors.map((e) => e.msg || e.message).join(", ") : null) ||
      `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);
    error.response = { data, status: response.status };
    throw error;
  }

  // Normalize so both `res.data` (axios style) and `res` (fetch style) work
  return {
    ...data,
    data: data.data !== undefined ? data.data : data,
  };
}

export const api = {
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return res.ok;
    } catch {
      return false;
    }
  },

  // Auth
  login: (credentials) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  getMe: () => request("/auth/me"),
  updateProfile: (profileData) =>
    request("/auth/profile", { method: "PUT", body: JSON.stringify(profileData) }),

  // Stats
  getDashboardStats: () => request("/admin/stats/dashboard"),

  // Settings
  getSettings: () => request("/settings"),
  updateSettings: (data) =>
    request("/admin/settings", { method: "PUT", body: JSON.stringify(data) }),

  // Navigation
  getNavigation: () => request("/navigation"),
  createNavigationItem: (item) =>
    request("/admin/navigation", { method: "POST", body: JSON.stringify(item) }),
  updateNavigationItem: (id, item) =>
    request(`/admin/navigation/${id}`, { method: "PUT", body: JSON.stringify(item) }),
  deleteNavigationItem: (id) =>
    request(`/admin/navigation/${id}`, { method: "DELETE" }),
  reorderNavigation: (items) =>
    request("/admin/navigation/reorder", { method: "PUT", body: JSON.stringify({ items }) }),

  // Footer
  getFooter: () => request("/footer"),
  updateFooter: (data) =>
    request("/admin/footer", { method: "PUT", body: JSON.stringify(data) }),

  // Homepage
  getHomepage: () => request("/homepage"),
  updateHomepage: (data) =>
    request("/admin/homepage", { method: "PUT", body: JSON.stringify(data) }),

  // About
  getAbout: () => request("/about"),
  updateAbout: (data) =>
    request("/admin/about", { method: "PUT", body: JSON.stringify(data) }),

  // Products
  getProducts: (params = {}) => {
    return request(`/admin/products${buildQueryString(params)}`);
  },
  getProductById: (id) => request(`/admin/products/${id}`),
  createProduct: (data) =>
    request("/admin/products", { method: "POST", body: JSON.stringify(data) }),
  updateProduct: (id, data) =>
    request(`/admin/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProduct: (id) =>
    request(`/admin/products/${id}`, { method: "DELETE" }),

  // News
  getNews: (params = {}) => {
    return request(`/admin/news${buildQueryString(params)}`);
  },
  reorderNews: (items) =>
    request("/admin/news/reorder", { method: "PUT", body: JSON.stringify({ items }) }),
  createNews: (data) =>
    request("/admin/news", { method: "POST", body: JSON.stringify(data) }),
  updateNews: (id, data) =>
    request(`/admin/news/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteNews: (id) =>
    request(`/admin/news/${id}`, { method: "DELETE" }),

  // Partners
  getPartners: (params = {}) => {
    return request(`/admin/partners${buildQueryString(params)}`);
  },
  createPartner: (data) =>
    request("/admin/partners", { method: "POST", body: JSON.stringify(data) }),
  updatePartner: (id, data) =>
    request(`/admin/partners/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deletePartner: (id) =>
    request(`/admin/partners/${id}`, { method: "DELETE" }),

  // FAQs
  getFaqs: () => request("/admin/faqs"),
  createFaq: (data) =>
    request("/admin/faqs", { method: "POST", body: JSON.stringify(data) }),
  updateFaq: (id, data) =>
    request(`/admin/faqs/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteFaq: (id) =>
    request(`/admin/faqs/${id}`, { method: "DELETE" }),

  // Enquiries
  getEnquiries: (params = {}) => {
    return request(`/admin/enquiries${buildQueryString(params)}`);
  },
  getEnquiryById: (id) => request(`/admin/enquiries/${id}`),
  updateEnquiryStatus: (id, statusData) =>
    request(`/admin/enquiries/${id}`, { method: "PUT", body: JSON.stringify(statusData) }),
  deleteEnquiry: (id) =>
    request(`/admin/enquiries/${id}`, { method: "DELETE" }),
  exportEnquiriesCsvUrl: () => `${API_BASE_URL}/admin/enquiries/export/csv`,

  // Media
  uploadFile: (formData) =>
    request("/media/upload", { method: "POST", body: formData }),
  getAllMedia: (folder) => {
    const qs = folder && folder !== "all" ? `?folder=${encodeURIComponent(folder)}` : "";
    return request(`/media${qs}`);
  },
  deleteMedia: (id) => request(`/media/${id}`, { method: "DELETE" }),

  // Admin User & Permission Management (Super Admin)
  getAdmins: (params = {}) => request(`/admin/users${buildQueryString(params)}`),
  createAdmin: (data) =>
    request("/admin/users", { method: "POST", body: JSON.stringify(data) }),
  updateAdmin: (id, data) =>
    request(`/admin/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  toggleAdminStatus: (id) =>
    request(`/admin/users/${id}/status`, { method: "PATCH" }),
  getAuditLogs: (params = {}) =>
    request(`/admin/audit-logs${buildQueryString(params)}`),
};

// Aliases for convenience across all pages
export const adminApi = {
  ...api,
};

export const mediaApi = {
  upload: (formData) => api.uploadFile(formData),
  getAll: (folder) => api.getAllMedia(folder),
  delete: (id) => api.deleteMedia(id),
};

export const authApi = {
  login: (creds) => api.login(creds),
  getMe: () => api.getMe(),
  updateDetails: (data) => api.updateProfile(data),
  updatePassword: (data) => api.updateProfile({ password: data.newPassword }),
};

export default api;
