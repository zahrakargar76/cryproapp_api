import  { useRef, useState } from 'react';
import  { useEffect } from 'react';
import { coinData } from './coin_data';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const CoinList = () => {
    const defaultCoins =useRef([]);
    const[coins , setCoins] = useState([]);
  

    useEffect(() =>{
        const fetchData = async () =>{
            try{
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')

                const data = response.ok ? await response.json() : coinData;

                // const data = await response.json();
                setCoins(data);
                defaultCoins.current = data;
             }catch (error){
            console.error('error:',error);
          }
    };
    fetchData();
}, []);

const handelSearch =(event) =>{
    const newCoins = coins.filter((coin) =>
   coin.id.includes(event.target.value) || coin.symbol.includes(event.target.value)
    );
    setCoins(newCoins);
};

if(coins.length==0){
    return<CircularProgress color="secondary" />
}

// const columns = [
//     { field: 'market_cap_rank', headerName: '#', width: 130 },
//     { field: 'image', headerName: 'Coin', width: 100 ,   renderCell: (params) => <img width={20} height={20} src={params.value} />}, 
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'current_price', headerName: 'Price', width: 130 },
    
//     { field: 'low_24h', headerName: 'high 24', width: 130 },
// ];
const columns = [
  {
    field: 'star',
    headerName: '',
    width: 50,
    renderCell: (params) => (
      <div>
      {' '}
        <span role="img" aria-label="star">
          ⭐
        </span>
      </div>
    ),
  },
  { field: 'market_cap_rank', headerName: '#', width: 130 },

    // {
    //   field: 'market_cap_rank',
    //   headerName: '#',
    //   width: 130,
    //   renderCell: (params) => (
    //     <div>
    //       <i className="fas fa-star" style={{ marginRight: '5px' }}></i>
    //       {params.row.market_cap_rank}
    //     </div>
    //   ),
    // },

    {
      field: 'combinedField',headerName: 'Coin',width: 200,
      renderCell: (params) => (
        <div>
          <img width={20} height={20} src={params.row.image} alt="Coin" />
          <span style={{
            fontWeight:'bold',
            fontSize:'10',
            marginRight:'10',
          }}>{params.row.name}</span><span
          style={{
            marginRight:'20',
            color:'gray',
          }}
          >{params.row.symbol}</span>
        </div>
      ),
    },
    {
      field: 'button',
      headerName: ' ',
      width: 100,
      renderCell: (params) => (
        <Button variant="contained" color="success">
          BUY
        </Button>
      ),
    },
    { field: 'current_price', headerName: 'Price', width: 130 },
    { field: 'low_24h', headerName: '24h', width: 130 },
    { field: 'market_cap', headerName: 'Market Cap', width: 130 },
  
  ];

 

 



return(
    <div>
        <h1>Cryptocurrency Price</h1>
       {/* <input onChange={handelSearch}></input> */}
        {/* {coins.map((coin) =>(
             <div>
                {coin.name} {coin.title} 
                </div>
             )) } */}
             <div>
             <DataGrid
        rows={coins}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
     </div>
    </div>
);
};
export default CoinList;