import React,{useState,useEffect} from 'react'
import { Container, Row ,Col,Nav,ProgressBar} from 'react-bootstrap';
import { Sling as Hamburger } from 'hamburger-react'
import { useRouter } from 'next/router'
import { useIsFetching } from 'react-query';
import FakeProgress from 'fake-progress'
import Head from 'next/head'
import Script from 'next/script'
const Layout = (p) => {
    const router = useRouter();
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <Head>
                
            </Head>
            
            <Container fluid>
                    <div style={{position:"absolute",top:0,left:0,margin:"0.5rem",zIndex:99999}}>
                        <Hamburger toggled={isOpen} toggle={setOpen}></Hamburger>
                    </div>
                <Row>
                    {
                        isOpen &&
                        <Col xs={{span:8}} lg={{span:3}} className="px-5 d-flex justify-content-center align-items-center flex-column position-fixed" style={{height:"100vh",zIndex:999,backgroundColor:"#ff8a4c"}}>
                            
                            <h2 style={{marginTop:"5rem"}}>
                                CrudSimple React
                            </h2>
                            
                            <div className="d-flex justify-content-center align-items-center flex-column flex-grow-1 w-100">
                                <Nav  variant="pills" className="w-100 flex-column">
                                    <Nav.Link onClick={()=> router.push('/')} style={{color:"#252f3f",fontSize:"1.3rem"}}>Lista</Nav.Link>
                                    <Nav.Link onClick={()=> router.push('/crear')} style={{color:"#252f3f",fontSize:"1.3rem"}}>Crear</Nav.Link>
                                </Nav>
                            </div>
                            
                        </Col>
                    }
                    <Col style={{height:"100vh"}} className="overflow-auto p-5">
                        {p.children}
                    </Col>
                </Row>
            </Container>
            {/* <Script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"></Script> */}
        </>
    );
}
 
export default Layout;