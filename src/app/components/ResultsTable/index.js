import React, { useEffect } from 'react';

import MaterialTable from 'material-table';
import { tableIcons } from './table-icons';

const ResultsTable = ({ data }) => {
  const styles = {
      header: {
        fontSize: '16px',
        color: '#3f51b5',
      },
      year: {
        fontWeight: 'bold',
      },
  }
  const [state, setState] = React.useState({
    columns: [
      { title: 'Year', field: 'date', cellStyle: styles.year, editable: 'never' },
      { title: 'NI Contribution', field: 'ni', type: 'currency', editable: 'never', currencySetting: { currencyCode: 'GBP'} },
      { title: 'Personal Allowance', field: 'income', type: 'currency', editable: 'onUpdate', currencySetting: { currencyCode: 'GBP', minimumFractionDigits: 0, } },
    ],
    data,
  });

  useEffect(() => {
    const formattedData = data.map(item => {
        const year = item.date.split('-')[0];
        const newDate = year + '/' + (parseInt(year.slice(year.length - 2)) + 1);
        return {
            ...item,
            date: newDate,
        }
    });
    setState(prevState => ({
        ...prevState,
        data: formattedData
    }));
  }, [data]);

  return (
    <MaterialTable
      title="National Insurance Contribution"
      columns={state.columns}
      data={state.data}
      icons={tableIcons}
      options={{
          headerStyle: styles.header,
      }}
    />
  );
}

export default ResultsTable;
