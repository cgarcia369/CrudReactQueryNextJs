import Head from 'next/head'
import Image from 'next/image'
import {Container,Row,Col,Table,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout'
import DataTable from 'react-data-table-component'
import {useQuery,useMutation, useQueryClient} from 'react-query'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import React from 'react';
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'
export default function Home() {
  const router= useRouter();
  const queryClient = useQueryClient();
  const {status,isLoading,isFetching,isError,isSuccess,data,error} = useQuery('GetGroup',()=>
    new Promise((resolve, reject)=>{
      setTimeout(async () => {
        resolve(await axios.get('https://demo.resthapi.com/group'));
      }, 500)
    })
  )
  const mutation = useMutation(async(data) =>{
    console.log([data])
    await axios.delete('https://demo.resthapi.com/group',{data:[data]})
  },{
    onSuccess:()=>{
      toast.success('Item eliminado con exito.')

      queryClient.invalidateQueries('GetGroup');
    },
    onError:(e)=>{
      console.log(e.response)
    }
  })
  const columns= React.useMemo(()=>
  [
    {
      name: "Nombre",
      selector: "name"
    },
    {
      name: "Descripcion",
      selector: "description"
    },
    {
      cell:(row) => <Button onClick={()=> router.push({pathname:"/editar/[id]",query:{id: row._id}})} variant="outline-secondary">Editar</Button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell:(row) => <Button onClick={()=>mutation.mutate(row._id)} variant="outline-danger">Eliminar</Button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ],[]);
  return (
    <Layout>
      {isLoading ? 
        <Loader
          style={{margin:"auto",display:"flex",justifyContent:"center",height:"100%",alignItems:"center"}}
          type="Bars"
          color="#ff8a4c"
          height={100}
          width={100}
        />
        :
        <DataTable
          title="Grupos"
          columns={columns}
          data={data.data.docs}
          highlightOnHover
          responsive
          // pagination
          // paginationServer
          // paginationTotalRows={users.total}
          // paginationPerPage={countPerPage}
          // onChangeRowsPerPage={handleChangeRow}
          // onChangePage={(page) => setPage(page)}
        />
        
      }
      {
        isFetching && !isLoading ? <h6 className="mx-auto text-center mt-5">Recargando .....</h6> :null
      }
      
    </Layout>
  )
}
