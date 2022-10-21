import React from "react";
import { Inline } from "~/components";
import { Button } from './styles';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import colors from "~/utils/colors";

function Pagination({
  maxPage,
  setFilters,
  pageIndex,
  total,
}) {
  const totalPage = Math.ceil(total / maxPage);
  const maxToShow = 2;
  let buttonsQty = [...Array(maxToShow).keys()];

  if (totalPage < maxToShow) {
    buttonsQty = [];
  }

  if (totalPage > maxToShow) {
    buttonsQty = [...Array(totalPage).keys()];
  }

  if (pageIndex + 1 > maxToShow) {
    buttonsQty = buttonsQty.map(x => x + pageIndex - 1);
  }

  const handleChangeIndex = (index) => {
    setFilters(state => ({
      ...state,
      pageIndex: index,
    }));
  };

  return (
    <Inline className="mt-20" center>
      {
        pageIndex !== 0 && (
          <LeftOutlined
            style={{
              color: colors.LIGHT_BLUE,
              cursor: 'pointer',
            }}
            onClick={() => handleChangeIndex(pageIndex - 1)}
          />
        )
      }
      {
        buttonsQty.slice(0, maxToShow).map(index => (
          <Button
            className="ml-10"
            key={index}
            active={index === pageIndex}
            onClick={() => handleChangeIndex(index)}
          >
            {index + 1}
          </Button>
        ))
      }
      {
        pageIndex +2 < totalPage && (
          <span className="ml-10">
            ...
          </span>
        )
      }
      {
        buttonsQty.length !== maxToShow && pageIndex + 1 !== totalPage && (
          <Button
            className="ml-10"
            active={pageIndex + 1 === totalPage}
            onClick={() => handleChangeIndex(totalPage -1)}
          >
            {totalPage}
          </Button>
        )
      }
      {
        pageIndex !== totalPage - 1 && (
          <RightOutlined
            className="ml-10"
            style={{
              color: colors.LIGHT_BLUE,
              cursor: 'pointer',
            }}
            onClick={() => handleChangeIndex(pageIndex + 1)}
          />
        )
      }
    </Inline>
  );
}

export default Pagination;
