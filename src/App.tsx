import PostsList from "./components/PostsList.tsx";
import {Typography} from "@mui/material";

const App = () => {
    return (
        <>
            <Typography variant="h3" component="h1">Awesome UI App</Typography>
            <PostsList />
        </>
    );
}

export default App
