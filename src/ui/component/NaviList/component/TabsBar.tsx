import {Tab, Tabs} from "@mui/material";
import React, {useEffect} from "react";

type Props = {
    onTabClick: (index: number) => void;
}

export const TabsBar = ({ onTabClick }: Props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (e: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(e);
    };

    const handleTabClick = (index: number) => {
        console.log(`Tab ${index} clicked`);
        onTabClick(index + 1);
    };

    useEffect(() => {
        onTabClick(1)
    }, []);

    const tabsStyles = {
        "& .MuiTab-root": {
            color: "#000",
            fontSize: 16,
        },
        "& .MuiTab-root:hover": {
            color: "red",
            textShadow: "2px 2px yellow",
        },
        "& .Mui-selected": {
            color: "orange !important",
        },
        "& .MuiTabs-indicator": {
            backgroundColor: "#DE7707 !important",
        }
    }

    return (
        <Tabs
            value={value}
            onChange={handleChange}
            centered
            sx={tabsStyles}
        >
            {[
                "みかん・柑橘",
                "りんご",
                "いちご",
                "もも",
                "ぶどう",
                "なし",
                "メロン",
                "すいか",
                "マンゴー",
                "他",
            ].map((label, index) => (
                <Tab
                    key={index}
                    label={label}
                    onClick={() => handleTabClick(index)}
                />
            ))}
        </Tabs>
    );
}