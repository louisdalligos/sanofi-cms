import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Select, Button, message } from "antd";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import update from "immutability-helper";
import axios from "axios";
import { API } from "../../../../utils/api";

// Component list
import LinkItem from "./LinkItem";

const style = {
  width: 400,
  marginTop: 30
};

const { Option } = Select;

const ClinicalTrialsForm = ({ articles, productId, auth, ...props }) => {
  // Current link added state
  const [cards, setCards] = useState([]);

  // Clinical trial article state
  const [clinicalTrialArticles, setClinicalTrialArticles] = useState([
    {
      id: "1",
      headline: "Molestiae",
      links: "http://localhost/therapy-areas/diabetes/clinical-trials/molestiae"
    },
    {
      id: "2",
      headline: "Est conseq",
      links:
        "http://localhost/therapy-areas/diabetes/clinical-trials/est-conseq"
    }
  ]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    console.log(articles, "articles from the form");
  }, [articles]);

  // on select article change
  function onChange(value) {
    console.log(value);
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
    setCards([
      ...cards,
      {
        product_id: productId,
        article_id: selectedArticle.key,
        id: selectedArticle.key,
        name: selectedArticle.label
      }
    ]);
    console.log(cards);
  };

  // Submit update
  const handleSave = () => {
    axios({
      url: `${API}/products/update/${productId}`,
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access_token}`
      },
      data: cards
    })
      .then(res => {
        console.log(res);
        message.success(
          res.data.success ? res.data.success : "Updated product successfully"
        );
        props.enableOtherReferencesTab(false);
      })
      .catch(err => {
        console.log(err.response.data);
        message.error(
          err.response.data.error
            ? err.response.data.error
            : "There was an error on processing your request"
        );
      });
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cards[dragIndex];
    setCards(
      update(cards, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
      })
    );
  };

  return (
    <div>
      <Select
        labelInValue
        showSearch
        style={{ width: 200, marginRight: 10 }}
        placeholder="Select an article"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          // option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          console.log("FILTER PROP:", option)
        }
      >
        {/* {articles
          ? articles.map(item => (
              <Option key={item.id} value={item.id}>
                {item.headline}
              </Option>
            ))
          : []} */}
        {articles
          ? clinicalTrialArticles.map(item => (
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
        <div style={style}>
          <h3>Selected Clinical Trials</h3>
          {cards.map((card, i) => (
            <LinkItem
              key={card.id}
              index={i}
              id={card.id}
              text={card.name}
              moveCard={moveCard}
            />
          ))}
        </div>
      </DndProvider>

      <div className="form-actions">
        <Button style={{ marginRight: 10 }}>
          <Link to="/products">Cancel</Link>
        </Button>
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    articles: state.productManagementReducer.articlesByCategory.results
  };
};

export default connect(
  mapStateToProps,
  null
)(ClinicalTrialsForm);
