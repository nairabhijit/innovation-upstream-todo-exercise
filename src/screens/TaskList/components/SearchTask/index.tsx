import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import InputField, {
  InputFieldType,
} from "../../../../shared/components/InputField";

const SearchTask = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <Row>
      <Col>
        <InputField
          placeholder="Search Tasks"
          type={InputFieldType.search}
          value={searchText}
          onChange={setSearchText}
        />
      </Col>
    </Row>
  );
};

export default SearchTask;
