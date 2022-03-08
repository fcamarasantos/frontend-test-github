import React, { useEffect, useState } from 'react'
import BarChart from '../../../components/ChartsD3/BarChart/BarChart';
import DataTable from '../../../components/DataTable/DataTable';
import MyPagination from '../../../components/myPagination/MyPagination';
import { getAllRepoPullRequests, getPullRequestList } from '../../../requests/getRepoList/getRepoList';
import classes from './PullRequests.module.scss';

function PullRequests (props)   {
  console.log(props)

  const [allPulls, setAllPulls] = useState(null);
  const [pagination, setPagination] = useState(1);
  const [pullInPage, setPullInpage] = useState(null);
  const [tableInfo, setTableInfo] = useState(null);

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
    console.log(pullInPage)
    // debugger
  });

  useEffect(() => {
    const per_page = 50;

    let distributedPulls = [];

    if(allPulls){
      allPulls.forEach((item, index) => {
        if(index % per_page == 0)
          distributedPulls.push([])

        distributedPulls[distributedPulls.length - 1].push(item);
      });
  
      setPullInpage(distributedPulls);

      let tableFormat = distributedPulls[pagination - 1].map((item) => {
        let date = new Date(item.updated_at);
        return([
                item.user.login,
                item.title,
                <a href={item.html_url} >Consultar</a>,
                `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
              ])
      });

      setTableInfo(tableFormat);

    }


  }, [allPulls])
  return (
    <div className={classes.pullRequestsContainer}>
        <div className={classes.content}>
          {graphData &&
                <BarChart recivedData={graphData} axesLabels={{
                  x: '',
                  y: 'Distribuição de pull requests'
                }}/>
            }
        <span>
          <p className={classes.tableTitle}>Tabela de Pull requests</p>
          {tableInfo ?
            <DataTable head={['Autor', 'Descrição', 'Acesso em', 'Atualizado em']} data={tableInfo}/>
          :
  
              (<div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>)
          }



        </span>

      </div>
        {pullInPage &&
          <MyPagination onChange={setPagination} range={[1  , (pullInPage.length - 1)]} actualPage={pagination}/>
        }
    </div>

    
  )
}

export default PullRequests