import React from "react";
import Category from "./Category";
import { Row, Col } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function CategoryList({
  categories,
  filterCategories,
  latLng,
  setActiveCategory,
  activeCategory,
}) {
  return (
    <Row style={{ marginLeft: "1rem", marginRight: "1rem" }}>
      <Col md={12}>
        <Row>
          {categories.map((category) => {
            return (
              <Category
                key={category.id}
                latLng={latLng}
                category={category}
                filterCategories={filterCategories}
                setActiveCategory={setActiveCategory}
                activeCategory={activeCategory}
              />
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}
