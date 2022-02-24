import {
    Button,
    Card,
    Group,
    InputWrapper,
    Modal,
    RingProgress,
    Table,
    Text,
    TextInput,
} from '@mantine/core';
import { useState } from 'react';
import RootLayout from '../../components/RootLayout';

export async function getServerSideProps() {
    const res = await fetch(' https://api.spacexdata.com/v3/payloads');
    const data = await res.json();
    return {
        props: {
            payloadList: data,
        },
    };
}

export default function Payloads({ payloadList }) {
    const [opened, setOpened] = useState(false);
    const [listData, setListData] = useState();
    const [search, setSearch] = useState('');

    const rows = payloadList
        .filter((d, item) => {
            return (
                d?.payload_id.toLowerCase().indexOf(search.toLowerCase()) >= 0
            );
        })
        .map((res, index) => (
            <tr key={res?.payload_id}>
                <td>{index + 1}</td>
                <td>{res?.payload_id}</td>
                <td>{res?.payload_type}</td>
                <td>{res?.manufacturer}</td>
                <td>{res?.orbit}</td>
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
                    label='Search by Payload ID'
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
                        <th>S.No</th>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Manufacturer</th>
                        <th>Orbit</th>
                        <th>More</th>
                    </tr>
                </thead>
                <tbody className=' smv-overflow-y-scroll'>{rows}</tbody>
                {listData && (
                    <Modal
                        centered
                        overflow='inside'
                        opened={opened}
                        onClose={() => setOpened(false)}
                        title={listData?.payload_id}
                    >
                        <Group direction='column' grow>
                            {listData?.payload_id && (
                                <Card>
                                    <InputWrapper label='Title'>
                                        <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                            <text>{listData?.payload_id}</text>
                                        </div>
                                    </InputWrapper>
                                </Card>
                            )}
                            {listData?.payload_type && (
                                <Card>
                                    <InputWrapper label='Type'>
                                        <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                            <text>
                                                {listData?.payload_type}
                                            </text>
                                        </div>
                                    </InputWrapper>
                                </Card>
                            )}
                            {listData?.orbit && (
                                <Card>
                                    <InputWrapper label='Orbit'>
                                        <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                            <text>{listData?.orbit}</text>
                                        </div>
                                    </InputWrapper>
                                </Card>
                            )}
                            {listData?.nationality && (
                                <Card>
                                    <InputWrapper label='Nationality'>
                                        <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                            <text>{listData?.nationality}</text>
                                        </div>
                                    </InputWrapper>
                                </Card>
                            )}
                            {listData?.manufacturer && (
                                <Card>
                                    <InputWrapper label='Manufacturer'>
                                        <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                            <text>
                                                {listData?.manufacturer}
                                            </text>
                                        </div>
                                    </InputWrapper>
                                </Card>
                            )}
                            <Card>
                                <InputWrapper label='Reused'>
                                    <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                        <text>
                                            {listData?.reused
                                                ? 'true'
                                                : 'false'}
                                        </text>
                                    </div>
                                </InputWrapper>
                            </Card>
                            {listData?.payload_mass_lbs && (
                                <Card>
                                    <InputWrapper label='Mass'>
                                        <div className=' smv-w-full smv-items-center smv-flex smv-justify-evenly'>
                                            <RingProgress
                                                size={100}
                                                roundCaps
                                                thickness={10}
                                                sections={[
                                                    {
                                                        value: listData?.payload_mass_kg,
                                                        color: 'blue',
                                                    },
                                                ]}
                                                label={
                                                    <Text
                                                        weight={700}
                                                        align='center'
                                                        size='sm'
                                                    >
                                                        {
                                                            listData?.payload_mass_kg
                                                        }
                                                    </Text>
                                                }
                                            />
                                            <RingProgress
                                                size={100}
                                                roundCaps
                                                thickness={10}
                                                sections={[
                                                    {
                                                        value: listData?.payload_mass_lbs,
                                                        color: 'blue',
                                                    },
                                                ]}
                                                label={
                                                    <Text
                                                        weight={700}
                                                        align='center'
                                                        size='sm'
                                                    >
                                                        {
                                                            listData?.payload_mass_lbs
                                                        }
                                                        %
                                                    </Text>
                                                }
                                            />
                                        </div>
                                    </InputWrapper>
                                </Card>
                            )}

                            <InputWrapper label='Orbit Params'>
                                <Card>
                                    {listData?.orbit_params?.apoapsis_km && (
                                        <InputWrapper label='apoapsis_km'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.apoapsis_km
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                    {listData?.orbit_params
                                        ?.arg_of_pericenter && (
                                        <InputWrapper label='arg_of_pericenter'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.arg_of_pericenter
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                    {listData?.orbit_params?.eccentricity && (
                                        <InputWrapper label='eccentricity'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.eccentricity
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                    {listData?.orbit_params?.periapsis_km && (
                                        <InputWrapper label='periapsis_km'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.periapsis_km
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                    {listData?.orbit_params
                                        ?.reference_system && (
                                        <InputWrapper label='reference_system'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.reference_system
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                    {listData?.orbit_params?.regime && (
                                        <InputWrapper label='regime'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.regime
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                    {listData?.orbit_params?.longitude && (
                                        <InputWrapper label='longitude'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.longitude
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                    {listData?.orbit_params
                                        ?.semi_major_axis_km && (
                                        <InputWrapper label='semi_major_axis_km'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.semi_major_axis_km
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                    {listData?.orbit_params
                                        ?.inclination_deg && (
                                        <InputWrapper label='inclination_deg'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.inclination_deg
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                    {listData?.orbit_params?.period_min && (
                                        <InputWrapper label='period_min'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.period_min
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                    {listData?.orbit_params?.lifespan_years && (
                                        <InputWrapper label='lifespan_years'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.lifespan_years
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                    {listData?.orbit_params?.epoch && (
                                        <InputWrapper label='epoch'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.epoch
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                    {listData?.orbit_params?.mean_motion && (
                                        <InputWrapper label='mean_motion'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.mean_motion
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                    {listData?.orbit_params?.raan && (
                                        <InputWrapper label='raan'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.raan
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                    {listData?.orbit_params?.mean_anomaly && (
                                        <InputWrapper label='mean_anomaly'>
                                            <div className=' smv-w-full smv-items-center smv-flex smv-justify-end'>
                                                <text>
                                                    {
                                                        listData?.orbit_params
                                                            ?.mean_anomaly
                                                    }
                                                </text>
                                            </div>
                                        </InputWrapper>
                                    )}
                                </Card>
                            </InputWrapper>
                        </Group>
                    </Modal>
                )}
            </Table>
        </Group>
    );
}

Payloads.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};
