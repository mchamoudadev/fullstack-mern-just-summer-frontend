import { atom } from 'recoil';

export const modalState = atom({
    key: "show",
    default: false,
});
export const updateState = atom({
    key: "updated",
    default: false,
});

export const currentProjectState = atom({
    key: "currentProject",
    default: { _id: "", title: "", description: "", budget: 0, company: "" },
});