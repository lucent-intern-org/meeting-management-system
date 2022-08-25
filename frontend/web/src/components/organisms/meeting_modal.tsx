/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { FiRepeat } from 'react-icons/fi';
import { GrTextAlignFull } from 'react-icons/gr';
import { IoMdClose } from 'react-icons/io';
import { IoBusinessOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { meetingAddModalVisibleState, meetingModifyModalState } from '../../atom';
import theme from '../../styles/theme';
import {
    addMeetingType,
    meetingInputType,
    modifyMeetingType,
    roomType,
    userType,
} from '../../types';
import { minsToStr, strToMins, toStringDateByFormatting } from '../../utils/date';
import CustomButton from '../atoms/custom_button';
import DropDown from '../atoms/drop_down';
import Input from '../atoms/input';
import Text from '../atoms/text';
import FlexColumn from '../molecules/flex_column';
import FlexRow from '../molecules/flex_row';
import ModalCloseButton from '../molecules/modal_close_button';
import CenteredModal from './centered_modal';
import {
    addMeeting,
    modifyMeeting,
    useGetAllGroups,
    useGetAllMeetings,
    useGetAllRooms,
    useGetAllUsers,
} from '../../api';
import Loading from '../molecules/loading';

const Container = styled.div`
    margin: 0 15%;
    height: 100%;
`;

const InputContainer = styled.div`
    display: flex;
    position: relative;
    overflow: clip;
    width: 100%;
    vertical-align: center;
    align-items: flex-start;

    & > .date_picker {
        width: 100%;

        & > input[type='date']::-webkit-calendar-picker-indicator {
            position: absolute;
            top: -150%;
            left: -150%;
            width: 300%;
            height: 300%;
            cursor: pointer;
        }
    }

    & > .time_picker {
        width: 45%;

        & > input[type='time']::-webkit-calendar-picker-indicator {
            position: absolute;
            top: -150%;
            left: -150%;
            width: 300%;
            height: 300%;
            cursor: pointer;
        }
    }
`;

const RepeatContainer = styled.div`
    display: flex;
    flex-direction: row;
    vertical-align: center;
    align-items: center;
    width: 100%;
    font-size: 0.8rem;

    input[type='radio'] {
        width: 0;
        height: 0;
        position: absolute;
        left: -9999px;
    }

    input[type='radio'] + label {
        width: 25%;
        margin: 0;
        padding: 0.3em 1.5em;
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        border: 1px solid #ddd;
        background-color: #fff;
        line-height: 140%;
        text-align: center;
        box-shadow: 0 0 0 rgba(255, 255, 255, 0);
        cursor: pointer;
    }

    input[type='radio']:checked + label {
        background-color: ${theme.submitBtnColor};
        color: #fff;
        font-weight: 700;
        border-color: ${theme.submitBtnColor};
        z-index: 1;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    vertical-align: center;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.3rem;
`;

const TextArea = styled.textarea`
    resize: none;
    border: none;
    width: 100%;
    height: 7rem;
    background-color: #ebebeb;
    border-radius: 0.5rem;
    outline-color: ${theme.submitBtnColor};
    padding: 0.5rem;
    font-size: 0.7rem;
    font-family: 'inter';
`;

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ParticipantContainer = styled.div`
    display: flex;
    flex-direction: row;
    vertical-align: center;
    align-items: center;
    border: 0.1rem solid black;
    border-radius: 3rem;
    padding: 0.3rem;
    flex: 0 0 auto;
    margin-right: 0.3rem;
`;

const ParticipantsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    margin-top: 0.3rem;
    overflow-x: auto;
`;

const AutoSearchContainer = styled.div`
    z-index: 1;
    background-color: #fff;
    position: fixed;
    border: 2px solid black;
    display: flex;
`;

const AutoSearchWrap = styled.ul``;

const AutoSearchData = styled.li`
    padding: 0.5rem 0.4rem;
    width: 8rem;
    font-size: 0.8rem;
    font-weight: 600;
    z-index: 4;
    letter-spacing: 0.15rem;
    &:hover {
        background-color: #edf5f5;
        cursor: pointer;
        font-weight: bold;
    }
`;

const MeetingModal: React.FC = () => {
    const queryClient = useQueryClient();
    const meetingAddModalVisible = useRecoilValue(meetingAddModalVisibleState);
    const resetMeetingAddModal = useResetRecoilState(meetingAddModalVisibleState);
    const meetingModifyModal = useRecoilValue(meetingModifyModalState);
    const resetMeetingModifyModal = useResetRecoilState(meetingModifyModalState);

    const meetings = useGetAllMeetings();
    const rooms = useGetAllRooms();
    const groups = useGetAllGroups();
    const users = useGetAllUsers();

    const user = { email: localStorage.getItem('email'), name: localStorage.getItem('name') };
    const today = new Date();
    const minDate = toStringDateByFormatting(today);
    const minTime = today.toLocaleTimeString('en-US', { hour12: false }).substring(0, 5);
    const [validation, setValidation] = React.useState(false);
    const [keyword, setKeyword] = React.useState<string>('');
    const [keyItems, setKeyItems] = React.useState<userType[]>([]);
    const [input, setInput] = React.useState<meetingInputType>(
        meetingAddModalVisible
            ? {
                  title: '',
                  date: minDate,
                  startTime: minTime,
                  endTime:
                      minsToStr(strToMins(minTime) + strToMins('01:00')) > '24:00'
                          ? '23:59'
                          : minsToStr(strToMins(minTime) + strToMins('01:00')),
                  repeat: '반복 없음',
                  content: '',
                  participants: [],
                  room: '',
                  participateGroups: [],
              }
            : {
                  title: meetingModifyModal.meeting.title,
                  date: meetingModifyModal.meeting.date,
                  startTime: meetingModifyModal.meeting.startTime,
                  endTime: meetingModifyModal.meeting.endTime,
                  repeat: meetingModifyModal.meeting.repeat,
                  content: meetingModifyModal.meeting.content,
                  participants: [],
                  room: '',
                  participateGroups: [],
              },
    );

    const handleChangeData = (key: string, value: string | string[] | userType[]) => {
        setInput((prev) => ({ ...prev, [key]: value }));
    };

    if (!groups.isLoading) {
        if (groups.data.data[0].groupName !== 'All')
            groups.data.data.unshift({ groupName: 'All', groupId: -1 });
    }

    const addMeetingMutation = useMutation((submitData: addMeetingType) => addMeeting(submitData), {
        onSuccess: () => {
            queryClient.invalidateQueries(['meetings']);
            queryClient.invalidateQueries(['meetings', { date: input.date }]);
        },
    });

    const modifyMeetingMutation = useMutation(
        (submitData: modifyMeetingType) => modifyMeeting(submitData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['meetings']);
                queryClient.invalidateQueries(['meetings', { date: input.date }]);
                queryClient.invalidateQueries([
                    'participants',
                    { meetingId: meetingModifyModal.meeting.meetingId },
                ]);
            },
        },
    );

    const updateData = () => {
        const filteredUsers = input.participateGroups.includes('All')
            ? []
            : users.data.data.filter((u: userType) => {
                  if (input.participants.includes(u)) return;
                  return (
                      u.name.includes(keyword) &&
                      !input.participateGroups.includes(groups.data.data[u.groupId + 1].groupName)
                  );
              });
        setKeyItems(filteredUsers);
    };

    React.useEffect(() => {
        const debounce = setTimeout(() => {
            if (keyword) updateData();
        }, 200);
        return () => {
            clearTimeout(debounce);
        };
    }, [keyword]);

    const validateSubmit = () => {
        const participateUsers: userType[] = [];
        if (input.participateGroups.length > 0) {
            if (input.participateGroups.includes('All')) {
                users.data.data.map((u: userType) => {
                    participateUsers.push(u);
                });
            } else {
                input.participateGroups.map((pg) => {
                    users.data.data
                        .filter((u: userType) => {
                            return groups.data.data[u.groupId + 1].groupName === pg;
                        })
                        .map((pu: userType) => {
                            participateUsers.push(pu);
                        });
                });
            }
        }
        input.participants.map((p) => participateUsers.push(p));
        const defaultValidation =
            input.title.length >= 2 &&
            input.title.length <= 20 &&
            input.content.length >= 2 &&
            input.content.length <= 500 &&
            participateUsers.length > 0 &&
            input.room !== '' &&
            input.date !== '' &&
            input.startTime !== '' &&
            input.endTime !== '';
        return meetingAddModalVisible
            ? defaultValidation
            : defaultValidation &&
                  !(
                      input.title === meetingModifyModal.meeting.title &&
                      input.date === meetingModifyModal.meeting.date &&
                      input.startTime === meetingModifyModal.meeting.startTime &&
                      input.endTime === meetingModifyModal.meeting.endTime &&
                      input.repeat === meetingModifyModal.meeting.repeat &&
                      input.room === rooms.data.data[meetingModifyModal.meeting.roomId].roomName &&
                      input.content === meetingModifyModal.meeting.content &&
                      !meetingModifyModal.participants
                          .map((p) => {
                              return participateUsers.includes(p);
                          })
                          .includes(false) &&
                      participateUsers.length === meetingModifyModal.participants.length
                  );
    };

    React.useEffect(() => {
        const debounce = setTimeout(() => {
            setValidation(validateSubmit());
        }, 200);
        return () => {
            clearTimeout(debounce);
        };
    }, [input]);

    React.useEffect(() => {
        const debounce = setTimeout(() => {
            if (
                users.status === 'success' &&
                rooms.status === 'success' &&
                input.participants.length === 0
            ) {
                if (meetingAddModalVisible) {
                    handleChangeData('participants', [
                        ...input.participants,
                        users.data.data.find((u: userType) => {
                            return u.email === localStorage.getItem('email');
                        }) as userType,
                    ]);
                }
                if (meetingModifyModal.visible) {
                    handleChangeData(
                        'room',
                        rooms.data.data[meetingModifyModal.meeting.roomId].roomName,
                    );
                    handleChangeData('participants', [
                        users.data.data.find((u: userType) => {
                            return u.email === user.email;
                        }) as userType,
                        ...meetingModifyModal.participants.filter((p) => {
                            return p.email !== user.email;
                        }),
                    ]);
                }
            }
        }, 200);
        return () => {
            clearTimeout(debounce);
        };
    }, [users.status, rooms.status]);

    const renderByStatus = React.useCallback(() => {
        const status = [meetings.status, rooms.status, groups.status, users.status];
        if (status.includes('loading') && input.participants.length === 0) {
            return <Loading />;
        }
        if (status.includes('error')) {
            if (meetings.error instanceof Error) {
                return <div>Error: {meetings.error.message}</div>;
            }
            return <div>Error!!</div>;
        }
        return (
            <FlexColumn>
                <Input
                    type='text'
                    placeholder='제목'
                    letterSpacing={0.15}
                    fontSize={1.2}
                    value={input.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeData('title', e.target.value);
                    }}
                />
                <InputContainer>
                    <AiOutlineCalendar size={30} style={{ marginRight: '2rem' }} />
                    <label className='date_picker'>
                        <Input
                            type='date'
                            fontSize={1.1}
                            value={input.date}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChangeData('date', e.target.value);
                            }}
                        />
                    </label>
                </InputContainer>
                <div style={{ width: '100%' }}>
                    <InputContainer>
                        <AiOutlineClockCircle size={30} style={{ marginRight: '2rem' }} />
                        <label className='time_picker' style={{ marginRight: '1rem' }}>
                            <Input
                                type='time'
                                fontSize={1.1}
                                value={input.startTime}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeData('startTime', e.target.value);
                                    if (e.target.value > input.endTime)
                                        handleChangeData('endTime', e.target.value);
                                }}
                            />
                        </label>
                        <Text fontSize={1.1} fontWeight={900}>
                            -
                        </Text>
                        <label className='time_picker' style={{ marginLeft: '1rem' }}>
                            <Input
                                type='time'
                                fontSize={1.1}
                                value={input.endTime}
                                min={input.startTime}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    return e.target.value < input.startTime
                                        ? handleChangeData('endTime', input.startTime)
                                        : handleChangeData('endTime', e.target.value);
                                }}
                            />
                        </label>
                    </InputContainer>
                    <InputContainer>
                        <div style={{ marginRight: '3.5rem' }} />
                        <ButtonContainer>
                            <CustomButton
                                fontSize={0.8}
                                width={17}
                                verticalPadding={0.3}
                                marginRight={0}
                                marginLeft={2}
                                bgColor={theme.minusColor}
                                onClick={() => {
                                    const substractedOneHour = minsToStr(
                                        strToMins(input.endTime) - strToMins('01:00'),
                                    );
                                    return substractedOneHour > input.startTime
                                        ? handleChangeData('endTime', substractedOneHour)
                                        : handleChangeData('endTime', input.startTime);
                                }}
                            >
                                -1h
                            </CustomButton>
                            <CustomButton
                                fontSize={0.8}
                                width={17}
                                verticalPadding={0.3}
                                marginRight={10}
                                bgColor={theme.minusColor}
                                onClick={() => {
                                    const substractedHalfHour = minsToStr(
                                        strToMins(input.endTime) - strToMins('00:30'),
                                    );
                                    return substractedHalfHour > input.startTime
                                        ? handleChangeData('endTime', substractedHalfHour)
                                        : handleChangeData('endTime', input.startTime);
                                }}
                            >
                                -30m
                            </CustomButton>
                            <CustomButton
                                fontSize={0.8}
                                width={17}
                                verticalPadding={0.3}
                                marginRight={0}
                                bgColor={theme.plusColor}
                                onClick={() => {
                                    const addedHalfHour = minsToStr(
                                        strToMins(input.endTime) + strToMins('00:30'),
                                    );
                                    return addedHalfHour >= '23:59'
                                        ? handleChangeData('endTime', '23:59')
                                        : handleChangeData('endTime', addedHalfHour);
                                }}
                            >
                                +30m
                            </CustomButton>
                            <CustomButton
                                fontSize={0.8}
                                width={17}
                                verticalPadding={0.3}
                                marginRight={2}
                                bgColor={theme.plusColor}
                                onClick={() => {
                                    const addedOneHour = minsToStr(
                                        strToMins(input.endTime) + strToMins('01:00'),
                                    );
                                    return addedOneHour >= '23:59'
                                        ? handleChangeData('endTime', '23:59')
                                        : handleChangeData('endTime', addedOneHour);
                                }}
                            >
                                +1h
                            </CustomButton>
                        </ButtonContainer>
                    </InputContainer>
                </div>
                <InputContainer>
                    <FiRepeat size={30} style={{ marginRight: '2rem' }} />
                    <RepeatContainer>
                        <input
                            type='radio'
                            id='반복 없음'
                            name='repeat'
                            value='반복 없음'
                            checked={input.repeat === '반복 없음'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChangeData('repeat', e.target.value);
                            }}
                        />
                        <label htmlFor='반복 없음'>없음</label>
                        <input
                            type='radio'
                            id='매일 반복'
                            name='repeat'
                            value='매일 반복'
                            checked={input.repeat === '매일 반복'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChangeData('repeat', e.target.value);
                            }}
                        />
                        <label htmlFor='매일 반복'>매일</label>
                        <input
                            type='radio'
                            id='매주 반복'
                            name='repeat'
                            value='매주 반복'
                            checked={input.repeat === '매주 반복'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChangeData('repeat', e.target.value);
                            }}
                        />
                        <label htmlFor='매주 반복'>매주</label>
                        <input
                            type='radio'
                            id='매월 반복'
                            name='repeat'
                            value='매월 반복'
                            checked={input.repeat === '매월 반복'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChangeData('repeat', e.target.value);
                            }}
                        />
                        <label htmlFor='매월 반복'>매월</label>
                    </RepeatContainer>
                </InputContainer>
                <div style={{ width: '100%' }}>
                    <InputContainer>
                        <BsPeople size={30} style={{ marginRight: '2rem' }} />
                        <SearchContainer>
                            <div style={{ width: '25%' }}>
                                <Input
                                    type='text'
                                    placeholder='참석자'
                                    letterSpacing={0.15}
                                    fontSize={1}
                                    value={keyword}
                                    disabled={input.participateGroups.includes('All')}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setKeyword(e.currentTarget.value);
                                    }}
                                />
                                {keyItems.length > 0 && keyword && (
                                    <AutoSearchContainer>
                                        <AutoSearchWrap>
                                            {keyItems.map((search) => {
                                                return (
                                                    <AutoSearchData
                                                        key={search.slackId}
                                                        onClick={() => {
                                                            setKeyword('');
                                                            handleChangeData('participants', [
                                                                ...input.participants,
                                                                search,
                                                            ]);
                                                            setKeyItems([]);
                                                        }}
                                                    >
                                                        <a href='#'>{search.name}</a>
                                                    </AutoSearchData>
                                                );
                                            })}
                                        </AutoSearchWrap>
                                    </AutoSearchContainer>
                                )}
                            </div>
                            <DropDown
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    if (e.target.value === 'All') {
                                        handleChangeData('participateGroups', [e.target.value]);
                                        handleChangeData('participants', []);
                                    } else if (!input.participateGroups.includes(e.target.value)) {
                                        handleChangeData('participateGroups', [
                                            ...input.participateGroups,
                                            e.target.value,
                                        ]);
                                        handleChangeData(
                                            'participants',
                                            input.participants.filter((p) => {
                                                return (
                                                    groups.data.data[p.groupId + 1].groupName !==
                                                    e.target.value
                                                );
                                            }),
                                        );
                                    }
                                    (
                                        document.getElementById(
                                            'position-drop-down',
                                        ) as HTMLInputElement
                                    ).value = 'default';
                                }}
                                disabled={input.participateGroups.includes('All')}
                                id='position-drop-down'
                                placeholder='그룹 추가'
                                letterSpacing={0.15}
                                fontSize={1}
                                options={groups.data.data}
                                margin={0}
                                width={70}
                            />
                        </SearchContainer>
                    </InputContainer>
                    <InputContainer>
                        <div style={{ marginRight: '3.5rem' }} />
                        <ParticipantsContainer>
                            {input.participants.map((p) => {
                                return (
                                    <ParticipantContainer key={p.slackId}>
                                        <Text letterSpacing={0.01} fontSize={0.8}>
                                            {p.name}
                                        </Text>
                                        <IoMdClose
                                            color={theme.minusColor}
                                            onClick={() => {
                                                handleChangeData(
                                                    'participants',
                                                    input.participants.filter((participant) => {
                                                        return participant !== p;
                                                    }),
                                                );
                                            }}
                                            size={15}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </ParticipantContainer>
                                );
                            })}
                        </ParticipantsContainer>
                    </InputContainer>
                    <InputContainer>
                        <div style={{ marginRight: '3.5rem' }} />
                        <ParticipantsContainer>
                            {input.participateGroups.map((g) => {
                                return (
                                    <ParticipantContainer key={g}>
                                        <Text letterSpacing={0.01} fontSize={0.8}>
                                            {g}
                                        </Text>
                                        <IoMdClose
                                            color={theme.minusColor}
                                            onClick={() => {
                                                handleChangeData(
                                                    'participateGroups',
                                                    input.participateGroups.filter((group) => {
                                                        return group !== g;
                                                    }),
                                                );
                                            }}
                                            size={15}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </ParticipantContainer>
                                );
                            })}
                        </ParticipantsContainer>
                    </InputContainer>
                </div>
                <InputContainer>
                    <IoBusinessOutline size={30} style={{ marginRight: '2rem' }} />
                    <DropDown
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            handleChangeData('room', e.target.value);
                        }}
                        defaultValue={input.room}
                        placeholder='회의실'
                        letterSpacing={0.15}
                        fontSize={1}
                        options={rooms.data.data}
                        margin={0}
                        width={100}
                    />
                </InputContainer>
                <InputContainer>
                    <GrTextAlignFull size={30} style={{ marginRight: '2rem' }} />
                    <TextArea
                        placeholder='내용을 입력해주세요'
                        value={input.content}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            if (input.content !== e.target.value)
                                handleChangeData('content', e.target.value);
                        }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                            if (e.key === 'Tab' || e.keyCode === 9) {
                                e.stopPropagation();
                                e.preventDefault();
                                handleChangeData('content', `${input.content}\t`);
                            }
                        }}
                    />
                </InputContainer>
                <div
                    style={{
                        width: '100%',
                    }}
                >
                    <FlexRow>
                        <CustomButton
                            fontSize={1.2}
                            fontWeight={900}
                            width={40}
                            verticalPadding={0.5}
                            marginRight={0}
                            bgColor={validation ? theme.submitBtnColor : theme.cancelBtnColor}
                            disabled={!validation}
                            onClick={() => {
                                const slackIds: string[] = [];
                                if (input.participateGroups.length > 0) {
                                    if (input.participateGroups.includes('All')) {
                                        users.data.data.map((u: userType) => {
                                            slackIds.push(u.slackId);
                                        });
                                    } else {
                                        input.participateGroups.map((pg) => {
                                            users.data.data
                                                .filter((u: userType) => {
                                                    return (
                                                        groups.data.data[u.groupId + 1]
                                                            .groupName === pg
                                                    );
                                                })
                                                .map((pu: userType) => {
                                                    slackIds.push(pu.slackId);
                                                });
                                        });
                                    }
                                }
                                input.participants.map((p) => slackIds.push(p.slackId));
                                const roomId = rooms.data.data.find((r: roomType) => {
                                    return r.roomName === input.room;
                                })?.roomId;
                                const data: addMeetingType | modifyMeetingType = {
                                    roomId: roomId,
                                    date: input.date,
                                    startTime: input.startTime,
                                    endTime: input.endTime,
                                    title: input.title,
                                    content: input.content,
                                    repeat: input.repeat,
                                    slackId: slackIds,
                                };
                                if (meetingAddModalVisible) {
                                    addMeetingMutation.mutate(data, {});
                                    resetMeetingAddModal();
                                }
                                if (meetingModifyModal.visible) {
                                    const plusData = Object.assign(data, {
                                        meetingId: meetingModifyModal.meeting.meetingId,
                                    }) as modifyMeetingType;
                                    modifyMeetingMutation.mutate(plusData, {});
                                    resetMeetingModifyModal();
                                }
                            }}
                        >
                            {meetingAddModalVisible ? '추가' : '수정'}
                        </CustomButton>
                        <CustomButton
                            fontSize={1.2}
                            fontWeight={900}
                            width={40}
                            verticalPadding={0.5}
                            marginRight={0}
                            bgColor={theme.cancelBtnColor}
                            onClick={() => {
                                return meetingAddModalVisible
                                    ? resetMeetingAddModal()
                                    : resetMeetingModifyModal();
                            }}
                        >
                            취소
                        </CustomButton>
                    </FlexRow>
                </div>
            </FlexColumn>
        );
    }, [
        meetings.status,
        rooms.status,
        groups.status,
        users.status,
        input,
        keyword,
        keyItems,
        validation,
    ]);

    return (
        <CenteredModal width={35} height={37}>
            <ModalCloseButton
                state={
                    meetingAddModalVisible ? meetingAddModalVisibleState : meetingModifyModalState
                }
            />
            <Container>{renderByStatus()}</Container>
        </CenteredModal>
    );
};

export default MeetingModal;
