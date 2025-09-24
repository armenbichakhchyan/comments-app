import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate, Route
}
from 'react-router-dom';

import Wrapper from '../pages/Wrapper';
import Comments from "../pages/Comments";
import NotFound from "../pages/NotFound";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route  path="/" element={<Wrapper />}>
                <Route index element={<Comments />}/>
            </Route>

            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to='/404' replace/>} />
        </>
    )
)