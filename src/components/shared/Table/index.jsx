import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { BounceLoader } from 'react-spinners';
import './table.css';

export const Table = ({
  isLoading,
  data,
  columns,
  hideSearchBar,
  hidePagination,
}) => {
  const { SearchBar } = Search;
  const rowStyle = () => {
    const style = {};
    style.backgroundColor = 'aliceblue';

    return style;
  };
  const HeaderStyles = {
    header: {
      backgroundColor: '#417ef7',
      color: 'white',
      fontWeight: 'normal',
      fontSize: 14,
    },

    headerSort: {
      backgroundColor: '#417ef7',
    },
  };
  for (let col of columns) {
    col.headerStyle = HeaderStyles.header;
    col.headerSortingStyle = HeaderStyles.headerSort;
  }

  return (
    <div className='custom-table'>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
          }}
        >
          <BounceLoader loading={isLoading} size={50} color='#417ef7' />
        </div>
      ) : (
        <ToolkitProvider keyField='id' data={data} columns={columns} search>
          {(props) => (
            <div>
              {!hideSearchBar && (
                <SearchBar {...props.searchProps} placeholder='Recherche' />
              )}

              <BootstrapTable
                hover
                rowStyle={rowStyle}
                bootstrap4
                {...props.baseProps}
                pagination={!hidePagination ? paginationFactory() : null}
                selectRow={undefined}
                noDataIndication="Aucune donnée pour l'instant"
                striped
                bordered={false}
              />
            </div>
          )}
        </ToolkitProvider>
      )}
    </div>
  );
};
