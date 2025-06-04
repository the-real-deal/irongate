import { Box, Divider, Drawer, IconButton, Sheet, Stack, Tab, TabList, Tabs, Tooltip, Typography } from "@mui/joy"
import { SyntheticEvent, useState } from "react"
import { IconContext } from "react-icons"
import { BaseProps } from "../../core/utils"
import { MdMenu } from "react-icons/md"
import ThemeSwitcher from "../ThemeSwitcher"
import { TabStructure } from "../../core/routing"

export interface SideBarProps extends BaseProps {
    tabs: TabStructure[]
    currentRoute: string | null
    onChange: (e: SyntheticEvent | null, value: string | null) => void
}

export default function Sidebar({
    tabs,
    currentRoute,
    onChange,
    sx
}: SideBarProps) {
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <Box>
            <Sheet
                variant="solid"
                color="primary"
                sx={{
                    position: "fixed",
                    top: 0,
                    height: "100dvh",
                    width: "2.5em",
                    zIndex: 100,
                    ...sx
                }}>
                <IconContext.Provider value={{
                    size: "var(--joy-fontSize-lg)"
                }}>
                    <Box>
                        <Tooltip title="Expand" placement="right" arrow>
                            <IconButton
                                onClick={() => setDrawerOpen(true)}
                                variant="solid"
                                color="primary"
                                sx={{
                                    width: "100%",
                                    borderRadius: 0
                                }}>
                                <MdMenu />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </IconContext.Provider>
            </Sheet>
            <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                size="sm"
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100dvh",
                    width: "100%",
                }}>
                    <Box sx={{
                        flex: 1,
                        overflowY: "auto",
                        '&::-webkit-scrollbar': { display: "none" },
                    }}>
                        <Tabs
                            value={currentRoute}
                            onChange={async (e, value) => {
                                setDrawerOpen(false)
                                await onChange(e, value?.toString() ?? null)
                            }}
                            orientation="vertical"
                            sx={{
                                width: "100%",
                            }}
                        >
                            <TabList
                                disableUnderline
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    gap: "0.2em",
                                }}>
                                {
                                    tabs.map(({ title, icon, routes }) => (
                                        Array.isArray(routes) ?
                                            <Box sx={{ width: "100%" }}>
                                                <Typography
                                                    level="title-lg"
                                                    startDecorator={icon}
                                                    sx={{
                                                        paddingBlock: "0.5em",
                                                        paddingInlineStart: "1em",
                                                    }}>
                                                    {title}
                                                </Typography>
                                                <Box sx={{ position: "relative" }}>
                                                    <Stack sx={{ width: "100%" }}>
                                                        {
                                                            routes.map(({ title, route }) => (
                                                                <Tab
                                                                    value={route.path}
                                                                    variant="plain"
                                                                    color="primary"
                                                                    indicatorInset
                                                                    sx={{
                                                                        width: "100%",
                                                                        paddingBlock: "0.5em",
                                                                        paddingInlineStart: "3.5em",
                                                                    }}>
                                                                    <Typography level="title-md">{title}</Typography>
                                                                </Tab>
                                                            ))
                                                        }
                                                    </Stack>
                                                </Box>
                                            </Box> :
                                            <Tab
                                                value={routes.path}
                                                variant="plain"
                                                color="primary"
                                                indicatorInset
                                                sx={{
                                                    width: "100%",
                                                    paddingBlock: "0.5em",
                                                    paddingInlineStart: "1em",
                                                }}>
                                                <Typography level="title-lg" startDecorator={icon}>{title}</Typography>
                                            </Tab>
                                    ))
                                }
                            </TabList>
                        </Tabs>
                    </Box>
                    <Divider />
                    <Box sx={{
                        flex: 0,
                        paddingBlock: "1em",
                        paddingInline: "1em",
                    }}>
                        <Typography level="h4">Theme</Typography>
                        <ThemeSwitcher sx={{ width: "100%", marginTop: "0.5em" }} />
                    </Box>
                </Box>
            </Drawer>
        </Box >
    )
}
