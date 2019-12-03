import {
  CLINICAL_TRIALS_ARTICLES_FETCH,
  CLINICAL_TRIALS_ARTICLES_SET,
  CLINICAL_TRIALS_DND_SET
} from "./clinical-trials-productmanagement.types";
import { CENTRALIZE_TOASTR_SET } from "../../../components/utility-components/CentralizeToastr/centralize-toastr.types";
import ClinicalTrialsServices from "./clinical-trials-productmanagement.service";
import OtherReferencesProductManagementService from "./other-references-productmanagement.service";

export function deleteClinicalTrialsDndItem(productId, clinicalTrialId) {
  return async dispatch => {
    try {
      const res = await ClinicalTrialsServices.deleteClinicalTrialsDndItem(
        clinicalTrialId
      );
      // console.log('[DELETE]', res);
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: res
      });

      this.fecthClinicalTrialsArticles(productId);
    } catch (error) {
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: error
      });
    }
  };
}

export function fecthClinicalTrialsArticles(productId) {
  return async dispatch => {
    try {
      const otherReferences = await OtherReferencesProductManagementService.fetchOtherReferences(
        productId
      );
      const categoryId = otherReferences.data.category_id;
      console.log("[otherReferences]", otherReferences);
      const res = await ClinicalTrialsServices.fecthClinicalTrialsArticles(
        categoryId
      );
      // autoflag
      const withinSelectTag = res.data.results || [];
      const otherReferencesData = otherReferences.data;
      otherReferencesData.clinical_trials &&
        otherReferencesData.clinical_trials.length &&
        otherReferencesData.clinical_trials.forEach(already => {
          withinSelectTag &&
            withinSelectTag.length &&
            withinSelectTag.forEach(tag => {
              if (+tag.id === +already.article_id) {
                tag.flag = true;
              }
            });
        });
      //
      dispatch({
        type: CLINICAL_TRIALS_ARTICLES_FETCH,
        payload: {
          withinSelectTag
        }
      });
      const dndList = otherReferencesData.clinical_trials || [];
      dispatch({
        type: CLINICAL_TRIALS_DND_SET,
        payload: {
          dndList
        }
      });
      // autoSelectFirstIndex
      // this.setClinicalTrialsArticle(withinSelectTag[0].id.toString());
      //
    } catch (error) {
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: error
      });
    }
  };
}

export function addItemClinicalTrialsArticle(payload, productId) {
  return async dispatch => {
    try {
      const res = await ClinicalTrialsServices.addItemClinicalTrialsArticle(
        payload,
        productId
      );
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: res
      });
      this.fecthClinicalTrialsArticles(productId);
      //
    } catch (error) {
      dispatch({
        type: CENTRALIZE_TOASTR_SET,
        payload: error
      });
    }
  };
}

export function setClinicalTrialsArticle(id) {
  return dispatch => {
    dispatch({
      type: CLINICAL_TRIALS_ARTICLES_SET,
      payload: {
        selectedArticle: id
      }
    });
  };
}
