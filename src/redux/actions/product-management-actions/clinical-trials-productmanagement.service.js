import axiosInstance from "../../../utils/axiosInstance";

function fecthClinicalTrialsArticles(categoryId) {
  return axiosInstance({
    method: "GET",
    url: `/products/article/category/${categoryId}`
  });
}

function addItemClinicalTrialsArticle(payload, productId) {
  return axiosInstance({
    method: "PUT",
    url: `/products/update/${productId}`,
    data: payload
  });
}

function deleteClinicalTrialsDndItem(clinicalTrialId) {
  return axiosInstance({
    method: "DELETE",
    url: `/products/clinical-trial/delete/${clinicalTrialId}`
  });
}

function saveSortedClinicalTrials(payload) {
  return axiosInstance({
    method: "PUT",
    url: `/products/clinical-trial/sort`,
    data: payload
  });
}

const ClinicalTrialsServices = {
  fecthClinicalTrialsArticles,
  addItemClinicalTrialsArticle,
  deleteClinicalTrialsDndItem,
  saveSortedClinicalTrials
};

export default ClinicalTrialsServices;
