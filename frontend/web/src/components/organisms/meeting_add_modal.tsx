/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { FiRepeat } from 'react-icons/fi';
import { GrTextAlignFull } from 'react-icons/gr';
import { IoMdClose } from 'react-icons/io';
import { IoBusinessOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { meetingAddModalVisibleState, userState } from '../../atom';
import theme from '../../styles/theme';
import { groups, rooms, users } from '../../temp_db';
import { meetingType, userType } from '../../types';
import { minsToStr, strToMins, toStringDateByFormatting } from '../../utils/date';
import CustomButton from '../atoms/custom_button';
import DropDown from '../atoms/drop_down';
import Input from '../atoms/input';
import Text from '../atoms/text';
import FlexColumn from '../molecules/flex_column';
import FlexRow from '../molecules/flex_row';
import ModalCloseButton from '../molecules/modal_close_button';
import CenteredModal from './centered_modal';

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

const MeetingAddModal: React.FC = () => {
    if (groups[0].groupName !== 'All') groups.unshift({ groupName: 'All', groupId: -1 });
    const [meetingAddModalVisible, setMeetingAddModalVisible] = useRecoilState(
        meetingAddModalVisibleState,
    );
    const user = useRecoilValue(userState);
    const today = new Date();
    const minDate = toStringDateByFormatting(today);
    const minTime = today.toLocaleTimeString('en-US', { hour12: false }).substring(0, 5);
    const [input, setInput] = React.useState<meetingType>({
        title: '',
        date: minDate,
        startTime: minTime,
        endTime: minTime,
        repeat: 'none',
        content: '',
        participants: [],
        room: '',
        participateGroups: [],
        keyword: '',
        keyItems: [],
    });
    const [currentUser, setCurrentUser] = React.useState<userType>({
        slackId: '',
        name: '',
        email: '',
        groupId: -1000,
        role: '',
    });

    const handleChangeData = (key: string, value: string | string[] | userType[]) => {
        setInput((prev) => ({ ...prev, [key]: value }));
    };

    const updateData = () => {
        const filteredUsers = input.participateGroups.includes('All')
            ? []
            : users.filter((u) => {
                  if (input.participants.includes(u)) return;
                  return (
                      u.name.includes(input.keyword) &&
                      !input.participateGroups.includes(groups[u.groupId].groupName) &&
                      u.slackId !== currentUser.slackId
                  );
              });
        handleChangeData('keyItems', filteredUsers);
    };

    React.useEffect(() => {
        const debounce = setTimeout(() => {
            if (input.keyword) updateData();
        }, 200);
        return () => {
            clearTimeout(debounce);
        };
    }, [input.keyword]);

    React.useEffect(() => {
        setCurrentUser(
            users.find((u) => {
                return u.email === user.email;
            }) as userType,
        );
    }, []);

    return (
        <CenteredModal width={35} height={37}>
            <ModalCloseButton setState={meetingAddModalVisibleState} />
            <Container>
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
                                min={minDate}
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
                                    min={minTime}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        if (e.target.value < minTime) {
                                            handleChangeData('startTime', minTime);
                                        } else {
                                            handleChangeData('startTime', e.target.value);
                                            if (e.target.value > input.endTime)
                                                handleChangeData('endTime', e.target.value);
                                        }
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
                                id='none'
                                name='repeat'
                                value='none'
                                checked={input.repeat === 'none'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeData('repeat', e.target.value);
                                }}
                            />
                            <label htmlFor='none'>없음</label>
                            <input
                                type='radio'
                                id='daily'
                                name='repeat'
                                value='daily'
                                checked={input.repeat === 'daily'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeData('repeat', e.target.value);
                                }}
                            />
                            <label htmlFor='daily'>매일</label>
                            <input
                                type='radio'
                                id='weekly'
                                name='repeat'
                                value='weekly'
                                checked={input.repeat === 'weekly'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeData('repeat', e.target.value);
                                }}
                            />
                            <label htmlFor='weekly'>매주</label>
                            <input
                                type='radio'
                                id='monthly'
                                name='repeat'
                                value='monthly'
                                checked={input.repeat === 'monthly'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeData('repeat', e.target.value);
                                }}
                            />
                            <label htmlFor='monthly'>매월</label>
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
                                        value={input.keyword}
                                        disabled={input.participateGroups.includes('All')}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            handleChangeData('keyword', e.currentTarget.value);
                                        }}
                                    />
                                    {input.keyItems.length > 0 && input.keyword && (
                                        <AutoSearchContainer>
                                            <AutoSearchWrap>
                                                {input.keyItems.map((search) => {
                                                    return (
                                                        <AutoSearchData
                                                            key={search.slackId}
                                                            onClick={() => {
                                                                handleChangeData('keyword', '');
                                                                handleChangeData('participants', [
                                                                    ...input.participants,
                                                                    search,
                                                                ]);
                                                                handleChangeData('keyItems', []);
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
                                        } else if (
                                            !input.participateGroups.includes(e.target.value)
                                        ) {
                                            handleChangeData('participateGroups', [
                                                ...input.participateGroups,
                                                e.target.value,
                                            ]);
                                            handleChangeData(
                                                'participants',
                                                input.participants.filter((p) => {
                                                    return (
                                                        groups[p.groupId].groupName !==
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
                                    options={groups}
                                    margin={0}
                                    width={70}
                                />
                            </SearchContainer>
                        </InputContainer>
                        <InputContainer>
                            <div style={{ marginRight: '3.5rem' }} />
                            <ParticipantsContainer>
                                {currentUser && (
                                    <ParticipantContainer key={currentUser.slackId}>
                                        <Text letterSpacing={0.01} fontSize={0.8}>
                                            {currentUser.name}
                                        </Text>
                                    </ParticipantContainer>
                                )}

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
                            placeholder='회의실'
                            letterSpacing={0.15}
                            fontSize={1}
                            options={rooms}
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
                                bgColor={theme.submitBtnColor}
                                onClick={() => {
                                    // todo: 회의실 예약 api call
                                    setMeetingAddModalVisible(!meetingAddModalVisible);
                                }}
                            >
                                예약
                            </CustomButton>
                            <CustomButton
                                fontSize={1.2}
                                fontWeight={900}
                                width={40}
                                verticalPadding={0.5}
                                marginRight={0}
                                bgColor={theme.cancelBtnColor}
                                onClick={() => {
                                    setMeetingAddModalVisible(!meetingAddModalVisible);
                                }}
                            >
                                취소
                            </CustomButton>
                        </FlexRow>
                    </div>
                </FlexColumn>
            </Container>
        </CenteredModal>
    );
};

export default MeetingAddModal;
