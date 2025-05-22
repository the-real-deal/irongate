import { Box, Drawer, IconButton, Stack, Tab, TabList, TabPanel, Tabs, Tooltip, Typography } from "@mui/joy"
import { FC, PropsWithChildren, ReactNode, useState } from "react"
import { BaseProps } from "./utils"

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
                height: '100%',
                ...sx
            }}>
            <TabList sx={{
                overflow: 'auto',
                scrollSnapType: 'x mandatory',
                '&::-webkit-scrollbar': { display: 'none' },
            }}>
                <Tooltip title="Expand" placement="right" arrow>
                    <IconButton
                        onClick={() => setOpen(true)}
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
                                variant="plain"
                                color="neutral"
                                indicatorInset
                                sx={{
                                    width: "100%",
                                    flex: 'none',
                                    scrollSnapAlign: 'start',
                                }}>
                                {t.icon}
                            </Tab>
                        </Tooltip>
                    ))
                }
            </TabList>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    height: "100%",
                }}
            >
                <TabList sx={{
                    height: "100%",
                    overflow: 'auto',
                    scrollSnapType: 'x mandatory',
                    '&::-webkit-scrollbar': { display: 'none' },
                }}>
                    <Stack sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        height: "100%",
                    }}>
                        <Box sx={{ width: "100%" }}>
                            {
                                tabs.map((t, i) => (
                                    <Tab
                                        key={i}
                                        variant="plain"
                                        color="neutral"
                                        indicatorInset
                                        sx={{
                                            width: "100%",
                                            flex: 'none',
                                            scrollSnapAlign: 'start',
                                            paddingInline: "1em",
                                        }}>
                                        <Typography sx={{ fontWeight: "bold" }} startDecorator={t.icon}>{t.title}</Typography>
                                    </Tab>
                                ))
                            }
                        </Box>
                        {children}
                    </Stack>
                </TabList>
            </Drawer>
            {
                tabs.map((t, i) => (
                    <TabPanel value={i}>{t.content}</TabPanel>
                ))
            }
        </Tabs>
    )
}

export default Sidebar