import React, { Component, Fragment } from "react";
import { Select, Button, Icon } from "antd";
import { connect } from "react-redux";

import {
  fecthClinicalTrialsArticles,
  setClinicalTrialsArticle,
  addItemClinicalTrialsArticle,
  deleteClinicalTrialsDndItem
} from "../../../../redux/actions/product-management-actions/clinical-trials-productmanagement.actions";

const { Option } = Select;

class ClinicalTrialsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedItem: null
    };
    this.onSelectItem = this.onSelectItem.bind(this);
    this.handleSaveSelectedArticle = this.handleSaveSelectedArticle.bind(this);
    this.handleDeleteClinicalTrialsDndItem = this.handleDeleteClinicalTrialsDndItem.bind(
      this
    );
  }

  componentDidMount() {
    // mount
    this.props.fecthClinicalTrialsArticles(this.props.id);
  }

  componentWillUnmount() {
    // unmount
  }

  handleSaveSelectedArticle() {
    if (this.state.addedItem) {
      this.props.setClinicalTrialsArticle("");
      this.props.addItemClinicalTrialsArticle(
        this.state.addedItem,
        this.props.id
      );
    } else {
      alert("No selected article");
    }
  }

  handleDeleteClinicalTrialsDndItem(clinicalTrialId) {
    this.props.deleteClinicalTrialsDndItem(this.props.id, clinicalTrialId);
  }

  onSelectItem(item) {
    const compose = {
      product_id: this.props.id,
      page_title: item.page_title,
      article_id: item.id
    };
    const payload = {
      clinical_trials: [compose]
    };
    this.setState({
      addedItem: payload
    });
  }

  render() {
    // const {articles} = this.props;
    const options = this.props.articles.map(d => (
      <Option key={d.id} disabled={d.flag}>
        {d.page_title}
      </Option>
    ));
    return (
      <Fragment>
        <p>
          <strong>Select Articles</strong>
        </p>
        <div className="clinical-trials-editor">
          {this.props.articles && this.props.articles.length && (
            <Select
              defaultActiveFirstOption={false}
              value={this.props.selectedArticle.toString()}
              onChange={id => {
                this.props.setClinicalTrialsArticle(id.toString());
                const found = this.props.articles.filter(
                  article => +article.id === +id
                )[0];
                this.onSelectItem(found);
              }}
              style={{ width: "500px" }}
            >
              {options}
            </Select>
          )}
          <Button type="primary" onClick={this.handleSaveSelectedArticle}>
            Select Article
          </Button>
        </div>

        <div className="lists">
          <br />

          <ul>
            {this.props.dndList.map(dnd => (
              <li>
                <span>{dnd.page_title}</span>
                <Button
                  type="danger"
                  onClick={() => {
                    this.handleDeleteClinicalTrialsDndItem(dnd.id);
                  }}
                >
                  <Icon type="delete"></Icon>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.clinicalTrialsProductManagementReducers.articles,
  selectedArticle:
    state.clinicalTrialsProductManagementReducers.selectedArticle,
  dndList: state.clinicalTrialsProductManagementReducers.dndList
});

const mapDispatchToProps = {
  fecthClinicalTrialsArticles,
  setClinicalTrialsArticle,
  addItemClinicalTrialsArticle,
  deleteClinicalTrialsDndItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClinicalTrialsComponent);
