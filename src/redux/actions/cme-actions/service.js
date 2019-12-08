import axiosInstance from "../../../utils/axiosInstance";

function createEventRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/cme",
    data: body
  });
}

function changeEventStatusRequest(id, body) {
  return axiosInstance({
    method: "put",
    url: `/cme/change-status/${id}`,
    data: body
  });
}

function fetchCurrentEventRequest(id) {
  return axiosInstance({
    method: "get",
    url: `/cme/edit/${id}`
  });
}

function updateEventRequest(id, body) {
  return axiosInstance({
    method: "put",
    url: `/cme/update/${id}`,
    data: body
  });
}

function createEventHeadingRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/cme/heading/create",
    data: body
  });
}

function deleteEventHeadingRequest(id, body) {
  return axiosInstance({
    method: "delete",
    url: `/cme/heading/delete/${id}`,
    data: body
  });
}

function createEventHeadingVideoRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/cme/heading/video/add",
    data: body
  });
}

function deleteEventHeadingVideoRequest(id) {
  return axiosInstance({
    method: "delete",
    url: `cme/heading/video/delete/${id}`
  });
}

function updateEventHeadingVideoRequest(id, body) {
  return axiosInstance({
    method: "put",
    url: `/cme/heading/video/update/${id}`,
    data: body
  });
}

function featureEventRequest(id, body) {
  return axiosInstance({
    method: "put",
    url: `/cme/update/featured/${id}`,
    data: body
  });
}

const CMEManagementServices = {
  createEventRequest,
  changeEventStatusRequest,
  fetchCurrentEventRequest,
  updateEventRequest,
  createEventHeadingRequest,
  deleteEventHeadingRequest,
  createEventHeadingVideoRequest,
  deleteEventHeadingVideoRequest,
  updateEventHeadingVideoRequest,
  featureEventRequest
};

export default CMEManagementServices;
