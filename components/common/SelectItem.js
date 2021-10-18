import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";

const Container = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 10px;
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
  ${FlexCenterBox}
  justify-content: space-around;
`;

const Item = styled.button`
  display: inline-block;
  height: 30px;
  margin: 4px;
  padding: 6px;
  white-space: nowrap;
  transition: all 0.3s;
  font-weight: 300;
  border: 1px solid #eaeaea;
  color: #000000d9;

  :hover {
    color: #0070f3;
  }

  ${({ active }) =>
    active &&
    `
    font-weight: 700;
    opacity: 1;
    margin: 2px;
    padding: 4px;
    background-color: #1890ff;
    color: #fff;
    :hover {
      color: #fff;
    }
  `};
`;


const SelectItems = styled.div`
  ${FlexCenterBox}
  flex-wrap: wrap;
  height: 100%;
  padding: 10px;
`

const Scroll = styled.div`
  ${FlexCenterBox}
  flex-wrap: wrap;
  height: 100%;
  overflow-y: auto;
  padding: 10px;
  height: 140px;
  ${(props) => props.theme.media.tablet`
    height: 200px;
  `}

  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    margin-right: -10px;
    padding-top: 32px;
    margin-top: -32px;
    margin-bottom: -32px;
    padding-bottom: 32px;

    scrollbar-base-color: #efefef;
    scrollbar-face-color: #666666;
    scrollbar-3dlight-color: #666666;
    scrollbar-highlight-color: #666666;
    scrollbar-track-color: #efefef;
    scrollbar-arrow-color: #666666;
    scrollbar-shadow-color: #666666;
    scrollbar-dark-shadow-color: #666666;

    :after {
      content: "";
      height: 32px;
      display: block;
    }
  }

  @supports (-ms-ime-align: auto) {
    margin-right: -10px;
    padding-top: 16px;
    margin-top: -16px;
    margin-bottom: -16px;
    padding-bottom: 16px;

    :after {
      content: "";
      height: 16px;
      display: block;
    }
  }

  ::-webkit-scrollbar-track {
    background-color: #efefef;
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #666666;
    border: 1px solid transparent;
    background-clip: content-box;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
`;

const stringSort = (sortKey) => (a, b) => {
  if (a[sortKey] < b[sortKey]) return -1;
  if (a[sortKey] > b[sortKey]) return 1;
  return 0;
};

const SelectBox = ({
  Component,
  children
}) => {
  return <Component>{children}</Component>
}


const SelectItem = ({
  items,
  sortKey,
  selectedItem,
  setSelectedItem,
  loading,
  isScrollable = true,
}) => {
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    const sorted = items.sort(stringSort(sortKey));
    setSortedItems([...sorted]);
  }, [items]);

  const selectFristElementIfNotExist = () => {
    if (
      selectedItem === "" ||
      !sortedItems.find((item) => item === selectedItem)
    ) {
      setSelectedItem(sortedItems[0]);
    }
  };

  useEffect(() => {
    if (sortedItems.length > 0) {
      selectFristElementIfNotExist();
    }
  }, [sortedItems]);

  return (
    <Container>
      <SelectBox Component={isScrollable ? Scroll : SelectItems}>
        {sortedItems.length === 0 && loading && <BarLoader color="#0070f3" />}
        {sortedItems.length > 0 &&
          sortedItems.map((item) => (
            <Item
              active={item === selectedItem}
              key={item["_id"]}
              onClick={() => {
                setSelectedItem(item);
              }}
            >
              {item[sortKey]}
            </Item>
          ))}
      </SelectBox>
    </Container>
  );
};

export default SelectItem;
