import React from 'react'
import Layout from '../components/Layout';
import {Form,Button} from 'react-bootstrap'
import {useFormik} from 'formik'
import {useMutation,useQueryClient} from 'react-query'
import * as Yup from 'yup';
import axios from 'axios';
import {useRouter} from 'next/router'
import {toast } from 'react-toastify'
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, 'El nombre debería tener mínimo 4 caracteres.')
        .max(100, 'El nombre debería tener máximo 100 caracteres.')
        .required('El campo nombre es requerido.'),
    description: Yup.string()
        .min(10, 'La descripcion debería tener mínimo 10 caracteres.')
        .max(100, 'El descripcion debería tener máximo 100 caracteres.')
        .required('El campo descripcion es requerido.'),
});
const Crear = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const mutation = useMutation(async (data)=>{
        await axios.post('https://demo.resthapi.com/group',[data]);
    },{
        onSuccess:()=>{
            queryClient.invalidateQueries('GetGroup');
            toast.success('Item creado con exito.');
            router.push('/');
        }
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        onSubmit: (values) => {
            mutation.mutate(values);
            // router.push('/dashboard/admin/fichas');
        },
        validationSchema,
    });
    
    
    return (
        <Layout>
            <Form className="w-50 mx-auto" onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text"isValid={!formik.errors.name && formik.touched.name ? true : (!formik.touched.name ? false : null) } isInvalid={formik.errors.name && formik.touched.name ? true:false}  placeholder="Ingrese un nombre" value={formik.values.name} onChange={formik.handleChange}/>
                    {formik.errors.name && formik.touched.name ? <Form.Text className="text-danger">
                        {formik.errors.name}
                    </Form.Text>:null}
                    {/* <Form.Text className="text-muted">
                        
                    </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text"  isValid={!formik.errors.description && formik.touched.description ? true : (!formik.touched.description ? false : null) } isInvalid={formik.errors.description && formik.touched.description ? true:false}   placeholder="Ingrese una descripcion" value={formik.values.description} onChange={formik.handleChange} />
                    {formik.errors.description && formik.touched.description ? <Form.Text className="text-danger">
                        {formik.errors.description}
                    </Form.Text>:null}
                    
                    {/* <Form.Text className="text-muted">
                        
                    </Form.Text> */}
                </Form.Group>
                <Button type={ 'submit'} variant="primary" className="btn-block" >
                    Enviar
                </Button>
            </Form>
        </Layout>
    );
}
 
export default Crear;