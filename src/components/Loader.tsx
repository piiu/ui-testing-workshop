import {ReactNode} from "react";
import {Box, CircularProgress} from "@mui/material";

interface LoaderProps {
    isLoading: boolean;
    children?: ReactNode;
}

const Loader = ({isLoading, children}: LoaderProps): ReactNode => {
    if (isLoading) {
        return <Box p={5} display="flex" justifyContent="space-around"><CircularProgress /></Box>
    }

    return children
}

export default Loader
