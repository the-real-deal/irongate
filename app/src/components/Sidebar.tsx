import { Box, Drawer, IconButton, Stack, Tab, TabList, TabPanel, Tabs, Tooltip, Typography } from "@mui/joy"
import { FC, PropsWithChildren, ReactNode, useState } from "react"
import { IconContext } from "react-icons"
import { BaseProps } from "../api/ui/components"

export interface TabStructure {
    title: string
    icon: ReactNode
    content: ReactNode
}

export interface Props extends BaseProps {
    tabs: TabStructure[]
    expandButtonContent: ReactNode
    footer?: ReactNode
}

const Sidebar: FC<PropsWithChildren<Props>> = ({ tabs, expandButtonContent, sx, children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Tabs
            onChange={() => setOpen(false)}
            orientation="vertical"
            sx={{
                height: "100%",
                ...sx
            }}>
            <TabList
                variant="solid"
                color="primary"
                disableUnderline
                sx={{
                    overflow: 'auto',
                    scrollSnapType: 'x mandatory',
                    '&::-webkit-scrollbar': { display: 'none' }
                }}>
                <IconContext.Provider value={{
                    size: "var(--joy-fontSize-lg)"
                }}>
                    <Box>
                        <Tooltip title="Expand" placement="right" arrow>
                            <IconButton
                                onClick={() => setOpen(true)}
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
                            tabs.map((t, i) => (
                                <Tooltip title={t.title} placement="right" arrow>
                                    <Tab
                                        key={i}
                                        variant="solid"
                                        color="primary"
                                        sx={{
                                            width: "100%",
                                            flex: 'none',
                                            scrollSnapAlign: 'start'
                                        }}>
                                        {t.icon}
                                    </Tab>
                                </Tooltip>
                            ))
                        }
                    </Box>
                </IconContext.Provider>
            </TabList>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
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
                                tabs.map((t, i) => (
                                    <Tab
                                        key={i}
                                        variant="plain"
                                        color="primary"
                                        indicatorInset
                                        sx={{
                                            width: "100%",
                                            flex: 'none',
                                            scrollSnapAlign: 'start',
                                            paddingInline: "1em",
                                            "&:hover, &:hover:not(.Mui-selected)": {
                                                // backgroundColor: "neutral.500"
                                            }
                                        }}>
                                        <Typography level="title-lg" startDecorator={t.icon}>{t.title}</Typography>
                                    </Tab>
                                ))
                            }
                        </TabList>
                    </Box>
                    {children}
                </Stack>
            </Drawer>
            {
                tabs.map((t, i) => (
                    <TabPanel value={i}>{t.content}</TabPanel>
                ))
            }
        </Tabs >
    )
}

export default Sidebar