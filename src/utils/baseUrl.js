export function baseUrl(endpoint) {
  const local = "http://127.0.0.1:8000/api/v1/admin/";
  const remote = "";

  return `${local}${endpoint}`;
}
