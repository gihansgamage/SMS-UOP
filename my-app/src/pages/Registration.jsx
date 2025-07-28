import { Link } from 'react-router-dom'
import Regulations from '../components/Regulations'
import Instruction from '../components/Instruction'
import ApplicantDetails from '../components/ApplicantDetails'
import MyNavbar from '../components/MyNavbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import PageHeader from "../components/pageHeader.jsx";

export default function Registration() {
    return (
        <div>
            <MyNavbar />
            <PageHeader />
            <div className='center-content'>
                <Regulations />
                <ApplicantDetails />
            </div>
        </div>

    )
}