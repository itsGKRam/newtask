import {
    ActionIcon,
    Button,
    Card,
    Group,
    Image,
    InputWrapper,
    Modal,
    Table,
    Text,
    TextInput,
} from '@mantine/core';
import { useState } from 'react';
import RootLayout from '../../components/RootLayout';

export async function getServerSideProps() {
    const res = await fetch(' https://api.spacexdata.com/v3/history');
    const data = await res.json();
    return {
        props: {
            historyList: data,
        },
    };
}

export default function History({ historyList }) {
    const [opened, setOpened] = useState(false);
    const [listData, setListData] = useState();
    const [search, setSearch] = useState('');

    const rows = historyList
        .filter((d, item) => {
            return d?.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
        })
        .map((res, index) => (
            <tr key={res?.id}>
                <td>{res?.id}</td>
                <td>{res?.title}</td>
                <td>{res?.flight_number}</td>
                <td>
                    <Text
                        onClick={() => {
                            setListData(res);
                            setOpened(true);
                        }}
                        className=' smv-whitespace-nowrap hover:smv-underline smv-cursor-pointer'
                    >
                        View more
                    </Text>
                </td>
            </tr>
        ));

    const resetSearch = () => {
        setSearch('');
    };

    return (
        <Group>
            <Card className=' smv-overflow-hidden smv-w-full smv-flex smv-items-center smv-justify-center smv-sticky smv-top-20  smv-z-50'>
                <TextInput
                    className='smv-w-full'
                    required
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    label='Search by Title'
                    rightSectionWidth={75}
                    rightSection={
                        <Button
                            onClick={resetSearch}
                            variant='subtle'
                            compact
                            type='submit'
                        >
                            clear
                        </Button>
                    }
                    placeholder='Search Event'
                />
            </Card>
            <Table highlightOnHover className=' smv-relative '>
                <thead>
                    <tr className=' smv-w-full'>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Flight Number</th>
                        <th>More</th>
                    </tr>
                </thead>
                <tbody className=' smv-overflow-y-scroll'>{rows}</tbody>
                {listData && (
                    <Modal
                        size={'lg'}
                        centered
                        opened={opened}
                        onClose={() => setOpened(false)}
                        title={listData?.title}
                    >
                        <Group direction='column' grow>
                            {listData?.title && (
                                <Card>
                                    <InputWrapper label='Title'>
                                        <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                            <text>{listData?.title}</text>
                                        </div>
                                    </InputWrapper>
                                </Card>
                            )}
                            {listData?.details && (
                                <Card>
                                    <InputWrapper label='Details'>
                                        <div className=' smv-w-full smv-items-center smv-flex smv-justify-end smv-text-right'>
                                            <text>{listData?.details}</text>
                                        </div>
                                    </InputWrapper>
                                </Card>
                            )}
                            {listData?.flight_number && (
                                <Card>
                                    <InputWrapper label='Flight Number'>
                                        <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                            <text>
                                                {listData?.flight_number}
                                            </text>
                                        </div>
                                    </InputWrapper>
                                </Card>
                            )}
                            {listData?.event_date_unix && (
                                <Card>
                                    <InputWrapper label='Unix Time'>
                                        <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                            <text>
                                                {new Date(
                                                    listData?.event_date_unix,
                                                ).toLocaleString()}
                                            </text>
                                        </div>
                                    </InputWrapper>
                                </Card>
                            )}
                            {listData?.event_date_utc && (
                                <Card>
                                    <InputWrapper label='UTC Time'>
                                        <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                            <text>
                                                {new Date(
                                                    listData?.event_date_utc,
                                                ).toLocaleString()}
                                            </text>
                                        </div>
                                    </InputWrapper>
                                </Card>
                            )}
                            <Card>
                                <InputWrapper label='Learn More'>
                                    <div className=' smv-w-full smv-items-center smv-justify-end smv-flex  smv-gap-5'>
                                        {listData?.links?.article && (
                                            <ActionIcon
                                                component='a'
                                                target='_blank'
                                                href={listData?.links?.article}
                                            >
                                                <Image
                                                    alt='ICON'
                                                    src='https://img.icons8.com/external-kmg-design-outline-color-kmg-design/999/000000/external-web-contact-us-kmg-design-outline-color-kmg-design.png'
                                                />
                                            </ActionIcon>
                                        )}
                                        {listData?.links?.wikipedia && (
                                            <ActionIcon
                                                component='a'
                                                target='_blank'
                                                href={
                                                    listData?.links?.wikipedia
                                                }
                                            >
                                                <Image
                                                    alt='ICON'
                                                    src='https://img.icons8.com/doodle/999/000000/wikipedia--v1.png'
                                                />
                                            </ActionIcon>
                                        )}
                                        {listData?.links?.reddit && (
                                            <ActionIcon
                                                component='a'
                                                target='_blank'
                                                href={listData?.links?.reddit}
                                            >
                                                <Image
                                                    alt='ICON'
                                                    src='https://img.icons8.com/doodle/999/000000/reddit--v1.png'
                                                />
                                            </ActionIcon>
                                        )}
                                    </div>
                                </InputWrapper>
                            </Card>
                        </Group>
                    </Modal>
                )}
            </Table>
        </Group>
    );
}

History.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};
