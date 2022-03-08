import React, { useEffect } from 'react'

function DataTable({data, head, ...props}) {
    /* dataFormat:
        data = [ * as keys do primeiro obj serao utilizadas commo base para toda a table ***
            {title: 'baba', title2: 'sdssd'  ... }
            {title1: 'baba', title2: 'sdssd' ... }
            {title1: 'baba', title2: 'sdssd' ... }
            .
            .
            .
        ] */
  return (
    <div className='container'>
        <table>
        <thead>
          <tr> 
              {head.map((item, index) => <th key={`${item}-${index}`}>{item}</th>)}
          </tr>
        </thead>
        <tbody>
            {data.map((row, rowIndex) => { // para cada obj (linha da tabela) divida em colunas extraindo seus valores
                return (
                    <tr key={`${row}-${rowIndex}`}>
                        {row.map((item, i) => <td key={`${i}-${item}`}>{item}</td>)}
                    </tr>
                );
                
            })}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable