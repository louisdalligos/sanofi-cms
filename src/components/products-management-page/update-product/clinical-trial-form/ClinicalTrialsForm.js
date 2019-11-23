import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Select, Button } from "antd";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

// Component list
import ClinicalTrialLinks from "./ClinicalTrialLinks";

const { Option } = Select;

const ClinicalTrialsForm = ({ articles, ...props }) => {
  // Clinical trial article state
  const [clinicalTrialArticles, setClinicalTrialArticles] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    console.log(articles, "articles from the form");
  }, [articles]);

  function onChange(value) {
    console.log(`selected ${value}`);
    setSelectedArticle(value);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  const handleSelectArticle = () => {
    console.log(selectedArticle);
  };

  return (
    <div>
      <Select
        showSearch
        style={{ width: 200, marginRight: 10 }}
        placeholder="Select an article"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {articles
          ? articles.map(item => (
              <Option key={item.id} value={item.id}>
                {item.headline}
              </Option>
            ))
          : []}
      </Select>

      <Button type="primary" onClick={handleSelectArticle}>
        Select Article
      </Button>

      <DndProvider backend={HTML5Backend}>
        <ClinicalTrialLinks />
      </DndProvider>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    articles: state.productManagementReducer.articlesByCategory.results
  };
};

export default connect(
  mapStateToProps,
  null
)(ClinicalTrialsForm);
