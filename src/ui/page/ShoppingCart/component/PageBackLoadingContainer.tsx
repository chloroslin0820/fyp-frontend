import LoadingContainer from "../../../component/LoadingContainer.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const PageBackLoadingContainer = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate("/");
        }, 1000);

        return () => clearTimeout(timeoutId);
    });

    return (
        <LoadingContainer />
    );
}