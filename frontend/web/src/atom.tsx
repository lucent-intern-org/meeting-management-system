import { atom } from 'recoil';

const dayDetailModalState = atom({
    key: 'dayDetailModalState',
    default: {
        visible: false,
        date: new Date(),
    },
});

// const dayDetailInfoState = atom({})

export default dayDetailModalState;
