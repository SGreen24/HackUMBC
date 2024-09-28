import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const HomeButton = ({ destination = "/" }) => {
    return (
        <div className="flex">
            <Link 
            to={destination}
            className="bg-orange-400 px-4 py-1 rounded-lg w-fit">
                <BsArrowLeft className="text-2xl"/>
            </Link>
        </div>
    )
}

export default HomeButton