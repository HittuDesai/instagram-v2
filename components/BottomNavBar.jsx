import { useState } from "react";
import { useRouter } from "next/router";

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HomeIcon from "@mui/icons-material/Home";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { userid, username } from "../atoms/userAtom";
import { wantsToUploadBool } from "../atoms/actionsAtom";

export function BottomNavBar() {
	const router = useRouter();
	const routerPath = router.asPath;
	const pathParts = routerPath.split("/");

	const setWantsToUpload = useSetRecoilState(wantsToUploadBool);
	const currentUserID = useRecoilValue(userid);
	const currentUsername = useRecoilValue(username);

	const [bottomBarValue, setBottomBarValue] = useState("home");
	const handleBottomBarChange = (event, newValue) => {
		setBottomBarValue(newValue);
		switch (newValue) {
			case "upload":
				setWantsToUpload(true);
				break;

			case "explore":
				router.push(`/${currentUsername}/explore`);
				break;

			case "home":
				router.push(`/${currentUsername}`);
				break;

			case "chats":
				router.push(`/${currentUsername}/chats`);
				break;

			case "profile":
				router.push(`/${currentUsername}/profile`);
				break;

			default:
				break;
		}
	};

	if (pathParts.includes("chats") && pathParts.length === 4) return <></>;
	return (
		<>
			{currentUserID && (
				<Paper
					sx={{
						position: "fixed",
						bottom: 0,
						left: 0,
						right: 0,
						padding: "0.5rem 2rem",
					}}
					elevation={0}
				>
					<BottomNavigation
						value={bottomBarValue}
						onChange={handleBottomBarChange}
					>
						<BottomNavigationAction
							value="upload"
							icon={<AddBoxRoundedIcon />}
						/>
						<BottomNavigationAction
							value="explore"
							icon={<PeopleAltIcon />}
						/>
						<BottomNavigationAction
							value="home"
							icon={<HomeIcon />}
						/>
						<BottomNavigationAction
							value="chats"
							icon={<QuestionAnswerIcon />}
						/>
						<BottomNavigationAction
							value="profile"
							icon={<AccountCircleRoundedIcon />}
						/>
					</BottomNavigation>
				</Paper>
			)}
		</>
	);
}
