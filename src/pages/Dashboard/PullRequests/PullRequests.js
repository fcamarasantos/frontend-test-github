import React, { useEffect, useState } from 'react'
import BarChart from '../../../components/ChartsD3/BarChart/BarChart';
import { getAllRepoPullRequests, getPullRequestList } from '../../../requests/getRepoList/getRepoList';
import classes from './PullRequests.module.scss';

function PullRequests (props)   {
  console.log(props)

  const [allPulls, setAllPulls] = useState(null);
  const [pagination, setPagination] = useState(1);
  const [pullInPage, setPullInpage] = useState(null);
  const [paginationIndexes, setPaginationIndexes] = useState([]);

  const [graphData, setGraphData] = useState();

  useEffect(async () => {
    let allPulls = await getAllRepoPullRequests(props.data.owner.login, props.data.name);
    setAllPulls(allPulls)

    console.log({allPulls})

    const arrangeGraphData = () => {
      let statusCount = {
        'open': 0,
        'closed': 0,
        'merged': 0,
      }

      allPulls.forEach((item) => {

        if(item.merged_at)
          statusCount['merged']++;
        else{
          if(item.state == 'closed')
            statusCount['closed']++;
          else if(item.state == 'open')
            statusCount['open']++
        }
          
        if(item.merged_at && item.state == 'open') console.log('item-louco', item)
      });

      let graphDataFormat = [];
      for(let i in statusCount){
        graphDataFormat.push({
          x: i,
          y: statusCount[i]
        });
      }

      console.table(graphDataFormat)
      setGraphData(graphDataFormat);
    }
    arrangeGraphData();

  }, []);

  useEffect(() => {
    const per_page = 50;

    let distributedPulls = [];

    if(allPulls){
      allPulls.forEach((item, index) => {
        if(index % per_page == 0)
          distributedPulls.push([])

          // debugger
        distributedPulls[distributedPulls.length - 1].push(item);
      });

      let indexes = []
      for(let i =0; i < distributedPulls.length ; i++){
        let itemPageNum = i + 1;
        indexes.push(
            <li key={i} className={`waves-effect ${itemPageNum==pagination ? 'active' : ''}`} onClick={() => {onPaginationChange(itemPageNum)}}><a className='like-a' href='#'>{itemPageNum}</a></li>
        )
      }

      setPaginationIndexes(indexes);
    

    }
    setPullInpage(distributedPulls);

  }, [allPulls])

  const onPaginationChange = (page) => {
    setPagination(page)
  }

    const verifyPageNum = (pageNum) => {
        return (pageNum >= 1 && pageNum <= pullInPage.length - 1);
    }

    const onBeforePagition = () => {
        setPagination(prev => {
            if(verifyPageNum(prev -1)) return prev -1;
            else return prev;
        });
    }
    const onNextPagition = () => {
      setPagination(prev => {
            if(verifyPageNum(+prev +1)) return +prev +1;
            else return +prev;
        });
    }

  return (
    <div className={classes.pullRequestsContainer}>
      
      <div className={[classes.container, 'container'].join(' ')}>
        <div className={classes.tableSide}>
          <table>
            <thead>
            </thead>
          <tbody>
            {pullInPage && pullInPage[pagination - 1] && pullInPage[pagination - 1].map((item) => {
              let date = new Date(item.created_at);
              return(
                <tr key={item.id}>
                          <td>{item.user.login}</td>
                          <td>{item.title}</td>
                          <td>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</td>
                      </tr>
                  )
                })}
          </tbody>
          </table>
        </div>  
        <div className={classes.graphSide}>
          {graphData &&
                <BarChart recivedData={graphData} axesLabels={{
                  x: '',
                  y: 'Distribuição de pull requests'
                }}/>
              }
        </div>  


        
      </div>

                
      <div className='row'>
            <div className='col'>
                <ul className="pagination">
                  {paginationIndexes && pullInPage && (
                    <>
                      <li className={`${pagination <= 1 ? 'disabled' : ''}`}><a href="#" onClick={onBeforePagition}><i className="material-icons">chevron_left</i></a></li>
                      {pullInPage.map((item, i) => {
                        let itemPageNum = i + 1;
                        return (
                          <li key={i} className={`waves-effect ${itemPageNum==pagination ? 'active' : ''}`} onClick={() => {onPaginationChange(itemPageNum)}}><a className='like-a' href='#'>{itemPageNum}</a></li>
                        )
                      })}
                      <li className={`waves-effect ${pagination >= pullInPage.length - 1 ? 'disabled' : ''}`} ><a href="#" onClick={onNextPagition}><i className="material-icons">chevron_right</i></a></li>
                    </>
                  )}
                </ul>
            </div>
        </div>
    </div>

    
  )
}

export default PullRequests