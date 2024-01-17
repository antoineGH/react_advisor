import React, { useRef } from "react";
import { Image, Button, Row, Col } from "react-bootstrap";

// Component to Display Category as Button, onClick would trigger handleClick
// Require props: category, filterCategories, city
export default function Category({
  category,
  filterCategories,
  latLng,
  setActiveCategory,
  activeCategory,
}) {
  // Use as Reference in handleClick function
  const buttonCategory = useRef();

  // Store in variables categories information from object properties
  const categoryName = category.categoryName;
  const categoryID = category.id;
  const categoryIconPrefix = category.categoryIconPrefix;
  const categoryIconSuffix = category.categoryIconSuffix;
  const categoryIcon = categoryIconPrefix + "32" + categoryIconSuffix;

  // handleClick function feeding filterCategories event handler with city and categoryName
  function handleClick() {
    filterCategories(latLng, categoryName, categoryID);
    setActiveCategory(categoryName);
  }

  return (
    <Button
      ref={buttonCategory}
      onClick={handleClick}
      className={
        activeCategory === categoryName
          ? "category_active mx-1 my-1 button_category"
          : "category mx-1 my-1 button_category"
      }
      variant="btn-dark"
      size="sm"
      style={{
        fontFamily: "poppinsregular",
        color: "white",
        borderRadius: "5px",
        backgroundColor: "white",
      }}
    >
      <Row>
        <Col xs={2}>
          <Image
            src={categoryIcon}
            style={{
              width: "24px",
              height: "24px",
              background: "#00aa6c",
              display: "flex",
              justifyContent: "center",
            }}
            rounded
          />
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "center",
              fontFamily: "poppinsregular",
              color: "#474747",
              fontSize: "0.85rem",
              paddingLeft: "0.5rem",
            }}
          >
            {categoryName}
          </span>
        </Col>
      </Row>
    </Button>
  );
}
