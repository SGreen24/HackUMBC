import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const HomeButton = ({ destination = "/" }) => {
    return (
        <div className="flex">
            <Link 
            to={destination}
            className="bg-blue-400 px-8 py-1 rounded-lg w-fit">
                <BsArrowLeft size="24" className="text-4xl"/>Log Out
            </Link>
        </div>
    )
}

export default HomeButton