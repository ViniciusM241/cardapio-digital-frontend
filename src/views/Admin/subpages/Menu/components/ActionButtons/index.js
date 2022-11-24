import React from 'react';

import { MdMode } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { Delete, Edit } from './styles';

import {
  Inline,
} from '~/components';

function ActionButtons({ onDelete, onEdit, item, ...props }) {
  return (
    <Inline right {...props}>
      {
        item?.special || (
          <Delete className="mr-10" onClick={onDelete}>
            <FaTrashAlt />
          </Delete>
        )
      }
      <Edit onClick={onEdit}>
        <MdMode />
      </Edit>
    </Inline>
  );
}

export default ActionButtons;
