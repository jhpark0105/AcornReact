import {useRouteError} from "react-router";
import MainCard from "../../components/MainCard";
import {AxiosError} from "axios";
import {Link} from "react-router-dom";
import {ListItem} from "@mui/material";

const ErrorBoundary = () => {
    /**
     * useRouteError 훅 : Error 객체에 접근
     * : 라우트 컴포넌트의 errorElement 속성에 ErrorBoundary를 정의.
     */
    const error = useRouteError();

    let message;

    if (error instanceof AxiosError) {
        message = <AxiosError message={error.message}/>
    } else {
        message = error.message;
    }

    return (
        <MainCard border={true} title={"Error Message"}>
            <ListItem>{message}</ListItem>
            <ListItem><Link to={"/main"}>HOME</Link></ListItem>
        </MainCard>
    )
}

export default ErrorBoundary;