import axiosInstance from "../../../utils/axiosInstance";

function fetchPrescriptionInfo(id) {
  return axiosInstance({
    method: "GET",
    url: `/products/edit/${id}`
  });
}

function savePrescriptionInfo(id, payload) {
  return axiosInstance({
    method: "POST",
    url: `/products/update/${id}`,
    data: payload
  });
}

function deleletPrescriptionInfo(id) {
  return axiosInstance({
    method: "DELETE",
    url: `/products/file/delete/${id}`
  });
}

function saveEditedDocumentInPrescriptionInfo(id, filename) {
  return axiosInstance({
    method: "PUT",
    url: `/products/update/section/${id}`,
    data: {
      title: filename
    }
  });
}

const PrescriptionInfoService = {
  fetchPrescriptionInfo,
  savePrescriptionInfo,
  deleletPrescriptionInfo,
  saveEditedDocumentInPrescriptionInfo
};

export default PrescriptionInfoService;
