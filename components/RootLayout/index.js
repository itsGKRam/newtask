import {
    ActionIcon,
    AppShell,
    Burger,
    Button,
    Group,
    Header,
    MediaQuery,
    Navbar,
    Switch,
    Text,
    Tooltip,
    useMantineColorScheme,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function RootLayout(props) {
    const [opened, setOpened] = useState(false);
    const router = useRouter();
    const route = router.asPath.split('/');

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const setColorScheme = () => {
        const nextColorScheme = colorScheme === 'dark' ? 'light' : 'dark';
        toggleColorScheme(nextColorScheme);
    };

    const MenuList = [
        {
            Name: 'History',
            icon: <text>H</text>,
        },
        {
            Name: 'Payloads',
            icon: <text>P</text>,
        },
    ];

    return (
        <AppShell
            navbarOffsetBreakpoint='sm'
            fixed
            navbar={
                <Navbar
                    padding={opened ? 'md' : 'xs'}
                    hiddenBreakpoint='sm'
                    hidden={!opened}
                    className=' smv-overflow-hidden smv-transition-all smv-duration-[250] smv-ease-linear'
                    width={{ sm: opened ? 200 : 70 }}
                >
                    <Navbar.Section grow>
                        <Group direction='column' grow>
                            {MenuList?.map((item, i) => (
                                <div
                                    key={item.Name}
                                    className=' smv-cursor-pointer smv-items-center smv-justify-center smv-flex'
                                    onClick={() => {
                                        router.push(
                                            `/${item.Name.toLowerCase()}`,
                                        );
                                    }}
                                >
                                    {opened ? (
                                        <Button
                                            leftIcon={item.icon}
                                            className={` smv-items-center  smv-justify-center sm:smv-justify-start smv-flex !smv-w-full`}
                                            variant={
                                                route[1] ===
                                                item.Name.toLowerCase()
                                                    ? 'light'
                                                    : 'subtle'
                                            }
                                            uppercase
                                        >
                                            {item.Name}
                                        </Button>
                                    ) : (
                                        <Tooltip
                                            position='right'
                                            transition='fade'
                                            transitionDuration={300}
                                            transitionTimingFunction='ease'
                                            withArrow
                                            label={item.Name}
                                        >
                                            <ActionIcon
                                                variant={
                                                    route[1] ===
                                                    item.Name.toLowerCase()
                                                        ? 'light'
                                                        : 'hover'
                                                }
                                                color={'blue'}
                                                size='xl'
                                            >
                                                {item.icon}
                                            </ActionIcon>
                                        </Tooltip>
                                    )}
                                </div>
                            ))}
                        </Group>
                    </Navbar.Section>
                    <Navbar.Section>
                        <Button
                            grow
                            variant='subtle'
                            onClick={() => setOpened((o) => !o)}
                            className=' !smv-w-full smv-p-0 smv-justify-center smv-items-center'
                        >
                            <Burger opened={opened} />
                        </Button>
                    </Navbar.Section>
                </Navbar>
            }
            header={
                <Header
                    height={70}
                    padding='md'
                    className=' smv-w-full smv-justify-between smv-items-center smv-flex'
                >
                    <div className=' smv-flex smv-items-center smv-h-full smv-gap-2'>
                        <MediaQuery
                            largerThan='sm'
                            styles={{ display: 'none' }}
                        >
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                            />
                        </MediaQuery>
                        <Text className=' smv-font-bold'>SMV SpaceX</Text>
                    </div>
                    <div className=' smv-flex smv-items-center smv-justify-center smv-flex-row smv-gap-2'>
                        <Text>
                            {colorScheme === 'dark' ? 'Dark' : 'Light'} Theme
                        </Text>
                        <Switch onChange={setColorScheme} />
                    </div>
                </Header>
            }
            padding={'md'}
        >
            {props?.children && props?.children}
        </AppShell>
    );
}
