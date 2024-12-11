import {Grid, Typography} from "@mui/material";
import MainCard from "../../../components/MainCard";

// 카드 제목 작성 함수
const cardTitle = (content) => {
    return <Typography variant="h5" align="center" gap={1}>{content}</Typography>;
}

/**
 * @param grid : 그리드 사이즈 (1행 = 합 12)
 * @param title : 카드 제목
 * @param content : 카드 컨텐츠
 */
const CardItem = ({grid, title, content}) => {
    return (
        <Grid item xs={grid}>
            <MainCard
                sx={{ mt: 2 }}
                content={false}
                title={cardTitle(title)}>
                {content}
            </MainCard>
        </Grid>
    );
};

export default CardItem;