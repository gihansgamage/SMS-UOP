import Regulations from "../components/Regulations"
import ApplicantDetails from "../components/ApplicantDetails"
import MyNavbar from "../components/MyNavbar"
import "bootstrap/dist/css/bootstrap.min.css"
import PageHeader from "../components/pageHeader.jsx"

export default function Registration() {
    return (
        <div>
            <MyNavbar />
            <PageHeader />
            <div className="center-content">
                <Regulations />
                <ApplicantDetails showFaculty={true} />
            </div>
        </div>
    )
}
