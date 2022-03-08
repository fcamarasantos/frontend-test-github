import React, { useEffect } from 'react'

function DataTable({data, head, ...props}) {
    /* dataFormat:
        data = [ 
            ['baba', 'sdssd' , ... ]
            ['baba', 'sdssd' , ... ]
            ['baba', 'sdssd' , ... ]
            ['baba', 'sdssd' , ... ]
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