import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useRef } from 'react';
// import logo from ''

function PDF() {
    const pdfRef = useRef();

    const dwonload = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidht = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidht, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidht * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidht * ratio, imgHeight * ratio);
            pdf.save('barang-keluar.pdf');
        });
    }
    return (
        <>
            <div className='container mt-5 border p-5' ref={pdfRef}>
                <div className='row mb-4'>
                    <div className='col-6'>
                        <img src={`${window.location.origin}/assets/logo/React.png`} alt='logo' height={100} width={100} />
                    </div>
                    <div className='col-6 text-end'>
                        <h1>Data Barang Keluar</h1>
                    </div>
                </div>
                <div className='row mb-4'>
                    <h3>TEst</h3>
                </div>
                <div className='row'>
                    <h3>TEst</h3>
                </div>
                <div className='row'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

            <div className='text-center mt-5'>
                <Button className='btn btn-primary' onClick={dwonload}>Dwonload PDF</Button>
            </div>
        </>
    )
}
export default PDF;