import {useState} from "react";

const useOpenHeader = () => {
    const [open, setOpen] = useState(false);
    const changeOpen = () => setOpen(!open);
    const classHeader = open ? 'conf-step__header_opened' : 'conf-step__header_closed';

    return [changeOpen, classHeader];
}

export default useOpenHeader;
