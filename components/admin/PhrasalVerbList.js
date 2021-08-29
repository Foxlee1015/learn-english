import { deleteResource } from "../../utils/apis";
import styled from "styled-components";
import { AdminContentListContainer as Container } from "./common";

const Button = styled.button`
  margin: 5px;
  border: solid 1px black;
  padding: 5px;
`;

const PhrasalVerbList = ({
  data,
  selectedItem,
  setSelectedItem,
  refreshData,
}) => {
  return (
    <Container>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <Button key={item._id}>
            <p>
              {selectedItem._id === item._id && "*"}
              {item.verb}-{item.particle} {item.is_public}
            </p>
            <Button
              onClick={() => {
                setSelectedItem(item);
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                deleteResource("phrasal-verbs", item._id, refreshData);
              }}
            >
              Delete
            </Button>
          </Button>
        ))}
    </Container>
  );
};

export default PhrasalVerbList;
