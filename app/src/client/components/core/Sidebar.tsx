import { Box, Drawer, IconButton, Stack, Tab, TabList, Tabs, Tooltip, Typography } from "@mui/joy"
import { PropsWithChildren, ReactNode, SyntheticEvent, useState } from "react"
import { IconContext } from "react-icons"
import { BaseProps } from "../../utils"

export interface TabStructure {
    title: string
    route: string
    icon: ReactNode
}

export interface SideBarProps extends BaseProps {
    tabs: TabStructure[]
    currentRoute: string | null
    expandButtonContent: ReactNode
    onChange: (e: SyntheticEvent | null, value: string | null) => void
}

export default function Sidebar({ tabs, currentRoute, expandButtonContent, onChange, sx, children }: PropsWithChildren<SideBarProps>) {
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <Tabs
            value={currentRoute}
            onChange={(e, value) => {
                setDrawerOpen(false)
                onChange(e, value?.toString() ?? null)
            }}
            orientation="vertical"
            sx={{
                width: "fit-content",
                ...sx
            }}>
            <TabList
                variant="solid"
                color="primary"
                disableUnderline
                sx={{
                    position: "sticky",
                    top: 0,
                    height: "100dvh",
                    zIndex: 100
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
                                {expandButtonContent}
                            </IconButton>
                        </Tooltip>
                        {
                            tabs.map(({ title, icon, route }) => (
                                <Tooltip title={title} placement="right" arrow>
                                    <Tab
                                        value={route}
                                        variant="solid"
                                        color="primary"
                                        sx={{
                                            width: "100%",
                                            flex: 'none',
                                            scrollSnapAlign: 'start'
                                        }}>
                                        {icon}
                                    </Tab>
                                </Tooltip>
                            ))
                        }
                    </Box>
                </IconContext.Provider>
            </TabList>
            <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                size="sm"
            >
                <Stack sx={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    height: "100%",
                    width: "100%",
                }}>
                    <Box sx={{ width: "100%" }}>
                        <Typography
                            level="h4"
                            paddingInline={"1em"}
                            paddingBlock={"0.5em"}>
                            Pages
                        </Typography>
                        <TabList
                            disableUnderline
                            sx={{
                                height: "100%",
                                width: "100%",
                                overflow: 'auto',
                                scrollSnapType: 'x mandatory',
                                '&::-webkit-scrollbar': { display: 'none' },
                                fontWeight: "bold",
                            }}>
                            {
                                tabs.map(({ title, icon, route }) => (
                                    <Tab
                                        value={route}
                                        variant="plain"
                                        color="primary"
                                        indicatorInset
                                        sx={{
                                            width: "100%",
                                            flex: 'none',
                                            scrollSnapAlign: 'start',
                                            paddingInline: "1em",
                                        }}>
                                        <Typography level="title-lg" startDecorator={icon}>{title}</Typography>
                                    </Tab>
                                ))
                            }
                        </TabList>
                    </Box>
                    {children}
                </Stack>
            </Drawer>
        </Tabs >
    )
}
