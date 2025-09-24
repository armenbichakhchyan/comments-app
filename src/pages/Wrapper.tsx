import {Outlet} from "react-router-dom";
import Footer from '../Components/Footer';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Wrapper = () => {
    return (
        <div className="wrapper">
            <main>
                <Outlet />
            </main>

            <Footer />

            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
            />
        </div>
    );
};

export default Wrapper;